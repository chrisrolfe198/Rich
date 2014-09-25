var toolbar = require('../../toolbar.js');

toolbar.extend('unformat', function() {
    window.Rich.contenteditable.call('removeFormat');
}, [], "Remove Styling");
