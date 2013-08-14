(function () {
  var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1],
      title = $('h1 span:first').text(),
      isbnurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=isbn&q=' + isbn,
      titleurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=title&q=' + title;

  $('#buyinfo').before('<div class="gray_ad" id="hblib"></div>');
  $('#hblib').append('<h2>湖北省图书馆有没有该书?</h2><div class="bs pl" id="hbinfo"></div>');

  if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
    $.ajax({
      url: isbnurl,
      success: function (msg) {
        if (msg.indexOf('检索不到记录!') != -1) {
          $('#hbinfo').html('看起来湖北省图书馆还没有该书。');
          $('#hblib').append('<div style="margin-top:8px;"><a href="' + titleurl + '">建议查询</a></div>');
        } else {
          $.ajax({
            url: 'http://hbtinterlib.library.hb.cn/opac/book/holdingpreview/' + $(msg).find('.expressServiceTab:first').attr('express_bookrecno'),
            data: {},
            dataType: 'xml',
            success: function (xml) {
              var tableHeader = new Array('索书号', '所在馆', '所在馆藏地点', '在馆复本数'),
                  tableContent = new Array(),
                  records = $(xml).find("record"),
                  tableStr = '';
              
              var createTable = function (tableHeader, tableContent) {
                var s = '<table><tr>';
                for (index in tableHeader) {
                  s += '<td style="padding:3px;text-align:center;border:1px dashed #ddd;"><b>' + tableHeader[index] + '</b></td>';
                }
                s += '</tr>';
                for (index in tableContent) {
                  s += '<tr>';
                  var recordData = tableContent[index];
                  for (j in recordData) {
                    s += '<td style="padding:3px;text-align:center;border:1px dashed #ddd;">' + recordData[j] + '</td>';
                  }
                  s += '</tr>';
                }
                s += '</tableContentleable>';
                return s;
              }; 

              records.each(function (i) {
                tableContent.push([$(this).find('callno').text(),
                                   $(this).find('curlibName').text(), 
                                   $(this).find('curlocalName').text(),
                                   $(this).find('copycount').text()]);
              });

              if (records.length == 0) {
                tableStr = '湖北省图书馆有该书，但暂时没有在馆复本记录。';
              } else {
                tableStr = createTable(tableHeader, tableContent);
              }

              $('#hbinfo').html(tableStr);
              $('#hblib').append('<div style="margin-top:8px;"><a href="' + isbnurl + '">具体详情</a></div>');
            }
          });
        }
      }
    });
  } else {
    $('#hbinfo').html('由于该书在豆瓣上的信息不全导致查询失败。');
    $('#hblib').append('<div style="margin-top:8px;"><a href="' + titleurl + '">建议查询</a></div>');
  }
}());
