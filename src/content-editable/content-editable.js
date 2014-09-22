function ContentEditable() {
	this.commands = [];
}

ContentEditable.prototype.call = function() {
	// Bold
}

ContentEditable.prototype.extend = function(name, callback) {
	this.commands[name] = callback;
}

module.exports = new ContentEditable;
