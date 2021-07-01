// JavaScript Document
var domainName = prefix+'/app/ots/';
avalon.define('body', function () {});
var isFirLoad = true;
var URL={
	// 考试，详情
    CorrectQuestionBySystem: domainName + 'TestActivity/CorrectQuestionBySystem',
    SubmitAnswerPaper: domainName + 'TestActivity/SubmitAnswerPaper',
    SubmitAnswerQuestion:domainName + 'TestActivity/SubmitAnswerQuestion',
	// 教师阅卷
	sQueryAnswerDetails:domainName+'TestActivity/QueryAnswerPaperDetails',//查看答卷详情 
	QueryArrangementStateList:domainName+'TestActivity/QueryArrangementStateList',
	QueryArrangementStudentList:domainName+'TestActivity/QueryArrangementStudentList',// 学生信息
	SubmitJudgement:domainName+'TestActivity/SubmitJudgement',//提交
	// 考试
	sQueryAnswerDetails:domainName+'TestActivity/QueryAnswerPaperDetails',//查看答卷详情 
    StartAnswerPaper: domainName + 'TestActivity/StartAnswerPaper',// 
    // 活动监控														
    QueryArrangementStatistics: domainName + 'TestActivity/QueryArrangementStatistics',
    UpdateTestActivityArrangementsEndtime: domainName + 'TestActivity/UpdateTestActivityArrangementsEndtime',
    QueryArrangementStatisticsStudentList: domainName + 'TestActivity/QueryArrangementStatisticsStudentList',
    DeleteStudentAnswerPaperRecord: domainName + 'TestActivity/DeleteStudentAnswerPaperRecord',
	// 知识点管理
	
	QueryCategoryItemTreeByName:domainName+'QuestionsManage/QuestionCategory/QueryCategoryItemTreeByName',
	OperateQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/OperateQuestionCategoryItem',
	QueryQuestionCategoryItemByCode:domainName+'QuestionsManage/QuestionCategory/QueryQuestionCategoryItemByCode',
	SaveQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/SaveQuestionCategoryItem',
	QueryChildQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryItem',
	QueryRelationQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryItem',
	QueryChildQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryItem',
	ChangeQuestionCategoryItemSequence:domainName+'QuestionsManage/QuestionCategory/ChangeQuestionCategoryItemSequence',
	ExportQuestionCategoryItem:domainName+'QuestionsManage/QuestionCategory/ExportQuestionCategoryItem',
	//导航
	nav:domainName+'Public/UserFPSettings',
	// 试卷下载
	QueryPaperExportTemplate:domainName+'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplate',
	RemovePaperExportTemplate:domainName+'PapersManage/PaperExportTemplateManage/RemovePaperExportTemplate',
	QueryPaperExportTemplateById:domainName+'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateById',
	SavePaperExportTemplate:domainName+'PapersManage/PaperExportTemplateManage/SavePaperExportTemplate',
	QueryPaperExportTemplateStyle:domainName+'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateStyle',
	DownloadPaperExportTemplate:domainName+'PapersManage/PaperExportTemplateManage/DownloadPaperExportTemplate',
	ExportPaper:domainName+'PapersManage/PaperListOperate/ExportPaper',
	//公用接口
	GetMainCategoryMainLevelItemList:domainName+'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemList', 
	GetQuestionTypeList:domainName+"/QuestionsManage/QuestionInput/GetQuestionTypeList",
	//题库接口
	GetCategoryItemTree:domainName+'QuestionsManage/QuestionCategory/GetCategoryItemTree',
	themeUrl:domainName+"QuestionsManage/QuestionQuery/QueryQuestionListByCondition",
	DisableQuestions:domainName+'QuestionsManage/QuestionListOperate/DisableQuestions',
	DeleteQuestions:domainName+'QuestionsManage/QuestionListOperate/DeleteQuestions',
	AuditThroughQuestion:domainName+'QuestionsManage/QuestionListOperate/AuditThroughQuestion',//审核通过
	AuditNotThroughQuestion:domainName+'QuestionsManage/QuestionListOperate/AuditNotThroughQuestion',//审核不通过
	EnableQuestions:domainName+'QuestionsManage/QuestionListOperate/EnableQuestions',
	QuestionExt:domainName+"ExtDataDefinition/QuestionExt",
	
	//试卷
	sGetPaperConfig:domainName+'SystemConfig/GetPaperConfig',//获取试卷配置
	QueryPaperListByCondition:domainName+'PapersManage/PaperQuery/QueryPaperListByCondition',
	EnablePapers:domainName+'PapersManage/PaperListOperate/EnablePapers',
	DisablePapers:domainName+'PapersManage/PaperListOperate/DisablePapers',
	RemovePapers:domainName+'PapersManage/PaperListOperate/RemovePapers',
	GetDifficultyValues:domainName+'QuestionsManage/QuestionInput/GetDifficultyValues',
	GetQuestionTypeList:domainName+'QuestionsManage/QuestionInput/GetQuestionTypeList',
	QueryMergeablePaperList:domainName+'PapersManage/PaperQuery/QueryMergeablePaperList',
	MergePapers:domainName+'PapersManage/PaperCompose/MergePapers',
	// 智能组卷
	QuestionExt4CreatePaper:domainName+'ExtDataDefinition/QuestionExt4CreatePaper',
	//开始组卷
	sQuestionCategoryUrl: domainName+ "QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemList",//获取主分类主层级分类项列表
	sGetCategoryList : domainName+ "PapersManage/PaperCategory/GetCategoryList",//获取试卷分类列表
	sGetQuestionTypeList: domainName+ "QuestionsManage/QuestionInput/GetQuestionTypeList",//题型列表
	sStartCompose: domainName+ "PapersManage/PaperCompose/StartCompose",//开始组卷
	sPreviewPaper: domainName+ "PapersManage/PaperQuery/PreviewPaper",//预览试卷 
	sPaperExt: domainName+ "ExtDataDefinition/PaperExt",//试卷属性 
	sSavePaperAttributes: domainName+ "PapersManage/PaperCompose/SavePaperAttributes",//保存试卷属性 
	sSaveStrategy: domainName+ "PapersManage/PaperCompose/StrategyCompose",//组卷策略
	sModifyStrategy: domainName+ "PapersManage/PaperCompose/ModifyStrategy",//修改组卷策略
	sModifyQuestionScore: domainName+ "PapersManage/PaperCompose/ModifyQuestionScore",//修改题目分数
	sGetStrategy: domainName+ "PapersManage/PaperCompose/GetStrategy",//获取组卷策略
	sGetQuestionStockForDefaultStrategy: domainName+ "PapersManage/PaperCompose/GetQuestionStockForDefaultStrategy",//获取默认组卷策略模板题目库存
	sReplaceQuestion: domainName+ "PapersManage/PaperCompose/ReplaceQuestion",//换题 
	sRemoveQuestion: domainName+ "PapersManage/PaperCompose/RemoveQuestion",//删题 
	sAddQuestions: domainName+ "PapersManage/PaperCompose/AddQuestions",//添加题目 
	sSavePaper: domainName+ "PapersManage/PaperCompose/SavePaper",//保存试卷 
	sSubmitPaper: domainName+ "PapersManage/PaperCompose/SubmitPaper",//提交试卷 
	sQueryAddibleQuestionList: domainName+ "PapersManage/PaperCompose/QueryAddibleQuestionList",//QueryAddibleQuestionList 
	sManualSelectQuestions: domainName+ "PapersManage/PaperCompose/ManualSelectionCompose",//手动选题
	sAddPaperStructure: domainName+ "PapersManage/PaperCompose/AddPaperStructure",//添加试卷结构 
	sModifyPaperStructure: domainName+ "PapersManage/PaperCompose/ModifyPaperStructure",//修改试卷结构
	sRemovePaperStructure: domainName+ "PapersManage/PaperCompose/RemovePaperStructure",//删除试卷结构 
	sGetDifficultyValues: domainName+ "QuestionsManage/QuestionInput/GetDifficultyValues",//难度列表
	questionPrivateConfig: domainName+ "QuestionsManage/QuestionInput/questionPrivateConfig",//是否允许私有
	sAdjustPaperStructureSequence : domainName+ "PapersManage/PaperCompose/AdjustPaperStructureSequence",//调整试卷结构顺序
	sAdjustPaperQuestionSequence :domainName+ "PapersManage/PaperCompose/AdjustPaperQuestionSequence",//调整试题结构顺序
	//测试活动
	QueryTestActivityTypes:domainName+'TestActivity/QueryTestActivityTypes',//查询测试活动类型列表
	QueryTestActivityArrangementListByConditions:domainName+"TestActivity/QueryTestActivityArrangementListByConditions",//通过条件查询测试活动安排列表 
	RemoveTestActivityArrangements:domainName+'TestActivity/RemoveTestActivityArrangements',//删除测试活动安排
	EditTestActivityArrangement:domainName+"TestActivity/EditTestActivityArrangement",//编辑活动安排实例
	GetTestActivityArrangementsByActivityTypeId:domainName+"TestActivity/GetTestActivityArrangementsByActivityTypeId",//根据活动类型，获取活动类型对应的活动安排列表
	GetPaperListForArrangement:domainName+"TestActivity/GetPaperListForArrangement",//为活动安排获取试卷列表
	CreateTestActivityArrangement:domainName+'TestActivity/CreateTestActivityArrangement',//创建(更新)活动安排实例入库
	sSyncArrangementData:domainName+'TestActivity/syncArrangementData',//同步数据
	//纠错
	CorrectionQuery:domainName+'Correction/queryCorrectionTypeByCondition',//查询
	CorrectionAdd:domainName+'Correction/CreateCorrectionType',//新增
	CorrectionDel:domainName+'Correction/RemoveCorrectionType',//删除
	//纠错管理
	CorrMangeDetail:domainName+'Correction/QueryCorrectionInfo',//纠错管理详情
	CorrMangeAdd:domainName+'Correction/CreateCorrection',//新增纠错管理项
	CorreMangeQuery:domainName+'Correction/queryCorrectionListByCondition',//查询纠错管理
	//人脸识别，考试监控
	UploadTestPhoto:domainName+'Public/UploadTestPhoto'
	
};
//// 获取浏览器
//var s = navigator.userAgent.toLowerCase();
//var BrowserInfo = {
//    IsIE: /*@cc_on!@*/false,
//    IsIE7: /*@cc_on!@*/false && (parseInt(s.match(/msie (\d+)/)[1], 10) >= 7),
//    IsIE6: /*@cc_on!@*/false && (parseInt(s.match(/msie (\d+)/)[1], 10) >= 6),
//    IsSafari: s.Contains(' applewebkit/'),
//    IsOpera: !!window.opera,
//    IsAIR: s.Contains(' adobeair/'),
//    IsMac: s.Contains('macintosh')
//};
//(function(A) {
//    A.IsGecko = (navigator.product == 'Gecko') && !A.IsSafari && !A.IsOpera;
//    A.IsGeckoLike = (A.IsGecko || A.IsSafari || A.IsOpera);
//    if (A.IsGecko) {
//        var B = s.match(/rv:(\d+\.\d+)/);
//        var C = B && parseFloat(B[1]);
//        A.IsIERV = true;
//        if (C) {
//            A.IsGecko10 = (C < 1.8);
//            A.IsGecko19 = (C > 1.8);
//        }
//    }
//})(BrowserInfo);

