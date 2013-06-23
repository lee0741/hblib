var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1],
    title = $('h1 span:first').text(),
    isbnurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=isbn&q=' + isbn,
    titleurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=title&q=' + title;

$('#buyinfo').before('<div class="gray_ad" id="hblib"></div>');
$('#hblib').append('<h2>湖北省图书馆有没有该书?</h2><div class="bs" id="isex"></div>');

if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
  $.ajax({
    url: isbnurl,
	  success: function (msg) {
      if (msg.indexOf('检索不到记录!') != -1) {
		    $('#isex').html('看起来湖北省图书馆还没有该书。');
        $('#hblib').append('<div class="bs" id="mdt"><a href="' + titleurl + '">建议查询</a></div>');
	    } else {
		    $('#isex').html('湖北省图书馆当然有！');
		    $('#hblib').append('<div class="bs" id="mdt"><a href="' + isbnurl + '">具体详情</a></div>');
		  }
		}
  });
} else {
	$('#isex').html('由于该书在豆瓣上的信息不全导致查询失败。');
  $('#hblib').append('<div class="bs" id="mdt"><a href="' + titleurl + '">建议查询</a></div>');
}
