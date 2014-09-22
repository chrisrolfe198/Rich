(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/commands/bold.js":[function(require,module,exports){
var editable = require('../content-editable.js');

editable.extend('bold', function() {
	document.execCommand('bold');
});

},{"../content-editable.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js":[function(require,module,exports){
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

},{}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/loader.js":[function(require,module,exports){
require('./commands/bold.js');

},{"./commands/bold.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/commands/bold.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/main.js":[function(require,module,exports){
var contentEditable = require('./content-editable/content-editable.js');
var loader = require('./content-editable/loader.js');

var toolbar = require('./toolbar/toolbar.js');

window.Rich = {
    contenteditable: contentEditable,
    toolbar: toolbar
}

},{"./content-editable/content-editable.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js","./content-editable/loader.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/loader.js","./toolbar/toolbar.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js"}],"/home/chris/Public/Web/autovhosts/projects/Rich/src/toolbar/toolbar.js":[function(require,module,exports){
var contenteditable = require('../content-editable/content-editable.js');

function toolbar() {
    this.items = [];
}

toolbar.prototype.call = function(name) {
    if (name in this.items) {
        this.items[name]();
    } else {
        contenteditable.call(name);
    }
}

toolbar.prototype.extend = function(name, callback) {
    this.items[name] = callback;
}

module.exports = new toolbar;

},{"../content-editable/content-editable.js":"/home/chris/Public/Web/autovhosts/projects/Rich/src/content-editable/content-editable.js"}]},{},["/home/chris/Public/Web/autovhosts/projects/Rich/src/main.js"]);
