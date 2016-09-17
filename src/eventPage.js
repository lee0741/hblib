chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        $.ajax({
            url: request.url,
            dataType: request.dataType
        })
         .done(function(html) {
            if (html.indexOf('检索不到记录!') != -1) {
                console.log('not found');
                sendResponse({msg: 'not found'});
            } else {
                $.ajax({
                    url: 'http://hbtinterlib.library.hb.cn/opac/book/holdingpreview/' + $(html).find('.expressServiceTab:first').attr('express_bookrecno'),
                    dataType: 'xml'
                })
                 .done(function(xml) {
                    if ($(xml).find("record").length == 0) {
                        console.log('no info');
                        sendResponse({msg: 'no info'});
                    } else {
                        var tableHeader = new Array('索书号', '所在馆藏地点', '在馆复本数'),
                            tableContent = new Array(),
                            records = $(xml).find("record"),
                            tableStr = '';
              
                        var createTable = function (tableHeader, tableContent) {
                            var s = '<table><tr>';
                            for (index in tableHeader) {
                                s += '<td style="padding:3px 9px;text-align:center;border:1px dashed #ddd;"><b>' + tableHeader[index] + '</b></td>';
                            }
                            s += '</tr>';
                            for (i in tableContent) {
                                s += '<tr>';
                                var recordData = tableContent[i];
                                for (j in recordData) {
                                    s += '<td style="padding:3px 9px;text-align:center;border:1px dashed #ddd;">' + recordData[j] + '</td>';
                                }
                                s += '</tr>';
                            }
                            s += '</table>';
                            return s;
                        }; 

                        records.each(function (i) {
                            tableContent.push([$(this).find('callno').text(),
                                               $(this).find('curlocalName').text(),
                                               $(this).find('copycount').text()]);
                        });

                        tableStr = createTable(tableHeader, tableContent);
                        console.log(tableStr);
                        sendResponse({msg: tableStr});
                    }
                 });
            }
         });
         return true;
    }
);