if ("document" in self && !("classList" in document.createElement("_"))) {
    require('./polyfills/classlist.min.js')
}

var contentEditable = require('./content-editable/content-editable.js');
var contenteditableLoader = require('./content-editable/loader.js');
var toolbar = require('./toolbar/toolbar.js');
var toolbarLoader = require('./toolbar/loader.js');

window.Rich = window.Rich || {};
window.Rich.contenteditable = contentEditable;
window.Rich.toolbar = toolbar;
window.Rich.editor = require('./editor.js');
