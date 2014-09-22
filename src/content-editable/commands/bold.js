var editable = require('../content-editable.js');

editable.extend('bold', function() {
	document.execCommand('bold');
});