//字符串转JSON
function Tojson(str) {
	var json = (new Function("","return "+str))();
    return json;
};
//计算字符长度,中文为2,英文为1
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charAt(i).match(/[\u0391-\uFFE5]/) ? 2 : 1;
    }
    return len;
};
//获取url的参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
//得失焦点
function focusBlur(obj,_class){
	if(!_class){
		_class='';
	};
	obj.focus(function(){
		if(obj.val()==obj[0].defaultValue){
			obj.val('').addClass(_class);
		};
	}).blur(function(){
		if(obj.val()==''){
			obj.val(obj[0].defaultValue).removeClass(_class);
		};
	});
};
/*全部科学显示隐藏*/
$("#searchAreaId").hover(function(){
	$(this).addClass('hover');
},function(){
	$(this).removeClass('hover');
});
//模态提示
function modal_tip(obj,txt){
	obj.text(txt).show().stop().animate({opacity:1},500);
	setTimeout(function(){
		obj.stop().animate({opacity:0},500).slideUp("slow");
	},3000);
};
//审核验证
function audit_start(obj){
	if(obj.find('input:checked').length){
		var index=obj.find('input:checked').parent().index();
		obj.find('.enter_content div').eq(index).show().siblings('div').hide();
	};
	for(var i=0;i<obj.find('textArea').length;i++){
		if(obj.find('textArea').eq(i).val()!=obj.find('textArea').eq(i)[0].defaultValue){
			obj.find('textArea').eq(i).addClass('gay');
		};
	};
	focusBlur(obj.find('textArea').eq(0),'gay');
	focusBlur(obj.find('textArea').eq(1),'gay');
	obj.find('.passArea input').click(function(){
		var index=$(this).parent().index();
		obj.find('.enter_content div').eq(index).show().siblings('div').hide();
		if(obj.find('.top_error').text()=='请选择审核结果'){
			obj.find('.top_error').hide()
		};
	});
};
function audit_check(obj,str,fn){
	if(!obj.find('input:checked').length){
		obj.find('.top_error').show().text('请选择审核结果');
		return false;
	};
	var val='';
	if(obj.find('textarea:visible').val()==obj.find('textarea:visible')[0].defaultValue){
		val='';
	}else{
		val=obj.find('textarea:visible').val();
	};
	if(obj.find('input:checked').val()==2){  //选择不通过
		if((obj.find('textarea').eq(1).val()==obj.find('textarea').eq(1)[0].defaultValue)||(obj.find('textarea').eq(1).val().length<5)||(obj.find('textarea').eq(1).val().length>200)){
			obj.find('.enter_content .error').eq(1).show().text('请输入5-200个汉字内的审核意见');
			obj.find('textarea').eq(1).addClass('red');
			 return false;
		}else{
			obj.find('textarea').eq(1).removeClass('red');
			obj.find('.enter_content .error').eq(1).hide();
			$.post(URL.AuditNotThroughQuestion, {idList:str,content:val},
			function (data) {
				var json = Tojson(data);
				if (json.status == 1 && json.data.succeeded) {
					fn&&fn();
				};
			});
			return true;
		};
	}else if(obj.find('input:checked').val()==1){ //选择通过
		if(obj.find('textarea').eq(0).val().length>200){
			obj.find('.enter_content .error').eq(0).show().text('请输入0-200个汉字内的审核意见');
			obj.find('textarea').eq(0).addClass('red');
			return false;
		}else{
			obj.find('textarea').eq(0).removeClass('red');
			obj.find('.enter_content .error').eq(0).hide();
			$.post(URL.AuditThroughQuestion, {idList:str,content:val},
			function (data) {
				var json = Tojson(data);
				if (json.status == 1 && json.data.succeeded) {
					fn&&fn();
				};
			});
			return true;
		};
	};
};	
var publicFn={
	//导航链接
	navLink:{
		QuestionLib:{child:['newbuilt_question.html'/*录入试题*/,'import.html'/*'导入试题'*/,'all_science.html'/*试题管理*/]},
		PaperLib:{child:['newGroupTestPaper.html'/*新组试卷*/,'testPaperManage.html'/*试卷列表*/,'downloadNewTemplate.html']},
		MiddleExam:{child:['examArrange.html','TReviewActivityList.html']},
		MockExam:{child:['examArrange.html','TReviewActivityList.html']},
		
		CourseLib:{child:['C_courseClassification.html','C_newCourse.html','C_courseImport.html']},
		FinalExam:{child:['examArrange.html','TReviewActivityList.html']},
		PlacementExam:{child:['examArrange.html','TReviewActivityList.html']},
		LevelExam:{child:['examArrange.html','TReviewActivityList.html']},
		JudgeLib:{child:['TReviewActivityList.html']},
		ActivityStatisticsLib:{child:['A_aMonitoringList.html']},
		tempDown:{child:['downloadNewTemplate.html']},
		correction:{child:['correctionType.html','correctionManage.html']}//纠错相关的页面
	},
	/**
	 * 获取浏览器信息，返回数据对象
	 */
	getBrowserInfo:function(){
		var s = navigator.userAgent.toLowerCase();
		var BrowserInfo = {
		    IsIE: /*@cc_on!@*/false,
		    IsIE9Under: /*@cc_on!@*/false && (parseInt(s.match(/msie (\d+)/)[1], 10) <= 9),
		    IsSafari: s.indexOf("applewebkit") > -1,
		    IsOpera: !!window.opera,
		    IsAIR: s.indexOf('adobeair') > -1,
		    IsMac: s.indexOf('macintosh') > -1
		};
		(function(A) {
		    A.IsGecko = (navigator.product == 'Gecko') && !A.IsSafari && !A.IsOpera;
		    A.IsGeckoLike = (A.IsGecko || A.IsSafari || A.IsOpera);
		    if (A.IsGecko) {
		        var B = s.match(/rv:(\d+\.\d+)/);
		        var C = B && parseFloat(B[1]);
		        A.IsIERV = true;
		        if (C) {
		            A.IsGecko10 = (C < 1.8);
		            A.IsGecko19 = (C > 1.8);
		        }
		    }
		})(BrowserInfo);
		
		return BrowserInfo;
	},
	/**
	 * 根据传入的租户名称获取相应的主题样式文件名称
	 * @param tenant
	 * @returns {String}
	 */
	getCssNameByTenant:function(tenant){
		var name = "";
		if ( tenant && tenant != "" ){
			if ( tenant == "garden" ){
				name = "stuThemeByGarden";
			}else if (  tenant == "101"  ){
				name = "stuThemeBy101";
			}else{
				name = "stuThemeByDefault";
			}
		}else{
			name = "stuThemeByDefault";
		}
		return name;
	},
	/**
	 * 替换css样式文件；
	 * @param title：替换的css样式文件名称
	 * auth:JYX time:2016.07.28
	 */
	setStyleSheet:function(title){
	    // 找到head
	    var doc_head = document.getElementsByTagName("head")[0];
	    // 找到所有的link标签
	    var link_list = document.getElementsByTagName("link");
	    var new_href = ""
	    if ( link_list ){
	        for ( var i=0;i<link_list.length;i++ ){
	            // 找到我们需要替换的link，
	            if ( link_list[i].getAttribute("ty") === "theme" ){
	                // 找到后将这个link标签重head中移除
//	                doc_head.removeChild(link_list[i]);
	            	// 获取名称
	            	var href = link_list[i].getAttribute("href");
	            	var name_place =  href.indexOf("stuThemeBy");
	            	var cssName = href.slice(name_place);
	            	new_href = href.split(cssName)[0] + title + ".css";
	            	// 结束循环
	            	break;
	            }
	        }
	    }
	    if ( new_href != "" ){
	    	// 创建一个新link标签
	    	var link_style = document.createElement("link");
	    	// 对link标签中的属性赋值
	    	link_style.setAttribute("rel","stylesheet");
	    	link_style.setAttribute("type","text/css");
	    	link_style.setAttribute("href",new_href);
	    	link_style.setAttribute("ty","theme");
	    	// 加载到head中最后的位置
	    	doc_head.appendChild(link_style);	    	
	    }
	},
	/**
	 *  禁用鼠标右键，禁止复制粘贴等操作
	 */
	banCopyAndPaste:function(){
		// 禁止复制
		document.oncopy = function(){event.returnValue = false;};
		// 禁止右键菜单
		document.oncontextmenu = function(){event.returnValue = false;};
		// 禁止网页上选取内容
		document.onselectstart = function(){event.returnValue = false;};
		// 键盘事件，禁止ctrl键
		document.onkeydown = function(){
			if( event.ctrlKey ){
		        return false;
		    }
		};
	},
	//停用
	blockUpDialog:function(blockUp_url,themeUrl,parm){
		$('#blockUp_dialog').dialog({
			isAutoTip:true,              		 //是否自动弹出
			isScrollBar:false,                   //是否禁用滚动条
			isShowBg:true,                       //是否显示背景
			dialogContainer:'#blockUp_dialog',     //弹出窗容器
			dialogBg:'#bg',
			closeBtn:'.close',
			cancelBtn:'.cancel',
			confirmBtn:'.confirm',
			confirmFn:function(targetElemt){                //点击确定按钮--- 1.return true弹出窗会关闭    2.return  false弹出窗不会关闭.  3.targetElemt点击弹出窗显示时发生点击事件的元素.
				$.post(blockUp_url,{idList:parm},
					function (data) {
						var json = Tojson(data);
						if (json.status == 1) {
						   modal_tip($('#succee_tip'),'停用成功！');
						   //重新获取页面题目信息
						   $.post(themeUrl,search_arguments.argument_()).then(function(data){theme_succeeFn(data)});
						};
					});
				return true;
			}
		});
	},
	//删除
	deleteDialog:function(delete_url,themeUrl,parm){
		$('#delete_dialog').dialog({
			isAutoTip:true,              		 //是否自动弹出
			isScrollBar:false,                   //是否禁用滚动条
			isShowBg:true,                       //是否显示背景
			dialogContainer:'#delete_dialog',     //弹出窗容器
			dialogBg:'#bg',
			closeBtn:'.close',
			cancelBtn:'.cancel',
			confirmBtn:'.confirm',
			confirmFn:function(targetElemt){                //点击确定按钮--- 1.return true弹出窗会关闭    2.return  false弹出窗不会关闭.  3.targetElemt点击弹出窗显示时发生点击事件的元素.
				$.post(delete_url,{idList:parm}).then(function(data){
					var json = Tojson(data);
					if (json.status == 1) {
						modal_tip($('#succee_tip'),'删除成功！');
						//重新获取页面题目信息
					   $.post(themeUrl,search_arguments.argument_()).then(function(data){theme_succeeFn(data)});
					};
				});
				return true;
			}
		});
	},
	//启用
	enable:function(enable_url,themeUrl,parm){
		$.post(enable_url,{idList:parm},
		 function (data) {
			var json = Tojson(data);
			if (json.status == 1) {
				modal_tip($('#succee_tip'),'启用成功！');
				//重新获取页面题目信息
				$.post(themeUrl, search_arguments.argument_()).then(function(data){theme_succeeFn(data)});
			};
		});	
	},
	//审核
	auditDialog:function(themeUrl,parm){
		$("#audit_dialog").dialog({
			isAutoTip:true,              		 //是否自动弹出
			isScrollBar:false,                   //是否禁用滚动条
			isShowBg:true,                       //是否显示背景
			dialogContainer:'#audit_dialog',     //弹出窗容器
			dialogBg:'#bg',
			closeBtn:'.close',
			cancelBtn:'.cancel',
			confirmBtn:'.confirm',
			confirmFn:function(targetElemt){                //点击确定按钮--- 1.return true弹出窗会关闭    2.return  false弹出窗不会关闭.  3.targetElemt点击弹出窗显示时发生点击事件的元素.
				var bStop=false;
				function succee(){
					modal_tip($('#succee_tip'),'审核成功！');
					//重新获取页面题目信息
					$.post(themeUrl,search_arguments.argument_()).then(function(data){theme_succeeFn(data)});
				};
				bStop=audit_check(audit_dialog,parm,succee);
				return bStop;                   
			}
		});
	},
	//点击---仅限我的试题
	onlyMyfn:function(obj,fn){
		$('#myTestTheme').click(function(){
			if($(this).children('.checkBoxList').hasClass('checkbox_true_full')){
				$(this).children('.checkBoxList').removeClass('checkbox_true_full');
			}else{
				$(this).children('.checkBoxList').addClass('checkbox_true_full');
			};
			search_arguments.theme_isMine=$(this).children('.checkBoxList').hasClass('checkbox_true_full')?'1':'0';
			fn&&fn();
		});
	},
	//状态点击
	statusToggle:function(obj,fn){
		obj.click(function(){
			publicFn.pageZero();
			$(this).children().addClass('blue').parent().siblings().children().removeClass('blue');
			var index=$(this).index();
			if(index==0){
				search_arguments.theme_status='';
			}else if(index==5){
				search_arguments.theme_status='0';
			}else{
				search_arguments.theme_status=index;
			};
			fn&&fn();
		});
	},
	//翻页
	pageFn:function(fn,fn2){
		$('#gotopage').val(1);
		   model_page = avalon.define("page", function (vm) {
			vm.pageNo=1;
			vm.pageSize=10;
			vm.total=1;
			vm.gotopage=function(t){
				if(t=="pr"){
					if(vm.pageNo<=1){
						vm.pageNo=1;
					}
					else{
						vm.pageNo--;
					}
				}else if(t=="nx"){
					if(vm.pageNo>=vm.total){
						vm.pageNo=vm.total
					}else{
						vm.pageNo++;
					}
				}else if(t=="go"){
					vm.pageNo=$("#gotopage").val();
					 if(vm.pageNo<=1){
						vm.pageNo=1;
					}else if(vm.pageNo>=vm.total){
						vm.pageNo=vm.total
					}
				}
				$("#gotopage").val(vm.pageNo)
				search_arguments.theme_pageSize=vm.pageSize;
				search_arguments.theme_pageNo=vm.pageNo
				if(vm.pageNo>=1&&vm.pageNo<=vm.total){
					fn&&fn();
				};
			};
			avalon.scan();
		});
	},
	//页码归零
	pageZero:function(){
		$('#gotopage').val(1);
		model_page.pageNo=1;
	},
	//ztree
	ztreeFunction:function(fn){
		setting = {
			check: {
				enable: true,
				nocheckInherit: true,
				chkStyle: "checkbox"
				//autoCheckTrigger: true
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "code",
					pIdKey: "parentCode"
				}
			},
			callback: {
				onClick: zTreeOnClick,
				onCheck: checkFn
			},
			view:{
				addDiyDom:addDiyDom
			}
		};
		zNodes = [];
		//ztree是否显示滚动条
		/*function showHideBar(){
			var timer;
			var ztree_parent = $("#ztree_parent"), scrollBar = ztree_parent.children(".scrollBar_con"), treeDemo = $("#treeDemo"), ztreeCon = $("#treeDemo").parent();
			clearTimeout(timer);
			timer=setTimeout(function(){
				if ($("#treeDemo").height() > $("#treeDemo").parent().height()) {
					ztreeCon.width(236);
					 $("#treeDemo").parent().next().show();
					$("#ztree_parent").scrollBar({
						textCon:"#treeDemo",
						btn:".scrollBar"
					});
				}else{
					  ztreeCon.width('100%');
					 $("#treeDemo").parent().next().hide();
				}	
			},200)
		};*/
		function addDiyDom(treeId, treeNode) {
			var aObj = $("#" + treeNode.tId + "_a");
			//showHideBar();
		};
		var IDMark_A = "_a", zTree;
		function zTreeOnClick(event, treeId, treeNode) {
			zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.expandNode(treeNode, "", false, true, true);
			//showHideBar();
		};
		var iNow=0;
		//选中ztree
		function checkFn(event, treeId, treeNode) {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			var nodes = treeObj.getCheckedNodes(true);//获取选中的节点
			var aAllNode = treeObj.getNodes();
			var arr = [];
			var aLevel = [];//获取选中项level =0 的想
			for (var i = 0, len = nodes.length; i < len; i++) {
				arr.push(nodes[i].code);
				if(nodes[i].level=="0"){
					aLevel.push(nodes[i]);
				}
			};
			model_page.pageNo=1;
			$('#gotopage').val('1');
			search_arguments.theme_categoryItemCode = arr.join();//分类项编码
			if(search_arguments.theme_categoryItemCode.length>0){
				if($("#allSince_btn").hasClass("longGrayBtn")){
					$("#allSince_btn").removeClass("longGrayBtn").addClass("longBlueBtn");
				}
			}else{
				if($("#allSince_btn").hasClass("longBlueBtn")){
					$("#allSince_btn").removeClass("longBlueBtn").addClass("longGrayBtn");
				}
			}
			if(aAllNode.length!=aLevel.length){
				if($("#leftChekAll").hasClass("leftCheck")){
					$("#leftChekAll").removeClass("leftCheck").addClass("leftUnCheck");
				}
			}else{
				if($("#leftChekAll").hasClass("leftUnCheck")){
					$("#leftChekAll").removeClass("leftUnCheck").addClass("leftCheck");
				}
			}

		};
		function CancelAllNodes() {
	        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	        treeObj.checkAllNodes(false);
	    }
		function CheckAllNodes() {
	        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	        treeObj.checkAllNodes(true);
	        var nodes = treeObj.getCheckedNodes(true);
	        var arr = [];
			for (var i = 0, len = nodes.length; i < len; i++) {
				arr.push(nodes[i].code);
			};
			search_arguments.theme_categoryItemCode = arr.join();//分类项编码
			if(search_arguments.theme_categoryItemCode.length>0){
				if($("#allSince_btn").hasClass("longGrayBtn")){
					$("#allSince_btn").removeClass("longGrayBtn").addClass("longBlueBtn");
				}
			}else{
				if($("#allSince_btn").hasClass("longBlueBtn")){
					$("#allSince_btn").removeClass("longBlueBtn").addClass("longGrayBtn");
				}
			}
	    
	    }
		
		$("#allSince_btn").click(function(){
			if($(this).hasClass("longGrayBtn")){
				return;
			}
			fn&&fn();
		});
		//101新增 全选的功能
		$("#leftChekAll").click(function(){
			if($(this).hasClass("leftUnCheck")){
				$(this).removeClass("leftUnCheck").addClass("leftCheck");
				CheckAllNodes();
			}else{
				$(this).removeClass("leftCheck").addClass("leftUnCheck");
				CancelAllNodes();
				if($("#allSince_btn").hasClass("longBlueBtn")){
					$("#allSince_btn").removeClass("longBlueBtn").addClass("longGrayBtn");
				}
			}
		});
	},
	//ztree
	ztreeFunctionTwo:function(fn){
		setting = {
			view: {
				dblClickExpand: false,
				showLine: false
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "code",
					pIdKey: "parentCode"
				}
			},
			callback: {
				onClick: zTreeOnClick
			}
		};
		zNodes = [];
		var IDMark_A = "_a", zTree;
		function zTreeOnClick(event, treeId, treeNode) {
			zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.expandNode(treeNode, "", false, true, true);
			
			var nodes = zTree.getSelectedNodes(),//获取选中的节点
				arr = [],aname = [],aLevel = [],ptid_L=[];
			for(var i =0;i<nodes.length;i++){
				arr.push(nodes[i].code);
				aname.push(nodes[i].name);
				ptid_L.push(nodes[i].parentTId)
				aLevel.push(nodes[i].level);
			}
			search_arguments.theme_categoryItemLevel = aLevel.join();
			search_arguments.theme_categoryItemCode = arr.join();
			search_arguments.checkedCodeNum = arr.join();
			search_arguments.checkedCodeName = aname.join();
			search_arguments.checkedCodeParentTId = ptid_L.join();
			
			if (treeNode.isParent){// 判断是否是父节点
				search_arguments.isParent = true;
			}else{
				search_arguments.isParent = false;
			}
			fn&&fn();
		};
		var iNow=0;
		
	},
	//ztree3
	ztreeFunctionThree:function(pid){
		setThree = {
			view: {
				dblClickExpand: false,
				showLine: false
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "code",
					pIdKey: "parentCode"
				}
			},
			callback: {
				onClick: zTreeOnClick
			}
		};
		var ztreeThree;
		function zTreeOnClick(event, treeId, treeNode) {
			ztreeThree = $.fn.zTree.getZTreeObj("edit_treeDemo");
			ztreeThree.expandNode(treeNode, "", false, true, true);
			
			var nodes = ztreeThree.getSelectedNodes();//获取选中的节点
			for(var i =0;i<nodes.length;i++){
				if( !treeNode.isParent ){
					$("#"+pid).val(nodes[i].name);
					$("#"+pid).attr("classifiTreeId", nodes[i].code);
					$("#"+pid).attr("relationItemCode", nodes[i].relationItemCode);
				}
			}
		};
	},
	//全选
	allChooseFn:function(obj,isBool){
		$('#allChoose').click(function(){
			var oLi=null,id=obj[0].id;
			switch(id){
				case 'manualCotainer':
					oLi=$('#manualCotainer>.themeArea>ul').children('li');
					break;
				case 'right_themeArea':
					oLi=$('#right_themeArea>.themeArea>.themeList').children('li');
					break;
			};
			if($(this).hasClass('checkbox_true_full')){
				$(this).removeClass('checkbox_true_full');
				oLi.find('.checkBoxList').removeClass('checkbox_true_full');
				oLi.removeClass('current');
				checkBoxList_num=0;
				choose_theme_status.length=0;//清空选中的
			}else{
				$(this).addClass('checkbox_true_full');
				oLi.find('.checkBoxList').addClass('checkbox_true_full');
				oLi.addClass('current');
				checkBoxList_num=oLi.find('.checkBoxList').length;
				if(!isBool){
					for(var i=0;i<themem_status_operateItems.length;i++){
						choose_theme_status.push({'operateItems':themem_status_operateItems[i].operateItems,'id':themem_status_operateItems[i].id});
					};
				}
			};
			if(!isBool){
				publicFn.isStautsColor();
			};
		});
	},
	//点击---checkboxlist选中(第一种情况)
	checkboxFn:function(obj){
		obj.on('click','.checkBoxList',function(){
			var index=$(this).parents('ul').index();//利用索引获取当前选中题目的id
			if($(this).hasClass('checkbox_true_full')){
				var oLi=null;type=obj.parent()[0].id
				switch(type){
					case 'right_themeArea':
						oLi=$('#right_themeArea>.themeArea>.themeList').children('li');
						break;
					case 'rightContainer':
						oLi=$('#rightContainer>.themeArea>ul').children('li');
						break;
					case 'manualCotainer':
					     oLi=$('#manualCotainer>.themeArea>ul').children('li');
						 break;
				};
				oLi.removeClass('current');
				$(this).removeClass('checkbox_true_full');
				checkBoxList_num--;
				//不好直接删除choose_theme_status里面的项，没删除一次直接获取题目列表中选中的题目
				choose_theme_status.length=0;
				for(var i=0;i<oLi.find('.checkbox_true_full').length;i++){
					var currentIndex=oLi.find('.checkbox_true_full').eq(i).parents('ul').index();
					oLi.find('.checkbox_true_full').eq(i).parents('li').addClass('current');
					choose_theme_status.push({'operateItems':themem_status_operateItems[currentIndex].operateItems,'id':themem_status_operateItems[currentIndex].id})
				};
			}else{
				$(this).addClass('checkbox_true_full');
				$(this).parents('li').addClass('current');
				checkBoxList_num++;
				choose_theme_status.push({'operateItems':themem_status_operateItems[index].operateItems,'id':themem_status_operateItems[index].id});
			};
			checkBoxList_num==obj.find('.checkBoxList').length?$('#allChoose').addClass('checkbox_true_full'):$('#allChoose').removeClass('checkbox_true_full');
			publicFn.isStautsColor();
		});
	},
	//点击---checkboxlist选中(第二种情况)
	checkboxFn_second:function(obj,fn1,fn2){
		obj.on('click','.checkBoxList',function(){
				var index=$(this).parents('ul').index();//利用索引获取当前选中题目的id
				if($(this).hasClass('checkbox_true_full')){
					var oLi=null;type=obj.parent()[0].id
					switch(type){
						case 'right_themeArea':
							oLi=$('#right_themeArea>.themeArea>.themeList').children('li');
							break;
						case 'rightContainer':
							oLi=$('#rightContainer>.themeArea>ul').children('li');
							break;
						case 'manualCotainer':
							 oLi=$('#manualCotainer>.themeArea>ul').children('li');
							 break;
					};
					oLi.removeClass('current');
					$(this).removeClass('checkbox_true_full');
					checkBoxList_num--;
					fn1&&fn1($(this));
			}else{
				$(this).addClass('checkbox_true_full');
				$(this).parents('li').addClass('current');
				checkBoxList_num++;
				//mergeTestPaper.html
				fn2&&fn2($(this));
			};
			checkBoxList_num==obj.find('.checkBoxList').length?$('#allChoose').addClass('checkbox_true_full'):$('#allChoose').removeClass('checkbox_true_full');
		});
	},
	//获取到当前选中题目能操作功能的个数
	status:function(){
		audit_arr=[], remove_arr=[], disable_arr=[];
		var canAudit=0,canRemove=0,canDisable=0;
		if(choose_theme_status.length){
			for(var i=0;i<choose_theme_status.length;i++){
				if(choose_theme_status[i].operateItems.canAudit==true){
					canAudit++;
					audit_arr.push(choose_theme_status[i].id);
				};
				if(choose_theme_status[i].operateItems.canRemove==true)
				{
					canRemove++;
					remove_arr.push(choose_theme_status[i].id);
				};
				if(choose_theme_status[i].operateItems.canDisable==true){
					canDisable++;
					disable_arr.push(choose_theme_status[i].id);
				};
			};
		};
		return {audit:canAudit,remove:canRemove,disable:canDisable};
	},
	//使代表操作功能的color变色
	isStautsColor:function(){
		this.status().audit?$('#auditArea').addClass('blue'):$('#auditArea').removeClass('blue');      //审核功能
		this.status().remove?$('#delArea').addClass('blue'):$('#delArea').removeClass('blue');         //删除功能
		this.status().disable?$('#blockUpArea').addClass('blue'):$('#blockUpArea').removeClass('blue');//停用功能
	},
	//
	searchFn:function(fn){
		require(["mmRequest/public/mmRequest.js", "dropdown/avalon.dropdown" , "datepicker/avalon.daterangepicker"], function (avalon) {
			$('#advancedSeacher').click(function(){
				$(this).parent().hide();
				$('#advancedHide').parent().show();
			});
			$('#advancedHide').click(function(){
				$(this).parent().hide();
				$('#ads').hide();
				$('#advancedSeacher').parent().show();
			});
			$(document).click(function(e){
				 var elem=$(e.target).closest($("#ads").children('ul'));
				 if($(e.target).hasClass('ui-dropdown-icon')){
					return false;
				 };
				 if(!elem.length&&$("#jin_waise").is(":visible")){
					 $("#jin_waise").hide();
					 $("#jin_waise").remove();
					 $(".jin-adseach li").removeClass("in");
				 };
			});
		   /*全文检索*/
		   addso=function(that) {
			   publicFn.pageZero();
			   if(isFirLoad){
				   if(!$.isEmptyObject(search_arguments.theme_extAttr)){
					   search_arguments.theme_extAttr = {};
				   }; 
			   }
			   isFirLoad = false;
				var index = $(that).siblings("select,input,p").attr("index");
				var val_jin = "";
				
				var dat = adseach.seachBt[index];
				
				if (dat.type == "Text" || dat.type == "Integer"){
					val_jin = $(that).siblings("input").val();
				};
				if (dat.type == "Enum" || dat.type=="Multi") {
					val_jin = $(that).siblings("select").val();
				};
				if (dat.type == "Date") {
					if(date.fromEmpty==null||date.toEmpty==null) return;
					val_jin = date.fromEmpty + "," + date.toEmpty;
					
				};
				if(val_jin==''){
					return;
				};
				var name = dat.name;
				for (var i = adseach.tiaojian.length - 1; i >= 0; i--) {
					adseach.tiaojian[i].name;
					if (adseach.tiaojian[i].name==name) {
						adseach.tiaojian.splice(i, 1);
					};
				};
				search_arguments.addExtAttr(dat.name, val_jin);//传送接口
				fn&&fn();
				if(dat.displayName=='题型'){
					val_jin = $(that).siblings("select").val();
					var elem=$(that).siblings("select").children();
					for(var i=0;i<elem.length;i++){
						if(val_jin==elem[i].value){
							val_jin=elem[i].label
							break;
						};
					};
				};
				adseach.tiaojian.push({
					displayName: dat.displayName + ":" + val_jin,
					value: val_jin,
					name: dat.name
				});
				//$("#jin_waise").hide();
				//$("#jin_waise").remove();
				//$(".jin-adseach li").eq(index).removeClass("in");
			};
			 /*状态*/
			fullT = avalon.define("fulltxt",function(jinmm){
				jinmm.showAdSearch = function(){
					if($("#ads").is(":hidden")){
						$("#ads").show();
					}else
					{
						$("#ads").hide();
					}
				};
				//查询
				jinmm.fullt=function(me){
					publicFn.pageZero();
					var t=$(me).prev("input");
					search_arguments.fulltext=t.val();
					fn&&fn();
				};
			});
			adseach = avalon.define("adseach", function (vm) {
				vm.seachBt = [];
				vm.tiaojian = [];
				vm.soseach = function (j_, me) {
					var that = $(me);
					var thisbaba = $(me).parent();
					var thisarr = vm.seachBt[j_], input = "", tpl = "";
					$(".jin-showseach").remove();
					that.siblings().removeClass("in");
					that.addClass("in");
					if (thisarr.type == "Text") {
						input = '<input type="text" value=""  required="required" class="text vm cr_c" style="width:180px;" id="' + thisarr.name + '" index="' + j_ + '">';
					} else if (thisarr.type == "Enum" || thisarr.type =="Multi") {
						var myaa=null;
						var szu = [];
						if(thisarr.displayName=='题型'){
							myaa=thisarr.values;
							$.each(myaa, function (index, val) {
								szu.push('<option value="'+myaa[index].id+'" label="'+myaa[index].value+'">' + myaa[index].value + '</option>');
							});
							input = '<select ms-widget="dropdown" ms-duplex="value" index="' + j_ + '">' + szu.join("") + "</select>";
						}else{
							myaa = thisarr.values.split(" ");
							$.each(myaa, function (index, val) {
								szu.push('<option value="' + val + '">' + val + "</option>");
							});
							input = '<select ms-widget="dropdown" ms-duplex="value" index="' + j_ + '">' + szu.join("") + "</select>";
						}
					} else if (thisarr.type == "Date") {
						input = '<p ms-widget="daterangepicker" class="fl" index="' + j_ + '" data-daterangepicker-duplex="fromEmpty, toEmpty"></p>';
					} else if (thisarr.type == "tree") {
						input = '<input id="citySel" type="text" onclick="showMenu(); return false;" value="" class="text vm cr_c" style="width:120px;"/> <div id="menuContent" class="menuContent" style="display:none;position: absolute;"><ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul></div>';
					} else if (thisarr.type == "Integer") {
						input = '<input type="text" value="" required="required" class="text vm cr_c" style="width:180px;" id="' + thisarr.name + '" index="' + j_ + '">';
					}
					tpl = '<div class="jin-showseach none" id="jin_waise" ms-controller="dropdown"><div class="jin-seachin pr" >' + input + '<input type="submit" class="bg_icon vm searchBtn ml5" value="" onclick="addso(this)"></div></div>';
					thisbaba.append(tpl);
					avalon.scan();
					if (thisarr.type == "Date") $("#jin_waise").css({
						width: "360px"
					});
					if (thisarr.type == "tree") $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//					var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
//					treeObj.checkAllNodes(false);
					var d=$("#jin_waise");
					var position=that.position();
					if(position.left+d.width()+50>$(window).width()){
						d.css({top:position.top+that.height(),left:position.left-d.width()+that.outerWidth()-3});
					}else{
						if(that.index()==0){
							d.css({top:position.top+that.height(),left:position.left})
						}else{
							d.css({top:position.top+that.height(),left:position.left-1})
						};
					};
					$(".jin-showseach").show();
					avalon.scan();
				};
				//删除
				vm.del = function (me) {
					search_arguments.removeExtAttr(vm.tiaojian[me].name);//传送接口
					vm.tiaojian.splice(me, 1);
					fn&&fn();
					avalon.scan();
				};
			});
			date = avalon.define("dropdown", function (vm){
				vm.opts={
					width: 180,
					listWidth: 180
				};
				vm.fromEmpty = null;
				vm.toEmpty = null;
			});
			$.post(URL.QuestionExt,"",function (a) {
				var clist = Tojson(a);
				var questionTypeValue=[];
				adseach.seachBt = clist.data.searchResult;
				$.post(URL.GetQuestionTypeList,{"categoryId":"2","codes":""}).then(function(data){
					var data=Tojson(data);
					var questionTypeData=data.data.searchResult;
					for(var i=0;i<questionTypeData.length;i++){
						questionTypeValue.push({value:questionTypeData[i].name,id:questionTypeData[i].id})
					};
					var fixedAttr=[{'type':"Enum",'displayName':'题型','name':'questionTypeId','values':questionTypeValue},{'type':"Text",'displayName':'题干','name':'stem'},{'type':"Text",'displayName':'解析','name':'solvingProcess'},{'type':"Integer",'displayName':'难度','name':'difficultyDegree'},{'type':"Integer",'displayName':'分数','name':'score'},{'type':"Text",'displayName':'编号','name':'number'},{'type':"Integer",'displayName':'使用次数','name':'usedCount'},{'type':"Date",'displayName':'曝光时间','name':'exposureTime'},{'type':"Integer",'displayName':'正确率','name':'correctRate'}];
					fixedAttr.reverse();
					for(var i=0;i<fixedAttr.length;i++){
						adseach.seachBt.unshift(fixedAttr[i]);
					};
				});
			}, "text");
			avalon.scan();
		});
	},
	//试卷高级搜索
	TestsearchFn:function(fn){
		require(["mmRequest/public/mmRequest.js", "dropdown/avalon.dropdown" , "datepicker/avalon.daterangepicker"], function (avalon) {
			$('#advancedSeacher').click(function(){
				$(this).parent().hide();
				$('#advancedHide').parent().show();
			});
			$('#advancedHide').click(function(){
				$(this).parent().hide();
				$('#ads').hide();
				$('#advancedSeacher').parent().show();
			});
			$(document).click(function(e){
				 var elem=$(e.target).closest($("#ads").children('ul'));
				 if($(e.target).hasClass('ui-dropdown-icon')){
					return false;
				 };
				 if(!elem.length&&$("#jin_waise").is(":visible")){
					 $("#jin_waise").hide();
					 $("#jin_waise").remove();
					 $(".jin-adseach li").removeClass("in");
				 };
			});
		   /*全文检索*/
		   testaddso=function(that) {
				var index = $(that).siblings("select,input,p").attr("index");
				var val_jin = "";
				var dat = adseach.TestseachBt[index];
				if (dat.type == "Text" || dat.type == "Integer"){
					val_jin = $(that).siblings("input").val();
				};
				if (dat.type == "Enum") {
					val_jin = $(that).siblings("select").val();
				};
				if (dat.type == "Date") {
					if(date.fromEmpty==null||date.toEmpty==null) return;
					val_jin = date.fromEmpty + "," + date.toEmpty;
					
				};
				if(val_jin==''){
					return;
				};
				var name = dat.name;
				for (var i = adseach.Testtiaojian.length - 1; i >= 0; i--) {
					adseach.Testtiaojian[i].name;
					if (adseach.Testtiaojian[i].name==name) {
						adseach.Testtiaojian.splice(i, 1);
					};
				};
				search_arguments.addExtAttr(dat.name, val_jin);//传送接口
				fn&&fn();
				if(dat.displayName=='题型'){
					val_jin = $(that).siblings("select").val();
					var elem=$(that).siblings("select").children();
					for(var i=0;i<elem.length;i++){
						if(val_jin==elem[i].value){
							val_jin=elem[i].label;
							break;
						};
					};
				};
				adseach.Testtiaojian.push({
					displayName: dat.displayName + ":" + val_jin,
					value: val_jin,
					name: dat.name
				});
				
			};
			 /*状态*/
			fullT = avalon.define("fulltxt",function(jinmm){
				jinmm.showAdSearch = function(){
					if($("#ads").is(":hidden")){
						$("#ads").show();
					}else
					{
						$("#ads").hide();
					}
				};
				//查询
				jinmm.fullt=function(me){
					var t=$(me).prev("input");
					search_arguments.fulltext=t.val();
					fn&&fn();
				};
			});
			adseach = avalon.define("adseach", function (vm) {
				vm.TestseachBt = [];
				vm.Testtiaojian = [];
				vm.Testsoseach = function (j_, me) {
					var that = $(me);
					var thisbaba = $(me).parent();
					var thisarr = vm.TestseachBt[j_], input = "", tpl = "";
					$(".jin-showseach").remove();
					that.siblings().removeClass("in");
					that.addClass("in");
					if (thisarr.type == "Text") {
						input = '<input type="text" value=""  required="required" class="text vm cr_c" style="width:180px;" id="' + thisarr.name + '" index="' + j_ + '">';
					} else if (thisarr.type == "Enum") {
						var myaa=null;
						var szu = [];
						if(thisarr.displayName=='题型'){
							myaa=thisarr.values;
							$.each(myaa, function (index, val) {
								szu.push('<option value="'+myaa[index].id+'" label="'+myaa[index].value+'">' + myaa[index].value + '</option>');
							});
							input = '<select ms-widget="dropdown" ms-duplex="value" index="' + j_ + '">' + szu.join("") + "</select>";
						}else{
							myaa = thisarr.values.split(" ");
							$.each(myaa, function (index, val) {
								szu.push('<option value="' + val + '">' + val + "</option>");
							});
							input = '<select ms-widget="dropdown" ms-duplex="value" index="' + j_ + '">' + szu.join("") + "</select>";
						}
					} else if (thisarr.type == "Date") {
						input = '<p ms-widget="daterangepicker" class="fl" index="' + j_ + '" data-daterangepicker-duplex="fromEmpty, toEmpty"></p>';
					} else if (thisarr.type == "tree") {
						input = '<input id="citySel" type="text" onclick="showMenu(); return false;" value="" class="text vm cr_c" style="width:120px;"/> <div id="menuContent" class="menuContent" style="display:none;position: absolute;"><ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul></div>';
					} else if (thisarr.type == "Integer") {
						input = '<input type="text" value="" required="required" class="text vm cr_c" style="width:180px;" id="' + thisarr.name + '" index="' + j_ + '">';
					}
					tpl = '<div class="jin-showseach none" id="jin_waise" ms-controller="dropdown"><div class="jin-seachin pr" >' + input + '<input type="submit" class="bg_icon vm searchBtn ml5" value="" onclick="testaddso(this)"></div></div>';
					thisbaba.append(tpl);
					avalon.scan();
					if (thisarr.type == "Date") $("#jin_waise").css({
						width: "360px"
					});
					if (thisarr.type == "tree") $.fn.zTree.init($("#treeDemo"), setting, zNodes);
					var d=$("#jin_waise");
					var position=that.position();
					if(position.left+d.width()+50>$(window).width()){
						d.css({top:position.top+that.height(),left:position.left-d.width()+that.outerWidth()-3});
					}else{
						if(that.index()==0){
							d.css({top:position.top+that.height(),left:position.left})
						}else{
							d.css({top:position.top+that.height(),left:position.left-1})
						};
					};
					$(".jin-showseach").show();
					avalon.scan();
				};
				//删除
				vm.del = function (me) {
					search_arguments.removeExtAttr(vm.Testtiaojian[me].name);//传送接口
					vm.Testtiaojian.splice(me, 1);
					fn&&fn();
					avalon.scan();
				};
			});
			date = avalon.define("dropdown", function (vm){
				vm.opts={
					width: 180,
					listWidth: 180
				};
				vm.fromEmpty = null;
				vm.toEmpty = null;
			});
			$.post(URL.sPaperExt,"",function (a) {
				var clist = Tojson(a);
				
				adseach.TestseachBt = clist.data.searchResult;
				
			}, "text");
			avalon.scan();
		});
	}
};
/**
 * oItem表示单个题目
 * 处理每道题的答案
 */
