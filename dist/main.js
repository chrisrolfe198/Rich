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
    toolbarContainer.classList.add("toolbar");
    for (_i = 0, _len = toolbarArray.length; _i < _len; _i++) {
      item = toolbarArray[_i];
      itemHTML = document.createElement("div");
      itemHTML.classList.add(item, "rich-toolbar-item");
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
  }

  Rich.prototype.initiate = function(item) {
    return item.appendChild(this.toolbar);
  };

  return Rich;

})();

new Rich();
