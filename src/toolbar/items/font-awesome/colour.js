var toolbar = require('../../toolbar.js');

toolbar.extend('colour', function(colour) {
    window.Rich.contenteditable.call('foreColor', colour);
}, [], "Colour", true);
