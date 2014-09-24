var toolbar = require('../../toolbar.js');

toolbar.extend('background-colour', function(color) {
    window.Rich.contenteditable.call('backColor', color);
}, ["glyphicon-bold"], true);
