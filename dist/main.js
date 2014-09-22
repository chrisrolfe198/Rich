(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/data/Rich/src/config.js":[function(require,module,exports){
function config() {
	if (!window.Rich || !window.Rich.config) { throw "No configuration found for Rich" }
	this.config = window.Rich.config;
}

config.prototype.getToolbar = function(name) {
	if (this.config.toolbars[name] == undefined) {
		return this.config.toolbars.default;
	}
	return this.config.toolbars[name];
}

module.exports = config;
},{}],"/data/Rich/src/content-editable/commands/bold.js":[function(require,module,exports){
var editable = require('../content-editable.js');

editable.extend('bold', function() {
	document.execCommand('bold');
});

},{"../content-editable.js":"/data/Rich/src/content-editable/content-editable.js"}],"/data/Rich/src/content-editable/content-editable.js":[function(require,module,exports){
function ContentEditable() {
	this.commands = [];
}

ContentEditable.prototype.call = function(name) {
	if (name in this.commands) {
		this.commands[name]();
	} else {
		throw "The content editable command "+name+" doesn't exist";
	}
}

ContentEditable.prototype.extend = function(name, callback) {
	this.commands[name] = callback;
}

module.exports = new ContentEditable;

},{}],"/data/Rich/src/content-editable/loader.js":[function(require,module,exports){
require('./commands/bold.js');

},{"./commands/bold.js":"/data/Rich/src/content-editable/commands/bold.js"}],"/data/Rich/src/editor.js":[function(require,module,exports){
var config = require('./config.js');

function editor() {
    // Load up the rich text areas
    this.areas = document.querySelectorAll('.rich');
}

editor.prototype.init = function() {
    if (!this.initialised) {
        this.config = new config;
        this.initialised = true;

        for (i = 0; i < this.areas.length; i++) {
            this.initialise(this.areas[i]);
        }
    }
};

editor.prototype.initialise = function(area) {
    this.createDiv(area);
    this.attachListener(area);
    this.createToolbar(area);
}

editor.prototype.createToolbar = function(area) {
    var toolbarName = area.dataset.toolbar;
    var toolbar = window.Rich.toolbar.createToolbar(this.config.getToolbar(toolbarName));
    this.insertAfter(toolbar, area);
}

editor.prototype.createDiv = function(appender) {
    var div = document.createElement('div');
    div.classList.add('rich-textarea');

    div.setAttribute('contenteditable', true);

    this.insertAfter(div, appender);
}

editor.prototype.attachListener = function(area) {
    area.nextSibling.addEventListener('keyup', this.updateOriginalElement);
}

editor.prototype.updateOriginalElement = function(e) {
    var rich = e.currentTarget;
    var textarea = rich.previousSibling.previousSibling;

    textarea.innerHTML = rich.innerHTML;
}

// Adapted from http://stackoverflow.com/a/4793630/2483088
editor.prototype.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

module.exports = new editor;

},{"./config.js":"/data/Rich/src/config.js"}],"/data/Rich/src/main.js":[function(require,module,exports){
var contentEditable = require('./content-editable/content-editable.js');
var loader = require('./content-editable/loader.js');
var toolbar = require('./toolbar/toolbar.js');

window.Rich = window.Rich || {};
window.Rich.contenteditable = contentEditable;
window.Rich.toolbar = toolbar;
window.Rich.editor = require('./editor.js');
},{"./content-editable/content-editable.js":"/data/Rich/src/content-editable/content-editable.js","./content-editable/loader.js":"/data/Rich/src/content-editable/loader.js","./editor.js":"/data/Rich/src/editor.js","./toolbar/toolbar.js":"/data/Rich/src/toolbar/toolbar.js"}],"/data/Rich/src/toolbar/toolbar.js":[function(require,module,exports){
var contenteditable = require('../content-editable/content-editable.js');

function toolbar() {
    this.items = [];
}

toolbar.prototype.call = function(name) {
    if (name in this.items) {
        this.items[name].callback();
    } else {
        contenteditable.call(name);
    }
}

toolbar.prototype.extend = function(name, callback, classes) {
	classes.push('rich-toolbar-item');
	this.items[name] = {
		callback: callback,
		classes: classes
	};
}

toolbar.prototype.generate = function(name) {
	if (this.items[name] == undefined) { throw "Toolbar item not found"; }
	var item = document.createElement('div');

	this.items[name].classes.forEach(function(className, index) {
		item.classList.add(className);
	});

	return item;
}

toolbar.prototype.createToolbar = function(items) {
	var self = this;

	var toolbarHTML = document.createElement('div');
	toolbarHTML.classList.add('rich-toolbar');
	toolbarHTML.innerHTML = '';

	items.forEach(function(name, index) {
		// Event listener for toolbar item
		toolbarHTML.appendChild(self.generate(name));
	});

	return toolbarHTML;
}

module.exports = new toolbar;

},{"../content-editable/content-editable.js":"/data/Rich/src/content-editable/content-editable.js"}]},{},["/data/Rich/src/main.js"]);