function HandleData(oItem){
	 
     var sModel = oItem.answerMode;
     if(sModel =="SingleSelection"){
     	var aAnsOptions = oItem.answerArea.optionList;
     	var sAnsId = oItem.answer.id;
     	var iopLen = aAnsOptions.length;
     	if(iopLen>0){
     		for(var z = 0;z<iopLen;z++){
     			if(sAnsId == aAnsOptions[z].id){
     				oItem.answer.id = z+"";
     				break;
     			}
     		}
     	}
     }else if(sModel =="MultiSelection"){
     	var aAnsOptions = oItem.answerArea.optionList;
     	var sAnsList = oItem.answer.idList;
     	var iopLen = aAnsOptions.length;
     	var aIndex = [];
     	if(iopLen>0){
     		for(var z = 0;z<iopLen;z++){
     			for(var c=0;c<sAnsList.length;c++){
     				if(sAnsList[c] ==aAnsOptions[z].id){
     					aIndex.push(z);
     					break;
     				}
     			}
     		}
     	}
     	if(sAnsList.length>0){
     		for(var b=0;b<sAnsList.length;b++){
     			aIndex = aIndex.sort();
     			sAnsList[b] = aIndex[b]+"";
     		}
     	}
     }else if(sModel =="Composite"){
    	//和resources\assets\js\public.js不一样（subqustionList）
     	var aSubQuestion = oItem.subqustionList;
     	var iSubLen = aSubQuestion.length;
     	if(iSubLen>0){
     		for(var d=0;d<iSubLen;d++){
     			var sSubModel = aSubQuestion[d].answerMode;
     			var oSubItem = aSubQuestion[d];
     			if(sSubModel =="SingleSelection"){
                 	var aAnsOptions = oSubItem.answerArea.optionList;
                 	var sAnsId = oSubItem.answer.id;
                 	var iopLen = aAnsOptions.length;
                 	if(iopLen>0){
                 		for(var z = 0;z<iopLen;z++){
                 			if(sAnsId == aAnsOptions[z].id){
                 				oSubItem.answer.id = z+"";
                 				break;
                 			}
                 		}
                 	}
                 }else if(sSubModel =="MultiSelection"){
                 	var aAnsOptions = oSubItem.answerArea.optionList;
                 	var sAnsList = oSubItem.answer.idList;
                 	var iopLen = aAnsOptions.length;
                 	var aSubIndex = [];
                 	if(iopLen>0){
                 		for(var z = 0;z<iopLen;z++){
                 			for(var c=0;c<sAnsList.length;c++){
                 				if(sAnsList[c] ==aAnsOptions[z].id){
                 					aSubIndex.push(z);
                 					break;
                 				}
                 			}
                 		}
                 	}
                 	if(sAnsList.length>0){
                 		for(var b=0;b<sAnsList.length;b++){
                 			aSubIndex = aSubIndex.sort();
                 			sAnsList[b] = aSubIndex[b]+"";
                 		}
                 	}
                 }
     		}
     	}
     	
     }
}
/**
 * oItem表示单个题目
 * 处理判断--判断改错题的答案
 */
