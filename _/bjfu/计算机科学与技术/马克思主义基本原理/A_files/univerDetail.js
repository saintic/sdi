$(document).ready(function () {
	var _t = this;
	var oPaperRecordId = GetRequest();
	var PaperRecordId = oPaperRecordId.AnswerId;
	//var PaperRecordId = "fb17cb9c-6a80-4bf3-a1bd-2b5f00d479fd";
	var sRepVar = /<var.*?\/var>/gi;//替换填空题
	var isShowHF = "";// 是否显示头尾
	var sRepLine = /\_{3,}/g;
	var ansDetail_theme = avalon.define('ansDetail_theme', function (vm) {
		vm.ansDetail_arr = []; //得到错题本列表信息
		vm.viewCorrection = "true";// 是否显示纠错
		vm.answer_number = ['', '正确', '错误'];
		vm.serial_number = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		vm.isCom = "";//是否综合试卷
		vm.LayoutMode = "";// 试卷显示方式
		vm.achievementType = "";//分数质(正确率)
		vm.SRootId = "";//获取最顶层的id
		vm.startPaperResponse = "";//是否显示解析数据
		vm.canViewAnswer = true;//是否显示答案解析
	});
	//试题纠错
	var corPop_theme = avalon.define('corPop_theme', function (vm) {
		vm.corPop_arr = [];
	});
	var CheckDet_theme = avalon.define('CheckDet_theme', function (vm) {
		vm.CheckDet_arr = []; //得到错题本列表信息
		vm.answer_number = ['', '正确', '错误'];
		vm.serial_number = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		vm.achievementType = "";//答题情况(分数制正确率)
	});
	//	//解析Url参数
	//	function GetRequest() {
	//	    var url = location.search; //获取url中"?"符后的字串
	//	    var theRequest = new Object();
	//	    if (url.indexOf("?") != -1) {
	//	        var str = url.substr(1);
	//	        if (str.indexOf("&") != -1) {
	//	            strs = str.split("&");
	//	            for (var i = 0; i < strs.length; i++) {
	//	                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	//	            }
	//	        } else {
	//	            theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
	//	        }
	//	    }
	//	    return theRequest;
	//	}
	if (oPaperRecordId.isShowHF) isShowHF = Number(oPaperRecordId.isShowHF);
	if (isShowHF === 0) {
		$(".uniHead").addClass("none").empty();
		$(".answerCard").css({ "top": "20px" });
	}
	/**
	 * 查看答卷详情
	 */
	function initDetail() {
		Common.postRequest({
			method: URL.sQueryAnswerDetails,
			params: { answerPaperRecordId: PaperRecordId }
		}).then(function (AnswerDetailList) {
			//var oAnswerDetailList = CU.ajaxDataHandle(AnswerDetailList);
			var oAnswerDetailList = Tojson(AnswerDetailList).data;
			//当成绩为0的时候不能查看答案
			if (oAnswerDetailList && (oAnswerDetailList.achievementType == "999")) {
				$('#confirm_dialog').myPlugin({
					TitVal: "<div>成绩为0不能查看详情，可再次作答</<div>",
					isShowOk: true,
					ShowOkVal: "确定",
					isShowCancel: false,
					ok_callback: function () {
						var opened = window.open('about:blank', '_self');
						opened.opener = null;
						opened.close();
					}
				});
				return;
			}

			if (oAnswerDetailList) {
				//判断是否是转储数据
				if (oAnswerDetailList.pageVersion && oAnswerDetailList.pageVersion != "") {
					window.location.href = "univerDetail_" + oAnswerDetailList.pageVersion + ".html?AnswerId=" + PaperRecordId;
				}
				// 是否显示纠错
				ansDetail_theme.viewCorrection = oAnswerDetailList.viewCorrection;
				$("#ans_Title").text(oAnswerDetailList.title);
				//交卷时间
				$("#ans_time").text(oAnswerDetailList.quessubmittime);
				//ansDetail_theme.comp = oAnswerDetailList.comprehensive;
				ansDetail_theme.LayoutMode = oAnswerDetailList.paperLayoutMode;
				ansDetail_theme.achievementType = oAnswerDetailList.achievementType;
				ansDetail_theme.canViewAnswer = oAnswerDetailList.canViewAnswer;
				if (oAnswerDetailList.quesResponseMode == "none" || !oAnswerDetailList.canViewAnswer) {
					ansDetail_theme.startPaperResponse = "false";
				} else {
					ansDetail_theme.startPaperResponse = "true";
				}
				//分数质还是正确率
				var achievementType = oAnswerDetailList.achievementType;
				var sUseTime = oAnswerDetailList.useTime;
				if (!sUseTime) {
					sUseTime = 0;
				}
				var hour = Math.floor(sUseTime / 3600);
				var minite = Math.floor((sUseTime / 60) % 60);
				var second = Math.floor(sUseTime % 60);
				var sConTime = "";
				if (hour > 0) {
					sConTime = hour + "小时" + minite + "分" + second + "秒";
				} else {
					sConTime = minite + "分" + second + "秒";
				}
				if (achievementType == "1") {
					$("#Fraction").removeClass("none");
					$(".ansTimVal").html(sConTime);
				} else {
					$("#accuracy").removeClass("none");
					$(".accuracy .ansTimVal").html(sConTime);
				}

				//判断显示方式(0:整卷显示;1:逐题显示;2:分页)
				var sLayoutMode = oAnswerDetailList.paperLayoutMode;
				if ((sLayoutMode == "1") || (sLayoutMode == "2")) {
					$("#pager_Detail").removeClass("none");
				}
				//$("#ansCheScore").html(Math.round(oAnswerDetailList.achievement));
				$("#ansCheScore").html(oAnswerDetailList.achievement);
				var iStruLen = oAnswerDetailList.paperStructures.length;
				if (iStruLen > 0) {

					var sLi = "";
					var aQue = [];
					var iAddNum = 10;//翻页每次加的条数
					var iCurNum = 0;//当前第几页
					var iShowNum = 10;//显示10-20之间的数据
					var aSingle = [],//单选题
						aMutil = [],//多选题
						aBank = [],//填空题
						aJudge = [],//判断题
						aJuMis = [],//判断改错
						aEssay = [],//问答
						aSound = [],//录音
						aCompos = [],//复合题
						asubSingle = [],//复合题>>单选题
						asubMutil = [],//复合题>>多选题
						asubBank = [],//复合题>>填空题
						asubJudge = [],//复合题>>判断题
						asubJuMis = [];//复合题>.判断改错
					for (var i = 0; i < iStruLen; i++) {
						var sQueLen = oAnswerDetailList.paperStructures[i].questions.length;
						var oQueItem = oAnswerDetailList.paperStructures[i].questions;
						if (sQueLen > 0) {
							for (var j = 0; j < sQueLen; j++) {
								var oQue = oQueItem[j];

								// 单选题正确答案赋值
								if (oQue.answerMode == "SingleSelection") {
									var aOptionList = oQue.answerArea.optionList;//选项
									//答案存在&&答案不存在则滞空
									if (oQue.answer) {
										if (aOptionList.length > 0 && oQue.answer.id) {
											$.each(aOptionList, function (i, val) {
												if (val.id == oQue.answer.id) {
													oQue.answer.ans = ansDetail_theme.serial_number[i];
												}
											});
										}
									} else {
										oQue.answer = {};
										oQue.answer.ans = "";
									}
								}
								// 多选题答案赋值
								if (oQue.answerMode == "MultiSelection") {
									var aOptionList = oQue.answerArea.optionList;
									//答案存在&&答案不存在滞空
									if (oQue.answer) {
										var ansList = oQue.answer.idList;
										var ansL = [];
										if (aOptionList.length > 0) {
											$.each(aOptionList, function (i, val) {
												for (var j = 0; j < ansList.length; j++) {
													if (val.id == ansList[j]) {
														ansL[j] = ansDetail_theme.serial_number[i];
													}
												}
											});
										}
										oQue.answer.ansL = ansL;
									} else {
										oQue.answer = {};
										oQue.answer.ansL = "";
									}

								}
								//填空题
								if (oQueItem[j].answerMode == "BlankFilling") {
									oQueItem[j].stem = oQueItem[j].stem.replace(sRepVar, '<input type="" value="" disabled="disabled" class="banking">');
									oQueItem[j].stem = oQueItem[j].stem.replace(sRepLine, '<input type="" value="" disabled="disabled"  class="banking">');

									var _ansTrueList = [];
									//填空题中若有图片，做处理
									var ansContent = oQueItem[j].answerContent;
									if (ansContent) {
										$.each(ansContent.pairList, function (i, val) {
											if (ansContent.pairList[i].content) {
												//判断是否包含图片
												var patt = /<img/ig;
												if (patt.test(ansContent.pairList[i].content)) {
													ansContent.pairList[i].content = ansContent.pairList[i].content.replace(patt, '<img data-action="zoom"');
												}
											}
										});
									}
									if (oQueItem[j].answer) {
										var optionList = oQueItem[j].answer.pairList;
										if (optionList.length > 0) {
											$.each(optionList, function (i, val) {
												_ansTrueList.push(optionList[i].contentList[0]);
											});
										}
										oQueItem[j].ansTrueList = _ansTrueList;
									} else {
										oQueItem[j].answer = {};
										oQueItem[j].answer.pairList = [];
										oQueItem[j].ansTrueList = [];
									}
								}
								// 判断题答案赋值
								if (oQue.answerMode == "Judgement") {
									var aOptionList = oQue.answerArea.optionList;
									if (oQue.answer) {
										var ansId = oQue.answer.id;
										if (aOptionList.length > 0) {
											$.each(aOptionList, function (i, val) {
												if (val.id == ansId) {
													//ansId=val.content;
													if (val.content == "T" || val.content == "对") {
														oQue.answer.ans = "正确";
													} else {
														oQue.answer.ans = "错误";
													}
												}
											});
										}
									} else {
										oQue.answer = {};
										oQue.answer.ans = "";
									}
								}
								// 判断改错题答案
								if (oQue.answerMode == "JudgementCorrectsMistakes") {
									var aOptionList = oQue.answerArea.optionList;
									if (oQue.answer) {
										var ansId = oQue.answer.id;
										if (aOptionList.length > 0) {
											$.each(aOptionList, function (i, val) {
												if (val.id == ansId) {
													//ansId=val.content;
													if (val.content == "T" || val.content == "对") {
														oQue.answer.ans = "正确";
													} else {
														oQue.answer.ans = "错误";
													}
												}
											});
										}
									} else {
										oQue.answer = {};
										oQue.answer.ansL = "";
									}
								}
								//问答题
								if (oQueItem[j].answerMode == "EssayQuestion") {
									var ansContent = oQueItem[j].answerContent;
									if (ansContent) {
										if (ansContent.content) {
											var patt = /<img/ig;
											if (patt.test(ansContent.content)) {
												ansContent.content = ansContent.content.replace(patt, '<img data-action="zoom"');
											}
										}
									}
								}
								//复合题
								if (oQueItem[j].answerMode == "Composite") {
									var oSub = oQueItem[j].subQuestions;
									if (oSub.length > 0) {
										for (var z = 0; z < oSub.length; z++) {
											// 复合题>单选题正确答案赋值
											if (oSub[z].answerMode == "SingleSelection") {
												var aOptionList = oSub[z].answerArea.optionList;
												if (oSub[z].answer) {
													if (aOptionList.length > 0 && oSub[z].answer.id) {
														$.each(aOptionList, function (i, val) {
															if (val.id == oSub[z].answer.id) {
																oSub[z].answer.ans = ansDetail_theme.serial_number[i];
															}
														});
													}
												} else {
													oSub[z].answer = {};
													oSub[z].answer.ans = "";
												}

											}
											// 复合题>多选题答案赋值
											if (oSub[z].answerMode == "MultiSelection") {
												var aOptionList = oSub[z].answerArea.optionList;
												if (oSub[z].answer) {
													var ansList = oSub[z].answer.idList;
													var ansL = [];
													if (aOptionList.length > 0) {
														$.each(aOptionList, function (i, val) {
															for (var j = 0; j < ansList.length; j++) {
																if (val.id == ansList[j]) {
																	ansL[j] = ansDetail_theme.serial_number[i];
																}
															}
														});
													}
													oSub[z].answer.ansL = ansL;
												} else {
													oSub[z].answer = {};
													oSub[z].answer.ansL = "";
												}

											}
											// 复合题>填空题
											if (oSub[z].answerMode == "BlankFilling") {
												oSub[z].stem = oSub[z].stem.replace(sRepVar, '<input type="" value="" class="banking">');
												oSub[z].stem = oSub[z].stem.replace(sRepLine, '<input type="" value="" class="banking">');

												var _ansTrueList = [];
												var ansContent = oSub[z].answerContent;
												if (ansContent) {
													$.each(ansContent.pairList, function (i, val) {
														if (ansContent.pairList[i].content) {
															//判断是否包含图片
															var patt = /<img/ig;
															if (patt.test(ansContent.pairList[i].content)) {
																ansContent.pairList[i].content = ansContent.pairList[i].content.replace(patt, '<img data-action="zoom"');
															}
														}
													});
												}
												if (oSub[z].answer) {
													var optionList = oSub[z].answer.pairList;
													if (optionList.length > 0) {
														$.each(optionList, function (i, val) {
															_ansTrueList.push(optionList[i].contentList[0]);
														});
													}
													oSub[z].ansTrueList = _ansTrueList;
												} else {
													oSub[z].answer = {};
													oSub[z].answer.pairList = [];
													oSub[z].ansTrueList = [];
												}
											}
											// 复合题>判断题答案赋值
											if (oSub[z].answerMode == "Judgement") {
												var aOptionList = oSub[z].answerArea.optionList;
												if (oSub[z].answer) {
													var ansId = oSub[z].answer.id;
													if (aOptionList.length > 0) {
														$.each(aOptionList, function (i, val) {
															if (val.id == ansId) {
																//ansId=val.content;
																if (val.content == "T" || val.content == "对") {
																	oSub[z].answer.ans = "正确";
																} else {
																	oSub[z].answer.ans = "错误";
																}
															}
														});
													}
												} else {
													oSub[z].answer = {};
													oSub[z].answer.ans = "";
												}
											}
											// 复合题>判断改错题答案
											if (oSub[z].answerMode == "JudgementCorrectsMistakes") {
												var aOptionList = oSub[z].answerArea.optionList;
												if (oSub[z].answer) {
													var ansId = oSub[z].answer.id;
													if (aOptionList.length > 0) {
														$.each(aOptionList, function (i, val) {
															if (val.id == ansId) {
																//ansId=val.content;
																if (val.content == "T" || val.content == "对") {
																	oSub[z].answer.ansL = "正确";
																} else {
																	oSub[z].answer.ansL = "错误";
																}
															}
														});
													}
												} else {
													oSub[z].answer = {};
													oSub[z].answer.ansL = "";
												}

											}
											if (oSub[z].answerMode == "EssayQuestion") {
												if (oSub[z].answer.content) {
													//判断是否包含图片
													var patt = /<img/ig;
													if (patt.test(oSub[z].answer.content)) {
														oSub[z].answer.content = oSub[z].answer.content.replace(patt, '<img data-action="zoom"');
													}
												}
											}
										}
									}
								}
								//右侧漂浮的列表
								aQue.push(oQueItem[j]);
							}
						}
						//获取最顶端的id 	
						ansDetail_theme.SRootId = oAnswerDetailList.paperStructures[0].id;
						if (oAnswerDetailList.comprehensive) {
							ansDetail_theme.isCom = "1";//综合
						} else {
							ansDetail_theme.isCom = "2";
						}
						if (oAnswerDetailList.paperStructures[i].parentId != null && oAnswerDetailList.paperStructures[i].parentId != undefined && oAnswerDetailList.paperStructures[i].parentId.length != 0) {
							ansDetail_theme.ansDetail_arr.push(oAnswerDetailList.paperStructures[i]);
						}
					}
					//用于右侧漂浮的数据
					for (var z = 0; z < aQue.length; z++) {
						//对不同的答题方式进行解析
						if (aQue[z].answerMode == "SingleSelection") {
							aSingle.push(aQue[z]);
						}
						if (aQue[z].answerMode == "MultiSelection") {
							aMutil.push(aQue[z]);
						}
						if (aQue[z].answerMode == "BlankFilling") {
							aBank.push(aQue[z]);
						}
						if (aQue[z].answerMode == "Judgement") {
							aJudge.push(aQue[z]);
						}
						if (aQue[z].answerMode == "JudgementCorrectsMistakes") {
							aJuMis.push(aQue[z]);
						}
						if (aQue[z].answerMode == "Composite") {
							aCompos.push(aQue[z]);
						}
						if (aQue[z].answerMode == "EssayQuestion") {
							aEssay.push(aQue[z]);
						}
						if (aQue[z].answerMode == "SoundRecording") {
							aSound.push(aQue[z]);
						}

					}
					if (aCompos.length > 0) {
						for (var i = 0; i < aCompos.length; i++) {
							var aSubQue = aCompos[i].subQuestions;
							if (aSubQue.length > 0) {

								for (var j = 0; j < aSubQue.length; j++) {
									if (aSubQue[j].answerMode == "SingleSelection") {
										asubSingle.push(aSubQue[j]);
									}
									if (aSubQue[j].answerMode == "MultiSelection") {
										asubMutil.push(aSubQue[j]);
									}
									if (aSubQue[j].answerMode == "BlankFilling") {
										asubBank.push(aSubQue[j]);
									}
									if (aSubQue[j].answerMode == "Judgement") {
										asubJudge.push(aSubQue[j]);
									}
									if (aSubQue[j].answerMode == "JudgementCorrectsMistakes") {
										asubJuMis.push(aSubQue[j]);
									}
								}
							}
						}
					}
					//标记单选题的样式
					if (aSingle.length > 0) {
						var aH_sing = $(".mark_Single");//页面单选题的html
						var aH_Padding = $(".mark_Single .exercise");
						var aH_Color = $(".mark_sin_type");//标记类型颜色
						for (var i = 0; i < aSingle.length; i++) {
							var sHItem = aH_sing[i];
							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aSingle[i].category.mainLevelItemName;
							//是否综合试卷(综合卷添加类别)
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}

							//单选题展示方式
							SingleDis(sHItem, aSingle[i], false);
						}
					}
					//多选题选中项
					if (aMutil.length > 0) {
						var aH_Mutil = $(".mark_Mutil");//页面多选题的html
						var aH_Padding = $(".mark_Mutil .exercise");
						var aH_Color = $(".mark_mul_type");//标记类型颜色
						for (var i = 0; i < aMutil.length; i++) {
							var sHItem = aH_Mutil[i];
							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aMutil[i].category.mainLevelItemName;
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}
							MulDis(sHItem, aMutil[i], false);
						}
					}
					//标记填空题的答案
					if (aBank.length > 0) {
						var aH_Bank = $(".mark_Bank");//页面填空题的html
						var aH_Padding = $(".mark_Bank .exercise");
						var aH_Color = $(".mark_bank_type");//标记类型颜色
						for (var i = 0; i < aBank.length; i++) {
							var aAnsAreaList = aBank[i].answerArea.inputAreaList;//答题项
							//var iAnsAreaLen = aBank[i].answerArea.inputAreaList.length;
							var aAnsContentList = aBank[i].answerContent.pairList;//你的答案
							var aAnsList = aBank[i].answer.pairList;//正确答案
							var sHItem = aH_Bank[i];
							var aHAns = $(sHItem).find(".titleArea input");
							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aBank[i].category.mainLevelItemName;
							var ansFirstId;
							var	ansAreaFirstId=aAnsAreaList[0].id;
							// for (var i = 0; i < aAnsContentList.length; i++) {
							// 	ansFirstId = aAnsContentList[i].id
							// }
							// for (var i = 0; i < aAnsAreaList.length; i++) {
							// 	ansAreaFirstId = aAnsAreaList[i].id
							// }
							if (aAnsContentList == 0){
								ansFirstId = ''
							}
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}

							// 正确答案
							//var falseContent = [];
							//var trueContent = [];

							if (aAnsContentList) {
								if (aAnsAreaList.length > 0 && aAnsContentList.length > 0) {
									for (var j = 0; j < aAnsAreaList.length; j++) {
										for (var z = 0; z < aAnsContentList.length; z++) {
											// 判断id其实值
											if (ansAreaFirstId == "0" && ansFirstId != "0") {
												aAnsContentList[z].id = z;
											}
											if (aAnsContentList[z].id == aAnsAreaList[j].id) {
												$(aHAns[j]).val(aAnsContentList[z].content);
												//判断每个空是否正确
												if (aAnsList.length > 0) {
													for (var r = 0; r < aAnsList.length; r++) {

														if (aAnsContentList[z].id == aAnsList[r].id) {
															var esist = $.inArray(aAnsContentList[z].content, aAnsList[r].contentList);
															if (esist >= 0) {
																$(aHAns[j]).addClass("bankTrue");
															} else {
																$(aHAns[j]).addClass("bankFalse");
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					//标记判断题的样式
					if (aJudge.length > 0) {
						var aH_sing = $(".mark_Judge");//页面单选题的html
						var aH_Padding = $(".mark_Judge .exercise");
						var aH_Color = $(".mark_jud_type");//标记类型颜色
						for (var i = 0; i < aJudge.length; i++) {
							var sHItem = aH_sing[i];
							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aJudge[i].category.mainLevelItemName;
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}

							Jud(sHItem, aJudge[i], false);
						}
					}
					//标记判断改错题的样式
					if (aJuMis.length > 0) {
						var aH_JuMis = $(".mark_JuMis");//页面判断改错题的html
						var aH_Padding = $(".mark_JuMis .exercise");
						var aH_Color = $(".mark_jumis_type");//标记类型颜色
						for (var i = 0; i < aJuMis.length; i++) {

							var sHItem = aH_JuMis[i];
							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aJuMis[i].category.mainLevelItemName;
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}
							JudMis(sHItem, aJuMis[i], false);

						}
					}
					//标记问答的样式
					if (aEssay.length > 0) {
						var aH_Padding = $(".mark_Essay .exercise");
						var aH_Color = $(".mark_essay_type");//标记类型颜色
						for (var i = 0; i < aEssay.length; i++) {

							var sHPadItem = aH_Padding[i];
							var sH_Color = aH_Color[i];
							var sMainLevItem = aEssay[i].category.mainLevelItemName;
							//if(ansDetail_theme.comp){
							//	MarkTypeColor(sHPadItem,sMainLevItem,sH_Color);
							//}

						}
					}

					//标记复合题>>单选题的样式
					if (asubSingle.length > 0) {
						var aH_sing = $(".mark_subSingle");//页面单选题的html
						for (var i = 0; i < asubSingle.length; i++) {
							var sHItem = aH_sing[i];
							SingleDis(sHItem, asubSingle[i], false);
						}
					}
					//复合题>>多选题选中项
					if (asubMutil.length > 0) {
						var aH_Mutil = $(".mark_subMul");//页面多选题的html
						for (var i = 0; i < asubMutil.length; i++) {
							var sHItem = aH_Mutil[i];
							MulDis(sHItem, asubMutil[i], false);
						}
					}
					//标记复合题>>填空题的答案
					if (asubBank.length > 0) {
						var aH_Bank = $(".mark_subBank");//页面填空题的html
						for (var i = 0; i < asubBank.length; i++) {
							var aAnsAreaList = asubBank[i].answerArea.inputAreaList,
								aAnsContentList = asubBank[i].answerContent.pairList,
								aAnsList = asubBank[i].answer.pairList,
								sHItem = aH_Bank[i],
								ansFirstId = aAnsContentList[0].id,
								ansAreaFirstId = aAnsAreaList[0].id,
								aHAns = $(sHItem).find(".titleArea input");
							if (aAnsContentList) {
								if (aAnsAreaList.length > 0 && aAnsContentList.length > 0) {
									for (var j = 0; j < aAnsAreaList.length; j++) {
										for (var z = 0; z < aAnsContentList.length; z++) {
											// 判断id其实值
											if (ansAreaFirstId == "0" && ansFirstId != "0") {
												aAnsContentList[z].id = z;
											}
											if (aAnsContentList[z].id == aAnsAreaList[j].id) {
												$(aHAns[j]).val(aAnsContentList[z].content);
												//判断每个空是否正确
												if (aAnsList.length > 0) {
													for (var r = 0; r < aAnsList.length; r++) {
														if (aAnsContentList[z].id == aAnsList[r].id) {
															var esist = $.inArray(aAnsContentList[z].content, aAnsList[r].contentList);
															if (esist >= 0) {
																$(aHAns[j]).addClass("bankTrue");
															} else {
																$(aHAns[j]).addClass("bankFalse");
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					//标记复合题>>判断题的样式
					if (asubJudge.length > 0) {
						var aH_sing = $(".mark_subJudge");//页面单选题的html
						for (var i = 0; i < asubJudge.length; i++) {
							var sHItem = aH_sing[i];
							Jud(sHItem, asubJudge[i], false);
						}
					}
					//标记复合题>>判断改错题的样式
					if (asubJuMis.length > 0) {
						var aH_JuMis = $(".mark_subJuMis");//页面判断改错题的html
						for (var i = 0; i < asubJuMis.length; i++) {
							var sHItem = aH_JuMis[i];
							JudMis(sHItem, asubJuMis[i], false);
						}
					}

					//绑定纠错事件
					$(".errCorect_a").on("click", function () {
						var _this = $(this),
							sQueid = _this.attr("queid"),
							sNubmer = _this.attr("number");
						// 禁用body的滚动条
						$("body").addClass("over-hidden");
						$("#Cor_Remark_Val").val("");
						Common.postRequest({
							method: URL.CorrectionQuery
						}).then(function (CorrTypeList) {
							var oCorrTypeList = CU.ajaxDataHandle(Tojson(CorrTypeList));
							if (oCorrTypeList.total > 0) {
								var aCorrTypeList = oCorrTypeList.types;
								if (aCorrTypeList.length > 0) {
									corPop_theme.corPop_arr = [];
									corPop_theme.corPop_arr = aCorrTypeList;
									// 弹出pop框
									$("#corr_Tip_pop").detail_dialog({
										isAutoTip: true,              		 //是否自动弹出
										isScrollBar: false,                   //是否禁用滚动条
										isShowBg: true,                       //是否显示背景
										dialogContainer: '#corr_Tip_pop',     //弹出窗容器
										dialogBg: '#bg',
										closeBtn: '.close',
										cancelBtn: '.backbtn',
										confirmBtn: '.confirmbtn',
										closeFirmFn: function () {
											// 点击左上角X，关闭时，移除body中禁用滚动条样式
											$("body").removeClass("over-hidden");
										},
										cancelFirmFn: function () {
											// 点击左上角X，关闭时，移除body中禁用滚动条样式
											$("body").removeClass("over-hidden");
										},
										confirmFn: function (targetElemt) {
											var ceheckedList = $("#corr_Tip_pop").find(".Cor_SelectArea").find("input[type='checkbox']:checked"),
												sTypeStr = [],
												sRemark = "";

											if (ceheckedList.length > 0) {

												$.each(ceheckedList, function (n, val) {
													var $val = $(val);
													sTypeStr.push($val.attr("typeid"));
												});
											} else {
												alert("请勾选纠错类型。");
												return false;
											}

											sRemark = $("#Cor_Remark_Val").val();
											if (sRemark == "") {
												alert("请填写错误描述。");
												return false;
											}

											var oAddCorrMangeParam = {
												questionid: sQueid,
												number: sNubmer,
												typeid: sTypeStr.toString(),
												remark: sRemark,
												position: $("#ans_Title").text(),
												status: "1",
												operation: "insert"
											};
											Common.postRequest({
												method: URL.CorrMangeAdd,
												params: oAddCorrMangeParam
											}).then(function (AddCorData) {
												var oAddCorData = CU.ajaxDataHandle(Tojson(AddCorData));
												if (oAddCorData.successFlag == "true") {
													alert("提交成功！");
												}
											});
											// 点击左上角X，关闭时，移除body中禁用滚动条样式
											$("body").removeClass("over-hidden");
											return true;
										}
									});
								}

							}

						});
					});

					//右侧漂浮数据样式
					var sli = $(".operArea").find("li");

					for (k = 0; k < $(sli).length; k++) {
						var liattr = $(sli[k]).attr("opareaid");
						if (liattr == "0") {
							$(sli[k]).addClass("noData");
						} else if (liattr == "1") {
							$(sli[k]).addClass("truet");
						} else {
							$(sli[k]).addClass("falset");
						}
					}
					//问答题--》附件
					$(".fjDoc").on("click", function () {
						var _this = $(this);
						alert(_this);
					});

					// 右侧漂浮数据导航事件
					$(".operArea li").on("click", function () {
						var _this = $(this),
							operqueid = _this.attr("operqueid"),
							inde = "",
							mainList = $(".wrap_main .examMain");
						$.each(mainList, function (i, val) {
							if ($(val).attr("mainqueid") == operqueid) {
								inde = i;
								return false;
							}
						});

						$('body,html').animate({ scrollTop: $(mainList[inde]).offset().top }, 500);
					});
					//展开解析
					$(".toggle a").on("click", function () {
						var _this = $(this);
						if (_this.parent().hasClass('toggle_open')) {
							_this.parent().removeClass("toggle_open");
							// 向上箭头 -> 向下箭头
							_this.removeClass("arrow-up").addClass("arrow-down");
							_this.html("展开解析");
							_this.parents(".analytical").next(".analyseMain").slideUp(200);
						} else {
							_this.parent().addClass("toggle_open");
							// 向下箭头 -> 向上箭头
							_this.removeClass("arrow-down").addClass("arrow-up");
							_this.html("收起解析");
							_this.parents(".analytical").next(".analyseMain").slideDown(200);
						}
					});
					// 展开 右侧漂浮，试题导航
					$(".answerCard_tan a").on("click", function () {
						var _this = $(this);
						if (_this.hasClass("aon")) {
							_this.removeClass("aon");
							_this.html("试题导航收起");
							$(".answerCard_b").slideDown(200);
						} else {
							_this.addClass("aon");
							_this.html("试题导航展开");
							$(".answerCard_b").slideUp(200);
						}
					});
				}
				// 判断显示结构
				var display_ = oAnswerDetailList.display;
				// 是否显示知识点
				if (display_ && display_.indexOf("category") <= -1) {
					var category_areaL = $(".exercise").find(".category_area");
					if (category_areaL && category_areaL.length > 0) {
						$.each(category_areaL, function (n, val) {
							$(val).addClass("none");
						});
					}
				}
				if (display_ && display_.indexOf("solvingprocess") <= -1 && display_.indexOf("answer") <= -1) {
					// 隐藏解析
					var isAnSolvingprocess_areaL = $(".exercise").find(".isAnSolvingprocess_area");
					if (isAnSolvingprocess_areaL && isAnSolvingprocess_areaL.length > 0) {
						$.each(isAnSolvingprocess_areaL, function (n, val) {
							$(val).addClass("none");
						});
					}
				} else {
					// 是否显示解析
					if (display_ && display_.indexOf("solvingprocess") <= -1) {
						var solvingprocess_areaL = $(".exercise").find(".solvingprocess_area");
						if (solvingprocess_areaL && solvingprocess_areaL.length > 0) {
							$.each(solvingprocess_areaL, function (n, val) {
								$(val).addClass("none");
							});
						}
					}
					// 是否显示正确答案
					if (display_ && display_.indexOf("answer") <= -1) {
						var answer_areaL = $(".exercise").find(".answer_area");
						if (answer_areaL && answer_areaL.length > 0) {
							$.each(answer_areaL, function (n, val) {
								$(val).addClass("none");
							});
						}
					}
				}
				// 是否显示分数
				if (display_ && display_.indexOf("score") <= -1) {
					var score_areaL = $(".exercise").find(".score_area");
					if (score_areaL && score_areaL.length > 0) {
						$.each(score_areaL, function (n, val) {
							$(val).addClass("none");
						});
					}
				}
			} else {
				$('#confirm_dialog').myPlugin({
					TitVal: publicFn.toJsonObj(AnswerDetailList).error,
					isShowOk: true,
					ShowOkVal: "确定",
					isShowCancel: false,
				});
				return;

			}
			//Common.LightBox.hide();
			//Common.LightBox.hideload();
		});
	};
	initDetail();
	//显示问题的方式
	function showQue(sLayoutMode) {
		var oMainList = $("#main_conten .examMain");
		if (sLayoutMode == "2") {
			if (oMainList.length <= 10) {
				$("#pager_Detail").addClass("none");
			}
		}
		if (sLayoutMode == "1") {
			if (oMainList.length <= 1) {
				$("#pager_Detail").addClass("none");
			}
		}
		$.each(oMainList, function (i, oMainItme) {
			if (sLayoutMode == "1") {
				if (i > 0) {
					$(oMainItme).parent().parent().addClass("none");
				}
			} else if (sLayoutMode == "2") {

				if (i > 9) {
					$(oMainItme).parent().parent().addClass("none");
				}

			}
		});
	}
	//标记类型颜色(比如语文绿色、数学黄色)
	function MarkTypeColor(oPadding, sName, oH_Color) {
		$(oPadding).addClass("pl75");
		if (sName == "历史" || sName == "数学") {
			$(oH_Color).addClass("subHis_Mathe");
		} else if (sName == "语文" || sName == "政治") {
			$(oH_Color).addClass("subPoliti_Lang");
		} else if (sName == "英语" || sName == "生物") {
			$(oH_Color).addClass("subEng_Biolo");
		} else if (sName == "物理" || sName == "奥数") {
			$(oH_Color).addClass("subPhys_Olym");
		} else if (sName == "化学" || sName == "作文") {
			$(oH_Color).addClass("subChem_Com");
		} else {
			$(oH_Color).addClass("subSien_Gero");
		}
	}
	/**
	 * sHItem 类别为单选题的html
	 * aSingle 单选题数据
	 * isCheck 查看答题情况(样式不一样)
	 */
	function SingleDis(sHItem, aSingle, isCheck) {
		var sAnsContent = "";//
		if (aSingle.answerContent) {
			sAnsContent = aSingle.answerContent.id;
		}
		var sAnsid = aSingle.answer.id,
			aHAns = $(sHItem).find(".replyArea span"),
			aHAnsArea = $(sHItem).find(".answerArea li"),
			ansOptionList = aSingle.answerArea.optionList;
		if (aHAnsArea.length > 0) {
			$.each(aHAnsArea, function (index, AreaItem) {
				if (aSingle.answerCorrect) {
					if ($(AreaItem).attr("sansId") == sAnsContent) {
						$(AreaItem).addClass("correct");
						$(AreaItem).find("input[type='radio']").attr("checked", "true");
					}
				} else {
					if (sAnsContent.length > 0) {
						if ($(AreaItem).attr("sansId") == sAnsContent) {
							$(AreaItem).addClass("error");
							$(AreaItem).find("input[type='radio']").attr("checked", "true");
						}
					}
				}
			});
		}
	};
	/**
	 * sHItem 类别为多选题的html
	 * aSingle 单选题数据
	 * isCheck 查看答题情况(样式不一样)
	 */
	function MulDis(sHItem, oMul, isCheck) {
		var aAnsContent = "";
		var iAnsConLen = 0;
		if (oMul.answerContent) {
			aAnsContent = oMul.answerContent.idList;
			iAnsConLen = oMul.answerContent.idList.length;
		}

		var aAnsIdList = oMul.answer.idList;
		var aHAnsArea = $(sHItem).find(".answerArea li");

		if (aHAnsArea.length > 0) {
			$.each(aHAnsArea, function (index, AreaItem) {
				if (oMul.answerCorrect) {
					if (aAnsContent.length > 0) {
						for (var j = 0; j < aAnsContent.length; j++) {
							if ($(AreaItem).attr("sansId") == aAnsContent[j]) {
								$(AreaItem).addClass("correct");
								$(AreaItem).find("input[type='checkbox']").attr({ "checked": "checked" });
							}
						}
					}
				} else {
					for (var j = 0; j < iAnsConLen; j++) {
						if ($(AreaItem).attr("sansId") == aAnsContent[j]) {
							$(AreaItem).addClass("error");
							$(AreaItem).find("input[type='checkbox']").attr({ "checked": "checked" });
						}
					}
				}
			});
		}
	}
	/**
	 * sHItem 类别为判断题的html
	 * aSingle 单选题数据
	 * isCheck 查看答题情况(样式不一样)
	 */
	function Jud(sHItem, oJud, isCheck) {
		var sAnsContent = "";//
		if (oJud.answerContent) {
			sAnsContent = oJud.answerContent.id;
		}
		// var sAnsid = oJud.answer.id;
		var aHAns = $(sHItem).find(".answerArea li");

		if (aHAns.length > 0) {
			$.each(aHAns, function (index, AnsItem) {
				if (oJud.answerCorrect) {
					if ($(AnsItem).find("span").attr("sansId") == sAnsContent) {
						if ($(AnsItem).find("span").attr("istrue") == "T" || $(AnsItem).find("span").attr("istrue") == "对") {
							$(AnsItem).find("span").removeClass("judgecorrect").removeClass("judgecorrect-bg").addClass("judgecorrectgreen").addClass("judgecorrectgreen-bg");
						} else {
							$(AnsItem).find("span").removeClass("judgeerror").removeClass("judgeerror-bg").addClass("judgeerrorgreen").addClass("judgeerrorgreen-bg");
						}
					}
				} else {
					if ($(AnsItem).find("span").attr("sansId") == sAnsContent) {
						if ($(AnsItem).find("span").attr("istrue") == "T" || $(AnsItem).find("span").attr("istrue") == "对") {
							$(AnsItem).find("span").removeClass("judgecorrect").removeClass("judgecorrect-bg").addClass("judgecorrectred").addClass("judgecorrectred-bg");
						} else {
							$(AnsItem).find("span").removeClass("judgeerror").removeClass("judgeerror-bg").addClass("judgeerrorred").addClass("judgeerrorred-bg");
						}
					}

				}
			});
		}
	}
	/**
	 * sHItem 类别为判断改错题的html
	 * aSingle 单选题数据
	 * isCheck 查看答题情况(样式不一样)
	 */
	function JudMis(sHItem, oJudMis, isCheck) {
		var sAnsId = "";
		if (oJudMis.answerContent) {
			sAnsId = oJudMis.answerContent.id;
		}
		var sVal = "";
		if (oJudMis.answerContent&&oJudMis.answerContent.content) {
			sVal = oJudMis.answerContent.content;
		}
		var oInput = "";
		var aHAns = $(sHItem).find(".answerArea li");
		if (aHAns.length > 0) {
			$.each(aHAns, function (index, AnsItem) {
				if (oJudMis.answerCorrect) {
					if ($(AnsItem).find("span").attr("sansId") == sAnsId) {
						if ($(AnsItem).find("span").attr("istrue") == "对" || $(AnsItem).find("span").attr("istrue") == "T") {
							$(AnsItem).find("span").removeClass("judgecorrect").removeClass("judgecorrect-bg").addClass("judgecorrectgreen").addClass("judgecorrectgreen-bg");
							$(AnsItem).parents(".answerArea").find(".corrmisanswer").parent("div").addClass("hide");
						} else {
							$(AnsItem).parents(".answerArea").find(".corrmisanswer").val(sVal);
							$(AnsItem).find("span").removeClass("judgeerror").removeClass("judgeerror-bg").addClass("judgeerrorgreen").addClass("judgeerrorgreen-bg");
						}
					}
				} else {
					if ($(AnsItem).find("span").attr("sansId") == sAnsId) {
						if ($(AnsItem).find("span").attr("istrue") == "对" || $(AnsItem).find("span").attr("istrue") == "T") {
							$(AnsItem).find("span").removeClass("judgecorrect").removeClass("judgecorrect-bg").addClass("judgecorrectred").addClass("judgecorrectred-bg");
							$(AnsItem).parents(".answerArea").find(".corrmisanswer").parent("div").addClass("hide");
						} else {
							$(AnsItem).parents(".answerArea").find(".corrmisanswer").val(sVal);
							$(AnsItem).find("span").removeClass("judgeerror").removeClass("judgeerror-bg").addClass("judgeerrorred").addClass("judgeerrorred-bg");
						}
					}
				}
			});
		}
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > 80) {
			$(".go-topD").fadeIn(50);
		} else {
			$(".go-topD").fadeOut(50);
		}
	});
	//当点击跳转链接后，回到页面顶部位置
	$(".go-topD").click(function () {
		$('body,html').animate({ scrollTop: 0 }, 1000);
		return false;
	});
	avalon.scan();
});
