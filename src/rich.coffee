class Rich
	constructor: () ->
		@instances = document.querySelectorAll('.rich')
		@toolbar = new RichToolbar
		@initiate(item) for item in @instances
		@addListeners()

	initiate: (item) ->
		# Add the toolbar
		item.appendChild(@toolbar)
		@createContentEditableArea(item)
		# Replace any form fields with a content editable div and update the form? On submit?

	createContentEditableArea: (item) ->
		div = document.createElement("div")
		div.setAttribute('contenteditable', 'true')
		div.classList.add('rich-textarea')
		div.innerHTML = 'asdf'
		item.appendChild(div)
	
	addListeners: () ->
		toolbarItems = document.querySelectorAll('.rich-toolbar-item')
		for item in toolbarItems
			item.addEventListener('mousedown', (e) ->
				e.preventDefault()
				toolbarItem = e.currentTarget
				if item = ToolbarItems[toolbarItem.classList[0]]
					if typeof item == "string"
						document.execCommand(item)
					else
						document.execCommand(item.command, false, item.value)
			)

new Rich()
