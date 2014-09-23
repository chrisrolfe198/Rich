function alertInput() {
}

alertInput.prototype.show = function(question) {
    this.response = prompt(question);
}

alertInput.prototype.get = function() {
    return this.response;
}

module.exports = new alertInput;
