Common = {};
Common.dataPostURL = "http://172.16.18.110:8080/OTS3/bii";
// Common.dataPostURL = "http://localhost:8080/ots/bii";
var Class = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments);
        };
    }
};
//阻止冒泡
Common.stopBubble = function (e) {
    if (e && e.stopPropagation){
      e.stopPropagation();
    }else{
      window.event.cancelBubble = true;
    }
};
Common.LightBox = {
  element: null,
  /**
   * 初始化遮罩
   * @param type：遮罩样式
   */
  init: function (type) {
    // 初始化之前判断DOM树中，是否存在一个或多个element元素，如果存在就移除
    // jquery获取DOM中所有的element元素
    var elementList = $(document.body).find(".bodyLightbox");
    if( elementList && elementList.length>0 ){
      $.each(elementList, function(n, val){
        document.body.removeChild(val);
      });
    }
      var height = '100%';
      var position = "fixed";
      var html;
      if (navigator.userAgent.toLowerCase().indexOf("msie")>=0) {
    html = '<div id="lightbox" class="bodyLightbox" ><iframe src="" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" width="100%" height="100%" style="left:0; background:rgb(255,255,255); top:0; width:100%; filter:alpha(opacity=0); -moz-opacity: 0; opacity: 0;zoom:1; position:absolute; z-index: 9"></iframe></div>';
      } else {
        // 初始化遮罩样式
       html = '<div id="lightbox" class="bodyLightbox" ><div class="bodyLightbox_imgDiv"></div></div>';
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
            // 隐藏遮罩
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
      var iGetIndex  = parseInt(this.element.css("zIndex"));
      var iChangeIndex = izIndex + iGetIndex;
      return this.element.css({"zIndex":iChangeIndex});
  },
  show: function () {
      // 初始化
    this.init();
    // 显示遮罩
      this.element.show();
      this.setZIndex("+=2");
      if (this.count < 0) this.count = 0;
      this.count++;
      return this;
  },
  ExperiTipShow:function (tipVal) {
    //实验班提示消息
    if(($(".moveTip").html())&&($(".moveTip").html().length>0)){
      //已经存在
      $(".moveTip").html(tipVal);
    }else{
      $('<div class="moveTip"></div>').appendTo(document.body);
      CU.setObjAbsCenter($(".moveTip"));
      $(".moveTip").html(tipVal); 
    }
  },
  ExperiTipHide:function () {
    //实验班提示消息
    $(".moveTip").remove();
  },
  /*
   * sTipCon 提示内容
   * TipCallBack,回调函数
   * */
  TipAllShow:function(sTipCon,fn){
      Common.LightBox.show();
      //$('<div class="DelemoveTip"><div class="HeadTitle">系统提示</div><div class="TipDescri">'+sTipCon+'</div><div class="btn-box"><button class="lineBtnw100 lineMinorButton mr20 _comCancel">取消</button><button class="btnw100 majorButton _comOk">确定</button></div></div>').appendTo(document.body);
      $('<div class="DelemoveTip"><div class="HeadTitle">系统提示</div><div class="TipDescri">'+sTipCon+'</div><div class="btn-box"><button class="lineBtnw70 majorButton mr20 _comCancel">确定</button></div></div>').appendTo(document.body);
    CU.setObjAbsCenter($(".DelemoveTip"));
      //$("._comOk").on("click", function () {
      //    fn && fn();
      //});
    $("._comCancel").on("click", function () {
      Common.LightBox.TipAllHide();
      Common.LightBox.hide();
      return false;
      });
  },
  //删除弹出层
  TipAllHide:function(){
    $(".DelemoveTip").remove(); 
  },
  // 显示弹窗消息
  showMessage: function (error, callback) {
      var _t = this;
      var msg = error;
      
      if (!_t.element){
          _t.show();
      }else {
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
          if(($(".moveTip").html())&&($(".moveTip").html().length>0)){
            CU.setObjAbsCenter($(".moveTip"));
          }
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
    var arr = [], jsn = {};
    // 获取详细参数
    for (var i = 0; i < modelArray.length; i++) {
        jsn = modelArray[i];
        //本地释放
        //var sUrl = jsn.method;
        //if ( sUrl ){
        //    var aUrlResult = sUrl.split("/");
        //    jsn.method = aUrlResult[aUrlResult.length-1];
        //    arr[arr.length] = jsn;
        //}
    }
    //var postData = JSON.stringify(Common.getCommPostParam(arr))|| eval("(" + Common.getCommPostParam(arr) + ")");
    //return $.ajax({
    //      url: Common.dataPostURL ,
    //      type: 'post',
    //      data: postData,
    //      dataType: 'html',
    //      contentType: 'text/html',
    //      error: function (x, h, r) {
    //        console.log("asdfa");
    //      }
    //  });
//联调时释放
    return $.ajax({
      url:jsn.method,
      data:jsn.params,
      timeout : 1200000, //超时时间设置，单位毫秒
      type:'post',
      complete : function(XMLHttpRequest,status, data){ //请求完成后最终执行参数
  　　　　if(status=='timeout'||status=='error'){//超时,status还有success,error等值的情况
            $('#confirm_dialog').myPlugin({
                TitVal: "<div>网络异常!请调整网络。"+(jsn.timeoutMsg?jsn.timeoutMsg:'')+"</div>",
                isShowOk: true,
                ShowOkVal: "确定",
                isShowCancel: false,
                ok_callback: function () {
                    jsn.timeoutFn&&jsn.timeoutFn();
                }
            });
  　　　　}
          // 对接口数据进行统一处理
          // console.log(XMLHttpRequest.responseText)
          var res = JSON.parse(XMLHttpRequest.responseText);
          if (res.status != 1) {
            $('#confirm_dialog').myPlugin({
                TitVal: "<div>"+(res.error?res.error:'请求失败，请重试')+"</div>",
                isShowOk: true,
                ShowOkVal: "确定",
                isShowCancel: false,
                ok_callback: function () {
                }
            });
          }
  　　}
    });
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
    // el.css({
    //     "left": poxy.left + "px",
    //     "top": poxy.top + "px",
    //     "position": "fixed"
    // });
    
    return el;
  },
  ajaxDataHandle: function (oData) {
        if (oData) {
            if (oData.status === 1) {
                return  oData.data;
            } else {
                //Common.LightBox.showMessage(oData.error);
                Common.LightBox.TipAllShow(oData.error,function(){

                });
          }
        }
        return null;
    }
};
/****** 数组扩展方法 ******/
/**
 * 删除数组中某个元素，并且修改下标，返回新数组
 * array数组扩展方法
 * auth:JYX time:2016.02.20
 */
Array.prototype.del = function(n){
    if (n<0){
        return this;
    }else{
        return this.slice(0,n).concat(this.slice(n+1,this.length));
    }
};
/**
 * 在数组的指定位置添加新元素
 * array数组扩展方法
 * auth:JYX time:2016.08.26
 */
Array.prototype.insert = function(index, stem){
    this.splice(index, 0, stem);
};
/**
 * 去除数组中重复元素，返回新数组
 * array数组扩展方法
 * auth:JYX time:2016.03.20
 */
Array.prototype.distinct = function(){
    var result = [], hash = {};
    for( var i = 0, elem;(elem = this[i]) != null; i++ ){
        if( !hash[elem] ){
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};
/**
 * 数组中添加新元素并且去重复
 * @param _elem：元素
 * @returns {Array}:返回新数组
 */
Array.prototype.addAndDistinct = function(_elem){
    var result = [];
    this.push(_elem);
    result = this.distinct();
    return result;
};
/**
 * 根据参数，删除数组中对应的元素
 * @param _elem：元素
 */
Array.prototype.delByElem = function(_elem){
    var result = [];
    for( var i= 0,elem;(elem = this[i]) != null;i++ ){
        if ( elem === _elem ){
            result = this.del(i);
            break;
        }
    }
    return result;
};
/**
 * 去除字符串中所有空格
 * @returns {string}
 */
String.prototype.allTrim = function(){
    return this.replace(/\s/g, "");
};
/**
 * 删除左右两端空格
 * @returns {string}
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 删除左边空格
 * @returns {string}
 */
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
/**
 * 删除右边空格
 * @returns {string}
 */
String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
}