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