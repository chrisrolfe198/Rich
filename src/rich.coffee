class Rich
	native = ["backColor", "bold", "insertHorizontalRule","indent", "insertOrderedList", "insertUnorderedList", "italic", "justifyCenter", "justifyFull", "justifyLeft", "justifyRight", "outdent", "paste", "redo", "removeFormat", "selectAll", "strikethrough", "subscript", "superscript", "underline", "undo", "unlink"],

	constructor: () ->
		@instances = document.querySelectorAll('.rich')
		@toolbar = new RichToolbar
		@initiate(item) for item in @instances
		@addListeners()

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
				if item = ToolbarItems[toolbarItem.classList[0]]
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
			console.log('native')
		else
			console.log('Fake!')
	
	isNative: (item) ->
		return true if (typeof item == 'string')
		return false

	isRealNative: () ->


new Rich()
