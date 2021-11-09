domainName = prefix+'/app/ots/';
/**
 * 公共接口路径
 */
interfaceURL = {
	QuestionsManage:{
		QuestionCategory:{
			// 获取主分类主层级分类项列表
			GetMainCategoryMainLevelItemList:domainName + 'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemList',
			// 根据代码获取主分类主层级分类项列表
			GetMainCategoryMainLevelItemListByCode:domainName + 'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemListByCode',
			// 获取分类项树
			GetCategoryItemTree:domainName + 'QuestionsManage/QuestionCategory/GetCategoryItemTree',
			// 保存分类项
			SaveQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryItem',
			// 查询分类项（单条、编辑用）
			QueryQuestionCategoryItemByCode:domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryItemByCode',
			// 查询分类项树
			QueryCategoryItemTreeByName:domainName + 'QuestionsManage/QuestionCategory/QueryCategoryItemTreeByName',
			// 获取分类项子节点列表
			QueryChildQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryItem',
			// 获取关联分类项列表
			QueryRelationQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryItem',
			// 操作分类项
			OperateQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryItem',
			// 删除分类项
			RemoveQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryItem',
			// 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)
			ExportQuestionCategoryItem:domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryItem',
			// 保存分类项（课程分类）
			SaveQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryTypeItem',
			// 查询分类项（单条、编辑用）（课程分类）
			QueryQuestionCategoryTypeItemByCode:domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryTypeItemByCode',
			// 查询分类项树（课程分类）
			QueryCategoryTypeItemTreeByName:domainName + 'QuestionsManage/QuestionCategory/QueryCategoryTypeItemTreeByName',
			// 获取分类项子节点列表（课程分类）
			QueryChildQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryTypeItem',
			// 获取关联分类项列表（课程分类）
			QueryRelationQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryTypeItem',
			// 操作分类项（课程分类）
			OperateQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryTypeItem',
			// 删除分类项（课程分类）
			RemoveQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryTypeItem',
			// 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)（课程分类）
			ExportQuestionCategoryTypeItem:domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryTypeItem',
			// 保存分类项（课程结构）
			SaveQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/SaveQuestionCategoryChildItem',
			// 查询分类项（单条、编辑用）（课程结构）
			QueryQuestionCategoryChildItemByCode:domainName + 'QuestionsManage/QuestionCategory/QueryQuestionCategoryChildItemByCode',
			// 查询分类项树（课程结构）
			QueryCategoryChildItemTreeByName:domainName + 'QuestionsManage/QuestionCategory/QueryCategoryChildItemTreeByName',
			// 获取分类项子节点列表（课程结构）
			QueryChildQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/QueryChildQuestionCategoryChildItem',
			// 获取关联分类项列表（课程结构）
			QueryRelationQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/QueryRelationQuestionCategoryChildItem',
			// 操作分类项（课程结构）
			OperateQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryChildItem',
			// 删除分类项（课程结构）
			RemoveQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/RemoveQuestionCategoryChildItem',
			// 导出分类项(有导出编码时，按导出编码导出；无导出编码时按编码、名称状态查询后导出)（课程结构）
			ExportQuestionCategoryChildItem:domainName + 'QuestionsManage/QuestionCategory/ExportQuestionCategoryChildItem',
			// 修改分类项顺序
			ChangeQuestionCategoryItemSequence:domainName + 'QuestionsManage/QuestionCategory/ChangeQuestionCategoryItemSequence',
			// 获取主分类及课程列表
			QueryCategoryItemAndCourseInfo:domainName + 'QuestionsManage/QuestionCategory/QueryCategoryItemAndCourseInfo',
			// 跟业务系统进行课程编码同步
			SynchronizeCourse:domainName + 'QuestionsManage/QuestionCategory/SynchronizeCourse',
			// 根据章节点获取知识点
			GetCategoryCodeByTopicCode:domainName + 'QuestionsManage/QuestionCategory/GetCategoryCodeByTopicCode'
		},
		QuestionQuery:{
			// 通过条件查询试题列表
			QueryQuestionListByCondition:domainName + 'QuestionsManage/QuestionQuery/QueryQuestionListByCondition',
			// 通过id查询重复试题列表
			QuerySimilarQuestionsById:domainName + 'QuestionsManage/QuestionQuery/QuerySimilarQuestionsById',
			// 计算试题相似度得分
			ComputeQuestionSimilarScore:domainName + 'QuestionsManage/QuestionQuery/ComputeQuestionSimilarScore',
			// 查询需修改扩展参数的题目库存
			QueryQuestionStockForModifyExtAttr:domainName + 'QuestionsManage/QuestionQuery/QueryQuestionStockForModifyExtAttr',
			// 查询需修改扩展参数的题目列表
			QueryQuestionsForModifyExtAttr:domainName + 'QuestionsManage/QuestionQuery/QueryQuestionsForModifyExtAttr',
			// 替换需修改扩展参数的题目
			ReplaceQuestionForModifyExtAttr:domainName + 'QuestionsManage/QuestionQuery/ReplaceQuestionForModifyExtAttr'
		},
		QuestionListOperate:{
			// 审核通过
			AuditThroughQuestion:domainName + 'QuestionsManage/QuestionListOperate/AuditThroughQuestion',
			// 审核不通过
			AuditNotThroughQuestion:domainName + 'QuestionsManage/QuestionListOperate/AuditNotThroughQuestion',
			// 停用
			DisableQuestions:domainName + 'QuestionsManage/QuestionListOperate/DisableQuestions',
			// 启用
			EnableQuestions:domainName + 'QuestionsManage/QuestionListOperate/EnableQuestions',
			// 删除
			DeleteQuestions:domainName + 'QuestionsManage/QuestionListOperate/DeleteQuestions',
			// 全部审核通过
			AuditThroughAllQuestion:domainName + 'QuestionsManage/QuestionListOperate/AuditThroughAllQuestion',
			// 全部审核不通过
			AuditNotThroughAllQuestion:domainName + 'QuestionsManage/QuestionListOperate/AuditNotThroughAllQuestion',
			// 全部停用
			DisableAllQuestions:domainName + 'QuestionsManage/QuestionListOperate/DisableAllQuestions',
			// 全部启用
			EnableAllQuestions:domainName + 'QuestionsManage/QuestionListOperate/EnableAllQuestions',
			// 全部删除
			DeleteAllQuestions:domainName + 'QuestionsManage/QuestionListOperate/DeleteAllQuestions',
			// 批量修改属性
			batchUpdateQuestion:domainName + 'QuestionsManage/QuestionListOperate/batchUpdateQuestion',
			// 批量修改题目扩展参数
			ModifyQuestionsExtAttr:domainName + 'QuestionsManage/QuestionListOperate/ModifyQuestionsExtAttr',
			// 添加试题知识点
			addQuestionCategoryRelation:domainName + 'QuestionsManage/QuestionListOperate/addQuestionCategoryRelation',
			// 查询课程下待处理题目数量
			queryPendingQuestionNumByCourseCode:domainName + 'QuestionsManage/QuestionListOperate/queryPendingQuestionNumByCourseCode'
		},
		QuestionInput:{
			// 是否允许私有
			questionPrivateConfig:domainName + 'QuestionsManage/QuestionInput/questionPrivateConfig',
			// 批量保存题目属性
			BatchSaveQuestionAttribute:domainName + 'QuestionsManage/QuestionInput/BatchSaveQuestionAttribute',
			// 题型列表
			GetQuestionTypeList:domainName + 'QuestionsManage/QuestionInput/GetQuestionTypeList',
			// 复合题型子题型列表
			GetSubQuestionTypeList:domainName + 'QuestionsManage/QuestionInput/GetSubQuestionTypeList',
			// 复合题型子题型列表
			GetSubQuestionTypeList:domainName + 'QuestionsManage/QuestionInput/GetSubQuestionTypeList',
			// 难度列表
			GetDifficultyValues:domainName + 'QuestionsManage/QuestionInput/GetDifficultyValues',
			// 增加子题目
			addSubQuestion:domainName + 'QuestionsManage/QuestionInput/addSubQuestion',
			// 改变子题目顺序
			ChangeSubQuestionSequence:domainName + 'QuestionsManage/QuestionInput/ChangeSubQuestionSequence',
			// 删除子题目
			removeSubQuestion:domainName + 'QuestionsManage/QuestionInput/removeSubQuestion',
			// 复制题目
			CopyQuestion:domainName + 'QuestionsManage/QuestionInput/CopyQuestion',
			// 保存题目
			SaveQuestion:domainName + 'QuestionsManage/QuestionInput/SaveQuestion',
			//实验班 --- 试题同步
			SendQuestionSyncData:domainName+"QuestionsManage/QuestionInput/SendQuestionSyncData",
			// 提交题目
			SubmitQuestion:domainName + 'QuestionsManage/QuestionInput/SubmitQuestion'
		},
		QuestionImport:{
			// 试题导入
			ImportQuestions:domainName + 'QuestionsManage/QuestionImport/ImportQuestions',
			//
			DownloadImportInstruction:domainName + 'QuestionsManage/QuestionImport/DownloadImportInstruction',
			//
			DownloadTemplate:domainName + 'QuestionsManage/QuestionImport/DownloadTemplate',
			//
			SubmitImport:domainName + 'QuestionsManage/QuestionImport/SubmitImport',
			//
			ImportError:domainName + 'QuestionsManage/QuestionImport/ImportError',
			//
			SaveErrorInfo:domainName + 'QuestionsManage/QuestionImport/SaveErrorInfo'
		},
		QuestionType:{
			// 保存试题类型
			SaveQuestionType:domainName + 'QuestionsManage/QuestionType/SaveQuestionType',
			// 查询试题类型
			QueryQuestionTypeById:domainName + 'QuestionsManage/QuestionType/QueryQuestionTypeById',
			// 获取试题类型列表
			QueryQuestionTypeByConditions:domainName + 'QuestionsManage/QuestionType/QueryQuestionTypeByConditions',
			// 操作试题类型
			OperateQuestionType:domainName + 'QuestionsManage/QuestionType/OperateQuestionType',
			// 删除试题类型
			RemoveQuestionType:domainName + 'QuestionsManage/QuestionType/RemoveQuestionType',
			// 查询可用子题型
			QueryCanUseSubQuestionType:domainName + 'QuestionsManage/QuestionType/QueryCanUseSubQuestionType',
			// 查询所有试题类型模板
			QueryAllQuestionTypeTemplate:domainName + 'QuestionsManage/QuestionType/QueryAllQuestionTypeTemplate'
		}
	},
	PapersManage:{
		PaperCategory:{
			// 获取试卷分类列表
			GetCategoryList:domainName + 'PapersManage/PaperCategory/GetCategoryList',
			// 保存试卷分类
			SaveCategory:domainName + 'PapersManage/PaperCategory/SaveCategory',
			// 删除试卷分类
			RemoveCategories:domainName + 'PapersManage/PaperCategory/RemoveCategories'
		},
		PaperQuery:{
			// 通过条件查询试卷列表
			QueryPaperListByCondition:domainName + 'PapersManage/PaperQuery/QueryPaperListByCondition',
			// 查询能够合并的试卷列表
			QueryMergeablePaperList:domainName + 'PapersManage/PaperQuery/QueryMergeablePaperList',
			// 预览试卷
			PreviewPaper:domainName + 'PapersManage/PaperQuery/PreviewPaper',
			// 检查试卷是否被使用
			CheckPaperUsed:domainName + 'PapersManage/PaperQuery/CheckPaperUsed'
		},
		PaperListOperate:{
			// 启用试卷
			EnablePapers:domainName + 'PapersManage/PaperListOperate/EnablePapers',
			// 停用试卷
			DisablePapers:domainName + 'PapersManage/PaperListOperate/DisablePapers',
			// 删除试卷
			RemovePapers:domainName + 'PapersManage/PaperListOperate/RemovePapers',
			// 导出试卷
			ExportPaper:domainName + 'PapersManage/PaperListOperate/ExportPaper'
		},
		PaperCompose:{
			// 合并试卷
			MergePapers:domainName + 'PapersManage/PaperCompose/MergePapers',
			// 手动选题组卷
			ManualSelectionCompose:domainName + 'PapersManage/PaperCompose/ManualSelectionCompose',
			// 获取组卷策略
			GetStrategy:domainName + 'PapersManage/PaperCompose/GetStrategy',
			// 获取组卷策略出题范围
			GetStrategyQuestionRange:domainName + 'PapersManage/PaperCompose/GetStrategyQuestionRange',
			// 保存组卷策略出题范围
			SaveStrategyQuestionRange:domainName + 'PapersManage/PaperCompose/SaveStrategyQuestionRange',
			// 获取默认组卷策略模板题目库存
			GetQuestionStockForDefaultStrategy:domainName + 'PapersManage/PaperCompose/GetQuestionStockForDefaultStrategy',
			// 获取智能组卷题目库存
			GetQuestionNumForIntelligentStrategy:domainName + 'PapersManage/PaperCompose/GetQuestionNumForIntelligentStrategy',
			// 获取智能组卷知识点题目库存
			GetCategoryQuestionNumForIntelligentStrategy:domainName + 'PapersManage/PaperCompose/GetCategoryQuestionNumForIntelligentStrategy',
			// 策略组卷
			StrategyCompose:domainName + 'PapersManage/PaperCompose/StrategyCompose',
			// 修改组卷策略
			ModifyStrategy:domainName + 'PapersManage/PaperCompose/ModifyStrategy',
			// 准备创建活动安排所需数据
			GetServerTime:domainName + 'PapersManage/PaperCompose/GetServerTime',
			// 查询能够添加的题目列表
			QueryAddibleQuestionList:domainName + 'PapersManage/PaperCompose/QueryAddibleQuestionList',
			// 添加试卷结构
			AddPaperStructure:domainName + 'PapersManage/PaperCompose/AddPaperStructure',
			// 修改试卷结构
			ModifyPaperStructure:domainName + 'PapersManage/PaperCompose/ModifyPaperStructure',
			// 修改试卷结构备注
			ModifyPaperStructureComment:domainName + 'PapersManage/PaperCompose/ModifyPaperStructureComment',
			// 删除试卷结构
			RemovePaperStructure:domainName + 'PapersManage/PaperCompose/RemovePaperStructure',
			// 调整试卷结构顺序
			AdjustPaperStructureSequence:domainName + 'PapersManage/PaperCompose/AdjustPaperStructureSequence',
			// 调整试卷试题顺序
			AdjustPaperQuestionSequence:domainName + 'PapersManage/PaperCompose/AdjustPaperQuestionSequence',
			// 加题
			AddQuestions:domainName + 'PapersManage/PaperCompose/AddQuestions',
			// 换题
			ReplaceQuestion:domainName + 'PapersManage/PaperCompose/ReplaceQuestion',
			// 删题
			RemoveQuestion:domainName + 'PapersManage/PaperCompose/RemoveQuestion',
			// 修改题目分数
			ModifyQuestionScore:domainName + 'PapersManage/PaperCompose/ModifyQuestionScore',
			// 保存试卷属性
			SavePaperAttributes:domainName + 'PapersManage/PaperCompose/SavePaperAttributes',
			// 保存试卷（整卷覆盖保存，慎用）
			SavePaper:domainName + 'PapersManage/PaperCompose/SavePaper',
			// 提交试卷
			SubmitPaper:domainName + 'PapersManage/PaperCompose/SubmitPaper',
			// 分析试卷
			AnalysePaper:domainName + 'PapersManage/PaperCompose/AnalysePaper',
			// 复制试卷
			CopyPaper:domainName + 'PapersManage/PaperCompose/CopyPaper'
		},
		PaperExportTemplateManage:{
			// 保存试卷导出模板
			SavePaperExportTemplate:domainName + 'PapersManage/PaperExportTemplateManage/SavePaperExportTemplate',
			// 查询试卷导出模板样式列表
			QueryPaperExportTemplateStyle:domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateStyle',
			// 查询试卷导出模板
			QueryPaperExportTemplateById:domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplateById',
			// 查询试卷导出模板列表
			QueryPaperExportTemplate:domainName + 'PapersManage/PaperExportTemplateManage/QueryPaperExportTemplate',
			// 删除试卷导出模板
			RemovePaperExportTemplate:domainName + 'PapersManage/PaperExportTemplateManage/RemovePaperExportTemplate',
			// 下载试卷导出模板
			DownloadPaperExportTemplate:domainName + 'PapersManage/PaperExportTemplateManage/DownloadPaperExportTemplate'
		}
	},
	SystemConfig:{
		// 获取试题配置
		GetQuestionConfig:domainName + 'SystemConfig/GetQuestionConfig',
		// 保存试题配置
		SaveQuestionConfig:domainName + 'SystemConfig/SaveQuestionConfig',
		// 获取试卷配置
		GetPaperConfig:domainName + 'SystemConfig/GetPaperConfig',
		// 保存试卷配置
		SavePaperConfig:domainName + 'SystemConfig/SavePaperConfig'
	},
	TestActivity:{
		//检测操作异常，列入黑名单
		studentJumpAnswerDiscover:domainName+'TestActivity/studentJumpAnswerDiscover',
		// 获取枚举类型的定义
		ReadEnumTypeDef:domainName + 'TestActivity/ReadEnumTypeDef',
		// 学生自测考试
		SelftTestActivity:domainName + 'TestActivity/SelftTestActivity',
		// 错题本重新做题
		WrongQuestionTestActivity:domainName + 'TestActivity/WrongQuestionTestActivity',
		// 查询测试活动类型列表
		QueryTestActivityTypes:domainName + 'TestActivity/QueryTestActivityTypes',
		// 保存测试活动类型
		SaveTestActivityType:domainName + 'TestActivity/SaveTestActivityType',
		// 通过条件查询测试活动安排列表
		QueryTestActivityArrangementListByConditions:domainName + 'TestActivity/QueryTestActivityArrangementListByConditions',
		// 删除测试活动安排
		RemoveTestActivityArrangements:domainName + 'TestActivity/RemoveTestActivityArrangements',
		// 准备创建活动安排所需数据
		CreateTestActivityArrangementPrepare:domainName + 'TestActivity/CreateTestActivityArrangementPrepare',
		// 为活动安排获取试卷列表
		GetPaperListForArrangement:domainName + 'TestActivity/GetPaperListForArrangement',
		// 根据用户输入的条件获取活动安排的信息
		GetArrangementsAndPaperInfor:domainName + 'TestActivity/GetArrangementsAndPaperInfor',
		// 创建(更新)活动安排实例入库
		CreateTestActivityArrangement:domainName + 'TestActivity/CreateTestActivityArrangement',
		// 101同步考试安排信息
		syncArrangementData:domainName + 'TestActivity/syncArrangementData',
		// 编辑活动安排实例
		EditTestActivityArrangement:domainName + 'TestActivity/EditTestActivityArrangement',
		// 根据活动类型，获取活动类型对应的活动安排列表
		GetTestActivityArrangementsByActivityTypeId:domainName + 'TestActivity/GetTestActivityArrangementsByActivityTypeId',
		// 开始参加考试
		StartAnswerPaper:domainName + 'TestActivity/StartAnswerPaper',
		//开始参加考试(人脸验证)
		StartAnswerPaperWithPhoto:domainName + 'TestActivity/StartAnswerPaperWithPhoto',
		// 系统判断题目对错
		CorrectQuestionBySystem:domainName + 'TestActivity/CorrectQuestionBySystem',
		// 提交考试结果
		SubmitAnswerPaper:domainName + 'TestActivity/SubmitAnswerPaper',
		// 获取活动类型定义
		GetTestActivityTypes:domainName + 'TestActivity/GetTestActivityTypes',
		// 查看答卷详情
		QueryAnswerPaperDetails:domainName + 'TestActivity/QueryAnswerPaperDetails',
		// 查看答题情况
		QueryAnswerPaperQuestion:domainName + 'TestActivity/QueryAnswerPaperQuestion',
		// 通过条件查询错题列表
		QueryWrongQuestionListByConditions:domainName + 'TestActivity/QueryWrongQuestionListByConditions',
		// 移除错题
		RemoveWrongQuestions:domainName + 'TestActivity/RemoveWrongQuestions',
		// 获取活动安排评阅统计信息
		QueryArrangementStateList:domainName + 'TestActivity/QueryArrangementStateList',
		// 获取活动安排评阅学生列表信息
		QueryArrangementStudentList:domainName + 'TestActivity/QueryArrangementStudentList',
		// 提交教师评阅内容
		SubmitJudgement:domainName + 'TestActivity/SubmitJudgement',
		// 测试活动监控统计
		QueryArrangementStatistics:domainName + 'TestActivity/QueryArrangementStatistics',
		// 批量修改活动结束时间
		UpdateTestActivityArrangementsEndtime:domainName + 'TestActivity/UpdateTestActivityArrangementsEndtime',
		// 获取活动安排学生列表信息
		QueryArrangementStatisticsStudentList:domainName + 'TestActivity/QueryArrangementStatisticsStudentList',
		// 删除试卷（活动监控中用）
		DeleteStudentAnswerPaperRecord:domainName + 'TestActivity/DeleteStudentAnswerPaperRecord',
		// 得到学生活动类型列表和未完成内容数量
		QueryActivityTypeListByStudentIdAndCourseCode:domainName + 'TestActivity/QueryActivityTypeListByStudentIdAndCourseCode',
		// 根据活动类型和课程code得到学生活动安排内容
		QueryStudentArrangementListByTypeIdAndCoursecode:domainName + 'TestActivity/QueryStudentArrangementListByTypeIdAndCoursecode',
		// 根据活动类型和课程code得到管理活动安排内容
		QueryArrangementListByCourseCode:domainName + 'TestActivity/QueryArrangementListByCourseCode',
		// 考试活动添加对应的学生
		addStduent2ArrangmentByOrg:domainName + 'TestActivity/addStduent2ArrangmentByOrg',
		// 考试活动添加对应的学生
		changeStudent2ArrangementByUser:domainName + 'TestActivity/changeStudent2ArrangementByUser',
		// 查找范围内外学生列表
		queryStudentList4Range:domainName + 'TestActivity/queryStudentList4Range',
		// 考试活动是否可以添加学生范围
		checkStudentRange :domainName + 'TestActivity/checkStudentRange',
		// 批量创建或修改考试活动
		createMultiTestActivityArrangement:domainName + 'TestActivity/createMultiTestActivityArrangement',
		// 临时保存作答信息
		TempSaveAnswerPaper:domainName + 'TestActivity/TempSaveAnswerPaper',
		// 获取转储设置前的参数信息
		QueryDumpDataInfoBeforeSetting:domainName + 'TestActivity/QueryDumpDataInfoBeforeSetting',
		// 设置转储信息
		SetDumpDataInfo:domainName + 'TestActivity/SetDumpDataInfo',
		// 查询转储信息
		QueryDumpDataInfo:domainName + 'TestActivity/QueryDumpDataInfo',
		// 查询转储详细信息
		QueryDumpDataDetailInfo:domainName + 'TestActivity/QueryDumpDataDetailInfo',
		// 开始转储
		StartDumpData:domainName + 'TestActivity/StartDumpData',
		// 通过条件查询错题列表
		QueryWrongQuestionListByConditions:domainName + 'TestActivity/QueryWrongQuestionListByConditions',
		// 通过条件查询错题列表
		QueryOtherQuestionFromOneFact:domainName + 'TestActivity/QueryOtherQuestionFromOneFact',
		// 打开考试单页确认
		SetSinglePageDelay:domainName + 'TestActivity/SetSinglePageDelay',
		// 打开考试单页确认
		queryActivitySimpleInfoByArrangementId:domainName + 'TestActivity/queryActivitySimpleInfoByArrangementId',
		// 打开考试单页确认
		QueryTestActivityArrangementInfo:domainName + 'TestActivity/QueryTestActivityArrangementInfo',
		//查询考试时间
    	getAnswerPaperTime: domainName + 'TestActivity/getAnswerPaperTime',

	},
	ExtDataDefinition:{
		// 获取题目自定义属性列表
		QuestionExt:domainName + 'ExtDataDefinition/QuestionExt',
		// 获取试卷自定义属性列表
		PaperExt:domainName + 'ExtDataDefinition/PaperExt',
		// 获取参与组卷的试题的扩展属性列表
		QuestionExt4CreatePaper:domainName + 'ExtDataDefinition/QuestionExt4CreatePaper'
	},
	Public:{
		// 获取当前登录用户的功能权限设置
		UserFPSettings:domainName + 'Public/UserFPSettings',
		// 上载图片
		UploadImage:domainName + 'Public/UploadImage',
		// 上载附件
		UploadContent:domainName + 'Public/UploadContent',
		// 获取当前登录用户的功能权限设置
		UserFPSettings:domainName + 'Public/UserFPSettings',
		// 在服务端下载指定url的图片(是其他网站的..)
		DownloadImage:domainName + 'Public/DownloadImage',
		// 成绩发送数量
		SendAchievementNum:domainName + 'Public/SendAchievementNum',
		// 成绩核算
		CheckAchievement:domainName + 'Public/CheckAchievement',
		// 人脸比对
		faceCompare:domainName + 'Public/faceCompare',
		//重置作答记录开始时间
		ResetAnswerPaperStartTime:domainName + 'Public/ResetAnswerPaperStartTime',
		//上传考试拍摄照片
		UploadTestPhoto:domainName + 'Public/UploadTestPhoto',
		//判断是否需要人脸识别
		getNeedPhotoStatus:domainName + 'Public/getNeedPhotoStatus'
	},
	Correction:{
		// 通过条件查询纠错类型列表
		queryCorrectionTypeByCondition:domainName + 'Correction/queryCorrectionTypeByCondition',
		// 创建或修改纠错类型
		CreateCorrectionType:domainName + 'Correction/CreateCorrectionType',
		// 删除改纠错类型
		RemoveCorrectionType:domainName + 'Correction/RemoveCorrectionType',
		// 添加或修改试题纠错
		CreateCorrection:domainName + 'Correction/CreateCorrection',
		// 查询纠错具体信息
		QueryCorrectionInfo:domainName + 'Correction/QueryCorrectionInfo',
		// 通过条件查询纠错列表
		queryCorrectionListByCondition:domainName + 'Correction/queryCorrectionListByCondition',
		// 查询相关的租户
		GetRelateTenant:domainName + 'Correction/GetRelateTenant'
	},
	Dts:{
		// 导入试题
		ImportQuestions:domainName + 'Dts/ImportQuestions',
		// 导入课程
		ImportQuestionCategoryItems:domainName + 'Dts/ImportQuestionCategoryItems',
		// 导入组织结构
		ImportOrganizations:domainName + 'Dts/ImportOrganizations',
		// 导入人员信息
		ImportUserInfos:domainName + 'Dts/ImportUserInfos',
		// 导入试题新方法
		ImportQuestionsNew:domainName + 'Dts/ImportQuestionsNew',
		//添加导入文件
		UploadImportFile:domainName + 'Dts/UploadImportFile',
		//查询导入文件信息
		QueryQuestionBatchImportList:domainName + 'Dts/QueryQuestionBatchImportList'
	},
	OrganizationManage:{
		// 保存组织机构
		SaveOrganization:domainName + 'OrganizationManage/SaveOrganization',
		// 查询组织机构类型
		QueryOrganizationLevelTypes:domainName + 'OrganizationManage/QueryOrganizationLevelTypes',
		// 查询角色列表
		GetRoles:domainName + 'OrganizationManage/GetRoles',
		// 查询组织机构（单条、编辑用）
		QueryOrganizationByCode:domainName + 'OrganizationManage/QueryOrganizationByCode',
		// 查询组织机构树
		QueryOrganizationByName:domainName + 'OrganizationManage/QueryOrganizationByName',
		// 获取组织机构子节点列表
		QueryChildOrganization:domainName + 'OrganizationManage/QueryChildOrganization',
		// 操作组织机构
		OperateOrganization:domainName + 'OrganizationManage/OperateOrganization',
		// 删除组织机构
		RemoveOrganization:domainName + 'OrganizationManage/RemoveOrganization',
		// 导出组织机构(有导出编码时，按导出编码导出；无导出编码时按类型、编码、名称和状态查询后导出)
		ExportOrganization:domainName + 'OrganizationManage/ExportOrganization'
	},
	UserInfoManage:{
		// 保存人员信息
		SaveUserInfo:domainName + 'UserInfoManage/SaveUserInfo',
		// 查询用户信息（单条、编辑用）
		QueryUserInfoById:domainName + 'UserInfoManage/QueryUserInfoById',
		// 获取组织人员列表
		QueryUserInfoByOrganizationCode:domainName + 'UserInfoManage/QueryUserInfoByOrganizationCode',
		// 操作用户信息
		OperateUserInfo:domainName + 'UserInfoManage/OperateUserInfo',
		// 删除用户信息
		RemoveUserInfo:domainName + 'UserInfoManage/RemoveUserInfo',
		// 修改用户组织机构(有修改ID时，按修改ID导出；无修改ID时按组织类型、组织编码、用户名称和用户状态查询后修改)
		ChangeUserOrganizationCode:domainName + 'UserInfoManage/ChangeUserOrganizationCode',
		// 导出用户信息(有导出ID时，按导出ID导出；无导出ID时按组织类型、组织编码、用户名称和用户状态查询后导出)
		ExportUserInfo:domainName + 'UserInfoManage/ExportUserInfo'
	},
	LogManage:{
		// 查询日志
		QueryLogsByConditions:domainName + 'LogManage/QueryLogsByConditions'
	},
	PrivilegeManage:{
		// 保存权限组
		SavePrivilegeGroup:domainName + 'PrivilegeManage/SavePrivilegeGroup',
		// 查询权限组（单条、编辑用）
		QueryPrivilegeGroupById:domainName + 'PrivilegeManage/QueryPrivilegeGroupById',
		// 查询权限项
		QueryFunctionPointsByPGId:domainName + 'PrivilegeManage/QueryFunctionPointsByPGId',
		// 查询权限组列表
		QueryPrivilegeGroups:domainName + 'PrivilegeManage/QueryPrivilegeGroups',
		// 操作权限组
		RemovePrivilegeGroup:domainName + 'PrivilegeManage/RemovePrivilegeGroup'
	},
	memorycache:{
		// 缓存IP地址库信息
		InitIpInfo:domainName + 'memorycache/InitIpInfo'
	},
	Statistics:{
		// 查询安排下试卷试题正确率
		QueryQuestionCorrectRate:domainName + 'Statistics/QueryQuestionCorrectRate',
		// 查询每道试题正确率详情
		QueryQuestionAnswerStudentList:domainName + 'Statistics/QueryQuestionAnswerStudentList',
		// 查询安排下试卷试题正确率
		QueryQuestionHistoryCorrectRate:domainName + 'Statistics/QueryQuestionHistoryCorrectRate',
		// 查询安排下高频疑点
		QueryHighErrorCategoryItem:domainName + 'Statistics/QueryHighErrorCategoryItem',
		// 计算学年学生知识点学习统计信息
		calStudentCategoryRate:domainName + 'Statistics/calStudentCategoryRate',
		// 查询班级学生知识点学习统计信息
		QueryClassCategoryRate:domainName + 'Statistics/QueryClassCategoryRate',
		// 查询单个学生多学科知识点学习统计信息
		QueryStudentCategoryRate:domainName + 'Statistics/QueryStudentCategoryRate',
		// 查询学生某科（版本）下正确率
		queryStudentCategoryRateDetail:domainName + 'Statistics/queryStudentCategoryRateDetail',
		//查询各学科试题数量 
		getCategoryQuestionAmount:domainName+'Statistics/getCategoryQuestionAmount',
		//查询学科下试题类型试题数量
		getCategoryItemQuestionTypeAmount:domainName+'Statistics/getCategoryItemQuestionTypeAmount',
		//查询学科下试题类型试题数量
		getCategoryItemQuestionDifficultyAmount:domainName+'Statistics/getCategoryItemQuestionDifficultyAmount',
		//查询学科下知识点试题数量
		getCategoryItemQuestionAmount:domainName+'Statistics/getCategoryItemQuestionAmount',
		//导出学科统计信息
		ExportQuestionAmountInfo:domainName+'Statistics/ExportQuestionAmountInfo',
		//导出学科下的题型统计信息
		ExportQuestionTypeAmountInfo:domainName+'Statistics/ExportQuestionTypeAmountInfo',
		//导出学科下的知识点统计信息
		ExportQuestionCategoryItemAmountInfo:domainName+'Statistics/ExportQuestionCategoryItemAmountInfo',
		//导出学科下的难度统计信息
		ExportQuestionDifficultyAmountInfo:domainName+'Statistics/ExportQuestionDifficultyAmountInfo'
	},
	Payment:{
		//查询学生缴费订单
		QueryStudentPaymentBillByConditions:domainName+'Payment/QueryStudentPaymentBillByConditions',
		//验证是否支付考试安排
		IsExistPaymentTestActivity:domainName+'Payment/IsExistPaymentTestActivity',
		//查询学生需要支付的考试安排
		QueryStudentPaymentTestActivityByConditions:domainName+'Payment/QueryStudentPaymentTestActivityByConditions',
		//获取订单
		GetPaymentBill:domainName+'Payment/GetPaymentBill'
	}
};
/**
 * 租户功能权限
 */
