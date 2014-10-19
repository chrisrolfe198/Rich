var toolbar = require('../../toolbar.js');

toolbar.extend('strikethrough', function() {
    window.Rich.contenteditable.call('strikeThrough');
}, [], "Strike through text");
