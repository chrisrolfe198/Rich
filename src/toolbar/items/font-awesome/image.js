var toolbar = require('../../toolbar.js');

toolbar.extend('image', function(image) {
    window.Rich.contenteditable.call('insertImage', image);
}, ["fa-file-image-o"], "Add Image", true);
