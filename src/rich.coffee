class Rich
	constructor: () ->
		@instances = document.querySelectorAll('.rich')
		@toolbar = new RichToolbar
		@initiate(item) for item in @instances

	initiate: (item) ->
		# Add the toolbar
		item.appendChild(@toolbar)
		# Replace any form fields with a content editable div and update the form? On submit?


new Rich()
