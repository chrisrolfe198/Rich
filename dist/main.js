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
      toolbarContainer.appendChild(itemHTML);
    }
    return toolbarContainer;
  };

  return RichToolbar;

})();
