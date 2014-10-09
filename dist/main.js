(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
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
    var toolbarName = area.getAttribute('data-toolbar');
    var toolbar = window.Rich.toolbar.createToolbar(this.config.getToolbar(toolbarName));
    this.insertAfter(toolbar, area);
}

editor.prototype.createDiv = function(appender) {
    var div = document.createElement('div');
    div.classList.add('rich-textarea');

    div.setAttribute('contenteditable', true);
    var classes = appender.getAttribute('data-editor-classes').split(' ');

    for(var i = 0; i < classes.length; i++) {
        div.classList.add(classes[i]);
    }

    if (appender.innerHTML) {
        appenderEntities = appender.innerHTML;
        appenderHTML = appenderEntities.replace(/&lt;/g, '<');
        appenderHTML = appenderHTML.replace(/&gt;/g, '>');
        div.insertAdjacentHTML('afterbegin', appenderHTML);
    } else {
        var br = document.createElement('br');
        var para = document.createElement('p');
        para.appendChild(br);
        div.appendChild(para);
    }

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

},{"./config.js":1,"./input/alert.js":6}],5:[function(require,module,exports){
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

},{"./content-editable/content-editable.js":2,"./content-editable/loader.js":3,"./editor.js":4,"./polyfills/classlist.min.js":7,"./toolbar/loader.js":25,"./toolbar/toolbar.js":26}],6:[function(require,module,exports){
function alertInput() {
}

alertInput.prototype.show = function(question) {
    this.response = prompt(question);
}

alertInput.prototype.get = function() {
    return this.response;
}

module.exports = new alertInput;

},{}],7:[function(require,module,exports){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

},{}],8:[function(require,module,exports){
require('./items/font-awesome/bold.js');
require('./items/font-awesome/italic.js');
require('./items/font-awesome/background-colour.js');
require('./items/font-awesome/copy.js');
require('./items/font-awesome/link.js');
require('./items/font-awesome/colour.js');
require('./items/font-awesome/cut.js');
require('./items/font-awesome/hr.js');
require('./items/font-awesome/image.js');
require('./items/font-awesome/justify.js');
require('./items/font-awesome/lists.js');
require('./items/font-awesome/redo.js');
require('./items/font-awesome/undo.js');
require('./items/font-awesome/strikethrough.js');
require('./items/font-awesome/underline.js');
require('./items/font-awesome/unformat.js');

},{"./items/font-awesome/background-colour.js":9,"./items/font-awesome/bold.js":10,"./items/font-awesome/colour.js":11,"./items/font-awesome/copy.js":12,"./items/font-awesome/cut.js":13,"./items/font-awesome/hr.js":14,"./items/font-awesome/image.js":15,"./items/font-awesome/italic.js":16,"./items/font-awesome/justify.js":17,"./items/font-awesome/link.js":18,"./items/font-awesome/lists.js":19,"./items/font-awesome/redo.js":20,"./items/font-awesome/strikethrough.js":21,"./items/font-awesome/underline.js":22,"./items/font-awesome/undo.js":23,"./items/font-awesome/unformat.js":24}],9:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('background-colour', function(color) {
    window.Rich.contenteditable.call('backColor', color);
}, [], 'Background Colour', true);

},{"../../toolbar.js":26}],10:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('bold', function() {
    window.Rich.contenteditable.call('bold');
}, ["fa-bold"], 'bold');

},{"../../toolbar.js":26}],11:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('colour', function(colour) {
    window.Rich.contenteditable.call('foreColor', colour);
}, [], "Colour", true);

},{"../../toolbar.js":26}],12:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('copy', function() {
    try {
        window.Rich.contenteditable.call('copy');
    } catch (err) {
        alert('You need to enable browser copying to use this feature');
    }
}, ["fa-copy"], "Copy");

},{"../../toolbar.js":26}],13:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('cut', function() {
    try {
        window.Rich.contenteditable.call('cut');
    } catch (err) {
        alert('You need to enable browser cutting to use this feature');
    }
}, ["fa-scissors"], "Cut");

},{"../../toolbar.js":26}],14:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('hr', function() {
    window.Rich.contenteditable.call('insertHorizontalRule');
}, [], "HR");

},{"../../toolbar.js":26}],15:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('image', function(image) {
    window.Rich.contenteditable.call('insertImage', image);
}, ["fa-file-image-o"], "Add Image", true);

},{"../../toolbar.js":26}],16:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('italic', function() {
    window.Rich.contenteditable.call('italic');
}, ["fa-italic"], "Italics");

},{"../../toolbar.js":26}],17:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('justify-center', function() {
    window.Rich.contenteditable.call('justifyCenter');
}, ["fa-align-center"], "Center Text");

