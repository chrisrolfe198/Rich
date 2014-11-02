Rich = window.Rich || {};

Rich.config = {
	toolbars: {
		default: [["bold", "italic", "underline", "strikethrough", "hr"], ["link", "unlink", "image"], ["cut", "copy"], ["undo", "redo", "unformat"], ["background-colour", "colour"], ["justify-left", "justify-center", "justify-full", "justify-right"]],
		foobar: ["bold", "italic"]
	},
	classes : ["btn", "btn-default", "fa"],
	groupClasses: ["btn-group"]
}

window.Rich.editor.init();
