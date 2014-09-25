var toolbar = require('../../toolbar.js');

toolbar.extend('ol', function() {
    window.Rich.contenteditable.call('insertOrderedList');
}, [], "Numbered List");

toolbar.extend('ul', function() {
    window.Rich.contenteditable.call('insertUnorderedList');
}, ["glyphicon-list"], "Bullet List");
