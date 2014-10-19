var toolbar = require('../../toolbar.js');

toolbar.extend('justify-center', function() {
    window.Rich.contenteditable.call('justifyCenter');
}, ["glyphicon-align-center"], "Center Text");

toolbar.extend('justify-full', function() {
    window.Rich.contenteditable.call('justifyFull');
}, ["glyphicon-align-justify"], "Justify Text");

toolbar.extend('justify-left', function() {
    window.Rich.contenteditable.call('justifyLeft');
}, ["glyphicon-align-left"], "Align Text Left");

toolbar.extend('justify-right', function() {
    window.Rich.contenteditable.call('justifyRight');
}, ["glyphicon-align-right"], "Align Text Right");
