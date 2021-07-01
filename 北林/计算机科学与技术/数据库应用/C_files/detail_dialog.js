// JavaScript Document
$.fn.detail_dialog=function(parm){
	var parm=parm||{};
	this.each(function(){
		var isAutoTip=parm.isAutoTip,
			isScrollBar=parm.isScrollBar,
			isShowBg=parm.isShowBg,
			dialogContainer=$(parm.dialogContainer),
			dialogBg=parm.dialogBg.substring(1),
			closeBtn=dialogContainer.find(parm.closeBtn),
			cancelBtn=dialogContainer.find(parm.cancelBtn),
			confirmBtn=dialogContainer.find(parm.confirmBtn),
			confirm_succeeFn=parm.confirm_succeeFn,
			confirmFn=parm.confirmFn,
			topGu = parm.topGu?parm.topGu:'',
			closeFirmFn = parm.closeFirmFn?parm.closeFirmFn:function(){},
			cancelFirmFn = parm.cancelFirmFn?parm.cancelFirmFn:function(){},
			that=$(this);
		function auto(){
			var scrollTop=$(window).scrollTop();
			isScrollBar&&$('html').css('overflow','hidden');
			if(dialogContainer.outerHeight()>=$(window).height()){
				dialogContainer.css({'display':'block',top:scrollTop,left:'50%',marginLeft:-dialogContainer.outerWidth()/2});
			}else{
				dialogContainer.css({'display':'block',top:'50%',left:'50%',marginTop:scrollTop-dialogContainer.outerHeight()/2,marginLeft:-dialogContainer.outerWidth()/2});
			};
			if(topGu!=""){//固定top
				dialogContainer.css({'display':'block',top:'50%',left:'50%',marginTop:topGu,marginLeft:-dialogContainer.outerWidth()/2});
			}
			$('#'+dialogBg).remove();
			$('body').append('<p id="'+dialogBg+'"></p>');
			isShowBg&&$("#"+dialogBg).css({'display':'block','top':0,'left':0,height:$(document).height(),width:'100%'});
			//关闭函数
			function hideFn(){
				dialogContainer.hide();
				isShowBg&&$("#"+dialogBg).hide();
				isScrollBar&&$('html').css('overflow','visible');
			};
			//关闭按钮
			closeBtn.unbind('click');
			closeBtn.click(function(){
				if(closeFirmFn()){
					hideFn();
				}else{
					hideFn();
				}
			});
			//取消按钮
			cancelBtn.unbind('click');
			cancelBtn.click(function(){
				if(cancelFirmFn()){
					hideFn();
				}else{
					hideFn();
				}
				
			});
			//确认按钮
			confirmBtn.unbind('click');
			confirmBtn.click(function(that){
				if(confirmFn()){
					hideFn();
					confirm_succeeFn&&confirm_succeeFn();
				};
			});
		};
		if(isAutoTip===true){
			auto();
		}else{
			$(this).click(function(){
				auto();
			});
		};
	});
};