Rich = window.Rich || {};

Rich.config = {
	toolbars: {
		default: ["bold"]
	}
}

window.Rich.toolbar.extend('bold', function() {
	window.Rich.contenteditable.call('bold');
}, ["octicon", "octicon-globe"]);

window.Rich.editor.init();