var toolbar = require('../../toolbar.js');

toolbar.extend('redo', function() {
    window.Rich.contenteditable.call('redo');
}, ["fa-repeat"], "Redo Changes");
