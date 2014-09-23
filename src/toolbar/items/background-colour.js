var toolbar = require('../toolbar.js');

toolbar.extend('background-colour', function(color) {
    window.Rich.contenteditable.call('backColor', null, color);
}, ["glyphicon", "glyphicon-bold"], true);
