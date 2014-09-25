var toolbar = require('../../toolbar.js');

toolbar.extend('cut', function() {
    try {
        window.Rich.contenteditable.call('cut');
    } catch (err) {
        alert('You need to enable browser cutting to use this feature');
    }
}, [], "Cut");