function HandleJudAndMisData(oItem){
	 
     var sModel = oItem.answerMode;
     if((sModel =="Judgement")||(sModel =="JudgementCorrectsMistakes")){
     	var aAnsOptions = oItem.answerArea.optionList;
     	var sAnsId = oItem.answer.id;
     	var iopLen = aAnsOptions.length;
     	
     	if(iopLen>0){
     		for(var z = 0;z<iopLen;z++){
     			if(sModel =="JudgementCorrectsMistakes"){
     				//选项
     				if(aAnsOptions[z].content.trim()=="T"){
     					oItem.answerArea.optionList[z].content="对";
     				}else if(aAnsOptions[z].content.trim()=="F"){
     					oItem.answerArea.optionList[z].content="错";
     				}
     				//答案
     				if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="对")||(aAnsOptions[z].content=="T")||(aAnsOptions[z].content.trim()=="正确"))){
         				//判断改错题里面有个字段content，为了不重复
         				oItem.answer.Changecontent = "对";
         				oItem.answer.isTrueOrFal = "IsTrue";
         			}
         			if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="错")||(aAnsOptions[z].content=="F")||(aAnsOptions[z].content.trim()=="错误"))){
         				oItem.answer.Changecontent = "错";
         				oItem.answer.isTrueOrFal = "IsFalse";
         			}
 					
 				}else{
 					//选项
 					if(aAnsOptions[z].content=="T"){
     					oItem.answerArea.optionList[z].content="对";
     				}else if(aAnsOptions[z].content=="F"){
     					oItem.answerArea.optionList[z].content="错";
     				}
 					//答案
 					if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="对")||(aAnsOptions[z].content=="T")||(aAnsOptions[z].content.trim()=="正确"))){
 	     				//判断改错题里面有个字段content，为了不重复
 	     				oItem.answer.Changecontent = "对";
 	     			}
 	     			if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="错")||(aAnsOptions[z].content=="F")||(aAnsOptions[z].content.trim()=="错误"))){
 	     				oItem.answer.Changecontent = "错";
 	     			}
 				}
     			
     		}
     	}
     }else if(sModel =="Composite"){
    	//和resources\assets\js\public.js不一样（subqustionList）
     	var aSubQuestion = oItem.subqustionList;
     	var iSubLen = aSubQuestion.length;
     	if(iSubLen>0){
     		for(var d=0;d<iSubLen;d++){
     			var sSubModel = aSubQuestion[d].answerMode;
     			var oSubItem = aSubQuestion[d];
     			if((sSubModel =="Judgement")||(sSubModel =="JudgementCorrectsMistakes")){
                 	var aAnsOptions = oSubItem.answerArea.optionList;
                 	var sAnsId = oSubItem.answer.id;
                 	var iopLen = aAnsOptions.length;
                 	if(iopLen>0){
                 		for(var z = 0;z<iopLen;z++){
                 			if(sSubModel =="JudgementCorrectsMistakes"){
                 				if(aAnsOptions[z].content=="T"){
                 					oSubItem.answerArea.optionList[z].content="对";
                 				}else if(aAnsOptions[z].content=="F"){
                 					oSubItem.answerArea.optionList[z].content="错";
                 				}
                 				if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="对")||(aAnsOptions[z].content=="T")||(aAnsOptions[z].content.trim()=="正确"))){
                     				oSubItem.answer.Changecontent = "对";
                     				oSubItem.answer.isTrueOrFal = "IsTrue";
                     			}
                     			if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="错")||(aAnsOptions[z].content=="F")||(aAnsOptions[z].content.trim()=="错误"))){
                     				oSubItem.answer.Changecontent = "错";
                     				oSubItem.answer.isTrueOrFal = "IsFalse";
                     			}
                 			}else{
                 				if(aAnsOptions[z].content=="T"){
                 					oSubItem.answerArea.optionList[z].content="对";
                 				}else if(aAnsOptions[z].content=="F"){
                 					oSubItem.answerArea.optionList[z].content="错";
                 				}
                 				if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="对")||(aAnsOptions[z].content=="T")||(aAnsOptions[z].content.trim()=="正确"))){
                     				oSubItem.answer.Changecontent = "对";
                     			}
                     			if((sAnsId == aAnsOptions[z].id)&&((aAnsOptions[z].content.trim()=="错")||(aAnsOptions[z].content=="F")||(aAnsOptions[z].content.trim()=="错误"))){
                     				oSubItem.answer.Changecontent = "错";
                     			}
                 			}
                 			
                 		}
                 	}
                 }
     		}
     	}
     }
}
/**
 * 处理填空题
 * @param oItem 单个题目的数据
 * @param pageType 来自哪个页面
 */
