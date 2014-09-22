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
