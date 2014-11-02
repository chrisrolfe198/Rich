var toolbar = require('../../toolbar.js');

toolbar.extend('undo', function() {
    window.Rich.contenteditable.call('undo');
}, ["fa-undo"], "Undo Changes");
