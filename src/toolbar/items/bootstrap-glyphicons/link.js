var toolbar = require('../../toolbar.js');

toolbar.extend('link', function(url) {

    if (!containsHttpOrHttps(url)) {
        url = "http://" + url;
    }

    window.Rich.contenteditable.call('createLink', url);
}, ["glyphicon-link"], "Link", true);

toolbar.extend('unlink', function() {
    window.Rich.contenteditable.call('unlink');
}, [], "Unlink");

function containsHttpOrHttps(str) {
    var tarea = str;
    if (tarea.indexOf("http://")==0 && tarea.indexOf("https://")==0) {
        return true;
    } else if (tarea[0] == '/') {
        return true;
    }
    return false;
}
