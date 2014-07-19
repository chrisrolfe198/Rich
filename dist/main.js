var RichToolbar;

RichToolbar = (function() {
  function RichToolbar() {
    this.config = RichConfig.toolbar;
    return this.build();
  }

  RichToolbar.prototype.build = function() {
    var item, itemHTML, toolbarArray, toolbarContainer, _i, _len;
    toolbarArray = this.config.split(/,/);
    toolbarContainer = document.createElement("div");
    toolbarContainer.classList.add("rich-toolbar");
    for (_i = 0, _len = toolbarArray.length; _i < _len; _i++) {
      item = toolbarArray[_i];
      itemHTML = document.createElement("div");
      itemHTML.classList.add(item, "rich-toolbar-item");
      itemHTML.innerHTML = item;
      toolbarContainer.appendChild(itemHTML);
    }
    return toolbarContainer;
  };

  return RichToolbar;

})();

var Rich;

Rich = (function() {
  function Rich() {
    var item, _i, _len, _ref;
    this.instances = document.querySelectorAll('.rich');
    this.toolbar = new RichToolbar;
    _ref = this.instances;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      this.initiate(item);
    }
    this.addListeners();
    this["native"] = {
      "b": {
        "command": "bold",
        "type": "native"
      },
      "hr": {
        "command": "insertHorizontalRule",
        "type": "native"
      },
      "indent": {
        "command": "indent",
        "type": "native"
      },
      "ol": {
        "command": "insertOrderedList",
        "type": "native"
      },
      "ul": {
        "command": "insertUnorderedList",
        "type": "native"
      },
      "i": {
        "command": "italic",
        "type": "native"
      },
      "middle": {
        "command": "justifyCenter",
        "type": "native"
      },
      "full": {
        "command": "justifyFull",
        "type": "native"
      },
      "left": {
        "command": "justifyLeft",
        "type": "native"
      },
      "right": {
        "command": "justifyRight",
        "type": "native"
      },
      "outdent": {
        "command": "outdent",
        "type": "native"
      },
      "unformat": {
        "command": "removeFormat",
        "type": "native"
      },
      "all": {
        "command": "selectAll",
        "type": "native"
      },
      "s": {
        "command": "strikethrough",
        "type": "native"
      },
      "sub": {
        "command": "subscript",
        "type": "native"
      },
      "sup": {
        "command": "superscript",
        "type": "native"
      },
      "u": {
        "command": "underline",
        "type": "native"
      }
    };
    this.fakeNative = {
      "background": {
        "command": "backColor",
        "type": "fakeNative",
        "prompt": "Enter a background color"
      },
      "link": {
        "command": "createLink",
        "type": "fakeNative",
        "prompt": "Enter the URL for the link (needs http://)"
      },
      "font": {
        "command": "fontName",
        "type": "fakeNative",
        "prompt": "Enter a font name"
      },
      "fontSize": {
        "command": "fontSize",
        "type": "fakeNative",
        "prompt": "Enter a font size (1-7)"
      },
      "color": {
        "command": "foreColor",
        "type": "fakeNative",
        "prompt": "Enter a foreground color"
      },
      "wrap": {
        "command": "formatBlock",
        "type": "fakeNative",
        "prompt": "Enter the html for format the block with"
      },
      "html": {
        "command": "insertHTML",
        "type": "fakeNative",
        "prompt": "Enter HTML"
      },
      "image": {
        "command": "insertImage",
        "type": "fakeNative",
        "prompt": "Enter an image URL"
      },
      "text": {
        "command": "insertText",
        "type": "fakeNative",
        "prompt": "Enter text"
      }
    };
  }

  Rich.prototype.initiate = function(item) {
    this.createContentEditableArea(item);
    item.insertAdjacentHTML('afterEnd', this.toolbar.outerHTML);
    item.style.display = 'none';
    return this.updateOriginalElement(item);
  };

  Rich.prototype.createContentEditableArea = function(item) {
    var div, itemEntities, itemHTML;
    div = document.createElement("div");
    div.setAttribute('contenteditable', 'true');
    div.classList.add('rich-textarea');
    itemEntities = item.innerHTML;
    itemHTML = itemEntities.replace(/&lt;/g, '<');
    itemHTML = itemHTML.replace(/&gt;/g, '>');
    div.innerHTML = itemHTML;
    return item.insertAdjacentHTML('afterEnd', div.outerHTML);
  };

  Rich.prototype.addListeners = function() {
    var form, forms, item, toolbarItems, _i, _j, _len, _len1, _results;
    toolbarItems = document.querySelectorAll('.rich-toolbar-item');
    for (_i = 0, _len = toolbarItems.length; _i < _len; _i++) {
      item = toolbarItems[_i];
      item.addEventListener('mousedown', (function(e) {
        var toolbarItem;
        toolbarItem = e.currentTarget;
        item = toolbarItem.classList[0];
        if (ToolbarItems[item]) {
          item = ToolbarItems[item];
        }
        return this.handleToolbarItemClick(item);
      }).bind(this));
    }
    forms = document.getElementsByTagName('form');
    _results = [];
    for (_j = 0, _len1 = forms.length; _j < _len1; _j++) {
      form = forms[_j];
      _results.push(form.addEventListener('submit', function(e) {
        var child, richText, textarea, _k, _l, _len2, _len3, _ref, _ref1;
        _ref = e.target.children;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          item = _ref[_k];
          if (!item.classList && !item.length) {
            break;
          }
          if (item.children.length) {
            _ref1 = item.children;
            for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
              child = _ref1[_l];
              if (child.classList.contains('rich')) {
                textarea = child;
              }
              if (child.classList.contains('rich-textarea')) {
                richText = child;
              }
            }
          }
          if (item.classList) {
            if (item.classList.contains('rich')) {
              textarea = item;
            }
            if (item.classList.contains('rich-textarea')) {
              richText = item;
            }
          }
        }
        return textarea.innerHTML = richText.innerHTML;
      }));
    }
    return _results;
  };

  Rich.prototype.updateOriginalElement = function(item) {
    var richTextarea, richToolbar;
    richToolbar = item.nextElementSibling;
    richTextarea = richToolbar.nextElementSibling;
    richToolbar.addEventListener("mouseup", this.listenerToUpdateOriginalElement);
    richTextarea.addEventListener("keyup", this.listenerToUpdateOriginalElement);
    return richTextarea.addEventListener("keypress", this.forceTagLineBreaks);
  };

  Rich.prototype.listenerToUpdateOriginalElement = function(e) {
    var originalElement, richTextarea;
    e.preventDefault();
    if (e.type === 'mouseup') {
      richTextarea = e.srcElement.parentNode.nextElementSibling;
      originalElement = e.srcElement.parentNode.previousElementSibling;
    } else if (e.type === 'keyup') {
      richTextarea = e.currentTarget;
      originalElement = e.currentTarget.previousElementSibling.previousElementSibling;
    }
    if (richTextarea && originalElement && originalElement.classList.contains('rich')) {
      return originalElement.innerHTML = richTextarea.innerHTML;
    }
  };

  Rich.prototype.forceTagLineBreaks = function(e) {
    if (e.keyCode === 13) {
      return document.execCommand('formatBlock', false, 'p');
    }
  };

  Rich.prototype.handleToolbarItemClick = function(item) {
    var promptText;
    if (this.isNative(item)) {
      if (this.isRealNative(item)) {
        return document.execCommand(this["native"][item].command);
      } else {
        promptText = prompt(this.fakeNative[item].prompt);
        return document.execCommand(this.fakeNative[item].command, false, promptText);
      }
    } else {
      return document.execCommand(item.command, false, item.value);
    }
  };

  Rich.prototype.isNative = function(item) {
    if (this["native"][item] || this.fakeNative[item]) {
      return true;
    }
    return false;
  };

  Rich.prototype.isRealNative = function(item) {
    if (this["native"][item]) {
      return true;
    }
    return false;
  };

  return Rich;

})();

new Rich();
