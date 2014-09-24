var toolbar = require('../toolbar.js');

toolbar.extend('background-colour', function(color) {
    console.log('Colour is: ');
    window.Rich.contenteditable.call('backColor', color);
}, ["glyphicon", "glyphicon-bold"], true);
