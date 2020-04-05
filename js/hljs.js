$('.article pre code').each(function(i, block) {
    var ds = $(this).parent().prev(code_caption_selector).data();
    var texts = $(this).text().split('n');
    if (ds.trim_indent === 'frontend') {
      console.log("trim indent in front-end");
      var tab = texts[0].match(/^s{0,}/);
      if (tab) {
        var arr = [];
        texts.forEach(function(temp) {
          arr.push(temp.replace(tab, ''));
        });
        $(this).text(arr.join('n'));
      }
    }
  
    if (ds.line_number === 'frontend') {
      console.log("show line number in front-end");
      var lines = texts.length - 1;
      var $numbering = $('<ul/>').addClass('pre-numbering');
      $(this).addClass('has-numbering').parent().append($numbering);
      for (i = 1; i <= lines; i++) {
        $numbering.append($('<li/>').text(i));
      }
    }
  
    hljs.highlightBlock(block);
  });