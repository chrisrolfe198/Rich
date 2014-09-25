var toolbar = require('../../toolbar.js');

toolbar.extend('image', function(image) {
    window.Rich.contenteditable.call('insertImage', image);
}, ["glyphicon-file"], "Add Image", true);
