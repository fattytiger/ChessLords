
var Http = cc.Class({
    extends: cc.Component,

    statics: {
        url: '',
        send: function(path, data, handler, extraUrl) {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = '?';
            for (var k in data) {
                if (str != '?') {
                    str += '&';
                }
                str += k + '=' + data[k];
            }
            if (extraUrl === null) {
                extraUrl = Http.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            xhr.open('GET', requestURL, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if (handler !== null) {
                            handler(ret);
                        }
                    } catch (e) {
                        cc.error('Http-err: ', e);
                    } finally {
                        // hide
                    }
                }
            };
            // show
            xhr.send();
            return xhr;
        },
    },
});
