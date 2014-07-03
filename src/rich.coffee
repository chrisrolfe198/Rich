class Rich
	constructor: () ->
		@instances = document.querySelectorAll('.rich')
		@toolbar = new RichToolbar
		@initiate(item) for item in @instances
		@addListeners()
		@native = {
			"b"			: { 
				"command" 	: "bold",
				"type" 		: "native",
			},
			"hr"		: { 
				"command" 	: "insertHorizontalRule",
				"type" 		: "native",
			},
			"indent"	: { 
				"command" 	: "indent",
				"type" 		: "native",
			},
			"ol"		: { 
				"command" 	: "insertOrderedList",
				"type" 		: "native",
			},
			"ul"		: { 
				"command" 	: "insertUnorderedList",
				"type" 		: "native",
			},
			"i"			: { 
				"command" 	: "italic",
				"type" 		: "native",
			},
			"middle"	: { 
				"command" 	: "justifyCenter",
				"type" 		: "native",
			},
			"full"		: { 
				"command" 	: "justifyFull",
				"type" 		: "native",
			},
			"left"		: { 
				"command" 	: "justifyLeft",
				"type" 		: "native",
			},
			"right"		: { 
				"command" 	: "justifyRight", 
				"type" 		: "native",
			},
			"outdent"	: { 
				"command" 	: "outdent",
				"type" 		: "native",
			},
			"unformat"	: { 
				"command" 	: "removeFormat",
				"type" 		: "native",
			},
			"all"		: { 
				"command" 	: "selectAll",
				"type" 		: "native",
			},
			"s"			: { 
				"command" 	: "strikethrough",
				"type" 		: "native",
			},
			"sub"		: { 
				"command" 	: "subscript",
				"type" 		: "native",
			},
			"sup"		: { 
				"command" 	: "superscript",
				"type" 		: "native",
			},
			"u"			: { 
				"command" 	: "underline",
				"type" 		: "native",
			},
		}
		@fakeNative = {
			"background": { 
				"command" 	: "backColor",
				"type"		: "fakeNative",
				"prompt"	: "Enter a background color",
			},
			"a"			: { 
				"command" 	: "createLink",
				"type"		: "fakeNative",
				"prompt"	: "Enter the URL for the link (needs http://)",
			},
			"font"		: { 
				"command" 	: "fontName",
				"type"		: "fakeNative",
				"prompt"	: "Enter a font name",
			},
			"fontSize"	: { 
				"command" 	: "fontSize",
				"type"		: "fakeNative",
				"prompt"	: "Enter a font size (1-7)",
			},
			"color"		: { 
				"command" 	: "foreColor",
				"type"		: "fakeNative",
				"prompt"	: "Enter a foreground color",
			},
			"wrap"		: { 
				"command" 	: "formatBlock",
				"type"		: "fakeNative",
				"prompt"	: "Enter the html for format the block with",
			},
			"html"		: { 
				"command" 	: "insertHTML",
				"type"		: "fakeNative",
				"prompt"	: "Enter HTML",
			},
			"image"		: { 
				"command" 	: "insertImage",
				"type"		: "fakeNative",
				"prompt"	: "Enter an image URL",
			},
			"text"		: { 
				"command" 	: "insertText",
				"type"		: "fakeNative",
				"prompt"	: "Enter text",
			},
		}

	initiate: (item) ->
		# Add the toolbar
		@createContentEditableArea(item)
		item.insertAdjacentHTML('afterEnd', @toolbar.outerHTML)
		item.style.display = 'none'
		@updateOriginalElement()
		# Replace any form fields with a content editable div and update the form? On submit?

	createContentEditableArea: (item) ->
		div = document.createElement("div")
		div.setAttribute('contenteditable', 'true')
		div.classList.add('rich-textarea')
		div.innerHTML = item.innerHTML
		item.insertAdjacentHTML('afterEnd', div.outerHTML)
	
	addListeners: () ->
		toolbarItems = document.querySelectorAll('.rich-toolbar-item')
		for item in toolbarItems
			item.addEventListener('mousedown', ((e) ->
				e.preventDefault()
				toolbarItem = e.currentTarget
				item = toolbarItem.classList[0]
				if ToolbarItems[toolbarItem.classList[0]]
					item = ToolbarItems[toolbarItem.classList[0]]
				@handleToolbarItemClick(item)
			).bind(@))

	updateOriginalElement: () ->
		document.querySelector('.rich-toolbar').addEventListener("mousedown", @listenerToUpdateOriginalElement)
		document.querySelector('.rich-textarea').addEventListener("keyup", @listenerToUpdateOriginalElement)
	
	listenerToUpdateOriginalElement: (e) ->
		if e.type == 'mousedown'
			richTextarea = e.currentTarget.parentNode.nextElementSibling
			originalElement = e.currentTarget.parentNode.previousElementSibling
		else if e.type == 'keyup'
			richTextarea = e.currentTarget
			originalElement = e.currentTarget.previousElementSibling.previousElementSibling

		originalElement.innerHTML = richTextarea.innerHTML if richTextarea and originalElement and originalElement.classList.contains('rich')
	
	handleToolbarItemClick: (item) ->
		if @isNative(item)
			if @isRealNative(item)
				document.execCommand(@native[item].command)
			else
				promptText = prompt(@fakeNative[item].prompt)
				document.execCommand(@fakeNative[item].command, false, promptText)
		else
			document.execCommand(item.command, false, item.value)
	
	isNative: (item) ->
		return true if @native[item] or @fakeNative[item]
		return false

	isRealNative: (item) ->
		return true if @native[item]
		return false

new Rich()
