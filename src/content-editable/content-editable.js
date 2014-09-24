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
