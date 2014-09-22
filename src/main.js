var contentEditable = require('./content-editable/content-editable.js');
var loader = require('./content-editable/loader.js');
var toolbar = require('./toolbar/toolbar.js');

window.Rich = window.Rich || {};
window.Rich.contenteditable = contentEditable;
window.Rich.toolbar = toolbar;
window.Rich.editor = require('./editor.js');