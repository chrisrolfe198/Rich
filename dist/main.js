(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var editable = require('../content-editable.js');

editable.extend('bold', function() {
	document.execCommand('bold');
})
},{"../content-editable.js":2}],2:[function(require,module,exports){
function ContentEditable() {
	this.commands = [];
}

ContentEditable.prototype.call = function() {
	// Bold
}

ContentEditable.prototype.extend = function(name, callback) {
	this.commands[name] = callback;
	console.log(this.commands);
}

module.exports = new ContentEditable;
},{}],3:[function(require,module,exports){
require('./commands/bold.js');

},{"./commands/bold.js":1}],4:[function(require,module,exports){
var contentEditable = require('./content-editable/content-editable.js');
var loader = require('./content-editable/loader.js');

window.Rich = contentEditable;
},{"./content-editable/content-editable.js":2,"./content-editable/loader.js":3}]},{},[4])