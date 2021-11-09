OTSBusinessLogicFn = function(){

        var data_arguments = {
            oReqParam:{},//url中的值
            AnswerId:"",//试卷详情id
            viewCorrection:"",//是否显示纠错
            sRepVar : /<var.*?\/var>/gi,//替换填空题
            sRepLine : /\_{3,}/g,
            sarrangementId : "",//试卷id
            sUserName : "",
            sIp:"",
            clockTimer : "",//定时器
            sTtayInPage : "true",//是否停留在当前页面
            closePageAfterSubmit : false ,//是否关闭当前页面
            isShowHF : "",// 是否显示头尾
            externalUrl : "",// 提交成功后跳转的外部链接
            resourcePackageId:"",
            bankingAreaList:['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮','⑯','⑰','⑱','⑲','⑳'],
            takePhotoInTest:false,//是否进行视频拍照
            photoBeginTest:false,//是否在考试前已经拍照，默认为false
            photoEndTest:false,//是否在考试结束时已拍照，默认为false
            sJudgementMode :2,//是否评阅
            sdelayed:false,//是否进行延迟判分
            currentStatus:"",//获取试卷是正在作答还是暂时保存状态
            corrEditor: "", // 纠错编辑器
            userCheckCode:"",
            isInitScroll: false // 是否已经初始化滚动条
        };
        //页面主模板
        var ansDetail_theme = avalon.define({
            $id:"ansDetail_theme",// 模板id
            testName:"",//试卷名称
            queSubTime:"",//交卷时间
            achievementType:"",//分数质(正确率)
            LayoutMode:"",// 试卷显示方式(0:整卷显示;1:逐题显示;2:分页
            canViewAnswer:true,//是否显示答案解析
            startPaperResponse:"",//是否显示解析
            queScore:"",//试卷分数
            ansDetail_arr:[], //得到试题列表信息
            answer_number:['','正确','错误'],
            serial_number:['A','B','C','D','E','F','G','H','I','J'],
            bankingAreaList: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮','⑯','⑰','⑱','⑲','⑳'],
            comp :"",//是否综合试卷
            SRootId :"",//获取最顶层的id
            /** 模板：各个显示层需要的模板原型；显示层表现为;:html --- start **/
            queListTmp:"",//试题列表显示模板
            quetitleAreaTemp:"",// 试题题干显示模板
            queCompositeMode:"",// 复合题显示模板
            sub_quetitleAreaTemp:"",// 复合题 -- 试题题干显示模板
            /** 各个显示层中模板的数据绑定原型；显示层表现为:for -- start **/
            queTypeDefault_vm:[],// 默认显示的试题列表
            questions_vm:[],// 试题显示列表
            queNum:0,//试卷试题数量
            lastQueNum:0,//答题数量
            /** 大题题干括号后内容start **/ 
            showEachScore: true, // 是否显示每题多少分
            showQuestionCount: true, // 是否显示共多少题
            showTotalScore: true, // 是否显示大题总分
            /** 大题题干括号后内容end **/
            queNumFn_c: function ($event) { //点击试题题号响应事件
                StartAnsFn.queNumFn_c($event);
            },
            dlMouOverFn_c: function ($event) { //鼠标滑过试题
                StartAnsFn.dlMouOverFn_c($event);
            },
            topicFn_c: function ($event) { // 试题区域功能点击事件；编辑、复制、删除、停用、审核、纠错、查重
                StartAnsFn.topicFn_cFn($event);
            },
            dlMouOutFn_c: function ($event) { //鼠标滑出试题
                StartAnsFn.dlMouOutFn_c($event);
            }
        });
        //获取URL参数
        data_arguments.oReqParam = publicFn.getRequest().ulrParameters;
        if(data_arguments.oReqParam){
            if(data_arguments.oReqParam.AnswerId){
                data_arguments.AnswerId = data_arguments.oReqParam.AnswerId;
            }
        }
        function initDetail(){
            var detail_url = publicFn.getUlrFromeInterface('QueryAnswerPaperDetails');
            //添加遮罩防止多次提交
            Common.LightBox.show();
            Common.postRequest({
                    method : detail_url,
                    params : {answerPaperRecordId:data_arguments.AnswerId}
                }).then(function(AnswerDetailList){
                    oAnswerDetailList = publicFn.toJsonObj(AnswerDetailList).data;
                      //当成绩为0的时候不能查看答案
                    if(oAnswerDetailList&&(oAnswerDetailList.achievementType=="999")){
                        $('#confirm_dialog').myPlugin({
                            TitVal:"<div>成绩为0不能查看详情，可再次作答</<div>",
                            isShowOk:true,
                            ShowOkVal:"确定",
                            isShowCancel:false,
                            ok_callback:function (){
                                var opened=window.open('about:blank','_self');
                                opened.opener=null;
                                opened.close();
                            }
                        });
                        return ;
                    }
                    if(oAnswerDetailList){
                        //判断是否是转储数据
                        if( oAnswerDetailList.pageVersion && oAnswerDetailList.pageVersion!="" ){
                            //do sth
                            window.location.href = "OTS-UniverDetail_"+oAnswerDetailList.pageVersion+".html?AnswerId="+data_arguments.AnswerId;
                        }
                        StartAnsFn.getTemp();//获取页面模板
                        // （每道大题后的括号内容start）
                        ansDetail_theme.showEachScore = oAnswerDetailList.showEachScore; // 是否显示每题分数
                        ansDetail_theme.showTotalScore = oAnswerDetailList.showTotalScore; // 是否显示大题总分数
                        ansDetail_theme.showQuestionCount = oAnswerDetailList.showQuestionCount; // 是否显示共多少题（每道大题后的括号内容）
                        // （每道大题后的括号内容end）
                        
                       
                        if(oAnswerDetailList.title){
                            ansDetail_theme.testName = oAnswerDetailList.title;
                        }
                        //交卷时间
                        if(oAnswerDetailList.quessubmittime){
                            ansDetail_theme.queSubTime = oAnswerDetailList.quessubmittime;
                        }
                        // 是否显示纠错
                        data_arguments.viewCorrection = oAnswerDetailList.viewCorrection;
                        ansDetail_theme.LayoutMode = oAnswerDetailList.paperLayoutMode;
                        ansDetail_theme.achievementType = oAnswerDetailList.achievementType;
                        ansDetail_theme.canViewAnswer=oAnswerDetailList.canViewAnswer;
                        ansDetail_theme.queScore = oAnswerDetailList.achievement;
                        //得分
                        $("#ansCheScore").html(oAnswerDetailList.achievement);
                        //用时
                        $("#ansTime").html(StartAnsFn.sec_to_time(oAnswerDetailList.useTime));
                        if(oAnswerDetailList.quesResponseMode=="none" || !oAnswerDetailList.canViewAnswer){
                            ansDetail_theme.startPaperResponse = "false";                   
                        }else{
                            ansDetail_theme.startPaperResponse = "true";
                        }
                        //分数质还是正确率
                        var achievementType = oAnswerDetailList.achievementType;
                        if(achievementType =="1"){
                            //  do  sth
                        }else{
                            //do sth
                        }
                        //判断显示方式(0:整卷显示;1:逐题显示;2:分页)
                        var sLayoutMode = oAnswerDetailList.paperLayoutMode;
                        if((sLayoutMode=="1")||(sLayoutMode=="2")){
                            //do sth
                        }
                        if(oAnswerDetailList.paperStructures){
                            var iStruLen = oAnswerDetailList.paperStructures.length;
                            if(iStruLen>0){
                                var sLi = "";
                                var aQue = [];
                                var iAddNum = 10;//翻页每次加的条数
                                var iCurNum = 0;//当前第几页
                                var iShowNum= 10;//显示10-20之间的数据
                                var aSingle = [];//单选题
                                var aMutil = [];//多选题
                                var aBank  = [];//填空题
                                var aJudge = [];//判断题
                                var aJuMis = [];//判断改错
                                var aEssay = [];//问答
                                var aSound = [];//录音
                                var aCompos = [];//复合题
                                var asubSingle = [];//复合题>>单选题
                                var asubMutil = [];//复合题>>多选题
                                var asubBank  = [];//复合题>>填空题
                                var asubJudge = [];//复合题>>判断题
                                var asubJuMis = [];//复合题>.判断改错
                                var queNum = 0;//试卷试题总量
                                var lastQueNum = 0;//答题总数量
                                for(var i=0;i<iStruLen;i++){
                                    var sQueLen = oAnswerDetailList.paperStructures[i].questions.length;
                                    var oQueItem = oAnswerDetailList.paperStructures[i].questions;
                                    if(sQueLen>0){
                                        queNum = queNum + sQueLen;
                                        for(var j=0;j<sQueLen;j++){
                                            var oQue = oQueItem[j];
                                            // 处理题干
                                            oQue.stem = publicFn.dealAudioOrVideo(oQue.stem);
                                            // 处理解析
                                            oQue.solvingProcess = publicFn.dealAudioOrVideo(oQue.solvingProcess);
                                            //答题总数量
                                            if(oQue.answerMode!="Composite"){
                                                if(oQue.answerContent){
                                                    lastQueNum++;
                                                }
                                            }else{
                                                //判断复合题是否答完
                                                var oSub = oQueItem[j].subQuestions;
                                                var subNum = 0;//小题答完数量
                                                if(oSub.length>0){
                                                    for(var z=0;z<oSub.length;z++){
                                                        if (oSub[z].answerContent){
                                                           subNum++;
                                                        }
                                                    }
                                                    if(subNum==oSub.length){
                                                        lastQueNum++;
                                                    }
                                                }    
                                            }
                                            // 单选题正确答案赋值
                                            if (oQue.answerMode=="SingleSelection"){
                                                var aOptionList = oQue.answerArea.optionList, // 选项
                                                    aAnswerId = ""; // 考生答案id
                                                // 单选题选项要选中考生答案，所以对数据进行处理
                                                if (publicFn.isEffectiveData(oQue.answerContent)) { // oQue.answerContent可能为null
                                                    aAnswerId = oQue.answerContent.id;
                                                }
                                                //答案存在&&答案不存在则滞空
                                                if(oQue.answer){
                                                    if(aOptionList.length>0&&oQue.answer.id){
                                                        $.each(aOptionList,function(i,val){
                                                            if(val.id==oQue.answer.id){
                                                                oQue.answer.ans=ansDetail_theme.serial_number[i];
                                                            }
                                                            if (val.id==aAnswerId) {
                                                                val.isTrue = true;
                                                            }
                                                        });
                                                    }
                                                }else{
                                                    oQue.answer = {};
                                                    oQue.answer.ans = "";
                                                }
                                            }
                                            // 多选题答案赋值
                                            if (oQue.answerMode=="MultiSelection"){
                                                var aOptionList = oQue.answerArea.optionList,
                                                    aAnswerList = []; // 选项列表
                                                // 多选题选项要选中考生答案，所以对数据进行处理
                                                if (publicFn.isEffectiveData(oQue.answerContent)) { // oQue.answerContent可能为null
                                                    aAnswerList = oQue.answerContent.idList;
                                                }
                                                
                                                //答案存在&&答案不存在滞空
                                                if(oQue.answer){
                                                    var ansList = oQue.answer.idList;
                                                    var ansL=[],
                                                        sortAnsList = []; // 重新排序后的ansList
                                                    if (aOptionList.length>0){
                                                        // 对正确答案进行排序（reorder==true 导致正确答案与选项顺序不符）
                                                        sortAnsList = StartAnsFn.multiSelSortAns(aOptionList, ansList);
                                                        $.each(aOptionList,function(i,val){
                                                            for(var j=0;j<sortAnsList.length;j++){ // 你的答案显示
                                                                if(val.id==sortAnsList[j]){
                                                                    ansL[j]=ansDetail_theme.serial_number[i];
                                                                }
                                                            }
                                                            // 选项选中状态，考生答案
                                                            if (aAnswerList.length > 0) { // 因为可能考生没有回答，那么aAnswerList.length = 0;
                                                                for (var i = 0, len = aAnswerList.length; i < len; i++) {
                                                                    if (val.id==aAnswerList[i]) {
                                                                        val.isTrue = true;
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }
                                                    oQue.answer.ansL=ansL;
                                                }else{
                                                    oQue.answer = {};
                                                    oQue.answer.ansL = "";
                                                }

                                            }
                                            //填空题
                                            if(oQue.answerMode=="BlankFilling"){
                                                var areaJ = 0;
                                                oQue.stem = oQue.stem.replace(data_arguments.sRepLine,function() {
                                                    var curCon = '';
                                                    oQue.answerContent.pairList.forEach(function (item) {
                                                        if (item.id == areaJ + 1) {
                                                            curCon = item.content
                                                        }
                                                    })
                                                    var anss = data_arguments.bankingAreaList[areaJ] +":"+ curCon;
                                                    var tp = "<em class='banking'>" + anss + "</em>";
                                                    areaJ++;
                                                    return tp;
                                                    });
                                                var repJ = 0;
                                                oQue.stem = oQue.stem.replace(data_arguments.sRepVar,function() {
                                                    var curCon = '';
                                                    oQue.answerContent.pairList.forEach(function (item) {
                                                        if (item.id == repJ + 1) {
                                                            curCon = item.content
                                                        }
                                                    })
                                                    var anss = data_arguments.bankingAreaList[repJ] +":"+ curCon;
                                                    var tp = "<em class='banking'>" + anss + "</em>";
                                                    repJ++;
                                                    return tp;
                                                });
                                                //填空题中若有图片，做处理
                                                var ansContent = oQue.answerContent;
                                                if(ansContent){
                                                    $.each(ansContent.pairList,function(i,val){
                                                        if(ansContent.pairList[i].content){
                                                             //判断是否包含图片
                                                            var patt = /<img/ig;
                                                            if( patt.test(ansContent.pairList[i].content) ){
                                                                ansContent.pairList[i].content = ansContent.pairList[i].content.replace(patt,'<img data-action="zoom"');
                                                            }
                                                        }
                                                    });
                                                }
                                                var _ansTrueList=[];
                                                if(oQue.answer){
                                                    var optionList=oQue.answer.pairList;
                                                    if (optionList.length>0){
                                                        $.each(optionList,function(i,val){
                                                            _ansTrueList.push(optionList[i].contentList[0]);
                                                        });
                                                    }
                                                    oQueItem[j].ansTrueList=_ansTrueList;
                                                }else{
                                                    oQueItem[j].answer = {};
                                                    oQueItem[j].answer.pairList = [];
                                                    oQueItem[j].ansTrueList = [];
                                                }
                                            }
                                            // 判断题答案赋值
                                            if (oQue.answerMode=="Judgement"){
                                                var aOptionList = oQue.answerArea.optionList;
                                                if(oQue.answer){
                                                    var ansId = oQue.answer.id;
                                                    if (aOptionList.length>0){
                                                        $.each(aOptionList,function(i,val){
                                                            if (val.id==ansId){
                                                                //ansId=val.content;
                                                                if(val.content=="T"||val.content=="对"){
                                                                    oQue.answer.ans="正确";
                                                                }else{
                                                                    oQue.answer.ans="错误";
                                                                }
                                                            }
                                                        });
                                                    }
                                                }else{
                                                    oQue.answer = {};
                                                    oQue.answer.ans = "";
                                                }
                                            }
                                            // 判断改错题答案
                                            if (oQue.answerMode=="JudgementCorrectsMistakes"){
                                                if (oQue.answer.id == "2") {
                                                    // 处理改正
                                                    oQue.answer.content = publicFn.dealAudioOrVideo(oQue.answer.content);
                                                }
                                                var aOptionList = oQue.answerArea.optionList;
                                                if(oQue.answer){
                                                    var ansId = oQue.answer.id;
                                                    if (aOptionList.length>0){
                                                        $.each(aOptionList,function(i,val){
                                                            if (val.id==ansId){
                                                                //ansId=val.content;
                                                                if(val.content=="T"||val.content=="对"){
                                                                    oQue.answer.ans="正确";
                                                                }else{
                                                                    oQue.answer.ans="错误"+"&nbsp;&nbsp;"+oQue.answer.content;
                                                                }
                                                            }
                                                        });
                                                    }
                                                }else{
                                                    oQue.answer = {};
                                                    oQue.answer.ansL = "";
                                                }
                                            }
                                            //问答题
                                            if(oQue.answerMode=="EssayQuestion"){
                                                // 处理简答答案
                                                if (oQue.answer == null) {
                                                    oQue.answer = {}
                                                    oQue.answer.content = ""
                                                } else {
                                                    if (oQue.answer.content) {
                                                        oQue.answer.content = publicFn.dealAudioOrVideo(oQue.answer.content);
                                                    }
                                                }
                                    	        
                                                var ansContent = oQue.answerContent;
                                                if(ansContent){
                                                    if(ansContent.content){
                                                        var patt = /<img/ig;
                                                        if(patt.test(ansContent.content)){
                                                            oQue.answerContent.content = ansContent.content.replace(patt,'<img data-action="zoom"');
                                                        }
                                                        // 处理考生答案
												        oQue.answerContent.content = publicFn.dealAudioOrVideo(oQue.answerContent.content);
                                                        oQue.answerContent.content = publicFn.filterUnableData(oQue.answerContent.content);
                                                    }
                                                }else{
                                                    oQue.answerContent = {};
                                                    oQue.answerContent.content = "";
                                                }
                                            }
                                            //复合题
                                            if(oQue.answerMode=="Composite"){
                                                var oSub = oQue.subQuestions;
                                                if(oSub.length>0){
                                                    for(var z=0;z<oSub.length;z++){
                                                        // 处理题干
                                                        oSub[z].stem = publicFn.dealAudioOrVideo(oSub[z].stem);
                                                        // 处理解析
                                                        oSub[z].solvingProcess = publicFn.dealAudioOrVideo(oSub[z].solvingProcess);
                                                        // 复合题>单选题正确答案赋值
                                                        if (oSub[z].answerMode=="SingleSelection"){
                                                            var aOptionList = oSub[z].answerArea.optionList, // 选项
                                                            aAnswerId = ""; // 考生答案id
                                                            // 单选题选项要选中考生答案，所以对数据进行处理
                                                            if (publicFn.isEffectiveData(oSub[z].answerContent)) { // oQue.answerContent可能为null
                                                                aAnswerId = oSub[z].answerContent.id;
                                                            }
                                                            if(oSub[z].answer){
                                                                if(aOptionList.length>0&&oSub[z].answer.id){
                                                                    $.each(aOptionList,function(i,val){
                                                                        if(val.id==oSub[z].answer.id){
                                                                            oSub[z].answer.ans=ansDetail_theme.serial_number[i];
                                                                        }
                                                                        if (val.id==aAnswerId) {
                                                                            val.isTrue = true;
                                                                        }
                                                                    });
                                                                }
                                                            }else{
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.ans = "";
                                                            }
                                                        }
                                                        // 复合题>多选题答案赋值
                                                        if (oSub[z].answerMode=="MultiSelection"){
                                                            var aOptionList = oSub[z].answerArea.optionList;
                                                            var aOptionList = oSub[z].answerArea.optionList,
                                                                aAnswerList = []; // 选项列表
                                                            // 多选题选项要选中考生答案，所以对数据进行处理
                                                            if (publicFn.isEffectiveData(oSub[z].answerContent)) { // oSub[z].answerContent可能为null
                                                                aAnswerList = oSub[z].answerContent.idList;
                                                            }
                                                            if(oSub[z].answer){
                                                                var ansList = oSub[z].answer.idList;
                                                                var ansL=[],
                                                                    sortAnsList = []; // 重新排序后的ansList
                                                                if (aOptionList.length>0){
                                                                    // 对正确答案进行排序（reorder==true 导致正确答案与选项顺序不符）
                                                                    sortAnsList = StartAnsFn.multiSelSortAns(aOptionList, ansList);
                                                                    $.each(aOptionList,function(i,val){
                                                                        for(var j=0;j<sortAnsList.length;j++){
                                                                            if(val.id==sortAnsList[j]){
                                                                                ansL[j]=ansDetail_theme.serial_number[i];
                                                                                
                                                                            }
                                                                        }
                                                                        // 选项选中状态，考生答案
                                                                        if (aAnswerList.length > 0) { // 因为可能考生没有回答，那么aAnswerList.length = 0;
                                                                            for (var i = 0, len = aAnswerList.length; i < len; i++) {
                                                                                if (val.id==aAnswerList[i]) {
                                                                                    val.isTrue = true;
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                oSub[z].answer.ansL=ansL;
                                                            }else{
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.ansL="";
                                                            }
                                                        }
                                                        // 复合题>填空题
                                                        if(oSub[z].answerMode=="BlankFilling"){
                                                            var oSubAreaJ = 0;
                                                            oSub[z].stem = oSub[z].stem.replace(data_arguments.sRepLine,function() {
                                                                var curCon = '';
                                                                oSub[z].answerContent.pairList.forEach(function (item) {
                                                                    if (item.id == oSubAreaJ + 1) {
                                                                        curCon = item.content
                                                                    }
                                                                })
                                                                var anss = data_arguments.bankingAreaList[oSubAreaJ]+":"+ curCon;
                                                                var tp = "<em class='banking'>" + anss + "</em>";
                                                                oSubAreaJ++;
                                                                   return tp;
                                                                });
                                                            var oSubEepVar = 0
                                                            oSub[z].stem = oSub[z].stem.replace(data_arguments.sRepVar,function() {
                                                                var curCon = '';
                                                                oSub[z].answerContent.pairList.forEach(function (item) {
                                                                    if (item.id == oSubEepVar + 1) {
                                                                        curCon = item.content
                                                                    }
                                                                })
                                                                var anss = data_arguments.bankingAreaList[oSubEepVar]+":"+ curCon;
                                                                var tp = "<em class='banking'>" + anss + "</em>";
                                                                oSubEepVar++;
                                                                   return tp;
                                                                });
                                                            var _ansTrueList=[];
                                                            var ansContent = oSub[z].answerContent;
                                                            if(ansContent){
                                                                $.each(ansContent.pairList,function(i,val){
                                                                    if(ansContent.pairList[i].content){
                                                                         //判断是否包含图片
                                                                        var patt = /<img/ig;
                                                                        if( patt.test(ansContent.pairList[i].content) ){
                                                                            ansContent.pairList[i].content = ansContent.pairList[i].content.replace(patt,'<img data-action="zoom"');
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            if(oSub[z].answer){
                                                                var optionList=oSub[z].answer.pairList;
                                                                if (optionList.length>0){
                                                                    $.each(optionList,function(i,val){
                                                                        _ansTrueList.push(optionList[i].contentList[0]);
                                                                    });
                                                                }
                                                                oSub[z].ansTrueList=_ansTrueList;   
                                                            }else{
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.pairList = [];
                                                                oSub[z].ansTrueList=[]; 
                                                            }
                                                        }
                                                        // 复合题>判断题答案赋值
                                                        if (oSub[z].answerMode=="Judgement"){
                                                            var aOptionList = oSub[z].answerArea.optionList;
                                                            if(oSub[z].answer){
                                                                var ansId = oSub[z].answer.id;
                                                                if (aOptionList.length>0){
                                                                    $.each(aOptionList,function(i,val){
                                                                        if (val.id==ansId){
                                                                            //ansId=val.content;
                                                                            if(val.content=="T"||val.content=="对"){
                                                                                oSub[z].answer.ans="正确";
                                                                            }else{
                                                                                oSub[z].answer.ans="错误";
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }else{
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.ans = "";
                                                            }
                                                        }
                                                        // 复合题>判断改错题答案
                                                        if (oSub[z].answerMode=="JudgementCorrectsMistakes"){
                                                            if (oSub[z].answer.id == "2") {
                                                                // 有改正的情况下，才需要处理
                                                                oSub[z].answer.content = publicFn.dealAudioOrVideo(oSub[z].answer.content);
                                                            }
                                                            var aOptionList = oSub[z].answerArea.optionList;
                                                            if(oSub[z].answer){
                                                                var ansId = oSub[z].answer.id;
                                                                if (aOptionList.length>0){
                                                                    $.each(aOptionList,function(i,val){
                                                                        if (val.id==ansId){
                                                                            //ansId=val.content;
                                                                            if(val.content=="T"||val.content=="对"){
                                                                                oSub[z].answer.ans="正确";
                                                                            }else{
                                                                                //oSub[z].answer.ansL="错误";
                                                                                oSub[z].answer.ans="错误"+"&nbsp;&nbsp;"+oSub[z].answer.content;
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }else{
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.ans = "";
                                                            }
                                                        }
                                                        // 复合题>解答题答案
                                                        if (oSub[z].answerMode=="EssayQuestion"){
                                                            // 处理简答答案
                                                            if (oSub[z].answer == null) {
                                                                oSub[z].answer = {};
                                                                oSub[z].answer.content = "";
                                                            } else {
                                                                if (oSub[z].answer.content) {
                                                                    oSub[z].answer.content = publicFn.dealAudioOrVideo(oSub[z].answer.content);
                                                                }
                                                            }
                                                            if (oSub[z].answerContent==null){
                                                                oSub[z].answerContent={};
                                                                oSub[z].answerContent.content = "";
                                                            }else{
                                                                if(oSub[z].answerContent.content){
                                                                    //判断是否包含图片
                                                                    var patt = /<img/ig;
                                                                    if( patt.test(oSub[z].answerContent.content) ){
                                                                        oSub[z].answerContent.content = oSub[z].answerContent.content.replace(patt,'<img data-action="zoom"');
                                                                    }
                                                                    // 处理考生答案
                                                                    oSub[z].answerContent.content = publicFn.dealAudioOrVideo(oSub[z].answerContent.content);
                                                                }
                                                                
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            //左侧漂浮的列表
                                            aQue.push(oQueItem[j]);
                                        }
                                    }
                                    if(oAnswerDetailList.comprehensive){
                                        ansDetail_theme.comp="1";//综合
                                    }else{
                                        ansDetail_theme.comp="2";
                                    }
                                    if(oAnswerDetailList.paperStructures[i].parentId != null && oAnswerDetailList.paperStructures[i].parentId != undefined && oAnswerDetailList.paperStructures[i].parentId.length!=0){
                                                     ansDetail_theme.ansDetail_arr.push(oAnswerDetailList.paperStructures[i]);
                                    }
                                }
                                if(queNum){
                                    ansDetail_theme.queNum = queNum;
                                }
                                ansDetail_theme.lastQueNum = lastQueNum;
                                //获取最顶端的id
                                ansDetail_theme.SRootId = oAnswerDetailList.paperStructures[0].id;
                            }
                        }
                        
                    
                        //对不同的答题方式进行解析
                        for(var z=0;z<aQue.length;z++){
                            if(aQue[z].answerMode=="SingleSelection"){
                                aSingle.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="MultiSelection"){
                                aMutil.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="BlankFilling"){
                                aBank.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="Judgement"){
                                aJudge.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="JudgementCorrectsMistakes"){
                                aJuMis.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="Composite"){
                                aCompos.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="EssayQuestion"){
                                aEssay.push(aQue[z]);
                            }
                            if(aQue[z].answerMode=="SoundRecording"){
                                aSound.push(aQue[z]);
                            }
                        }
                        if(aCompos.length>0){
                            for(var i=0;i<aCompos.length;i++){
                                var aSubQue = aCompos[i].subQuestions;
                                if(aSubQue.length>0){
                                    for(var j=0;j<aSubQue.length;j++){
                                        if(aSubQue[j].answerMode=="SingleSelection"){
                                            asubSingle.push(aSubQue[j]);
                                        }
                                        if(aSubQue[j].answerMode=="MultiSelection"){
                                            asubMutil.push(aSubQue[j]);
                                        }
                                        if(aSubQue[j].answerMode=="BlankFilling"){
                                            asubBank.push(aSubQue[j]);
                                        }
                                        if(aSubQue[j].answerMode=="Judgement"){
                                            asubJudge.push(aSubQue[j]);
                                        }
                                        if(aSubQue[j].answerMode=="JudgementCorrectsMistakes"){
                                            asubJuMis.push(aSubQue[j]);
                                        }
                                    }
                                }   
                            }
                        }
                        //标记单选题的样式
                        if(aSingle.length>0){
                            var aH_sing = $(".examSing");//页面单选题的html
                            for(var i=0;i<aSingle.length;i++){
                                var sHItem = aH_sing[i];
                                //单选题展示方式
                                StartAnsFn.SingleDis(sHItem,aSingle[i],false);
                            }
                        }
                        //多选题选中项
                        if(aMutil.length>0){
                            var aH_Mutil = $(".examMutli");//页面多选题的html
                            for(var i=0;i<aMutil.length;i++){
                                var sHItem = aH_Mutil[i];
                                StartAnsFn.MulDis(sHItem,aMutil[i],false);
                            }
                        }
                        //标记填空题的答案
                        if(aBank.length>0){
                            var aH_Bank = $(".examBank");//页面填空题的html
                            for(var i=0;i<aBank.length;i++){
                                var aAnsAreaList = aBank[i].answerArea.inputAreaList;//答题项
                            }
                        }
                        //标记判断题的样式
                        if(aJudge.length>0){
                            var aH_sing = $(".examJudge");//页面判断题的html
                            for(var i=0;i<aJudge.length;i++){
                                var sHItem = aH_sing[i];
                                StartAnsFn.Jud(sHItem,aJudge[i],false);
                            }
                        }
                        //标记判断改错题的样式
                        if(aJuMis.length>0){
                            var aH_JuMis = $(".examJudgeMis");//页面判断改错题的html
                            for(var i=0;i<aJuMis.length;i++){
                                var sHItem = aH_JuMis[i];
                                StartAnsFn.JudMis(sHItem, aJuMis[i],false);

                            }
                        }
                        //标记复合题>>单选题的样式
                        if(asubSingle.length>0){
                            var aH_sing = $(".mark_subSingle");//页面单选题的html
                            for(var i=0;i<asubSingle.length;i++){
                                var sHItem = aH_sing[i];
                                StartAnsFn.SingleDis(sHItem,asubSingle[i],false);
                            }
                        }
                        //标记复合题>>多选题的样式
                        if(asubMutil.length>0){
                            var aH_Mutil = $(".mark_subMul");//页面多选题的html
                            for(var i=0;i<asubMutil.length;i++){
                                var sHItem = aH_Mutil[i];
                                StartAnsFn.MulDis(sHItem,asubMutil[i],false);
                            }
                        }
                        //标记复合题>>判断题的样式
                        if(asubJudge.length>0){
                            var aH_sing = $(".mark_subJudge");//页面单选题的html
                            for(var i=0;i<asubJudge.length;i++){
                                var sHItem = aH_sing[i];
                                StartAnsFn.Jud(sHItem,asubJudge[i],false);
                            }
                        }
                        //标记复合题>>判断改错题的样式
                        if(asubJuMis.length>0){
                            var aH_JuMis = $(".mark_subJuMis");//页面判断改错题的html
                            for(var i=0;i<asubJuMis.length;i++){
                                var sHItem = aH_JuMis[i];
                                StartAnsFn.JudMis(sHItem, asubJuMis[i],false);
                            }
                        }
                        //展开解析
                        $(".Sentence .down").on("click",function(){
                            var _this=$(this);
                            if( _this.find('i').hasClass('fa-chevron-circle-down')){
                                // 向上箭头 -> 向下箭头
                                _this.removeClass("down").addClass('Up');
                                _this.html("收起<i class='fr fa fa-chevron-circle-up'></i>");
                                _this.parents("h6.clearfix").next(".SentenceCon").removeClass("none");
                            }else{
                                // 向下箭头 -> 向上箭头
                                _this.removeClass("up").addClass('down');
                                _this.html("展开<i class='fr fa fa-chevron-circle-down'></i>");
                                _this.parents("h6.clearfix").next(".SentenceCon").addClass("none");
                            }
                            // 改变页面高度
                            publicFn.bodyIndex_H();
                        });
                        //答题卡
                        var sli=$(".ck-box").find("span.squre");
                    
                        for (k=0;k<$(sli).length;k++){
                            var liattr=$(sli[k]).attr("opareaid");
                            if(liattr=="0"){
                                $(sli[k]).addClass("ok");
                            }else if(liattr=="1"){
                                $(sli[k]).addClass("correct");
                            }else{
                                $(sli[k]).addClass("error");
                            }
                        }
                        //解析和知识点样式调优
                        var sli=$(".analysis").find("div");
                        for(var i=0;i<$(sli).length;i++){
                            var divHtml = $(sli[i]).html();
                            if(divHtml==""){
                                $(sli[i]).addClass('h24');
                            }
                        }
                    }else{
                    $('#confirm_dialog').myPlugin({
                        TitVal: publicFn.toJsonObj(AnswerDetailList).error,
                        isShowOk: true,
                        ShowOkVal: "确定",
                        isShowCancel: false,
                        }); 
                        return;
                }
                
                Common.LightBox.hide();
                publicFn.bodyIndex_H();
            });
        }
            
        var StartAnsFn = {
            getTemp:function(){
                var _m = ansDetail_theme;
                // 获取试题主模板
                _m.queListTmp = document.getElementById("queMode").innerHTML;
                // 获取试题答案解析模板
                //_m.queAnalysTemp = document.getElementById("queAnalysMode").innerHTML;
                /* 获取复合题功能模板 */
                // 获取试题主模板
                _m.queCompositeMode = document.getElementById("queCompositeMode").innerHTML;
                // 获取试题答案解析模板
                //_m.sub_queAnalysTemp = document.getElementById("sub_queAnalysMode").innerHTML;
            },
            /**
             * sHItem 类别为单选题的html
             * aSingle 单选题数据
             * isCheck 查看答题情况(样式不一样)
             */
            SingleDis:function(sHItem,aSingle,isCheck){
                var sAnsContent="";//
                if(aSingle.answerContent){
                    sAnsContent = aSingle.answerContent.id;
                }else{
                     $(sHItem).find(".answerStu").html("未作答");
                }
                var sAnsid = aSingle.answer.id;
                var aHAnsArea = $(sHItem).find("dd");
                var ansOptionList =aSingle.answerArea.optionList;
                if(aHAnsArea.length>0){
                    $.each(aHAnsArea, function(index, AreaItem){
                        if(sAnsContent.length){
                            if($(AreaItem).attr("sansid") ==sAnsContent){
                                $(AreaItem).addClass("cur");
                                $(AreaItem).find("input[type='radio']").attr("checked","true");
                                $(sHItem).find(".answerStu").html(ansDetail_theme.serial_number[index]);
                            }
                        }
                    });
                }
                if(aSingle.answerCorrect){
                    // $(sHItem).find(".answerStu").addClass('Right');
                    $(sHItem).find(".Sentence var").html("回答正确").addClass('Right');
                }else if (aSingle.answerCorrect === null){ //未判分
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("未判分").addClass('NoReview');
                }else{
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("回答错误").addClass('Wrong');
                }
            },
            /**
             * 试题区域功能点击事件；编辑、复制、删除、停用、审核、纠错、查重
             * @param $event
             */
            topicFn_cFn: function ($event) {
                // 转换JQ对象
                var _$this = $($event.currentTarget).eq(0),
                    idList = [],
                    _fromType = '', // 事件来源
                    queID = _$this.attr("queid") || "",
                    type = _$this.attr("typec") || "";
                // id
                idList.push(queID);
                // 判断事件来源
                if (_$this.parents('.recheckingCon').length > 0) {
                    // 如果能找到父元素为弹出框的顶层元素，则该事件的来源为查重pop弹出框
                    _fromType = "popRech_d";
                } else {
                    // 来自主页面
                    _fromType = "default_d";
                }
                // 判断事件类型
                if (type === "editor") { // 编辑
                    queManagementFn.questionsEditor(queID);
                    // publicFn.showFloatTipBox("加班加点开发中.......");
                } else if (type === "through") { // 审核通过
                    queManagementFn.questionsAudit(idList, type, _fromType);
                } else if (type === "notThrough") { // 审核不通过
                    queManagementFn.questionsAudit(idList, type, _fromType);
                } else if (type === "copy") { // 复制
                    queManagementFn.questionsClone(queID);
                    // publicFn.showFloatTipBox("加班加点开发中.......");
                } else if (type === "enable") { // 启用
                    queManagementFn.questionsDisEna(idList, type, _fromType);
                } else if (type === "disable") { // 停用
                    queManagementFn.questionsDisEna(idList, type, _fromType);
                } else if (type === "delete") { // 删除
                    StartAnsFn.questionsDelete(idList, _fromType);
                } else if (type === "errorCorrection") { // 纠错
                    // 获取试题编号
                    var queNum = _$this.attr("number");
                    StartAnsFn.questionsErrorCorrection(queID, queNum);
                } else if (type === "rechecking") { // 查重
                    StartAnsFn.questionsRechecking(queID);
                } else if (type === "sync") { // 同步
                    StartAnsFn.questionsSynchronous(queID);
                }
            },
            /**
             * 时间秒数格式化
             * @param s 时间戳（单位：秒）
             * @returns {*} 格式化后的时分秒
             */
            sec_to_time:function(s) {
                var t;
                if(s > -1){
                    var hour = Math.floor(s/3600);
                    var min = Math.floor(s/60) % 60;
                    var sec = s % 60;
                    if(hour < 10) {
                        t = '0'+ hour + ":";
                    } else {
                        t = hour + ":";
                    }

                    if(min < 10){t += "0";}
                    t += min + ":";
                    if(sec < 10){t += "0";}
                    t += sec.toFixed(0);//四舍五入保留小数位数
                }
                return t;
            },
            /**
             * 试题纠错
             * @param _corr_id:试题id
             * @param num:试题编号
             */
            questionsErrorCorrection: function (_corr_id, num) {
                // pop弹窗对象
                var _pop = $("#errorCorrect_pop");
                // 每次弹窗初始化模板数据以及显示样式
                // 清空typeIdL类型id数组
                errorCorrectVM.typeIdL = [];
                // 显示试题编号
                errorCorrectVM.topicNum = num;
                // 初始化纠错类型
                var _typeList = _pop.find(".corrType_btn");
                if (_typeList) {
                    $.each(_typeList, function (n, val) {
                        var _$val = $(val);
                        if (_$val.hasClass("corrType_btn_tag")) {
                            _$val.removeClass("corrType_btn_tag");
                        }
                    });
                }
                // 初始化描述
                data_arguments.corrEditor.ready(function () {
                    data_arguments.corrEditor.setContent("");
                });
                // 判断遮罩层级
                var _dBg = publicFn.getShadeLayerIdName();
                // 弹出pop框
                _pop.detail_dialog({
                    isAutoTip: true, //是否自动弹出
                    isScrollBar: true, //是否禁用滚动条
                    width:"720px",
                    height: "525px",
                    isShowBg: true, //是否显示背景
                    dialogContainer: '#errorCorrect_pop', //弹出窗容器
                    dialogBg: _dBg,
                    closeBtn: '.close',
                    cancelBtn: '.pop_canBtn',
                    confirmBtn: ".pop_confirmBtn",
                    confirmFn: function () {
                        // 判断是否选择了纠错类型
                        if (errorCorrectVM.typeIdL.$model.length <= 0) {
                            publicFn.showFloatTipBox("请选择纠错类型");
                            return false;
                        }
                        var describeStr = data_arguments.corrEditor.getContent();
                        if (!publicFn.effectiveAndNotEmptyData(describeStr)) {
                            publicFn.showFloatTipBox("请填写描述");
                            return false;
                        }
                        var param = {
                            questionid: _corr_id,
                            number: num,
                            typeid: errorCorrectVM.typeIdL.$model.join(","),
                            remark: describeStr,
                            status: "1",
                            operation: "insert"
                        };
                        // 纠错
                        var _curl = publicFn.getUlrFromeInterface('CreateCorrection');
                        Common.postRequest({
                            method: _curl,
                            params: param
                        }).then(function (data) {
                            var cdata = publicFn.toJsonObj(data).data;
                            if (publicFn.isEffectiveData(cdata)) {
                                publicFn.showFloatTipBox("提交成功");
                            }
                        });
                        return true;
                    }
                });
            },
            /**
             * sHItem 类别为多选题的html
             * oMul 单选题数据
             * isCheck 查看答题情况(样式不一样)
             */
            MulDis:function(sHItem,oMul,isCheck){
                var aAnsContent ="";
                var iAnsConLen = 0;
                if(oMul.answerContent){
                    aAnsContent = oMul.answerContent.idList;
                    iAnsConLen = oMul.answerContent.idList.length;
                }else{
                     $(sHItem).find(".answerStu").html("未作答");
                }
                var aAnsIdList = oMul.answer.idList;
                var aHAnsArea = $(sHItem).find("dd");
                if(aHAnsArea.length>0&&iAnsConLen>0){
                    var ansConL=[];
                    $.each(aHAnsArea, function(index, AreaItem){
                        for(var j=0;j<iAnsConLen;j++){
                            if($(AreaItem).attr("sansid") ==aAnsContent[j]){
                                $(AreaItem).addClass("cur");
                                ansConL[j]=ansDetail_theme.serial_number[index];
                            }
                        }
                    });
                    $(sHItem).find(".answerStu").html(ansConL.sort());
                }
                if(oMul.answerCorrect){
                    // $(sHItem).find(".answerStu").addClass('Right');
                    $(sHItem).find(".Sentence var").html("回答正确").addClass('Right');
                }else if (oMul.answerCorrect === null){ //未判分
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("未判分").addClass('NoReview');
                }else{
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("回答错误").addClass('Wrong');
                }
            },
            /*
             **鼠标放在试题区域及离开区域的展现
             */
            dlMouOverFn_c: function ($event) {
                var _$this = $($event.currentTarget).eq(0);
                _$this.addClass("yi");
            },
            dlMouOutFn_c: function ($event) {
                var _$this = $($event.currentTarget).eq(0);
                _$this.removeClass("yi");
            },
            /*
             **点击题号响应事件
             */
            queNumFn_c: function ($event) {
                var _$this = $($event.currentTarget).eq(0);
                var queId = _$this.attr("queid");
                var dlList = $(".test-part .dl_list");
                $.each(dlList, function (i, dlListItme) {
                    if ($(dlListItme).attr("queid") == queId) {
                        iIndex = i;
                        return false;
                    }
                });
                $('body,html').animate({
                    scrollTop: $(dlList[iIndex]).offset().top
                }, 500);
            },
            /**
             * 多选题sort排序正确答案，因为如果reorder为true，答案是固定的，选项顺序却是随机的
             * @param aOptionList: 选项数组
             * @param ansList: 正确答案数组
             */
            multiSelSortAns:function (aOptionList, ansList) {
                if (!publicFn.isEffectiveData(aOptionList) || !publicFn.isEffectiveData(ansList)) {
                    return [];
                }
                var sortAnsList = [];
                // 因为reorder == true 的话，正确答案的顺序是写死的 但是选项却是随机的 因此对正确答案进行排序
                $.each(aOptionList, function (n, opt) {
                    $.each(ansList, function (k, ans) {
                        if (opt.id == ans) {
                            sortAnsList.push(ans);
                        }
                    });
                });
                return sortAnsList;
            },
            /*
            **判断题答案填充
             */
            Jud:function(sHItem, oJud,isCheck){
                var sAnsContent = "";//
                var aOptionList = oJud.answerArea.optionList;
                //您的答案
                if(oJud.answerContent){
                    sAnsContent = oJud.answerContent.id;
                    if (aOptionList.length>0){
                        $.each(aOptionList,function(i,val){
                            if (val.id==sAnsContent){
                                //ansId=val.content;
                                if(val.content=="T"||val.content=="对"){
                                    $(sHItem).find(".answerStu").html("正确");
                                }else{
                                    $(sHItem).find(".answerStu").html("错误");
                                }
                            }
                        });
                    }
                }else{
                    $(sHItem).find(".answerStu").html("未作答");
                }
                var sAnsid = oJud.answer.id;
                var aHAns = $(sHItem).find(".JudgeBtn  input");
                if(aHAns.length>0){
                    $.each(aHAns, function(index, AnsItem){
                        if($(AnsItem).attr("ansid") ==sAnsContent){
                            if ($(AnsItem).find("span").attr("istrue")=="T"||$(AnsItem).find("span").attr("istrue")=="对"){
                                $(AnsItem).addClass("cur");
                            }else{
                                $(AnsItem).addClass("cur");
                            }
                        }
                    });
                }
                if(oJud.answerCorrect){
                    // $(sHItem).find(".answerStu").addClass('Right');
                    $(sHItem).find(".Sentence var").html("回答正确").addClass('Right');
                }else if (oJud.answerCorrect === null){ //未判分
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("未判分").addClass('NoReview');
                }else{
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("回答错误").addClass('Wrong');
                }
            },
            JudMis:function(sHItem, oJudMis,isCheck){
                var sAnsId = "";
                var aOptionList = oJudMis.answerArea.optionList;
                var sVal = "";
                if(oJudMis.answerContent && oJudMis.answerContent.content){
                    sVal = oJudMis.answerContent.content;
                }
                if( oJudMis.answerContent ){
                    sAnsId = oJudMis.answerContent.id;  
                    if (aOptionList.length>0){
                        $.each(aOptionList,function(i,val){
                            if (val.id==sAnsId){
                                if(val.content=="T"||val.content=="对"){
                                    $(sHItem).find(".answerStu").html("正确");
                                }else{
                                     $(sHItem).find(".answerStu").html("错误"+"&nbsp;&nbsp;"+sVal);
                                }
                            }
                        });
                    }        
                }else{
                    $(sHItem).find(".answerStu").html("未作答");
                }
                var oInput = "";
                var aHAns = $(sHItem).find(".JudgeBtn  input");
                if(aHAns.length>0){
                    $.each(aHAns, function(index, AnsItem){
                        if($(AnsItem).attr("ansid") ==sAnsId){
                            if ($(AnsItem).find("span").attr("istrue")=="T"||$(AnsItem).find("span").attr("istrue")=="对"){
                                $(AnsItem).addClass("cur");
                            }else{
                                $(AnsItem).addClass("cur");
                            }
                        }
                    });
                }
                if(oJudMis.answerCorrect){
                    // $(sHItem).find(".answerStu").addClass('Right');
                    $(sHItem).find(".Sentence var").html("回答正确").addClass('Right');
                }else if (oJudMis.answerCorrect === null){ //未判分
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("未判分").addClass('NoReview');
                }else{
                    // $(sHItem).find(".answerStu").addClass('Wrong');
                    $(sHItem).find(".Sentence var").html("回答错误").addClass('Wrong');
                }
            }
        };
        initDetail();
        // 延时获取数据（这里是对一些后期接口或者不是立刻调用的   接口数据、模板创建等进行延时创建或获取；加速DOM加载时间）
        setTimeout(function () {
            // 创建纠错模板 ---- 就错模板只创建爱你一次
            publicDefine.creatErrorCorrectionDefine(data_arguments);
            // 在延时（DOM可能已经加载完毕后）创建模板时（vm定义在jQuery的ready或avalon.ready方法内部,那么avalon的扫描就会失效,需要手动扫描）；
            // avalon模板不能有效的作用到DOM中。需要手动扫描新创建的模板作用范围；
            avalon.scan(document.body);
        }, 500);
        // 滚动条事件绑定，并且是否增加返回顶部功能
        publicFn.windowOnScroll(function (e, _scrollTopNum) {
            var _newHeaderNum = $(".newHeader").height(); // 获取导航栏高度
            if (_scrollTopNum > _newHeaderNum) {
                // 操作知识点树，左侧树，固定位置
                if ($(".test-side").hasClass("positionFixed_r")) {
                    $(".test-side").addClass("positionFixed_all").removeClass("positionFixed_r");
                    
                }
                if ($(".tika").hasClass("positionFixed")) {
                    $(".tika").removeClass("positionFixed").addClass("positionFixed_l");
                }
            } else if (_scrollTopNum <= _newHeaderNum) {
                // 判断左侧树是否已固定
                if ($(".test-side").hasClass("positionFixed_all")) {
                    $(".test-side").removeClass("positionFixed_all").addClass("positionFixed_r");
                    
                }
                if ($(".tika").hasClass("positionFixed_l")) {
                    $(".tika").removeClass("positionFixed_l").addClass("positionFixed");
                }
            }
            
        });
        //显示答题卡
        $('.test-side .box .cur').click(function () {
            if ($(this).hasClass('show')) {
                $('.tika').hide();
                $(this).removeClass('show');
            } else {
                $('.tika').show();
                $(this).addClass('show');
            }
            // 重置滚动条为最上方
            $(".tikaP").scrollTop(0);
            if (data_arguments.isInitScroll) { // 判断是否已经初始化滚动条
                $('.tikaP').perfectScrollbar("update"); // 更新滚动条
            } else {
                data_arguments.isInitScroll = true;
                // 绑定滚动条
                $('.tikaP').perfectScrollbar({
                    wheelSpeed: 20,
                    wheelPropagation: false,
                    scrollbarYActive: true
                });
            }
        });
    // //鼠标放上答题卡
    // $('.test-side .box .cur').mouseenter(function () {
    //     $('.tika').show();
    //     $(this).addClass('show');
    // });

    // $('.tika').click(function () {
    //     $('.tika').hide();
    //     $('.test-side .box .cur').removeClass('show');
    // });

};