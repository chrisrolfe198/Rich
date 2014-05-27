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
		item.appendChild(div)
	
	addListeners: () ->
		toolbarItems = document.querySelectorAll('.rich-toolbar-item')
		for item in toolbarItems
			item.addEventListener('click', (e) ->
				toolbarItem = e.currentTarget
				toolbarItem.parentNode.nextSibling.focus()
				switch toolbarItem.classList[0]
					when "u" then document.execCommand('underline', false, null)
			)

new Rich()
