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

	items.forEach(function(name, index) {
		// Event listener for toolbar item
		toolbarHTML.appendChild(self.generate(name));
	});

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
    window.Rich.editor.sync(e.currentTarget.parentElement.nextSibling);
}

module.exports = new toolbar;
