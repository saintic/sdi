var Common = {};
Common.dataPostURL = "http://localhost:8080/OTS3/bii";
var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
}; //
var Class = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments);
        };
    }
};
Common.LightBox = {
    element: null,
    init: function () {
        var height = '100%';
        var position = "fixed";

        var html;
        if (navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
            html = '<div id="lightbox" style="left:0; background:rgb(150,150,150); top:0; width:100%; height:' + height + '; filter:alpha(opacity=30); -moz-opacity: 0.3; opacity: 0.3;zoom:1; position:' + position + '; z-index:7; " ><iframe src="" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" width="100%" height="100%" style="left:0; background:rgb(255,255,255); top:0; width:100%; filter:alpha(opacity=0); -moz-opacity: 0; opacity: 0;zoom:1; position:absolute; z-index: 9"></iframe></div>';
        } else {
            html = '<div id="lightbox" style="left:0; background:rgb(150,150,150); top:0; width:100%; height:' + height + '; filter:alpha(opacity=30); -moz-opacity: 0.3; opacity: 0.3;zoom:1; position:' + position + '; z-index:7; " ></div>';
        }
        this.element = $(html).appendTo(document.body);
        this.count = 0;
    },
    getZIndex: function () {
        return parseInt(this.element.css("zIndex")) || -1;
    },
    hide: function () {
        if (this.element) {
            this.count--;
            this.setZIndex("-=2");
            if (this.count <= 0 || this.element.css("zIndex") <= 7)
                this.element.hide();
        }
    },
    resetZIndex: function () {
        return this.setZIndex("9");
    },
    setZIndex: function (zIndex) {
        if (!this.element) {
            this.init();
        }
        var izIndex = parseInt(zIndex.replace(/\=|\=/g, ""));
        var iGetIndex = parseInt(this.element.css("zIndex"));
        var iChangeIndex = izIndex + iGetIndex;
        return this.element.css({
            "zIndex": iChangeIndex
        });
    },
    show: function () {
        if (!this.element) {
            this.init();
        }
        this.element.show();
        this.setZIndex("+=2");
        if (this.count < 0) this.count = 0;
        this.count++;
        return this;
    },
    // 显示弹窗消息
    showMessage: function (error, callback) {
        var _t = this;
        var msg = error;

        if (!_t.element) {
            _t.show();
        } else {
            this.element.show();
            _t.element.css("zIndex", "+=2");
            this.count++;
        }
        $('#msgContent').text(msg).closest(".pop").prepend("<iframe class='pop-iframe'></iframe>");

        // 绑定关闭事件
        if (!_t.msgBox) {
            _t.msgBox = $("#msgBox");
            $("#hideMsgBox,#btnHideMsg,#closeMsgBox").on("click", function () {
                _t.hideMessage();
                callback && callback();
            });
        }

        // 绝对居中定位
        CU.setObjAbsCenter(_t.msgBox.show());
        // 窗体改变大小时自动居中
        $(window).on("resize", function () {
            CU.setObjAbsCenter(_t.msgBox);
        });
    },
    // 隐藏弹窗消息
    hideMessage: function () {
        this.msgBox.hide();
        this.element.css("zIndex", "-=2"); // .fadeOut();
        this.count--;
        if (this.count <= 0 || this.element.css("zIndex") <= 7) {
            this.element.hide();
        }
        $(window).off("resize");
    },
    isShowMessageModel: function () {
        return $("#msgBox").is(":visible");
    }
};
Common.getCommPostParam = function (req, local) {
    return {
        "request": req || null
    };
};
//发送请求
Common.postRequest = function () {
    var modelArray = arguments;
    var arr = [],
        jsn = {};
    // 获取详细参数
    for (var i = 0; i < modelArray.length; i++) {
        jsn = modelArray[i];
        //        var sUrl = jsn.method;
        //        var aUrlResult = sUrl.split("/");
        //        jsn.method = aUrlResult[aUrlResult.length-1];
        //        arr[arr.length] = jsn;
    }

    //    var postData = JSON.stringify(Common.getCommPostParam(arr))|| eval("(" + Common.getCommPostParam(arr) + ")");
    //    return $.ajax({
    //			    url: Common.dataPostURL ,
    //			    type: 'post',
    //			    data: postData,
    //			    dataType: 'html',
    //			    contentType: 'text/html',
    //			    error: function (x, h, r) {
    //			    	alert("asdfa");
    //			    }
    //			});
    //联调调用的
    return $.post(jsn.method, jsn.params);

};


CU = {
    Json: {
        replaceNull: function (jsn) {
            if (jsn) {
                for (var p in jsn) {
                    if (jsn[p] == null)
                        jsn[p] = "";
                    if (typeof jsn[p] == 'object') {
                        jsn[p] = CU.Json.replaceNull(jsn[p]);
                    }
                }
            }
            return jsn;
        }
    },
    // 获取对象相对于窗口绝对居中坐标
    getAbsCenterAxis: function (el, flag) {
        var clientWidth, clientHeight;
        el.hide(); // 隐藏元素后再取body的宽
        clientWidth = document.documentElement.clientWidth;
        clientHeight = document.documentElement.clientHeight;
        el.show();
        return {
            left: (clientWidth - el.width()) / 2,
            top: (clientHeight - el.height()) / 2
        };
    },
    setObjAbsCenter: function (el, flag) {
        var poxy = this.getAbsCenterAxis(el);
        //  如果是在iframe中，top设置成固定值300px
        if (window.frames.length != parent.frames.length) { // 是否是iframe
            　　
            el.css({
                "left": poxy.left + "px",
                "top": 300 + "px",
                "position": "fixed"
            });
        } else {
            el.css({
                "left": poxy.left + "px",
                "top": poxy.top + "px",
                "position": "fixed"
            });
        }
        //   el.css({
        //       "left": poxy.left + "px",
        //       "top": poxy.top + "px",
        //       "position": "fixed"
        //   });

        return el;
    },
    ajaxDataHandle: function (oData) {
        if (oData) {
            if (oData.status == "1") {
                var rst = oData.data;
                if (rst) {
                    return CU.Json.replaceNull(rst);
                }
            } else {
                Common.LightBox.showMessage(oData.error);
                setTimeout(function () {
                    // window.location = Common.urls.errorPage;
                }, "3000");
            }
        }
        return null;
    }
};
//解析Url参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("&") != -1) {
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        } else {
            theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
        }
    }
    return theRequest;
};