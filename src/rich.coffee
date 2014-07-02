class Rich
	constructor: () ->
		@instances = document.querySelectorAll('.rich')
		@toolbar = new RichToolbar
		@initiate(item) for item in @instances
		@addListeners()
		@native = {
			"b"			: "bold",
			"hr"		: "insertHorizontalRule",
			"indent"	: "indent",
			"ol"		: "insertOrderedList",
			"ul"		: "insertUnorderedList",
			"i"			: "italic",
			"middel"	: "justifyCenter",
			"full"		: "justifyFull",
			"left"		: "justifyLeft",
			"right"		: "justifyRight", 
			"outdent"	: "outdent",
			"unformat"	: "removeFormat",
			"all"		: "selectAll",
			"s"			: "strikethrough",
			"sub"		: "subscript",
			"sup"		: "superscript",
			"u"			: "underline",
		}
		@fakeNative = {
			"background": "backColor",
			"a"			: "createLink",
			"font"		: "fontName",
			"fontSize"	: "fontSize",
			"color"		: "foreColor",
			"wrap"		: "formatBlock",
			"html"		: "insertHTML",
			"image"		: "insertImage",
			"text"		: "insertText",
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
				document.execCommand(@native[item])
			else
				promptText = prompt()
				document.execCommand(@fakeNative[item], false, promptText)
		else
			document.execCommand(item.command, false, item.value)
	
	isNative: (item) ->
		return true if (typeof item == 'string')
		return false

	isRealNative: (item) ->
		if item in @native
			return true
		else
			return false

new Rich()
