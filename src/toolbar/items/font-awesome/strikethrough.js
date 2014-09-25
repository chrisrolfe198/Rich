var toolbar = require('../../toolbar.js');

toolbar.extend('strikethrough', function() {
    window.Rich.contenteditable.call('strikeThrough');
}, ["fa-strikethrough"], "Strike through text");
