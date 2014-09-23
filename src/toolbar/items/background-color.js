var toolbar = require('../toolbar.js');

toolbar.extend('background-colour', function() {
    window.Rich.contenteditable.call('backColor', null, '#ccc');
}, ["glyphicon", "glyphicon-bold"]);
