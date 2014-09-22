function editor() {
    // Load up the rich text areas
    var areas = document.querySelectorAll('.rich');

    for (i = 0; i < areas.length; i++) {
        this.initialise(areas[i]);
    }
}

editor.prototype.initialise = function(area) {
    this.createDiv(area);
    this.attachListener(area);
}

editor.prototype.createDiv = function(appender) {
    var div = document.createElement('div');
    div.classList.add('rich-textarea');

    div.setAttribute('contenteditable', true);

    this.insertAfter(div, appender);
}

editor.prototype.attachListener = function(area) {
    area.nextSibling.addEventListener('keyup', this.updateOriginalElement);
}

editor.prototype.updateOriginalElement = function(e) {
    var rich = e.currentTarget;
    var textarea = rich.previousSibling;

    textarea.innerHTML = rich.innerHTML;
}

// Adapted from http://stackoverflow.com/a/4793630/2483088
editor.prototype.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

module.exports = new editor;
