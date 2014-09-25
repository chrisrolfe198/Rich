(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/chris/Public/Web/autovhosts/projects/Rich/src/config.js":[function(require,module,exports){
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

config.prototype.getClasses = function() {
	return this.config.classes;
}

module.exports = config;

},{}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js":[function(require,module,exports){
function ContentEditable() {
	this.commands = [];
}

ContentEditable.prototype.call = function(name, args) {
	if (name in this.commands) {
		this.commands[name]();
	} else {
		if (document.execCommand(name, null, args)) {
			return true;
		}
		throw "The content editable command "+name+" doesn't exist";
	}
}

ContentEditable.prototype.extend = function(name, callback) {
	this.commands[name] = callback;
}

module.exports = new ContentEditable;

},{}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/loader.js":[function(require,module,exports){

},{}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/editor.js":[function(require,module,exports){
var config = require('./config.js');

function editor() {
    this.areas = document.querySelectorAll('.rich');
}

editor.prototype.init = function() {
    if (!this.initialised) {
        this.config = new config;
        this.initialised = true;

        if (this.config.input && this.config.input in ["alert", "html"]) {
            this.input = this.config.input;
        } else {
            this.input = require("./input/alert.js");
        }

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

    var br = document.createElement('br');
    var para = document.createElement('p');
    para.appendChild(br);
    div.appendChild(para);

    this.insertAfter(div, appender);
}

editor.prototype.attachListener = function(area) {
    var self = this;
    area.nextSibling.addEventListener('keyup', function(e) {
        self.sync(e.currentTarget);
    });
}

// Adapted from http://stackoverflow.com/a/4793630/2483088
editor.prototype.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

editor.prototype.sync = function(area) {
    var original = area.previousSibling.previousSibling;

    original.innerHTML = area.innerHTML;
}

module.exports = new editor;

},{"./config.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/config.js","./input/alert.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/input/alert.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/input/alert.js":[function(require,module,exports){
function alertInput() {
}

alertInput.prototype.show = function(question) {
    this.response = prompt(question);
}

alertInput.prototype.get = function() {
    return this.response;
}

module.exports = new alertInput;

},{}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/main.js":[function(require,module,exports){
var contentEditable = require('./content-editable/content-editable.js');
var contenteditableLoader = require('./content-editable/loader.js');
var toolbar = require('./toolbar/toolbar.js');
var toolbarLoader = require('./toolbar/loader.js');

window.Rich = window.Rich || {};
window.Rich.contenteditable = contentEditable;
window.Rich.toolbar = toolbar;
window.Rich.editor = require('./editor.js');

},{"./content-editable/content-editable.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js","./content-editable/loader.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/loader.js","./editor.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/editor.js","./toolbar/loader.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/loader.js","./toolbar/toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/fa-loader.js":[function(require,module,exports){
require('./items/font-awesome/bold.js');
require('./items/font-awesome/italic.js');
require('./items/font-awesome/background-colour.js');
require('./items/font-awesome/copy.js');
require('./items/font-awesome/link.js');

},{"./items/font-awesome/background-colour.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/background-colour.js","./items/font-awesome/bold.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/bold.js","./items/font-awesome/copy.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/copy.js","./items/font-awesome/italic.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/italic.js","./items/font-awesome/link.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/link.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/background-colour.js":[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('background-colour', function(color) {
    window.Rich.contenteditable.call('backColor', color);
}, ["fa-link"], true);

},{"../../toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/bold.js":[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('bold', function() {
    window.Rich.contenteditable.call('bold');
}, ["fa-bold"]);

},{"../../toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/copy.js":[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('copy', function() {
    try {
        window.Rich.contenteditable.call('copy');
    } catch (err) {
        alert('You need to enable browser copying to use this feature');
    }
}, ["fa-copy"]);

},{"../../toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/italic.js":[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('italic', function() {
    window.Rich.contenteditable.call('italic');
}, ["fa-italic"]);

},{"../../toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/items/font-awesome/link.js":[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('link', function(url) {

    if (!containsHttpOrHttps(url)) {
        url = "http://" + url;
    }

    window.Rich.contenteditable.call('createLink', url);
}, ["fa-link"], true);

function containsHttpOrHttps(str) {
    var tarea = str;
    if (tarea.indexOf("http://")==0 && tarea.indexOf("https://")==0) {
        return true;
    } else if (tarea[0] == '/') {
        return true;
    }
    return false;
}

},{"../../toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/loader.js":[function(require,module,exports){
require('./fa-loader.js');

},{"./fa-loader.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/fa-loader.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js":[function(require,module,exports){
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

toolbar.prototype.extend = function(name, callback, classes, input) {
	classes.push('rich-toolbar-item');
    if (input == undefined) {
        input = false;
    }
	this.items[name] = {
		callback: callback,
		classes: classes,
        input: input
	};
}

toolbar.prototype.generate = function(name) {
	if (this.items[name] == undefined) { throw "Toolbar item not found"; }
	var item = document.createElement('div');
    item.dataset.itemName = name;
    item.dataset.input = this.items[name].input;

    var classes = window.Rich.config.classes.concat(this.items[name].classes);

	classes.forEach(function(className, index) {
        if (!item.classList.contains(className)) {
	          item.classList.add(className);
          }
	});

    item.addEventListener('mousedown', this.handleToolbarItemClick);

	return item;
}

toolbar.prototype.createToolbar = function(items) {
	var self = this;

	var toolbarHTML = document.createElement('div');
	toolbarHTML.classList.add('rich-toolbar');
	toolbarHTML.innerHTML = '';

    if (items instanceof Array) {
        items.forEach(function(groupItems, index) {
            var groupContainer = document.createElement('div');
            groupContainer.classList.add('rich-toolbar-group');

            groupItems.forEach(function(name, index) {
                groupContainer.appendChild(self.generate(name));
            });

            toolbarHTML.appendChild(groupContainer);
        });
    } else {
    	items.forEach(function(name, index) {
    		// Event listener for toolbar item
    		toolbarHTML.appendChild(self.generate(name));
    	});
    }

	return toolbarHTML;
}

toolbar.prototype.handleToolbarItemClick = function(e) {
    e.preventDefault();
    var name = e.currentTarget.dataset.itemName;

    if (e.currentTarget.dataset.input == "true") {
        window.Rich.editor.input.show("Please enter a value for "+name);
        var value = window.Rich.editor.input.get();
        Rich.toolbar.items[name].callback(value);
    } else {
        Rich.toolbar.items[name].callback();
    }

    // Toolbar groups need to go up another level
    if (e.currentTarget.parentElement.classList.contains('rich-toolbar-group')) {
        window.Rich.editor.sync(e.currentTarget.parentElement.parentElement.nextSibling);
    } else {
        window.Rich.editor.sync(e.currentTarget.parentElement.nextSibling);
    }

}

module.exports = new toolbar;

},{"../content-editable/content-editable.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js"}]},{},["/home/chris/Public/Web/autovhosts/projects/Rich/src/main.js"]);
