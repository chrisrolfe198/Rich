var toolbar = require('../toolbar.js');

toolbar.extend('bold', function() {
    window.Rich.contenteditable.call('bold');
}, ["btn", "btn-default", "glyphicon", "glyphicon-bold"]);