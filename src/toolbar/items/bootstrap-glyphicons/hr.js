var toolbar = require('../../toolbar.js');

toolbar.extend('hr', function() {
    window.Rich.contenteditable.call('insertHorizontalRule');
}, [], "HR");
