var toolbar = require('../../toolbar.js');

toolbar.extend('justify-center', function() {
    window.Rich.contenteditable.call('justifyCenter');
}, ["fa-align-center"], "Center Text");

toolbar.extend('justify-full', function() {
    window.Rich.contenteditable.call('justifyFull');
}, ["fa-align-justify"], "Justify Text");

toolbar.extend('justify-left', function() {
    window.Rich.contenteditable.call('justifyLeft');
}, ["fa-align-left"], "Align Text Left");

toolbar.extend('justify-right', function() {
    window.Rich.contenteditable.call('justifyRight');
}, ["fa-align-right"], "Align Text Right");
