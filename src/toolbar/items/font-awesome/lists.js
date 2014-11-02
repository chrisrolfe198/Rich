var toolbar = require('../../toolbar.js');

toolbar.extend('ol', function() {
    window.Rich.contenteditable.call('insertOrderedList');
}, ["fa-list-ol"], "Add Numbered List");

toolbar.extend('ul', function() {
    window.Rich.contenteditable.call('insertUnorderedList');
}, ["fa-list-ul"], "Add Bullet List");