function HandleBanking(aBankAnsList,aCom_BankList,pageType){
	
    if(aBankAnsList.length>0){
		var aH_Bank = $("."+pageType+" .blankFilling");//页面填空题的html
		
		for(var i=0;i<aBankAnsList.length;i++){
			var aAnsAreaList = aBankAnsList[i].answer.pairList;
			var iAnsAreaLen = aBankAnsList[i].answer.pairList.length;
			var sHItem = aH_Bank[i];
			var aHAns = $(sHItem).find("span.banking");
			if(iAnsAreaLen>0){
				for(var j=0;j<iAnsAreaLen;j++){
					var oHans = aHAns[j];
					$(oHans).html(aAnsAreaList[j].contentList[0]);
				}
			}
		}
	}
	//复合题目下面的填空处理
	if(aCom_BankList.length>0){
		var aH_Bank = $("."+pageType+" .c_blankFilling");//页面填空题的html
		
		for(var i=0;i<aCom_BankList.length;i++){
			var aAnsAreaList = aCom_BankList[i].answer.pairList;
			var iAnsAreaLen = aCom_BankList[i].answer.pairList.length;
			var sHItem = aH_Bank[i];
			var aHAns = $(sHItem).find("span.banking");
			if(iAnsAreaLen>0){
				for(var j=0;j<iAnsAreaLen;j++){
					var oHans = aHAns[j];
					$(oHans).html(aAnsAreaList[j].contentList[0]);
				}
			}
		}
	}
}
//去掉html的标签(ztree,左侧)
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}

// 删除数组中某个元素，并且修改下标，返回新数组
Array.prototype.del = function(n){
	if (n<0){
		return this;
	}else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
}

