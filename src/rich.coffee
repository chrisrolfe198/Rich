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
			"link"			: {
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
		@updateOriginalElement(item)
		# Replace any form fields with a content editable div and update the form? On submit?

	createContentEditableArea: (item) ->
		div = document.createElement("div")
		div.setAttribute('contenteditable', 'true')
		div.classList.add('rich-textarea')

		itemEntities = item.innerHTML;

		itemHTML = itemEntities.replace(/&lt;/g, '<');
		itemHTML = itemHTML.replace(/&gt;/g, '>');

		div.innerHTML = itemHTML
		item.insertAdjacentHTML('afterEnd', div.outerHTML)

	addListeners: () ->
		toolbarItems = document.querySelectorAll('.rich-toolbar-item')
		for item in toolbarItems
			item.addEventListener('mousedown', ((e) ->
				toolbarItem = e.currentTarget
				item = toolbarItem.classList[0]
				if ToolbarItems[item]
					item = ToolbarItems[item]
				@handleToolbarItemClick(item)
			).bind(@))

		forms = document.getElementsByTagName('form')
		for form in forms
			form.addEventListener('submit', (e) ->
				for item in e.target.children
					break if (!item.classList and !item.length);
					if (item.children.length)
						for child in item.children
							textarea = child if (child.classList.contains('rich'))
							richText = child if (child.classList.contains('rich-textarea'))
					if (item.classList)
						textarea = item if (item.classList.contains('rich'))
						richText = item if (item.classList.contains('rich-textarea'))

				textarea.innerHTML = richText.innerHTML
			)

	updateOriginalElement: (item) ->
		richToolbar = item.nextElementSibling
		richTextarea = richToolbar.nextElementSibling
		richToolbar.addEventListener("mouseup", @listenerToUpdateOriginalElement)
		richTextarea.addEventListener("keyup", @listenerToUpdateOriginalElement)
		richTextarea.addEventListener("keypress", @forceTagLineBreaks)

	listenerToUpdateOriginalElement: (e) ->
		e.preventDefault()
		if e.type == 'mouseup'
			richTextarea = e.srcElement.parentNode.nextElementSibling
			originalElement = e.srcElement.parentNode.previousElementSibling
		else if e.type == 'keyup'
			richTextarea = e.currentTarget
			originalElement = e.currentTarget.previousElementSibling.previousElementSibling

		originalElement.innerHTML = richTextarea.innerHTML if richTextarea and originalElement and originalElement.classList.contains('rich')

	forceTagLineBreaks: (e) ->
		document.execCommand('formatBlock', false, 'p') if e.keyCode == 13

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

new Rich();
