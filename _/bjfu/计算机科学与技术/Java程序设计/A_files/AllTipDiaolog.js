;(function($) {
    //定义Beautifier的构造函数
    var Beautifier = function(opt) {
        this.defaults = {
    		width : 380,			//对话框宽度
    		height : 150,			//对话框高度
    		title : '',				//标题
    		content : null,			//内容
    		stayIn:2000,			//默认2秒
    		isShowTip:false,			//是否显示提示消息>>默认不显示
    		isInitialize:false,        //是否初始化
    		isAutoClose:false,        //是否在点击确定后自动关闭
    		isShowOpeBtn:true,			//是否显示确定取消按钮
    		TipType:"TipConFirm",		//提示类别
    		isOKBtnVal:"确定",//
    		isCanCelBtnBal:"取消",
    		isShowImg:true,//是否显示弹框的图片
    		isHideAfOk:false,//隐藏当前的窗口是否在点击确定按钮之前
    		callback : function(){},			//回调函数
			CanCelBack:function(){},
			CloseBack:function(){}
    	},
        this.options = $.extend(this.defaults, opt);
    };
    //定义Beautifier的方法
    Beautifier.prototype = {
		getLeft:function(sWidth){
        	return (document.documentElement.clientWidth-sWidth)/2;
        },
        /*计算定位距右*/
        getTop:function(sHeight){
        	return (document.documentElement.clientHeight-sHeight)/2;
        },
        //遮罩
        addMask:function(){
			$("body").append('<div class="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:999;"></div>');
		},
		AllTipalert:function(){
			var _this = this;
			$("body").append('<div class="AllDialog" style="width:'+this.options.width+'px; height:'+this.options.height+'px; position:fixed; top:'+this.getTop(this.options.height)+'px; left:'+this.getLeft(this.options.width)+'px; z-index:1000;"></div>');
			_this.addMask();
			$(".AllDialog").append('<div class="AllTipAlert">'+this.options.content+'</div>');
			setTimeout(function(){
				_this.AllTipClose();
			},this.options.stayIn);  
		},
		
		/*信息确定*/
		AllTipconfirm:function(){
			var _this = this;
			$("body").append('<div class="AllDialog" style="width:'+this.options.width+'px; height:'+this.options.height+'px; position:fixed; top:'+this.getTop(this.options.height)+'px; left:'+this.getLeft(this.options.width)+'px; z-index:1000;"></div>');
			_this.addMask();
			if(this.options.isShowTip ==true){
				$(".AllDialog").append('<div class="dialog_body"><div class="dialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="AllTipClose"></span></div><div id="singComOption" class="dialog_main">'+this.options.content+'</div><div class="SingTip">请按顺序填写答案。如果一个空有多个正确答案请用“##”。</div><div class="dialog_bottom clearfix"><span class="allTipBtnCancel">'+this.options.isCanCelBtnBal+'</span><span class="allTipBtnOk">'+this.options.isOKBtnVal+'</span></div></div>');
			}else{
				if(_this.options.isShowOpeBtn){
					$(".AllDialog").append('<div class="dialog_body"><div class="dialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="AllTipClose"></span></div><div id="singComOption" class="dialog_main">'+this.options.content+'</div><div class="dialog_bottom clearfix"><span class="allTipBtnCancel">'+this.options.isCanCelBtnBal+'</span><span class="allTipBtnOk">'+this.options.isOKBtnVal+'</span></div></div>');
				}else{
					$(".AllDialog").append('<div class="dialog_body"><div class="dialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="AllTipClose"></span></div><div id="singComOption" class="dialog_main">'+this.options.content+'</div><div class="dialog_bottom clearfix"></div></div>');
				}
			}
			if(this.options.isInitialize){
				var BrowserInfo = publicFn.getBrowserInfo();
				var pos = 0, ctx = null, image = [];
				var swfUrl = prefix + "/resources/ots/student/default/fileup/jscam_canvas_only.swf";
				$("#takePictur_last").html("");
				var canvas_2 = document.getElementById("canvas_2");
				canvas_2.setAttribute('width', 320);
				canvas_2.setAttribute('height', 240);
				ctx = canvas_2.getContext("2d");
				image = ctx.getImageData(0, 0, 320, 240);
				$(".AllDialog #webcam_2").webcam({
				    width: 320,
				    height: 240,
				    mode: "callback",
				    swffile: swfUrl, 
				    onTick: function(remain) {
				        if (0 == remain) {
				            jQuery("#status").text("Cheese!");
				        } else {
				            jQuery("#status").text(remain + " seconds remaining...");
				        }
				    },
				    onSave: function(data) {
				        var col = data.split(";");
				        var img = image;
				        
				        for(var i = 0; i < 320; i++) {
				             var tmp = parseInt(col[i]);
				             img.data[pos + 0] = (tmp >> 16) & 0xff;
				             img.data[pos + 1] = (tmp >> 8) & 0xff;
				             img.data[pos + 2] = tmp & 0xff;
				             img.data[pos + 3] = 0xff;
				             pos+= 4;
				        }
				        if (pos >= 4*320*240) {
				             ctx.putImageData(img, 0, 0);
				             pos = 0;
				        }   
				    },
				    onCapture: function () {
				      webcam.save();
				    },
				    debug: function (type, string) {
				    },
				    onLoad: function () { 
				        var cams = webcam.getCameraList();
				        for(var i in cams) {
				            jQuery("#cams").append("<li>" + cams[i] + "</li>");
				        }
				    }
				});
				// 拍照
			    $(".AllDialog").find("#btn-pho_2").on("click", function(){
			        webcam.capture();
			    });
		    }
			$(".allTipBtnOk").click(function(){
				if(_this.options.isHideAfOk){
					//回调函数
					_this.options.callback(_this);
				}else{
					if(_this.options.isAutoClose){
						_this.options.callback(_this);
					}else{
						_this.AllTipClose();
						//回调函数
						_this.options.callback();
					}
//					_this.AllTipClose();
//					//回调函数
//					_this.options.callback();
				}
				
			});
			//关闭按钮
			$(".AllTipClose").click(function(){
				_this.AllTipClose();
				//回调函数
				_this.options.CloseBack();
			});
			//关闭按钮
			$(".allTipBtnCancel").click(function(){
				_this.AllTipClose();
				//回调函数
				_this.options.CanCelBack();
			});
		},
		/*信息确定*/
		Expericonfirm:function(){
			var _this = this;
			$("body").append('<div class="AllDialog" style="width:'+this.options.width+'px; height:'+this.options.height+'px; position:fixed; top:'+this.getTop(this.options.height)+'px; left:'+this.getLeft(this.options.width)+'px; z-index:1000;"></div>');
			_this.addMask();
			if(_this.options.isShowOpeBtn){
				if(_this.options.isShowImg){
					$(".AllDialog").append('<div class="dialog_body"><div class="Experidialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="ExperiClose"></span></div><div id="singComOption" class="Experidialog_main clearfix"><div class="ExperiTipImage"></div><div class="ExperiImgCon">'+this.options.content+'</div></div><div class="Experidialog_bottom clearfix"><span class="ExperiBtnCancel">'+this.options.isCanCelBtnBal+'</span><span class="ExperiBtnOk ExperiBtnOkMar">'+this.options.isOKBtnVal+'</span></div></div>');
				}else{
					$(".AllDialog").append('<div class="dialog_body"><div class="Experidialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="ExperiClose"></span></div><div id="singComOption" class="Experidialog_main_CanCel clearfix"><div class="ExperiImgCon">'+this.options.content+'</div></div><div class="Experidialog_bottom clearfix"><span class="ExperiBtnCancel">'+this.options.isCanCelBtnBal+'</span><span class="ExperiBtnOk ExperiBtnOkMar">'+this.options.isOKBtnVal+'</span></div></div>');
				}
			}else{
				$(".AllDialog").append('<div class="dialog_body"><div class="Experidialog_top"><span class="AllTipDes">'+this.options.title+'</span><span class="ExperiClose"></span></div><div id="singComOption" class="Experidialog_main clearfix"><div class="ExperiTipImage"></div><div class="ExperiImgCon">'+this.options.content+'</div></div><div class="Experidialog_bottom clearfix"></div></div>');
			}
			$(".ExperiBtnOk").click(function(){
				if(_this.options.isHideAfOk){
					//回调函数
					_this.options.callback(_this);
				}else{
					_this.AllTipClose();
					//回调函数
					_this.options.callback();
				}
				
			});
			//关闭按钮
			$(".ExperiClose").click(function(){
				_this.AllTipClose();
				//回调函数
				_this.options.CloseBack();
			});
			//关闭按钮
			$(".ExperiBtnCancel").click(function(){
				_this.AllTipClose();
				//回调函数
				_this.options.CanCelBack();
			});
		},
		AllTipClose:function(){
			$(".AllDialog").fadeOut();
			$(".mask").fadeOut();
			$(".AllDialog").remove();
			$(".mask").remove();
		}
    };
    //在插件中使用Beautifier对象
    $.fn.AllTipDialog = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(options);
        if(beautifier.options.TipType=="TipConFirm"){
        	return beautifier.AllTipconfirm();
        } else  if(beautifier.options.TipType=="ExperiConFirm"){
        	//实验班的弹框提示(样式不一样)
        	return beautifier.Expericonfirm();
        }else{
        	return beautifier.AllTipalert();
        } 
    };
})(jQuery);