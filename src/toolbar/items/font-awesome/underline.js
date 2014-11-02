var toolbar = require('../../toolbar.js');

toolbar.extend('underline', function() {
    window.Rich.contenteditable.call('underline');
}, ["fa-underline"], "Underline text");
