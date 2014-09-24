var toolbar = require('../../toolbar.js');

toolbar.extend('copy', function() {
    try {
        window.Rich.contenteditable.call('copy');
    } catch (err) {
        alert('You need to enable browser copying to use this feature');
    }
}, ["glyphicon-share"]);