toolbar.extend('justify-full', function() {
    window.Rich.contenteditable.call('justifyFull');
}, ["fa-align-justify"], "Justify Text");

toolbar.extend('justify-left', function() {
    window.Rich.contenteditable.call('justifyLeft');
}, ["fa-align-left"], "Align Text Left");

toolbar.extend('justify-right', function() {
    window.Rich.contenteditable.call('justifyRight');
}, ["fa-align-right"], "Align Text Right");

},{"../../toolbar.js":26}],18:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('link', function(url) {

    if (!containsHttpOrHttps(url)) {
        url = "http://" + url;
    }

    window.Rich.contenteditable.call('createLink', url);
}, ["fa-link"], "Link", true);

toolbar.extend('unlink', function() {
    window.Rich.contenteditable.call('unlink');
}, ["fa-unlink"], "Unlink");

function containsHttpOrHttps(str) {
    var tarea = str;
    if (tarea.indexOf("http://")==0 && tarea.indexOf("https://")==0) {
        return true;
    } else if (tarea[0] == '/') {
        return true;
    }
    return false;
}

},{"../../toolbar.js":26}],19:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('ol', function() {
    window.Rich.contenteditable.call('insertOrderedList');
}, ["fa-list-ol"], "Add Numbered List");

toolbar.extend('ul', function() {
    window.Rich.contenteditable.call('insertUnorderedList');
}, ["fa-list-ul"], "Add Bullet List");

},{"../../toolbar.js":26}],20:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('redo', function() {
    window.Rich.contenteditable.call('redo');
}, ["fa-repeat"], "Redo Changes");

},{"../../toolbar.js":26}],21:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('strikethrough', function() {
    window.Rich.contenteditable.call('strikeThrough');
}, ["fa-strikethrough"], "Strike through text");

},{"../../toolbar.js":26}],22:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('underline', function() {
    window.Rich.contenteditable.call('underline');
}, ["fa-underline"], "Underline text");

},{"../../toolbar.js":26}],23:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('undo', function() {
    window.Rich.contenteditable.call('undo');
}, ["fa-undo"], "Undo Changes");

},{"../../toolbar.js":26}],24:[function(require,module,exports){
var toolbar = require('../../toolbar.js');

toolbar.extend('unformat', function() {
    window.Rich.contenteditable.call('removeFormat');
}, [], "Remove Styling");

},{"../../toolbar.js":26}],25:[function(require,module,exports){
require('./fa-loader.js');

},{"./fa-loader.js":8}],26:[function(require,module,exports){
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

toolbar.prototype.extend = function(name, callback, classes, text, input) {
    if (input == undefined) {
        input = false;
    }
	this.items[name] = {
		callback: callback,
		classes: classes,
        text: text,
        input: input
	};
}

toolbar.prototype.generate = function(name) {
	if (this.items[name] == undefined) { throw "Toolbar "+name+" not found"; }
	var item = document.createElement('div');
    item.setAttribute('data-item-name', name);
    item.setAttribute('data-input', this.items[name].input);

    if (!this.items[name].classes.length) {
        var classes = window.Rich.config.classes;
        item.innerHTML = this.items[name].text;
        item.classList.add('rich-toolbar-item');
    } else {
        var classes = window.Rich.config.classes.concat(this.items[name].classes).concat(['rich-toolbar-item']);
        item.setAttribute('title', this.items[name].text);
    }

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

    if (items[0] instanceof Array) {
        items.forEach(function(groupItems, index) {
            var groupContainer = document.createElement('div');
            groupContainer.classList.add('rich-toolbar-group');
            var groupClasses = window.Rich.config.groupClasses

            groupClasses.forEach(function(name, index) {
                groupContainer.classList.add(name);
            });

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
    var name = e.currentTarget.getAttribute('data-item-name');

    if (e.currentTarget.getAttribute('data-input') == "true") {
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

},{"../content-editable/content-editable.js":2}]},{},[5])