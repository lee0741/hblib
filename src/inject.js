(function () {
  var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1],
      title = $('h1 span:first').text(),
      isbnurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=isbn&q=' + isbn
      titleurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=title&q=' + title;

  $('#buyinfo').before('<div class="gray_ad" id="hblib"></div>');
  $('#hblib').append('<h2>湖北省图书馆有没有这本书？</h2><div class="bs pl" id="hbinfo"></div>');

  if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
    chrome.runtime.sendMessage({
      url: isbnurl,
      dataType: 'html'
    }, function(response) {
      var msg = response.msg;
      console.log(msg);
      if (msg == 'not found') {
        $('#hbinfo').html('看起来湖北省图书馆还没有这本书。');
        $('#hblib').append('<div align="right" style="margin-top:8px;"><a href="' + titleurl + '">建议查询</a></div>');
      } else if (msg == 'no info') {
        $('#hbinfo').html('湖北省图书馆有该书，但暂时没有在馆复本记录。');
        $('#hblib').append('<div align="right" style="margin-top:8px;"><a href="' + isbnurl + '">具体详情</a></div>');
      } else {
        $('#hbinfo').html(msg);
        $('#hblib').append('<div align="right" style="margin-top:8px;"><a href="' + isbnurl + '">具体详情</a></div>');
      }
    });
  } else {
    $('#hbinfo').html('由于该书在豆瓣上的信息不全导致查询失败。');
    $('#hblib').append('<div align="right" style="margin-top:8px;"><a href="' + titleurl + '">建议查询</a></div>');
  }
}());
