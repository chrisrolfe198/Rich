var toolbar = require('../toolbar.js');

toolbar.extend('background-colour', function(color) {
    window.Rich.contenteditable.call('backColor', color);
}, ["btn", "btn-default", "glyphicon", "glyphicon-bold"], true);
