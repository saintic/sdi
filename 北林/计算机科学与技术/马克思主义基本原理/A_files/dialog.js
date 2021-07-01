(function($) {
	//定义Beautifier的构造函数
	var Beautifier = Class.create();
    //定义Beautifier的方法
    Beautifier.prototype = {
    	    initialize: function (params) {
    	        this.paramsRefactoring(params || {}).dataRefactoring(params||{});
    	    },
    	    //事件绑定
    	    bindEvent: function () {
    	        var _t = this;
    	        _t.oContent = {};//选项内容
    	        _t.subQuestions =[];
    	        //点击取消按钮
    	        $("#btn_cancel").on("click", function (e) {
    	        	Common.LightBox.hide();
    	        	$("#confirm_dialog").html("");
    	        	$("#confirm_dialog").addClass("none");
    	        	_t.cancel_callback && _t.cancel_callback(_t);
    	        });
    	        //点击确认按钮
    	        $("#btn_ok").on("click", function (e) {
    	        	Common.LightBox.hide();
    	        	$("#confirm_dialog").html("");
    	        	$("#confirm_dialog").addClass("none");
    	        	_t.ok_callback && _t.ok_callback(_t);
    	        });

    	    },
    	    
    	    //数据重构及填充
    	    dataRefactoring: function (oparams) {
                $("#confirm_dialog").html("");//先清空
    	        var _t = this;
    	        _t.html = '<div class="IsDel">'+
	            '<div class="IsDel_Title"></div>'+
	            '<div class="IsDel_Btn">'+
	            '<a class="orange none" id="btn_cancel"></a><a class="gray none" id="btn_ok"></a>'+
	            '<a class="gray none" id="btn_ok"></a>'+
	            '</div>'+
	            '</div>';
    	        $("#confirm_dialog").append(_t.html);
    	        
	        	if(oparams.TitVal){
	        		$(".IsDel_Title").html(oparams.TitVal);
	        	}
	        	if(oparams.isShowOk){
	        		$("#btn_ok").removeClass("none");
	        		$("#btn_ok").text(oparams.ShowOkVal);
	        	}
	        	if(oparams.isShowCancel){
	        		$("#btn_cancel").removeClass("none");
	        		$("#btn_cancel").text(oparams.ShowCanVal);
	        	}
    	        $("#confirm_dialog").removeClass("none");
    	        
    	        Common.LightBox.show();
    	        CU.setObjAbsCenter($("#confirm_dialog"));
    	        _t.bindEvent();
    	    
    	    },
    	    //参数重构
    	    paramsRefactoring: function (params) {
    	        var _t = this;
    	        _t.appendTo = params.appendTo || document.body;
    	        _t.ok_callback = params.ok_callback || null;//删除框的确认按钮
    	        _t.sAnswerModel = params.sModel||null;
    	        _t.cancel_callback = params.cancel_callback || null;//取消按钮的回调函数
    	        _t.submit_callback = params.submit_callback ||null;//提交试卷确认按钮的回调函数
    	        return _t;
    	    }
    };
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(options);
        // 窗体改变大小时自动居中
        $(window).on("resize", function () {
            CU.setObjAbsCenter($("#confirm_dialog"));
        });
    };
})(jQuery);