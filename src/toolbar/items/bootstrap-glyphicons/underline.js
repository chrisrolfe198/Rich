var toolbar = require('../../toolbar.js');

toolbar.extend('underline', function() {
    window.Rich.contenteditable.call('underline');
}, [], "Underline text");
