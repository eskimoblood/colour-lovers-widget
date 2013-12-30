(function($) {
  $.fn.colourLovers = function(options) {
    var type = options.type || 'style-1'
    var input = $(this).wrap('<div class="colour-lovers ' + type + '"> </div>');
    var list = $('<ul></ul>')
      .insertAfter(input)
      .hide();
    var spinner = $('<li class="spinner"> <div class="double-bounce1"/><div class="double-bounce2"/></li>').appendTo(list);
    var colors;
    list.on('click', 'li', onSelect);
    input.on('input', initSearch);
    input.on('focus', showList);
    input.on('blur', function() {
      setTimeout(function functionName() {
        list.hide()
      }, 100)
    });

    var timeout;

    function initSearch() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(startSearch, 500);
    }

    function startSearch() {
      list.show();
      list.children().not(spinner).remove();
      spinner.show();
      var search = getSearchTerm(input.val());
      $.ajax({
        url: 'http://www.colourlovers.com/api/palettes?format=json&jsonCallback=callback&' + search,
        dataType: "jsonp",
        jsonpCallback: 'callback'
      })
        .done(renderPallets);

      function renderPallets(response) {
        spinner.hide();
        colors = [];
        var html = response.reduce(createPalette, '');
        list.append(html);
      }

      function createPalette(r, item) {
        colors.push(item.colors);
        return r + '<li class="palette">' + item.colors.reduce(createPaletteItem, '') + '</li>'
      }

      function createPaletteItem(r, color) {
        return r + '<span style="background: #' + color + '"></span>';
      }

      function getSearchTerm(value) {
        if (value.charAt(0) === '#') {
          return 'hex=' + value.replace(/ *#/g, ',').replace(/^,/, '');
        } else {
          return 'keywords=' + value.replace(/^ */, '').replace(/ +/g, '+');
        }
      }
    }

    function showList() {
      if (list.children().length > 1) {
        list.show();
      }
    }

    function onSelect(event) {
      var target = event.currentTarget;
      var index = list.find('li').index(target);
      list.hide();
      options.onSelect(colors[index - 1]);
    }
  };
})(window.jQuery || window.Zepto || window.$);