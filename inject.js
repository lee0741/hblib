$('#buyinfo').before('<div class="gray_ad" id="hblib"></div>');
$('#hblib').append('<h2>湖北省图书馆有没有该书?</h2><div class="bs" id="isex"></div>');
if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
  var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1];
  $.ajax({
    url: 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=isbn&q=' + isbn,
	  success: function (msg) {
      if (msg.indexOf('检索不到记录!') != -1) {
		    $('#isex').html('看起来湖北省图书馆还没有该书。');
	    } else {
		    $('#isex').html('湖北省图书馆当然有！');
		    var findurl = 'http://hbtinterlib.library.hb.cn/opac/search?rows=10&searchWay=isbn&q=' + isbn;
		    $('#hblib').append('<div class="bs" id="mdt"><a href="' + findurl + '" target="_blank">具体详情点这里</a></div>');
		  }
		}
  });
} else {
	$('#isex').html('竟然没有！');
}
