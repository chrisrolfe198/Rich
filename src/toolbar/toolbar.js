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