UserFPSettings = [
	{
		page:'HomeLib',
		id:"fp-0",
		name:"管理平台",
		children:[
			{
				id:"fp-0.1",
				name:"首页",
				page:"HomePage",
				children:[]
			}
		]
	},
	{
		id:"fp-1",
		name:"题库",
		page:"QuestionLib",
		children:[
			{
				id:"fp-1.1",
				name:"新建试题",
				page:"NewQuestion",
				children:[]
			},
			{
				id:"fp-1.2",
				name:"导入试题",
				page:"ImportQuestion",
				children:[]
			},
			{
				id:"fp-1.3",
				name:"试题管理",
				page:"EditQuestion",
				children:[
					{id:"fp-1.3.1",name:"试题列表查询",ename:"query"},
					{id:"fp-1.3.2",name:"编辑",ename:"editor"},
					{id:"fp-1.3.3",name:"停用",ename:"disable"},
					{id:"fp-1.3.4",name:"启用",ename:"enable"},
					{id:"fp-1.3.5",name:"删除",ename:"delete_s"},
					{id:"fp-1.3.6",name:"审核",ename:"audit"},
					{id:"fp-1.3.7",name:"批量修改属性",ename:"batchModifyAttribute"},
					{id:"fp-1.3.8",name:"复制",ename:"copy"},
					{id:"fp-1.3.9",name:"相似度计算",ename:"SimilarScore"}
				]
			},
			{
				id:"fp-1.4",
				name:"修改试题属性",
				page:"BatchEditQueAttr",
				children: [
					{id: "fp-1.4.2", name: "批量修改属性",ename:"editQueAttr"}
				]
			},
			{
				id:"fp-1.5",
				name:"试题纠错",
				page:"createCorrection",
				children:[
					{id:"fp-1.5.1",name:"创建",ename:"created"}
				]
			},
			{
				id:"fp-1.6",
				name:"题库统计",
				page:"QuestionStat",
				children:[
					{
						id:"fp-1.6.1",
						name:"学科分布",
						page:"SubjectDis",
						children:[]
					},
					{
						id:"fp-1.6.2",
						name:"单科统计",
						page:"SingleSubjectStat",
						children:[]
					}
				]
			}
		]
	},
	{
		id:"fp-2",
		name:"试卷",
		page:"PaperLib",
		children:[
			{
				id:"fp-2.1",
				name:"单科组卷",
				page:"NewPaper",
				children:[]
			},
			{
				id:"fp-2.2",
				name:"试卷管理",
				page:"EditPaper",
				children:[
					{id:"fp-2.2.1",name:"试卷列表查询",ename:"query"},
					{id:"fp-2.2.2",name:"预览",ename:"preview"},
					{id:"fp-2.2.3",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-2.2.4",name:"停用",ename:"disable"},
					{id:"fp-2.2.5",name:"启用",ename:"enable"},
					{id:"fp-2.2.6",name:"删除",ename:"deletePaper"},
					{id:"fp-2.2.7",name:"试卷合并",ename:"examMerge"},
					{id:"fp-2.2.8",name:"导出下载",ename:"exportDownload"}
				]
			},
			{
				id:"fp-2.3",
				name:"导出模板管理",
				page:"tempDown",
				children:[
					{id:"fp-2.3.1",name:"导出模板列表查询",ename:"query"},
					{id:"fp-2.3.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-2.3.3",name:"删除",ename:"delete_s"},
					{id:"fp-2.3.4",name:"下载",ename:"download"}
				]
			},
			{
				id:"fp-2.4",
				name:"多科组卷",
				page:"ManyGroup",
				children:[]
			}
		]
	},
	{
		id:"fp-3",
		name:"活动安排",
		page:"navigation",
		children:[
			{
				id:"fp-3.1",
				name:"新增安排",
				page:"newExamArrangement",
				children:[]
			},
			{
				id:"fp-3.2",
				name:"批量新增安排",
				page:"multiExamArrangement",
				children:[]
			},
			{
				id:"fp-3.3",
				name:"活动安排管理",
				page:"ExamArrangement",
				children:[
					{id:"fp-3.3.1",name:"活动安排列表查询",ename:"query"},
					{id:"fp-3.3.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-3.3.3",name:"删除",ename:"delete_s"}
				]
			},
			{
				id:"fp-3.4",
				name:"参加活动",
				page:"participateInActivity",
				children:[]
			}
		]
	},
	{
		id:"fp-4",
		name:"定义",
		page:"Definition",
		children:[
			{
				id:"fp-4.1",
				name:"定义参照码表",
				page:"CodeDefinition",
				children:[]
			},
			{
				id:"fp-4.2",
				name:"定义试卷类型",
				page:"PaperTypeDefinition",
				children:[
					{id:"fp-4.2.1",name:"显示试卷类型列表",ename:"show"},
					{id:"fp-4.2.2",name:"录入/编辑试卷类型信息",ename:"entryEditingTestInformation"}
				]
			},
			{
				id:"fp-4.3",
				name:"定义活动类型",
				page:"ActivityTypeSetting",
				children:[]
			}
		]
	},
	{
		id:"fp-5",
		name:"配置",
		page:"Setting",
		children:[
			{
				id:"fp-5.1",
				name:"配置题型",
				page:"QuestionTypeSetting",
				children:[]
			},
			{
				id:"fp-5.2",
				name:"配置资源属性",
				children:[
					{id:"fp-5.2.1",name:"配置试题属性",ename:"questionsAttributeSetting"},
					{id:"fp-5.2.2",name:"配置试卷属性",ename:"paperAttributeSetting"}
				]
			},
			{
				id:"fp-5.3",
				name:"功能权限",
				page:"FPSetting",
				children:[]
			},
			{
				id:"fp-5.4",
				name:"数据权限",
				page:"DPSetting",
				children:[]
			},
			{
				id:"fp-5.5",
				name:"系统选项",
				page:"SystemSetting",
				children:[
					{id:"fp-5.5.1",name:"分类层级设置",ename:"classificationOfHierarchies"},
					{id:"fp-5.5.2",name:"试题管控",ename:"questionsControls"},
					{id:"fp-5.5.3",name:"试卷管控",ename:"paperControls"}
				]
			}
		]
	},
	{
		id:"fp-6",
		name:"评阅",
		page:"JudgeLib",
		children:[
			{
				id:"fp-6.1",
				name:"评阅列表查询",
				page:"JudgeAnswerPaper",
				children:[]
			},
			{
				id:"fp-6.2",
				name:"试卷评阅",
				page:"SubmitJudge",
				children:[
					{id:"fp-6.2.1",name:"评阅提交",ename:"judgeSubmit"}
				]
			}
		]
	},
	{
		id:"fp-7",
		name:"纠错",
		page:"correction",
		children:[
			{
				id:"fp-7.1",
				name:"纠错类型",
				page:"correctionType",
				children:[
					{id:"fp-7.1.1",name:"纠错类型列表查询",ename:"correctionTypeQuery"},
					{id:"fp-7.1.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-7.1.3",name:"删除",ename:"delete_s"}
				]
			},
			{
				id:"fp-7.2",
				name:"纠错管理",
				page:"correctionManage",
				children:[
					{id:"fp-7.2.1",name:"查看",ename:"query"},
					{id:"fp-7.2.2",name:"受理",ename:"accept"}
				]
			}
		]
	},
	{
		id:"fp-8",
		name:"课程管理",
		page:"CourseLib",
		children:[
			{
				id:"fp-8.1",
				name:"分类管理",
				page:"CourseCategory",
				children:[
					{id:"fp-8.1.1",name:"试卷列表查询",ename:"query"},
					{id:"fp-8.1.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-8.1.3",name:"删除",ename:"delete_s"},
					{id:"fp-8.1.4",name:"启用、停用",ename:"enableDisable"},
					{id:"fp-8.1.5",name:"导出",ename:"export_s"}
				]
			},
			{
				id:"fp-8.2",
				name:"课程管理",
				page:"CourseManage",
				children:[
					{id:"fp-8.2.1",name:"试卷列表查询",ename:"query"},
					{id:"fp-8.2.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-8.2.3",name:"删除",ename:"delete_s"},
					{id:"fp-8.2.4",name:"启用、停用",ename:"enableDisable"},
					{id:"fp-8.2.5",name:"导出",ename:"export_s"}
				]
			},
			{
				id:"fp-8.3",
				name:"课程结构管理",
				page:"CourseStructureManage",
				children:[
					{id:"fp-8.3.1",name:"试卷列表查询",ename:"query"},
					{id:"fp-8.3.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-8.3.3",name:"删除",ename:"delete_s"},
					{id:"fp-8.3.4",name:"启用、停用",ename:"enableDisable"},
					{id:"fp-8.3.5",name:"导出",ename:"export_s"}
				]
			},
			{
				id:"fp-8.4",
				name:"课程导入",
				page:"CourseImport",
				children:[]
			}
		]
	},
	{
		id:"fp-9",
		name:"活动统计",
		page:"ActivityStatisticsLib",
		children:[
			{
				id:"fp-9.1",
				name:"活动列表",
				page:"ActivityList",
				children:[
					{id:"fp-9.1.1",name:"活动列表查询",ename:"activityQuery"},
					{id:"fp-9.1.2",name:"查看考生信息",ename:"viewStudentInformation"},
					{id:"fp-9.1.3",name:"删除考生答卷记录",ename:"deleteStudentPaperRecords"},
					{id:"fp-9.1.4",name:"批量调整有效期",ename:"updateTestEndtime"}
				]
			}
		]
	},
	{
		id:"fp-10",
		name:"人员机构",
		page:"UserLib",
		children:[
			{
				id:"fp-10.1",
				name:"人员管理",
				page:"UserManage",
				children:[
					{id:"fp-10.1.1",name:"人员列表查询",ename:"query"},
					{id:"fp-10.1.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-10.1.3",name:"删除",ename:"delete_s"},
					{id:"fp-10.1.4",name:"启用、停用",ename:"enableDisable"},
					{id:"fp-10.1.5",name:"导入",ename:"import_s"},
					{id:"fp-10.1.6",name:"导出",ename:"export_s"},
					{id:"fp-10.1.7",name:"批量修改所属机构",ename:"ChangeUserOrganizationCode"}
				]
			},
			{
				id:"fp-10.2",
				name:"机构管理",
				page:"AgencyManage",
				children:[
					{id:"fp-10.2.1",name:"机构列表查询",ename:"query"},
					{id:"fp-10.2.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-10.2.3",name:"删除",ename:"delete_s"},
					{id:"fp-10.2.4",name:"启用、停用",ename:"enableDisable"},
					{id:"fp-10.2.5",name:"导出",ename:"export_s"}
				]
			},
			{
				id:"fp-10.3",
				name:"机构导入",
				page:"AgencyImport",
				children:[]
			}
		]
	},
	{
		id:"fp-11",
		name:"系统管理",
		page:"SystemLib",
		children:[
			{
				id:"fp-11.1",
				name:"操作日志",
				page:"LogManage",
				children:[]
			},
			{
				id:"fp-11.2",
				name:"数据转储",
				page:"DumpManage",
				children:[
					{id:"fp-11.2.1",name:"新增、编辑",ename:"newEditor"}
				]
			}
		]
	},
	{
		id:"fp-12",
		name:"设置",
		page:"SettingLib",
		children:[
			{
				id:"fp-12.1",
				name:"权限组管理",
				page:"PrivilegeManage",
				children:[
					{id:"fp-12.1.1",name:"权限组列表查询",ename:"query"},
					{id:"fp-12.1.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-12.1.3",name:"删除",ename:"delete_s"}
				]
			},
			{
				id:"fp-12.2",
				name:"自定义题型",
				page:"QustionTypeManage",
				children:[
					{id:"fp-12.2.1",name:"自定义题型列表查询",ename:"query"},
					{id:"fp-12.2.2",name:"新增、编辑",ename:"newEditor"},
					{id:"fp-12.2.3",name:"删除",ename:"delete_s"}
				]
			}
		]
	}
];
/**
 * 公共数据
 */
CommonData = {
	CONSTANTDATA:{
		OTSVERSION:"OTS3.1",
		FOOTERINFO:{
			COPYRIGHTINFO:"弘成科技发展有限公司版权所有",
			CAU_COPYRIGHTINFO:"北京中农大网络发展有限公司版权所有",
			COPYRIGHTTIME:"©2001-2016"
		},
		ERRORCORRECTIONCODE_C:"fp-1.5.1"
	},
	/**
	 * 百度编辑器工具栏上的所有的功能按钮的配置方案
	 */
	UEditorToobars:{
		planByCorrection:[
			[
				'undo', //撤销
				'redo', //重做
				'bold', //加粗
				'italic', //斜体
				'underline', //下划线
				'pasteplain', //纯文本粘贴模式
				'selectall', //全选
				'removeformat', //清除格式
				'time', //时间
				'date', //日期
				'inserttitle', //插入标题
				'fontfamily', //字体
				'fontsize', //字号
				'paragraph', //段落格式
				'link', //超链接
				'justifyleft', //居左对齐
				'justifyright', //居右对齐
				'justifycenter', //居中对齐
				'justifyjustify', //两端对齐
				'forecolor', //字体颜色
				'backcolor', //背景色
				'attachment', //附件
				'simpleupload', //单图上传
				'insertimage', //多图上传
				'music', //音乐
				'insertvideo', //视频
			]
		]
	},
	/**
	 * 试题状态对象集合
	 */
	queStateList:[
		{
			id:"",
			name:"全部"
		},
		{
			id:"1",
			name:"草稿"
		},
		{
			id:"2",
			name:"待审核"
		},
		{
			id:"3",
			name:"审核未通过"
		},
		{
			id:"4",
			name:"已入库"
		},
		{
			id:"0",
			name:"已停用"
		}
	],
	/**
	 * 101实验班，试卷评阅->教师评语列表信息
	 * 2016/03/09
	 * */
	teacherComments_101:{
		"commentList":[
		      {
		    	  cn_name:"太棒了，老师以你为骄傲！"
		      },
		      {
		    	  cn_name:"成绩有提高，相信你会更优秀！"
		      },
		      {
		    	  cn_name:"再接再厉，继续努力。"
		      },
		      {
		    	  cn_name:"粗心了，有些地方不该错！"
		      },
		      {
		    	  cn_name:"知识没有掌握，要加倍努力了！"
		      }
		 ]
	}
}