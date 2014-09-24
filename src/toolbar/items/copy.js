var toolbar = require('../toolbar.js');

toolbar.extend('copy', function() {
    window.Rich.contenteditable.call('copy');
}, ["glyphicon", "glyphicon-share"]);
