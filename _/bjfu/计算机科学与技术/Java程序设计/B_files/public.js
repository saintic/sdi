/*
OTS3.0 新版public公共js
该js包含所有的公用方法及相关的公用模板创建方法；

其中：
 PGParameters：公共全局变量对象（包含相关全局对象不可修改）
 publicFn：公共方法集合（处理业务逻辑的相关公共方法；）
 publicDefine：公共模板-Define创建方法（用创建vm对象模板及其相关方法）
 publicTemp：模板temp保存方法集合（存储模板的相关结构；调用时需要 publicFn.dealTmpDomElement()解析）

 公用插件初始化区（该功能插件每个页面都会用到）

*/
/********* 创建公共全局变量对象 ****************/
var PGParameters = {
	sTenant: "", // 当前租户名称
	categoryId: "", // 分类id;课程接口获取
	userFPSettings: "", // 功能名称、权限
	urlRequestParam: "", // url路径请求参数对象集合
	thisHFP: "", // 当前页面功能权限表
	otsMain_VM: "", // 创建项目最顶层模板
	scienceItems: [], // 课程数据列列表
	activityTypes_vm: [], // 活动列表
	_pageing: {}, // 分页模板对象；默认该对象为空对象
	_pageing2: {}, // 分页模板对象；默认该对象为空对象
	doesIncludeHF: { // 是否包含头部header信息，默认不包含
		header: false,
		footer: false
	}
};
/************** 公共方法集合 ****************/
var publicFn = {
	dealFreeze: function (callback) {
        window.addEventListener('focus', callback)
  //       document.addEventListener("visibilitychange", function() {
		//     if ( !document.hidden ) {
		//     	callback()
		//     }
		// });
    },
	bodyHeight: function (className,num) {
		$(className).css({
            minHeight: $(window).height() - num + "px"
        });
        $(window).resize(function () {
            var w = $(window).width(); //浏览器宽
            var h = $(window).height(); //浏览器高
            $(className).css({
                minHeight: h - num + "px"
            });
        });
	},
	/**
	 * 重建Solr索引，判断重建Solr索引是否成功；两种情况，一种返回成功，另一种报异常
	 * 返回true或者false
	 *
	 * @param _delta : 某个对象的所有
	 * @param _entity : 是否增量更新
	 * @param _async : 是否异步请求数据
	 * @returns {Boolean},返回是否成功
	 */
	buildSolrIndex: function (_delta, _entity, _async) {
		var isSu = false;
		Common.postRequest({
			method: URL.BuildSolrIndex,
			params: {
				delta: _delta,
				entity: _entity
			},
			async: _async
		}).then(function (data) {
			var cdata = publicFn.toJsonObj(data);
			if (cdata.data) {
				isSu = true;
			} else {
				alert(cdata.error)
			}
		});
		return isSu;
	},
	/**
	 *  禁用鼠标右键，禁止复制粘贴等操作
	 *  auth:JYX time:2016.07.28
	 */
	banCopyAndPaste: function () {
		// 禁止复制
		document.oncopy = function () {
			event.returnValue = false;
		};
		// 禁止右键菜单
		document.oncontextmenu = function () {
			event.returnValue = false;
		};
		// 禁止网页上选取内容
		document.onselectstart = function () {
			event.returnValue = false;
		};
		// 键盘事件
		document.onkeydown = function () {
			if (event.ctrlKey) {
				return false;
			}
		};
	},
	/**
	 * 对象数据克隆，完全复制另一份脱离原作用域链
	 *
	 * @param obj 被复制对象数据
	 * @returns
	 */
	cloneObj: function (obj) {
		if (publicFn.dataType(obj) !== "Object") return obj;
		var newObj = {};
		for (var key in obj) {
			newObj[key] = publicFn.cloneObj(obj[key]);
		}
		return newObj;
	},
	/**
	 * 创建guid
	 * @returns {string}
	 */
	creatGuid: function () {
		return (publicFn.creatS4() + publicFn.creatS4() + "-" + publicFn.creatS4() + "-" + publicFn.creatS4() + "-" + publicFn.creatS4() + "-" + publicFn.creatS4() + publicFn.creatS4());
	},
	/**
	 * 创建4位唯一标示
	 * @returns {string}
	 */
	creatS4: function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	/**
	 * 处理头部导航公共模板中的数据；
	 */
	dealGlobalDefineData: function (_cdata) {

		// 处理导航数据
		/**
		 * 处理头部导航信息；拼装1级菜单
		 */
		dealHeader = function () {
			// 获取用户名称
			otsMain_VM._userName = PGParameters.userFPSettings.uesrName;
			otsMain_VM.logoSrc = PGParameters.userFPSettings.thisLogo;
			// 判断是否显示退出按钮
			if (PGParameters.userFPSettings.tenant == "vedu") {
				otsMain_VM.isLoginOut = false;
			}
			// 获取所有活动类型
			var activityTypelist = _cdata.ActivityTypes,
				_allS = "", // 导航整体
				_homePageN = "<li class='fl navSF Cur' :click='activityList_c($event)'><a class='current' sactId='1'>首页</a></li>", // 显示的首页，因为下面方法需要根据sActId来判断跳转到哪里了，故因此特意加上sActId='1'，无任何意义
				_firstSN = "", // 显示的一级导航
				_firstHN = "", // 隐藏的一级导航
				_navNum = 0; // 导航个数，用来计算一级导航的个数
			if (activityTypelist && activityTypelist.length > 0) {
				for (var i = 0; i < activityTypelist.length; i++) {
					var sTypeName = activityTypelist[i].activityTypeName;
					var sActId = activityTypelist[i].id;
					var isPicTest = activityTypelist[i].takePhotoInTest;
					// 计数
					_navNum++;
					// 显示的一级导航最多只显示5个，除去首页之外
					if (_navNum <= 5) {
						// 显示的一级导航
						_firstSN += "<li class='fl navSF' :click='activityList_c($event)'><a sactId='" + sActId + "' ispictest = '" + isPicTest + "'>" + sTypeName + "</a></li>";

					}
					// 剩余导航做隐藏（。。。）显示
					if (_navNum > 5) {
						// 隐藏的一级导航
						_firstHN += "<li class='fl navSF' :mouseenter='showSEll_c(2,$event)' :mouseleave='hideSEll_c(2,$event)' :click='activityList_c($event)'><a sactId='" + sActId + "' ispictest = '" + isPicTest + "'>" + sTypeName + "</a></li>";

					}

				}
				// 拼装整体导航栏
				_allS += _homePageN + _firstSN;
				if(_navNum > 5){//...没有内容就不展示
					_allS += "<li class='fl pr navMore' :mouseenter='navMore_showSEll_c($event)' :mouseleave='navMore_hideSEll_c($event)'><span class='ellipsis block f20 tc'>&bull;&nbsp;&bull;&nbsp;&bull;</span><ul class='elliMore bg_fff'>" + _firstHN + "</ul></li>"
				}
				return _allS;
			}
		}
		// 加载头部模板
		otsMain_VM.headNavTemp = dealHeader();
	},
	/**
	 * 判断该功能下所有的功能权限；
	 * 将该权限放入到otsMain_VM顶级模板对象中；通过vm指令if判断是否显示该功能
	 */
	dealFnPermissions: function () {
		// 当前功能下权限
		if (PGParameters.thisHFP) {
			var _thisLocalityPL = '',
				_FnP = {};
			// 判断当前权限是否含有功能操作children
			if (PGParameters.thisHFP.children && PGParameters.thisHFP.children.length > 0) {
				// 根据coede获取当前功能下本地权限列表名称
				_thisLocalityPL = publicFn.getLocalityFP(PGParameters.thisHFP.id);
				if (_thisLocalityPL.children) {
					$.each(_thisLocalityPL.children, function (n, _val) {
						// 判断当前功能权限
						if (PGParameters.thisHFP) {
							for (var i = 0; i < PGParameters.thisHFP.children.length; i++) {
								// 判读是否存在功能权限，如果存在；获取权限名称；
								if (_val.id === PGParameters.thisHFP.children[i].id) {
									if (publicFn.getBrowserInfo().IsIE9Under) {
										_FnP[_val.ename] = true;
									} else {
										otsMain_VM.FnPermissions[_val.ename] = true;
									}
								}
							}
						}
					});
				}
			}
			if (publicFn.getBrowserInfo().IsIE9Under) {
				otsMain_VM.FnPermissions = _FnP;
			}
		}
		// 判断是否含有纠错功能权限
		var _erroCorr = publicFn.getFPSByCode(PGParameters.userFPSettings, CommonData.CONSTANTDATA.ERRORCORRECTIONCODE_C);
		if (_erroCorr) {
			if (publicFn.getBrowserInfo().IsIE9Under) {
				var _ec = {
					"correctionCreated": true
				};
				var _ap = otsMain_VM.FnPermissions.$model;
				_ap = $.extend(_ap, _ec);
				otsMain_VM.FnPermissions = _ap;
			} else {
				otsMain_VM.FnPermissions["correctionCreated"] = true;
			}
		}
	},
	/**
	 * 用于判断该html页面中是否包含头部导航栏相关信息（某些页面不显示），返回true/false
	 *
	 * @param e 当前对象
	 * @returns {Boolean} 返回值，true(包含)；false（不包含）,
	 */
	doesIncludeHeaders: function (e) {
		var isIn = {
			header: false,
			footer: false
		},
			headerTop = "",
			footer = "";
		headerTop = $(".newHeader");
		footer = $(".newFooter");
		if (headerTop && headerTop !== "") isIn.header = true;
		if (footer && footer !== "") isIn.footer = true;
		return isIn;
	},
	/**
	 * 处理对象参数值，排除对象参数值为""、null、undefined，并返回一个新对象
	 * @obj:需要处理的参数对象
	 * auth:JYX time:2016.07.25
	 */
	dealObjectNullValue: function (obj) {
		var param = {};
		if (!publicFn.effectiveAndNotEmptyData(obj)) return param;
		for (var key in obj) {
			if (publicFn.dataType(obj[key]) === "Object") {
				param[key] = publicFn.dealObjectNullValue(obj[key]);
			} else if (publicFn.effectiveAndNotEmptyData(obj[key])) {
				param[key] = obj[key];
			}
		}
		return param;
	},
	/**
	 * 处理树形结构数据，通过关联参数字段将有关联关系的数据整合起来，返回父子关系型数据结构；
	 *
	 * @param data:数据集合，改数据类型为数组，包含对象数据
	 * @param pcode:父节点名称，用关联当前对象的父级，字符串类型（例如："parentCode"）
	 * @param code:当前对象的节点名称，字符串类型（例如："code"）
	 * @param children:关联关系整合后，父级包含子级对象集合的名称，用来存放当前对象的所有子级，字符串类型（例如："children"）
	 */
	dealTreeData: function (data, pcode, code, children) {
		var r = [],
			tempMap = [];
		if (publicFn.dataType(data) === "Array") {
			for (var i = 0; i < data.length; i++) {
				// 个性化需求,判断是否存在百分比值
				if (data[i].rate) {
					data[i].rate = data[i].rate + "%";
				}
				tempMap[data[i][code]] = data[i];
			}
			for (var j = 0; j < data.length; j++) {
				if (tempMap[data[j][pcode]] && data[j][code] != data[j][pcode]) {
					if (!tempMap[data[j][pcode]][children]) {
						tempMap[data[j][pcode]][children] = [];
					}
					tempMap[data[j][pcode]][children].push(data[j]);
				} else {
					r.push(data[j]);
				}
			}
		}
		return r;
	},
	/**
	 *  判断传入参数的类型，以字符串的形式返回
	 *  @obj：数据
	 **/
	dataType: function (obj) {
		if (obj === null) return "Null";
		if (obj === undefined) return "Undefined";
		return Object.prototype.toString.call(obj).slice(8, -1);
	},
	/**
	 * 处理模板方法数据，获取当前方法下的字符串
	 * @param fn
	 * @returns {string}
	 */
	dealTmpDomElement: function (fn) {
		if (!publicFn.effectiveAndNotEmptyData(fn)) return false;
		return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
			replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><');
	},
	/**
	 * 原有对象扩展方法，以第一个参数为基准扩展
	 * @param o ：扩展对象
	 * @param p ：扩展值对象
	 * @returns {Object} ： 返回扩展参数对象
	 */
	extendedObject: function (o, p) {
		if (o === undefined || p === undefined) return o;
		if (o === null || p === null) return o;
		if (publicFn.dataType(o) == "Object" && publicFn.dataType(p) == "Object") {
			for (var key in p) {
				o[key] = p[key];
			}
		}
		return o;
	},
	/**
	 * 数据对象扩展;
	 * 参数不固定，但是最少不能少于两个，如果少于两个参数，则默认返回arguments中的第一个参数；
	 */
	extendObj: function () {
		var args = arguments;
		if (args.length < 2) return args[0];
		var temp = publicFn.cloneObj(args[0]);
		for (var i = 0; i < args.length; i++) {
			for (var key in args[i]) {
				temp[key] = args[i][key];
			}
		}
		return temp;
	},
	/**
	 * 判断数据，有效并且非（undefined、null、""）；
	 * @param param 需要判断的数据
	 * @returns {boolean}
	 */
	effectiveAndNotEmptyData: function (param) {
		if (param === undefined) return false;
		if (param === null) return false;
		if (param === "") return false;
		return true;
	},
	/**
	 * 替换相应标签
	 * @param str
	 * @returns {*|XML|void|string}
	 */
	escape2Html: function (str) {
		var arrEntities = {
			'lt': '<',
			'gt': '>',
			'nbsp': ' ',
			'amp': '&',
			'quot': '"'
		};
		return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
			return arrEntities[t];
		});
	},
	/**
	 * 判断是否是有效的数据，非undefined和null
	 * @param param 参数值
	 * @returns {Boolean}
	 */
	isEffectiveData: function (param) {
		if (param === undefined) return false;
		if (param === null) return false;
		return true;
	},
	/**
	 * 根据功能权限code,返回当前功能下所有功能权限
	 * @param FPSettings:权限功能列表集合
	 * @param fpCode:功能code
	 * @returns {___anonymous20166_20167}
	 */
	getFPSByCode: function (FPSettings, fpCode) {
		var _thisFPSCode = {},
			fpList = [];
		if (FPSettings !== "" && fpCode && fpCode != "") {
			// 判断FPSettings权限是否是数组
			if (publicFn.dataType(FPSettings) === "Object") {
				fpList.push(FPSettings);
			} else if (publicFn.dataType(FPSettings) === "Array") {
				fpList = FPSettings;
			}
			_thisFn = function (fpList) {
				if (fpList && fpList.length > 0) {
					for (var i = 0; i < fpList.length; i++) {
						if (fpList[i].children && fpList[i].children.length > 0) {
							if (fpList[i].id === fpCode) {
								_thisFPSCode = fpList[i];
							} else {
								for (var key in fpList[i].children) {
									if (fpList[i].children[key].id === fpCode) {
										_thisFPSCode = fpList[i].children[key];
									} else if (fpList[i].children[key].children && fpList[i].children[key].children.length > 0) {
										_thisFn(fpList[i].children[key].children);
									}
								}
							}
						} else {
							if (fpList[i].id === fpCode) {
								_thisFPSCode = fpList[i];
							}
						}
					}
				}
			};
			_thisFn(fpList);
		}
		return _thisFPSCode;
	},
	/**
	 * 根据权限code，返回本地相对应的权限列表
	 * @param fpCode
	 */
	getLocalityFP: function (fpCode) {
		if (UserFPSettings) {
			var _thisFPSCode = {};
			if (UserFPSettings !== "" && fpCode && fpCode != "") {
				_thisFn = function (UserFPSettings) {
					if (UserFPSettings && UserFPSettings.length > 0) {
						for (var i = 0; i < UserFPSettings.length; i++) {
							if (UserFPSettings[i].children && UserFPSettings[i].children.length > 0) {
								if (UserFPSettings[i].id === fpCode) {
									_thisFPSCode = UserFPSettings[i];
								} else {
									for (var key in UserFPSettings[i].children) {
										if (UserFPSettings[i].children[key].id === fpCode) {
											_thisFPSCode = UserFPSettings[i].children[key];
										} else if (UserFPSettings[i].children[key].children && UserFPSettings[i].children[key].children.length > 0) {
											_thisFn(UserFPSettings[i].children[key].children);
										}
									}
								}
							} else {
								if (UserFPSettings[i].id === fpCode) {
									_thisFPSCode = UserFPSettings[i];
								}
							}
						}
					}
				};
				_thisFn(UserFPSettings);
			}
			return _thisFPSCode;
		}
	},
	/**
	 * 根据相应条件查询分类项树数据；包括知识点树数据；教材版本知识点树数据
	 * @param _obj:查询条件参数对象
	 * @param _obj={
	 * 	categoryId:"";题目分类id
	 * 	code:"";课程code编码
	 * 	courseItemCode:"";题目分类项编码（获取该分类项下的子树）
	 * 	levelLimit:"";获取级别限制
	 * }
	 * @param fn:扩展方法
	 */
	getCategoryItemTreeList: function (_obj, fn) {
		if (!publicFn.effectiveAndNotEmptyData(_obj.categoryId)) return false;
		if (!publicFn.isEffectiveData(_obj.courseItemCode)) return false;
		var _params = {
			categoryId: _obj.categoryId,
			code: _obj.courseItemCode,
			itemCode: _obj.courseItemCode,
			levelLimit: _obj.levelLimit || ""
		}
		// 处理请求参数
		_params = publicFn.dealObjectNullValue(_params);
		// 获取接口名称
		var url = publicFn.getUlrFromeInterface('GetCategoryItemTree');
		Common.postRequest({
			method: url,
			params: _params
		}).then(function (data) {
			var cdata = publicFn.toJsonObj(data).data;
			if (publicFn.isEffectiveData(cdata)) {
				// 回调
				fn && fn(cdata.items);
			} else {
				Common.LightBox.show();
			}
		});
	},
	/**
	 * 根据相应条件查询所有题型
	 * @param categoryId:分类项id
	 * @param codes:分类项编码，多个用逗号分隔
	 * @param fn:扩展方法
	 */
	getQuestionTypeList: function (categoryId, codes, fn) {
		if (!publicFn.effectiveAndNotEmptyData(categoryId)) return false;
		if (!publicFn.isEffectiveData(codes)) return false;
		var url = publicFn.getUlrFromeInterface('GetQuestionTypeList');
		Common.postRequest({
			method: url,
			params: {
				categoryId: categoryId,
				codes: codes
			}
		}).then(function (data) {
			var cdata = publicFn.toJsonObj(data).data;
			if (publicFn.isEffectiveData(cdata)) {
				// 处理试题
				fn && fn(cdata.searchResult);
			} else {

			}
		});
	},
	/**
	 * 获取难度列表数据；
	 * @param _fn:回调函数
	 */
	getDifficultyList: function (_fn) {
		var url = publicFn.getUlrFromeInterface('GetDifficultyValues');
		Common.postRequest({
			method: url,
			params: {}
		}).then(function (data) {
			var cdata = publicFn.toJsonObj(data).data;
			if (publicFn.isEffectiveData(cdata)) {
				// 处理试题
				_fn && _fn(cdata.searchResult);
			} else {

			}
		});
	},
	/**
	 * 获取试题扩展属性
	 */
	getQuestionExtList: function (_fn) {
		var _curl = publicFn.getUlrFromeInterface('QuestionExt');
		Common.postRequest({
			method: _curl,
			params: {}
		}).then(function (QuestionExt) {
			var oQuestionExt = publicFn.toJsonObj(QuestionExt).data;
			if (oQuestionExt && (oQuestionExt.searchResult.length > 0)) {
				// 获取属性结果
				var aQueExtResult = oQuestionExt.searchResult;
				// 判断如果是枚举类型，转变其values值为数组
				if (aQueExtResult) {
					for (var i = 0; i < aQueExtResult.length; i++) {
						if (aQueExtResult[i].type === "Enum") {
							// 将枚举类型中的values转换为集合
							aQueExtResult[i].values = aQueExtResult[i].values.split(" ");
						}
					}
				}
				_fn && _fn(aQueExtResult);
			}
		});
	},
	/**
	 * 解析URL路径，返回参数对象
	 *
	 * @returns {Object}，参数对象
	 */
	getRequest: function () {
		var theRequest = new Object(),
			urlParam = {};
		//获取url中"?"符后的字串
		var url = location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		// 获取html名称
		var pArr = location.pathname.split("/");
		theRequest["htmlName"] = pArr[pArr.length - 1];
		theRequest["ulrParameters"] = urlParam;
		return theRequest;
	},
	/**
	 * 根据接口名称从interfaceURL变量中获取请求接口的路径
	 * @param name：接口名称
	 * @returns {string}:接口路径
	 */
	getUlrFromeInterface: function (name) {
		var _u = "";
		if (publicFn.isEffectiveData(name)) {
			getu = function (urlList) {
				for (var key in urlList) {
					if (publicFn.dataType(urlList[key]) == 'Object') {
						getu(urlList[key]);
					} else {
						if (name === key) {
							_u = urlList[key];
							break;
						}
					}
				}
			};
			try {
				getu(interfaceURL);
			} catch (e) {
				getu([]);
			};
		};
		return _u;
	},
	/**
	 * 获取浏览器sessionStorage、localStorage中存储的数据；
	 * 改方法主要获取OTS项目下所有的数据，不可取浏览器中保存的其他数据；
	 * 取到的是OTS版本号为KEY的value数据
	 *
	 * @param name：保存到浏览器中的名称key值
	 * @param type：保存方式sessionStorage、localStorage
	 * @param isAll: 是否返回OTS项目中所有的保存到浏览器中的信息,该参数为true时，name参数无效
	 * @returns {String}：返回数据；
	 * auth:JYX time:2016.07.20
	 */
	getDataFromBrowser: function (name, type, isAll) {
		var param = "",
			storageStr = "";
		if (type === "sessionStorage" && window.sessionStorage) {
			storageStr = window.sessionStorage.getItem(CommonData.CONSTANTDATA.OTSVERSION);
		} else if (type === "localStorage" && window.localStorage) {
			storageStr = window.localStorage.getItem(CommonData.CONSTANTDATA.OTSVERSION);
		}
		if (publicFn.isEffectiveData(storageStr)) {
			storageStr = publicFn.toJsonObj(storageStr);
			param = isAll ? storageStr : publicFn.getAttrFromObject(storageStr, name);
		}
		return param;
	},
	/**
	 * 根据对应的数据返回对象中的属性值；
	 *
	 * @param obj	数据对象
	 * @param name	key值
	 * @returns {returnAttr} 返回对象的属性值
	 */
	getAttrFromObject: function (obj, name) {
		var returnAttr = "";
		if (publicFn.dataType(obj) != "Object") return returnAttr;
		for (var key in obj) {
			if (key === name) {
				returnAttr = publicFn.cloneObj(obj[key]);
				break;
			}
		}
		return returnAttr;
	},
	/**
	 * 获取浏览器信息，返回数据对象
	 */
	getBrowserInfo: function () {
		var s = navigator.userAgent.toLowerCase();
		var BrowserInfo = {
			IsIE: /*@cc_on!@*/ false,
			IsIE8: /*@cc_on!@*/ false && (parseInt(s.match(/msie (\d+)/)[1], 10) == 8),
			IsIE9Under: /*@cc_on!@*/ false && (parseInt(s.match(/msie (\d+)/)[1], 10) <= 9),
			IsSafari: s.indexOf("applewebkit") > -1,
			IsOpera: !!window.opera,
			IsAIR: s.indexOf('adobeair') > -1,
			IsMac: s.indexOf('macintosh') > -1
		};
		(function (A) {
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
	getCssNameByTenant: function (tenant) {
		var name = "";
		if (publicFn.effectiveAndNotEmptyData(tenant)) {
			if (tenant == "garden") {
				name = "stuThemeByGarden";
			} else if (tenant == "101") {
				name = "stuThemeBy101";
			}
		}
		return name;
	},
	/**
	 * 获取遮罩ID名称
	 * 判断当前页面中有多少遮罩，每层遮罩的z-index的值不一样；
	 * @returns {string}
	 */
	getShadeLayerIdName: function () {
		var _dBg = "";
		if ($("#bg").css("display") === "block") {
			_dBg = "#bg2";
			// 提示框层级赋值
			$("#prompt_pop").css({
				'z-index': "9"
			});
			$("#errorCorrect_pop").css({
				'z-index': "9"
			});
		} else {
			_dBg = "#bg";
			// 提示框层级赋值
			$("#prompt_pop").css({
				'z-index': "7"
			});
			$("#errorCorrect_pop").css({
				'z-index': "7"
			});
		}
		return _dBg
	},
	/**
	 * 获取，该租户下所有功能权限
	 */
	projectSettings: function () {
		var url = publicFn.getUlrFromeInterface('UserFPSettings');
		Common.postRequest({
			method: url,
			params: {}
		}).then(function (setData) {
			var cdata = publicFn.toJsonObj(setData),
				cCode = PGParameters.urlRequestParam.ulrParameters.codes,
				id = PGParameters.urlRequestParam.ulrParameters.userId,
				_htmlName = PGParameters.urlRequestParam.htmlName;
			if (publicFn.effectiveAndNotEmptyData(cdata) && cdata.status == 1) {
				// 临时保存权限数据对象
				PGParameters.userFPSettings = cdata.data;
				// 租户
				PGParameters.sTenant = cdata.data.tenant;
				// 判断是否包含头部信息
				PGParameters.doesIncludeHF = publicFn.doesIncludeHeaders();
				// 创建公共模板
				publicDefine.creatGlobalDefine();
				if (_htmlName === "OTS-UniversityStart.html" || _htmlName === "OTS-UniversityStart2.html" || _htmlName === "OTS-UniverDetail.html" || _htmlName === "OTS-JudgeTestPage.html" || _htmlName === "examIndex.html") { // 如果是考试已经详情，不需要获取活动列表
					// 判读处理该功能下所有权限
					publicFn.dealFnPermissions();
					// 调用业务逻辑方法
					OTSBusinessLogicFn();
					avalon.scan(document.body);
					// 没有引入audiojs文件的页面会报错
					try {
						if (publicFn.effectiveAndNotEmptyData(audiojs)) {
							setInterval(function () {
								audiojs.events.ready(function () {
									var as = audiojs.createAll({});
								});
							}, 1000);
						}
					} catch (error) { }
				} else {
					// 处理头部数据，因为getActivityTypelist需要异步拿数据，因此这个函数，需要在getActivityTypelist函数的异步中去执行
					publicFn.getActivityTypelist(cCode, id, function (_cdata) {
						publicFn.dealGlobalDefineData(_cdata);
						// 判读处理该功能下所有权限
						publicFn.dealFnPermissions();
						// 调用业务逻辑方法
						OTSBusinessLogicFn();
						avalon.scan(document.body);
						// 因为每次都是生成新的头部，所以为了让新生成的头部也有Cur的效果，因此利用头部的ActId
						publicFn.changeOptionsTag_cFn();
						// 没有引入audiojs文件的页面会报错
						try {
							if (publicFn.effectiveAndNotEmptyData(audiojs)) {
								setInterval(function () {
									audiojs.events.ready(function () {
										var as = audiojs.createAll({});
									});
								}, 1000);
							}
						} catch (error) { }
					});
				}

				// 判读处理该功能下所有权限
				// publicFn.dealFnPermissions();
				// // 调用业务逻辑方法
				// OTSBusinessLogicFn();
				// avalon.scan(document.body);
				// // 没有引入audiojs文件的页面会报错
				// try {
				// 	if ( publicFn.effectiveAndNotEmptyData(audiojs)) {
				// 		setInterval(function () {
				// 			audiojs.events.ready(function() {
				// 				var as = audiojs.createAll({
				// 				});
				// 			});
				// 		}, 1000);
				// 	}
				// } catch (error) {
				// }
			} else {
				//alert(cdata.error);
			}
		});
	},
	/**
	 * 得到学生活动类型列表
	 * param cCode: 学生课程code
	 * param id: 用户id
	 * param fn: 回调
	 */
	getActivityTypelist: function (cCode, id, fn) {
		// 获取接口路径
		var _url = publicFn.getUlrFromeInterface('QueryActivityTypeListByStudentIdAndCourseCode');
		if (cCode == "undefined") {
			var param = {
				userid: id
			}
		} else {
			var param = {
				coursecode: cCode,
				userid: id
			}
		}
		param = publicFn.dealObjectNullValue(param);
		Common.postRequest({
			method: _url,
			params: param
		}).then(function (data) {
			var _cdata = CU.ajaxDataHandle(publicFn.toJsonObj(data));
			// 从后台获取用户id
			PGParameters.urlRequestParam.ulrParameters.userId = _cdata.userid;
			PGParameters.activityTypes_vm = _cdata.ActivityTypes;
			// 方便在OTS-HomePage.js 获取活动列表
			fn && fn(_cdata);
			// $('.fontCon').eq(0).css('background', 'linear-gradient(143deg,rgba(255,111,105,0.3) 0%,rgba(234, 29, 0, 1) 100%)');
			// $('.fontCon').eq(1).css('background', 'linear-gradient(142deg,rgba(255,214,133,0.5) 0%,rgba(248, 172, 19,1) 100%)');
			// $('.fontCon').eq(2).css('background', 'linear-gradient(144deg,rgba(255,255,255,0.5) 0%,rgba(81, 21, 255,1) 100%)');
			// $('.fontCon').eq(3).css('background', 'linear-gradient(143deg,rgba(255,255,255,0.5) 0%,#3388ff 100%)');
			// $('.fontCon').eq(4).css('background', 'linear-gradient(142deg,rgba(255,214,133,0.5) 0%,rgba(248, 172, 19,1) 100%)');
			// $('.fontCon').eq(5).css('background', 'linear-gradient(143deg,rgba(255,255,255,0.5) 0%,#3388ff 100%)');
		})
	},
	/**
	 * 获取纠错类型
	 * @param type
	 */
	queryCorrectionType: function (type) {
		// 获取试题纠错类型
		var _url = publicFn.getUlrFromeInterface('queryCorrectionTypeByCondition');
		Common.postRequest({
			method: _url
		}).then(function (data) {
			var cdata = publicFn.toJsonObj(data).data;
			if (publicFn.isEffectiveData(cdata)) {
				//errorCorrectVM.corrTypeList_vm = cdata.types;
				errorCorrectVM.corrTypeList_vm.pushArray(cdata.types);
			}
		});
	},
	/**
	 * 批量移除某个样式
	 *
	 * @param obj:jquery对象
	 * @param className:样式名称
	 * auth:JYX time:2016.01.20
	 */
	removeClassName: function (obj, className) {
		if (obj && obj.length > 0 && className && className != "") {
			$.each(obj, function (n, val) {
				var $val = $(val);
				if ($val.hasClass(className)) {
					$val.removeClass(className);
				}
			});
		}
	},
	/**
	 * 去掉html的标签(ztree,左侧)
	 * @str str:标签字符串
	 */
	removeHTMLTag: function (str) {
		if (!publicFn.effectiveAndNotEmptyData(str)) return str = "";
		str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
		str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
		str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
		return str;
	},
	/**
	 * 通过sessionStorage、localStorage将数据保存到浏览器中存储；
	 * OTS的版本号作为要存储数据的KEY值，value值将以json的形式保存；
	 *
	 * @param data：保存的参数value值
	 * @param name：保存到浏览器中的key值，获取时候用
	 * @param type：保存方式sessionStorage、localStorage
	 * @returns {Boolean}：是否保存成功
	 * auth:JYX time:2016.07.20
	 */
	setDataToBrowser: function (name, data, type) {
		// 判断name和data数据为有效数据
		if (!publicFn.effectiveAndNotEmptyData(name)) return false;
		if (!publicFn.isEffectiveData(data)) return false;
		var _storage = {
			name: data
		};
		// 获取浏览器中现有保存项目下的临时数据
		var OTS3Storage = publicFn.getDataFromBrowser(name, type, true);
		// 数据扩展
		OTS3Storage = OTS3Storage === "" ? _storage : publicFn.extendObj(OTS3Storage, _storage);
		// 保存
		if (type === "sessionStorage" && window.sessionStorage) {
			window.sessionStorage.setItem(CommonData.CONSTANTDATA.OTSVERSION, JSON.stringify(OTS3Storage));
			return true;
		} else if (type === "localStorage" && window.localStorage) {
			window.localStorage.setItem(CommonData.CONSTANTDATA.OTSVERSION, JSON.stringify(OTS3Storage));
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 替换主题css样式文件；
	 * @param textName：替换的css样式文件名称及路径
	 * @param tag: html中需要替换link的标记（ty）值
	 * auth:JYX time:2016.07.28
	 */
	setStyleSheet: function (textName, tag) {
		if (!publicFn.effectiveAndNotEmptyData(textName)) return false;
		// 找到head
		var doc_head = document.getElementsByTagName("head")[0],
			replaceURL = "";
		// 找到所有的link标签
		var link_list = document.getElementsByTagName("link");
		if (link_list) {
			for (var i = 0; i < link_list.length; i++) {
				// 找到我们需要替换的link，
				if (link_list[i].getAttribute("tag") === tag) {
					// 获取当前路径，并根据"/"截成数组
					var _arr = link_list[i].getAttribute("href").split("/");
					// 要替换的css名称赋值
					_arr[_arr.length - 1] = textName + ".css";
					// 重新编译成路径
					for (var i = 0, len = _arr.length; i < len; i++) {
						if (_arr[i] == "") {
							replaceURL += "/";
						} else {
							replaceURL += _arr[i];
							if (i != len - 1) {
								replaceURL += "/";
							}
						}
					}
					// 将这个link标签重head中移除
					doc_head.removeChild(link_list[i]);
				}
			}
			if (replaceURL != "") {
				// 创建一个新link标签
				var link_style = document.createElement("link");
				// 对link标签中的属性赋值
				link_style.setAttribute("rel", "stylesheet");
				link_style.setAttribute("type", "text/css");
				link_style.setAttribute("href", replaceURL);
				link_style.setAttribute("tag", tag);
				// 加载到head中最后的位置
				doc_head.appendChild(link_style);
			}
		}
	},
	/**
	 * 浮动提示框；显示后规定的时间逐渐消失；
	 * @param _data
	 */
	showFloatTipBox: function (_data) {
		var _$floatTipBox = $(".floatTipBox");
		// 判断浮动提示框容器是否存在
		if (_$floatTipBox && _$floatTipBox.length > 0) {
			// 如果存在
			_$floatTipBox.text(_data).fadeIn(200);
		} else {
			// 创建容器
			var _tipBStr = "<div id='floatTipBox' class='floatTipBox none' ></div>";
			$(_tipBStr).appendTo(document.body);
			_$floatTipBox = $(".floatTipBox");
			_$floatTipBox.text(_data).fadeIn(200);
		}
		// 计算显示的位置
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var _l = $(window).width() / 2 - document.getElementById("floatTipBox").clientWidth / 2,
			_t = $(window).height() / 2 - document.getElementById("floatTipBox").clientHeight / 2 + scrollTop;
		_$floatTipBox.css({
			'left': _l + 'px',
			'top': _t + 'px'
		});
		// 添加定时器，规定时间后隐藏
		setTimeout(function () {
			_$floatTipBox.fadeOut(500);
		}, 2000);
	},
	/**
	 * 关闭当前页面
	 * @param _data
	 */
	closePage:function(){
		window.open("about:blank", "_self").close(); //关闭当前页（关不了就开白页）
		top.close();
	},
	/**
	 * 获取学科数据；根据参数调用接口获取学科学段数据；
	 * @sCateCode cCodes：学科学段code;
	 * @fn fn:回调函数，如果此参数存在则执行；
	 * auth:JYX time:2016.05.20
	 */
	tr_subJecFun: function (sCateCode, fn) {
		// 判断sCateCode，是否为null,undefined
		if (!publicFn.isEffectiveData(sCateCode)) return false;
		var url = interfaceURL.QuestionsManage.QuestionCategory.GetMainCategoryMainLevelItemList;
		Common.postRequest({
			method: url,
			params: {
				codes: sCateCode
				// 不知道下面这个参数是否需要，觉得是不需要的
				// gradeCode:sCateCode
			}
		}).then(function (Maindata) {
			var data = publicFn.toJsonObj(Maindata);
			if (data.data) {
				// 存储课程列表
				PGParameters.scienceItems = data.data.items;
				// 获取categoryId
				PGParameters.categoryId = data.data.categoryId;
				// 判断百度编辑器是否存在，如果存在更改编辑器路径
				if (publicFn.effectiveAndNotEmptyData(window.UEDITOR_CONFIG)) {
					window.UEDITOR_CONFIG.serverUrl = window.UEDITOR_CONFIG.serverUrl + data.data.realpath;
				}
				fn && fn();
			} else {

			}
		});
	},
	/**
	 * 将json字符串转换成数据对象
	 * @param param
	 * @returns {*}
	 */
	toJsonObj: function (param) {
		var obj = publicFn.isEffectiveData(param) ? (new Function("", "return " + param))() : {};
		return obj;
	},
	/**
	 * 计算字符串的长度值，中文占2位，英文占1位
	 * @param str:字符串
	 * @returns {number} 长度
	 */
	strLen: function (str) {
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			len += str.charAt(i).match(/[\u0391-\uFFE5]/) ? 2 : 1;
		}
		return len;
	},
	/**
	 * 正则判断是否是音视频题，这是为了对音视频的统一处理，但是需要知道到底是音频还是视频，或者是其它附件，因此还需要特别判断
	 * @param :str
	 * @returns boolean
	 */
	isAudioOrVideo: function (str) {
		// var patt = new RegExp(/href\=\"(.*)\.mp3\"/ig);
		// var patt = new RegExp(/<a.+?href\=\"(.*\.mp[34]).*>.*<\/a>/ig);
		var patt = new RegExp(/<p[ ]+style\=\"line-height\: [0-9]+px\;\">.+?<a.+?href\=\"(.*\.mp[34]).*>.+?<\/a><\/p>/);
		return patt.test(str);
	},
	/**
	 * 判断是否是附件，附件都不需要处理p标签
	 */
	isAttachment: function (str) {
		var patt = new RegExp(/<p[ ]+style\=\"line-height\: [0-9]+px\;\">.+?<a.+?href\=\".*?>.+?<\/a><\/p>/);
		return patt.test(str);
	},
	/**
	 * 对音频、视频题的统一处理，用在将上传后的音视频进行展示（新建试题预览，试题管理展示）
	 * @param _stem:str 需要处理的字符串
	 * @returns :str 返回处理后的字符
	 */
	dealAudioOrVideo: function (_stem) {
		if (!publicFn.effectiveAndNotEmptyData(_stem)) return _stem;
		_stem = _stem.replace(/\n/g, "");
		if (/<video[^>]/.test(_stem)) {
			_stem = _stem.replace(/<video.*?src\=\"(.*?\.mp[34]).*?>.*?<\/video>/g, function (str) {
				var _arg1 = arguments[1];
				if (/<video.*?src\=\"(.*?\.mp4).*?>.*?<\/video>/.test(str)) {
					str = "<img _type = 'mp4' _src='" + _arg1 + "'  ms-click='videoClick_c($event)' src='../../resources/ots/student/default/otsAssets/images/img/video.jpg' style='margin-right: 5px;cursor:pointer;' width='420px' height='280px'/>";
				} else if (/<video.*?src\=\"(.*?\.mp3).*?>.*?<\/video>/.test(str)) {
					str = "<img _type = 'mp3' _src='" + _arg1 + "'  ms-click='videoClick_c($event)' src='../../resources/ots/student/default/otsAssets/images/img/video.jpg' style='margin-right: 5px;cursor:pointer;' width='420px' height='280px'/>";
				}
				return str;
			});
		}
		return _stem;
	},
	/**
	 * 过滤框架或者页面js保存的数据；
	 * @param str 需要过滤的字符串
	 * @returns str 过滤后的字符串
	 */
	filterUnableData:function(str){
		if (!publicFn.effectiveAndNotEmptyData(str)) return str;
		if (!(typeof(str) == "string")) return str;//只过滤字符串
		// 这个也是html大括号特殊编码
		if (/&#123;/.test(str)) {
		    str = str.replace(/&#123;/g, "{");
		}
		if (/&#125;/.test(str)) {
		    str = str.replace(/&#125;/g, "}");
		}
		//过滤{{ 如果没有}}闭合avalon会报错  替换为中间加了一个空格
		if (/{{/.test(str)) {
			str = str.replace(/{{/g, "{ {");
			str = str.replace(/}}/g, "} }");
		}
		return str;
	},
	/**
	 * 音视频图片切换成多媒体的点击事件
	 */
	videoClick_cFn: function ($event) {
		Common.stopBubble($event);
		var _$this = $($event.currentTarget),
			_src = _$this.attr("_src"), // 地址
			_type = _$this.attr("_type"),
			_id = "id" + publicFn.creatGuid(); // 类型 mp4还是mp3
		// 判断是mp4还是mp3
		if (_type == "mp4") {
			_$this[0].outerHTML = '<div id=' + _id + ' style="width: 420px; height: 280px"></div>';
			var videoObj = {
				container: '#' + _id, //“#”代表容器的ID，“.”或“”代表容器的class
				variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
				poster: '', //封面图片
				video: _src //视频地址
			}
			var player = new ckplayer(videoObj);
			// 放在videojs实例后面，不然只是给video标签绑定了click事件，而videojs实例不仅仅有video标签
			$("#" + _id).bind("click", function (e) {
				Common.stopBubble(e);
			});
		} else if (_type == "mp3") {
			_$this[0].outerHTML = '<audio preload="none"><source src=' + _src + ' type="audio/mp3"> </audio>';
		}
	},
	/**
	 * 绑定body页面滚动条事件；用作扩展
	 * @param fn：回调函数；回调函数中会返回两个参数，1：当前事件操作对象；2：滚动条值；
	 */
	windowOnScroll: function (fn) {
		if(window.location.pathname.indexOf('University') > 0){
			$(window.document).scroll(function (e) {
				// 获取滚动条，滚动的距离值，兼容写法
				var _scrollTopNum = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(_scrollTopNum);
				// 判断是否含有返回顶部按钮对象功能

				var _goBackTop = $(".goBackTopArea");
				if (_goBackTop && _goBackTop.length > 0) {
					// 如果含有，则判定显示隐藏
					if (_scrollTopNum >= 300) {
						// 判断显示返回顶部按钮
						if ($(".goBackTopArea").hasClass("none")) {
							$(".goBackTopArea").removeClass("none");
						}
					} else {
						// 隐藏返回顶部按钮
						if (!$(".goBackTopArea").hasClass("none")) {
							$(".goBackTopArea").addClass("none");
						}
					}
				}
				fn && fn(e, _scrollTopNum);
			});
		}
	},
	/**
	 * 按钮标记：每次重新生成标题时，执行的改变标题的显示状态
	 */
	changeOptionsTag_cFn: function () {
		var _$liList = $(".navUl li");
		$.each(_$liList, function (n, val) {
			var _$val = $(val);
			// 由于我们是在遍历所有的li，因此也会拿到.navMore，直接用find("a")，会导致给.navMore加上Cur
			// if (_$val.hasClass("navMore")) {
			// 	return false;
			// }
			// 所以需要给首页一个无用的sactid不然会报错的
			var sActId = _$val.children("a").attr("sactid");
			// 移除所有标记项
			if (_$val.hasClass("Cur")) {
				_$val.removeClass("Cur");
			}
			// 标记与ActId值相同的项，这里其实也不严谨，因为...也是没有sActId的，所以也符合这个条件，及undefined
			// 除了是首页的，其它的除了...都会有值，所以不会再出现首页的这种错误
			if (PGParameters.urlRequestParam.ulrParameters.sActId == sActId) {
				_$val.addClass("Cur");
				return false;
			} else if (!PGParameters.urlRequestParam.ulrParameters.sActId) { // 如果网址上没有sActId值，说明是返回首页
				_$liList.eq(0).addClass("Cur");
				// 一旦给首页赋值，就直接return false，阻止继续下去，以免给...赋值了Cur
				return false;
			}
		})
	},
	/**
	 * 活动类型点击事件：点击切换活动类型
	 * @param $event
	 */
	activityList_cFn: function ($event) {
		// 获取Jq对象，以及可点击的活动项a标签
		var _$this = $($event.currentTarget),
			_a = _$this.find("a");
		// 如果已经标记，返回false或者如果是。。。直接返回false
		if (_$this.hasClass("Cur") || _$this.hasClass("navMore")) {
			return false;
		}
		if (_a.attr("sactid")) {
			var sActid = _a.attr("sactid");
			var isPicTest = _a.attr("ispictest");
			var sVal = _a.text();
			if (sVal == "错题本") {
				window.open("OTS-WrongQuestion.html?userId=" + PGParameters.urlRequestParam.ulrParameters.userId + "&sActId=" + sActid);
			} else if (sVal == "学生自测") {

			} else if (sVal == "首页") {
				window.location.href = "OTS-HomePage.html?codes=" + PGParameters.urlRequestParam.ulrParameters.codes + "&userId=" + PGParameters.urlRequestParam.ulrParameters.userId;
			} else {
				window.location.href = "OTS-ActivityList.html?codes=" + PGParameters.urlRequestParam.ulrParameters.codes + "&userId=" + PGParameters.urlRequestParam.ulrParameters.userId + "&sActId=" + sActid + "&isPicTest=" + isPicTest;
			}

		}

	},
	/**
	 * 底部高度的计算：十分重要。。。
	 * 这个方法在页面高度不固定时，必须引入，不然底部栏的高度会乱
	 * 
	 */
	bodyIndex_H: function () {
		var bodyIndex = $(".test-bodyIndex"), // 页面主区域
			foot2017 = $(".newFooter"), // 底部
			header = $(".newHeader"), // 
			letfContainer = $(".leftContainer"); // 左侧区域，视页面布局而定，有的并无这个地方
		// 判断如果无bodyIndex，那么return false
		if (bodyIndex.length <= 0) return false;
		// 每次都将bodyIndex的高度初始化一下，免得在不刷新页面的情况下
		// 比如tab切换，或者搜索之类的导致高度不是自己的真实高度，而是经过这个方法设置好的
		bodyIndex.css({
			"height": "auto"
		});
		// 有无newheader和标题栏是一种情况
		if (header.length > 0) {
			var _w = $(window).width(),
				_h = $(window).height(),
				_wh = $(window).height() - 60 - 50, // 减去头60，还有底部的50（没有margin）
				bw = $('body').width(),
				bh = $('body').height();
		} else {
			var _w = $(window).width(),
				_h = $(window).height(),
				_wh = $(window).height() - 40 - 50, // 页面区域的上padding40,减去底部的50
				bw = $('body').width(),
				bh = $('body').height();
		}

		// 所有的这个操作均相同，就是_wh得值不同
		if (_h > bh) {
			bodyIndex.css({
				'min-height': _wh
			});
		} else {
			bodyIndex.css({
				'min-height': 'auto',
				'position': 'inherit'
			});
		}
	},
	/**
	 * 付费考试
	 */
	goPayList_cFn: function () {
		window.location.href = "OTS-PayExamList.html?userId=" + PGParameters.urlRequestParam.ulrParameters.userId + "&sActId='123'";
	},
	/**
	 * 退出功能
	 */
	loginOut_cFn: function () {
		var sTenant = PGParameters.userFPSettings.tenant;
		var aTenant = prefix.split("/");
		var sLoginTenant = aTenant[aTenant.length - 1];
		window.location.href = "/" + sLoginTenant + "/OTS-StuLogin.html?tenant=" + sTenant;
	}
};
/******** 公共模板-Define创建方法 ************/
var publicDefine = {
	/**
	 *  创建公共全局模板；
	 *  全局模板中包含导航栏中所有的信息；所以该模板创建时依赖UserFPSettings功能接口；需等待该接口调取成功后在创建
	 *  该模板只需创建一次；其中所包含的数据信息在全局中使用；
	 **/
	creatGlobalDefine: function () {
		// 判断avalon是否已加载
		if (!avalon) return false;
		// 因为后台拿到的是不闭合标签的字符串，在avalon2中会报错
		// 因此写了一个过滤器，将其转换为闭合标签
		avalon.filters.parse = function (str) {
			var dom1 = $(".parseHtml");
			if(dom1.length<1){
				var txt2=document.createElement("p");
				dom1 = $(txt2);
			}
			dom1.html(str);
			var txt1 = dom1.html();
			dom1.html("");
			str = txt1;
			return str;
		};

		// 填空题时，需要处理题干，因此写成一个过滤器，便于复用
		avalon.filters.dealStem = function (stem, pairList) {
			var temp = {
				sRepVar: /<var.*?\/var>/gi, //替换填空题
				sRepLine: /\_{3,}/g,
				bankingAreaList: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮','⑯','⑰','⑱','⑲','⑳']
			},
				j = 0,
				_content = []
			k = 0,
				_contentL = []; // 临时保存填空content值
			stem = stem.replace(temp.sRepLine, function () {
				_content = pairList[j].contentList;
				// 编辑题干中显示的填空区
				var _tempContent = "";
				for (var i = 0, len = _content.length; i < len; i++) {
					if (len <= 1) { // 如果是只有一个正确答案的填空，不需要有①这种标识
						_tempContent = _content[i];
					} else { // 需要标识
						if (i == 0) { // 第一个数字不需要margin-left
							_tempContent += "<span style='margin-right:2px; line-height:25px; font-size:16px; font-style: normal'>" + temp.bankingAreaList[i] + "</span>" + _content[i];
						} else {
							_tempContent += "<span style='margin: 0 2px 0 5px; line-height:25px; font-size:16px; font-style: normal'>" + temp.bankingAreaList[i] + "</span>" + _content[i];
						}
					}
				}
				// 有没有①会导致高度不同，所以有①的就设置一个高度height:23px
				var _stemShowVar = "";
				if (len <= 1) {
					_stemShowVar = "<var class='banking'>" + _tempContent + "</var>";
				} else { // 有标识，设置高度为23px
					_stemShowVar = "<var style='height: 23px;' class='banking'>" + _tempContent + "</var>";
				}
				j++;
				return _stemShowVar;
			});
			// 有些老的试题没有转成下划线 还是var 所以需要写两次
			stem = stem.replace(temp.sRepVar, function () {
				_contentL = pairList[k].contentList;
				// 编辑题干中显示的填空区
				var _tempContent = "";
				for (var i = 0, len = _contentL.length; i < len; i++) {
					if (len <= 1) { // 如果是只有一个正确答案的填空，不需要有①这种标识
						_tempContent = _contentL[i];
					} else { // 需要标识
						if (i == 0) { // 第一个数字不需要margin-left
							_tempContent += "<span style='margin-right:2px; line-height:25px; font-size:16px; font-style: normal'>" + temp.bankingAreaList[i] + "</span>" + _contentL[i];
						} else {
							_tempContent += "<span style='margin: 0 2px 0 5px; line-height:25px; font-size:16px; font-style: normal'>" + temp.bankingAreaList[i] + "</span>" + _contentL[i];
						}
					}
				}
				if (len <= 1) {
					_stemShowVar = "<var class='banking'>" + _tempContent + "</var>";
				} else { // 有标识，设置高度为23px
					_stemShowVar = "<var style='height: 23px;' class='banking'>" + _tempContent + "</var>";
				}
				k++;
				return _stemShowVar;
			});
			return stem;
		};
		// 处理简答题时的答案时，由于有标签，显示效果不好，所以写一个去除标签的过滤器
		avalon.filters.removeTag = function (str) {
			if (!publicFn.effectiveAndNotEmptyData(str)) return str = "";
			str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
			str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
			str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
			return str;
		};
		/**
		 * 错题本单选、多选解析由于id不一定从0，是连续的索引
		 * @param str: 默认，当是单选题时是一个字符串，当是多选题时是数组
		 * @param mode: 单选还是多选
		 * @param optionList: 答案数组
		 */
		avalon.filters.selectionAns = function (str, mode, optionList) {
			var serial_number = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
			var ind = "",
				ansList = [];
			// 根据正确答案id判断其在答案数组里面的索引，然后知道答案的值
			if (mode == "SingleSelection") {
				$.each(optionList, function (n, val) {
					if (str == val.id) {
						ind = n;
						return;
					}
				});
				return serial_number[ind];
			} else if (mode == "MultiSelection") {
				$.each(str, function (n, val) {
					for (var i = 0, len = optionList.length; i < len; i++) {
						if (val == optionList[i].id) {
							// 将正确答案值存储起来
							ansList.push(serial_number[i]);
						}
					}

				});
				return ansList.join("");
			}

		}
		// 创建body最顶层模板
		otsMain_VM = avalon.define({
			$id: "otsMain_VM",
			_userName: "", // 用户名称
			logoSrc: "",
			isLoginOut: true, // 是否显示退出
			headTemp: "", // 头部导航模板temp
			headNavTemp: "", // 导航菜单模板信息
			footTemp: "", // 底部版本信息模板temp
			titileBarTemp: "", // 标题栏模板
			_threeSNTemp: "", // 临时保存三级菜单列表数据
			FnPermissions: {}, // 功能权限
			tenant: PGParameters.sTenant,
			answer_number: ['', '正确', '错误'],
        	serial_number: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        	bankingAreaList: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮','⑯','⑰','⑱','⑲','⑳'],
			goBackTopArea_c: function ($event) { // 返回顶部
				$('body,html').animate({
					scrollTop: 0
				}, 500);
			},
			showSEll_c: function (_type, $event) { // 导航一级菜单-绑定鼠标移入显示当前二级菜单列表数据
				// 转换当前节点为jq对象
				var _this = $($event.currentTarget).eq(0);
				if (_type === 1) {
					_this.find(".sec_elliMore").show();
				} else if (_type === 2) {
					_this.find(".secHn_elliMore").show();
				}
			},
			hideSEll_c: function (_type, $event) { // 导航一级菜单-绑定鼠标移出隐藏当前二级菜单列表数据
				// 转换当前节点为jq对象
				var _this = $($event.currentTarget).eq(0);
				if (_type === 1) {
					_this.find(".sec_elliMore").hide();
				} else if (_type === 2) {
					_this.find(".secHn_elliMore").hide();
				}
			},
			navMore_showSEll_c: function ($event) { // 显示 -- 隐藏的一级菜单
				// 转换当前节点为jq对象
				var _this = $($event.currentTarget).eq(0);
				_this.find(".elliMore").show();
			},
			navMore_hideSEll_c: function ($event) { // 隐藏 -- 隐藏的一级菜单
				// 转换当前节点为jq对象
				var _this = $($event.currentTarget).eq(0);
				_this.find(".elliMore").hide();
			},
			activityList_c: function ($event) { // 活动类型点击事件，在首页也有，但是不能在标题这用，所以在全局又写了一个
				// 活动点击事件处理
				publicFn.activityList_cFn($event);
			},
			loginOut_c: function ($event) { // 退出按钮
				publicFn.loginOut_cFn($event);
			},
			goPayList_c: function () { // 去付费列表
				publicFn.goPayList_cFn();
			},
			videoClick_c: function ($event) { // 音视频的点击事件
				publicFn.videoClick_cFn($event);
			}
		});
		// 加载头部模板文件信息
		otsMain_VM.headTemp = publicFn.dealTmpDomElement(publicTemp.headTemp);
		// 加载页面底部信息
		otsMain_VM.footTemp = publicFn.dealTmpDomElement(publicTemp.newFootTemp);
	},
	/**
	 * 创建标题栏功能模板;
	 * 因标题栏中包含三级导航功能,其数据需要功能接口调取完毕并且公共模板otsMain_VM创建完成（处理完导航数据）
	 * 故在创建标题栏模板时需要等待DOM数据加载完毕在进行创建；其中加入了定时器并使用document.readyState去判断何时调用；
	 *
	 * 此标题栏功能包括：三级导航功能、课程选择搜索功能、全局搜索功能、面包屑功能以及其他扩展功能（试题管理按钮区）
	 * @param _obj：模板所需参数对象
	 * _obj={
	 * 	isShowNavigationTemp：true|false;开关项--是否显示该页面所属功能导航栏
	 * 	isShowCourseLTemp：true|false;开关项--是否显示课程模板
	 * 	isShowBarBtnAreaTemp：true|false;开关项--是否显示-按钮区域（试题管理）模板
	 * 	isShowBarSearchAreaTemp：true|false;开关项--是否显示搜索框模板
	 * 	isShowBarBreadCrumbs：true|false;开关项--是否显示面包屑模板
	 * 	breadCrumbsValue:"";面包屑字符串，每个功能已逗号','分隔，逗号是英文字符；如"首页,题库,新建试题"
	 * 	scienceItems:[];课程数据列表
	 * 	courseItemCode:"";选中的课程code，用于当选着课程过后临时保存待查寻的课程code值
	 * 	fullTextSearch_val:"";全局搜索参数值，只有在isShowBarSearchAreaTemp位true的情况下有效
	 * 	defaultCName:"";默认显示的课程名称。
	 * 	callBackFn:function;课程选择功能回调函数；
	 * 	imptBach_btn:function;试题管理中批量导入按钮回调函数
	 * 	newQuestions_btn:function;试题管理中新建试题按钮回调函数
	 * }
	 */
	creatTitleBarDefine: function (_obj) {
		// 创建标题栏模板相关信息
		creatTitleBarDefine = avalon.define({
			$id: 'creatTitleBarDefine', // 模板id
			titileBarTemp: publicFn.dealTmpDomElement(publicTemp.titleBarTemp), // 标题栏显示主模板
			titileBarCourseLTemp: "", // 主模板中，课程显示模板
			titileBarNavigationTemp: "", // 主模板中，功能导航显示模板
			titileBarOtherConTemp: "", //  主模板中，其他信息显示模板
			/** 判断项：用判断是否显示/隐藏某个显示的图层或判断是否加载相关模板；
			 * 获取传参数中的值；默认值为false；以下boolean类型在显示层中用:if表示  --  start **/
			isShowNavigationTemp: _obj.isShowNavigationTemp || false, // 是否显示该页面所属功能导航栏;默认不创建
			isShowCourseLTemp: _obj.isShowCourseLTemp || false, // 是否显示课程模板;默认不创建
			isShowBarBtnAreaTemp: _obj.isShowBarBtnAreaTemp || false, // 是否显示-按钮区域（试题管理）模板;默认不创建
			isShowBarSearchAreaTemp: _obj.isShowBarSearchAreaTemp || false, // 是否显示搜索框模板;默认不创建
			isShowBarBreadCrumbs: _obj.isShowBarBreadCrumbs || false, // 是否显示面包屑模板;默认不创建
			/** 判断项：用判断是否显示/隐藏某个显示的图层或判断是否加载相关模板；以下boolean类型在显示层中用:if表示  --  end **/
			breadCrumbsValue: "", // 面包屑值
			fullTextSearch_c: "", // 全文搜索点击查询事件
			fullTextSearch_v: "", // 全文搜索框，搜索参数值双向绑定参数
			imptBachBtn_c: "", // 批量导入点击事件
			newQuestionsBtn_c: "" // 新建试题点击事件
		});
		// 判断是否创建标题栏模板
		otsMain_VM.titileBarTemp = publicFn.dealTmpDomElement(publicTemp.titleBarTemp);
		// 是否创建课程搜索模板
		if (creatTitleBarDefine.isShowCourseLTemp) {
			// 获取模板
			creatTitleBarDefine.titileBarCourseLTemp = publicFn.dealTmpDomElement(publicTemp.courseSelectTemp);
			// 创建课程搜索模板;回调函数需要单独作为参数传送,方便课程模板灵活调用
			publicDefine.creatCourseSelectTemp(_obj, _obj.callBackFn);
		}
		// 其他信息 --- 是否创建按钮区域(试题管理)列表
		if (creatTitleBarDefine.isShowBarBtnAreaTemp) {
			// 回调方法绑定
			creatTitleBarDefine.imptBachBtn_c = function ($event) { //批量导入
				// 执行方法
				_obj.imptBach_btn && _obj.imptBach_btn();
			};
			creatTitleBarDefine.newQuestionsBtn_c = function ($event) { // 新建试题
				// 执行方法
				_obj.newQuestions_btn && _obj.newQuestions_btn();
			};
			creatTitleBarDefine.titileBarOtherConTemp += publicFn.dealTmpDomElement(publicTemp.titileBarBtnAreaTemp);
		}
		// 其他信息 ---  是否创建全局搜索框区域模板
		if (creatTitleBarDefine.isShowBarSearchAreaTemp) {
			// 绑定全文搜索框搜索事件
			creatTitleBarDefine.fullTextSearch_c = function ($event) {
				if (this.fullTextSearch_v === "") return false;
				// 保存数据
				_obj.fullTextSearch_val = this.fullTextSearch_v;
				// 调用回调方法
				_obj.callBackFn && _obj.callBackFn();
			};
			// 获取模板
			creatTitleBarDefine.titileBarOtherConTemp += publicFn.dealTmpDomElement(publicTemp.titileBarSearchAreaTemp);
		}
		// 其他信息 ---  是否创建导航面包屑模板
		if (creatTitleBarDefine.isShowBarBreadCrumbs) {
			// 获取面包屑模板temp
			creatTitleBarDefine.titileBarOtherConTemp += publicFn.dealTmpDomElement(publicTemp.titileBarBreadCrumbsTemp);
			// 处理面包屑数据
			var _crumbVL = "",
				_str = "";
			if (publicFn.isEffectiveData(_obj.breadCrumbsValue)) {
				_crumbVL = _obj.breadCrumbsValue.split(",");
			}
			if (_crumbVL.length > 0) {
				for (var i = 0; i < _crumbVL.length; i++) {
					_str += "<span>" + _crumbVL[i] + "</span>";
					if (i !== _crumbVL.length - 1) {
						_str += "<em class='fa fa-angle-right mr8 ml8'></em>";
					}
				}
			}
			creatTitleBarDefine.breadCrumbsValue = _str;
		}
		// 创建三级导航模板
		if (creatTitleBarDefine.isShowNavigationTemp) {
			creatTitleBarDefine.titileBarNavigationTemp = otsMain_VM._threeSNTemp;
		}
	},
	/**
	 * 创建课程搜索的模板;
	 * 该模板功能包括：课程模糊查询、选择课程（该功能需要调用回调函数方法）
	 * @param _obj：用到的参数对象
	 * _obj={
	 * 	scienceItems:[];课程数据显示列表集合
	 * 	courseItemCode:"";题目分类项编码;选中的课程code码；当该页面初次加载时以有课程code也是存在该变量中
	 * 	defaultCName:"";默认显示的课程名称。
	 * 	isAddAllScience:true;是否在课程列表中增加"全部"课程选项，code为空；默认不增加
	 * }
	 * @poaram _callBackFn:function;课程选择功能回调函数；
	 */
	creatCourseSelectTemp: function (_obj, _callBackFn) {
		// 创建模板vm
		courseSelectDefine = avalon.define({
			$id: "courseSelectDefine",
			isShowTopCourseList: false, // 判断显示隐藏课程列表
			scienceItems: [], // 课程显示列表
			chooseCName: '', // 选中课程的名称
			defaultCName: '选择课程', // 用于显示默认课程名称，如果没有默认的显示课程列表的第一个；
			isInitScroll: false, // 是否初始化课程列表显示的滚动条
			showCourse_c: "", // 课程列表显示方法
			hideCourse_c: "", // 隐藏课程列表
			chooseCourse_c: "", // 点击选择课程
			searchCourse_c: "" // 课程模糊查询方法
		});
		// 课程模块相关事件方法回调 -- 课程模糊查询方法绑定
		courseSelectDefine.searchCourse_c = function ($event) { // 课程模糊查询方法
			if (!publicFn.isEffectiveData(this.chooseCName)) return false;
			this.chooseCName = this.chooseCName.allTrim();
			var _si = [],
				_Ssic = []; //  临时创建
			for (var i = 0; i < PGParameters.scienceItems.length; i++) {
				if (PGParameters.scienceItems[i].name.search(this.chooseCName) > -1) {
					_si.push(PGParameters.scienceItems[i]);
				}
			}
			// 处理课程显示数据,每行显示5个
			dealArr = function (arr) {
				if (arr.length < 5) {
					_Ssic.push(arr);
					return false;
				} else {
					_Ssic.push(arr.slice(0, 5));
					dealArr(arr.slice(5, arr.length));
				}
			};
			dealArr(_si);
			this.scienceItems.clear().pushArray(_Ssic);
			// 重置滚动条为最上方
			$(".crouseTableArea").scrollTop(0);
			$(".crouseTableArea").perfectScrollbar("update");
		};
		// 课程模块相关事件方法回调 -- 点击选着课程
		courseSelectDefine.chooseCourse_c = function ($event) {
			// 获取名称
			this.chooseCName = $event.target.innerText;
			// 获取课程code
			_obj.courseItemCode = $event.target.attributes['code'].value;
			this.defaultCName = this.chooseCName;
			// 执行方法
			_callBackFn && _callBackFn();
		};
		// 课程模块相关事件方法回调 -- 鼠标滑出，隐藏课程列表
		courseSelectDefine.hideCourse_c = function () {
			this.isShowTopCourseList = false;
			return false;
		};
		// 课程模块相关事件方法回调 -- 鼠标滑入，显示课程列表方法
		courseSelectDefine.showCourse_c = function () {
			this.isShowTopCourseList = true;
			// 重置滚动条为最上方
			$(".crouseTableArea").scrollTop(0);
			// 判断是否已初始化滚动条
			if (courseSelectDefine.isInitScroll) {
				// 已经初始化则更新
				$(".crouseTableArea").perfectScrollbar("update");
			} else {
				// 标记
				courseSelectDefine.isInitScroll = true;
				// 绑定滚动条
				$(".crouseTableArea").perfectScrollbar({
					wheelSpeed: 20,
					wheelPropagation: false,
					scrollbarYActive: true
				});
			}
			return false;
		};
		// 获取课程列表数据
		publicFn.tr_subJecFun(_obj.courseItemCode || "", function () {
			if (PGParameters.scienceItems.length > 0) {
				// 判断是否增加全部课程选项
				if (_obj.isAddAllScience) {
					var _allSci = {
						name: "全部",
						code: ""
					};
					PGParameters.scienceItems.unshift(_allSci);
				}
				var _sic = [];
				// 处理课程数据，每一行，显示5个课程
				dealArr = function (arr) {
					if (arr.length < 5) {
						_sic.push(arr);
						return false;
					} else {
						_sic.push(arr.slice(0, 5));
						dealArr(arr.slice(5, arr.length));
					}
				};
				dealArr(PGParameters.scienceItems);
				// 为课程列表模板中添加数据
				courseSelectDefine.scienceItems.pushArray(_sic);
				// 默认显示课程列表中的第一个课程及其数据
				$(".courseListCon").find("td").eq(0).find("label").trigger("click");
			}
		});
	},
	/**
	 * 创建纠错模板
	 * @param param
	 * @param fn
	 */
	creatErrorCorrectionDefine: function (_obj) {
		// 创建模板
		errorCorrectVM = avalon.define({
			$id: "errorCorrectVM",
			topicNum: "", // 试题编号
			isShowPopFoot: true, // 是否显示底部按钮
			typeIdL_p: {},
			typeIdL: [], // 临时保存的纠错类型id
			corrTypeList_vm: [], // 模板类型列表
			border_r: [], // 边框样式css
			corrEditor: "", // 纠错描述编辑器
			corrType_c: function (_id, $event) {
				// 转换JQ对象
				var _$this = $($event.currentTarget).eq(0);
				// 是否标记
				if (_$this.hasClass("corrType_btn_tag")) {
					_$this.removeClass("corrType_btn_tag");
					if (this.typeIdL.$model.length > 0) {
						for (var i = 0; i < this.typeIdL.$model.length; i++) {
							if (this.typeIdL[i] == _id) {
								this.typeIdL.removeAt(i);
								break;
							}
						}
					}
				} else {
					_$this.addClass("corrType_btn_tag");
					// 临时保存类型id
					this.typeIdL.push(_id);
				}
			},
			t_format: function ($event) {
				var _thisVal = $event.currentTarget.value;
				if (_thisVal.length > 200) {
					this.border_r = ['border_r']
				} else {
					this.border_r = [];
				}
			}
		});
		// 创建纠错弹出框
		var corrStr = publicFn.dealTmpDomElement(publicTemp.errorCorrectDialog);
		$("body").append(corrStr);
		// 获取纠错类型
		publicFn.queryCorrectionType();
		// 初始化编辑器
		_obj.corrEditor = UE.getEditor("corrDescribe", {
			toolbars: CommonData.UEditorToobars.planByCorrection,
			initialFrameWidth: 550,
			initialFrameHeight: 150
		});
	},
	/**
	 * 创建分页模板数据;
	 * 只要调用该方法就显示分页功能；
	 * 分页对象保存到PGParameters中方便页面调用；该对象默认为{}；
	 * @param _id：分页模板显示的id名称;该值格式为"#"+id名称
	 * @param _fn：回调函数;该回调函数包含3个参数page为当前页码,size为每页条数，count为总页数
	 */
	creatPageing: function (_id, _fn) {
		// 判断id值是否存在
		if (!publicFn.effectiveAndNotEmptyData(_id)) return false;
		// 创建分页对象
		PGParameters._pageing = new Paging();
		// 修改默认参数值
		PGParameters._pageing.init({
			target: _id,
			pageSizeList: [10, 20, 30], // 显示工具栏时有效，可设置每页条数，默认为[5,10,15,20]
			pagesize: 10, // 每页的条数
			count: 1, // 总条数
			toolbar: true, // 是否显示工具栏
			callback: _fn
		});
	},
	/**
	 * 创建分页模板数据;
	 * 只要调用该方法就显示分页功能；
	 * 分页对象保存到PGParameters中方便页面调用；该对象默认为{}；
	 * @param _id：分页模板显示的id名称;该值格式为"#"+id名称
	 * @param _fn：回调函数;该回调函数包含3个参数page为当前页码,size为每页条数，count为总页数
	 */
	creatPageingTwo: function (_id, _fn, _fn2) {
		// 判断id值是否存在
		if (!publicFn.effectiveAndNotEmptyData(_id)) return false;
		_fn2 && _fn2();
		// 创建分页对象
		PGParameters._pageing2 = new Paging();
		// 修改默认参数值
		PGParameters._pageing2.init({
			target: _id,
			pageSizeList: [10, 20, 30], // 显示工具栏时有效，可设置每页条数，默认为[5,10,15,20]
			pagesize: 10, // 每页的条数
			count: 1, // 总条数
			toolbar: true, // 是否显示工具栏
			callback: _fn
		});
	},

};
/********* 模板temp保存方法集合  ************/
var publicTemp = {
	/**
	 * 头部导航功能区模板temp
	 */
	headTemp: function () {
		/*
		 <div class="main">
		 	<div id="nav">
		 		<div class="clearfix">
		 			<div class="fl">
		 				<div class="bg_logo fl" alt="OTS 3.0">
		 					<img :attr="{src: logoSrc}" :visible="logoSrc"/>
		 				</div>
		 				<ul class="navUl fl ml35 f14 fb" ms-html="@headNavTemp"></ul>
		 			</div>
		 			<div class="fr">
		 				<div class="user fl hand">
							<!--<p id="" class="fl">
								<span class="fl">当前用户：</span>
								<span class="fl ml6 mr6 " :text="_userName"></span>
								<em class="fl">|</em>
								<span class="fl ml6 mr6 loginout" :click="@loginOut_c" :if="@isLoginOut">退出</span>
							</p>-->
							<p id="userHandle" class="mw100 clearfix">
								<span class="fl ml6 mr6 " :text="_userName"></span>
								<i class="fl fa fa-angle-down"></i>
								<div class="userNav">
									<div class="userNavItem tc" :click="@goPayList_c">付费考试</div>
									<div class="userNavItem tc" :click="@loginOut_c">退出</div>
								</div>
							</p>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		 </div>
		 */
	},
	/**
	 * 功能标题栏主模板
	 */
	titleBarTemp: function () {
		/*
		 <div class="optArea main clearfix" :controller="creatTitleBarDefine">
	 		<!-- 功能导航信息 -->
		 	<div class="_threeNavArea" :if="@isShowNavigationTemp" :html="@titileBarNavigationTemp"></div>
	 		<!-- 课程信息 -->
			<div :if="@isShowCourseLTemp" :html="@titileBarCourseLTemp"></div>
			<!-- 其它信息显示 -->
			<div class="_topOtherCon clearfix"  :html="@titileBarOtherConTemp"></div>
		 </div>
		*/
	},
	/**
	 * 功能标题栏主模板中--导航功能显示模板
	 */
	titileBarNavigationTemp: function () {
		/*
			<div>
				二级导航栏(待开发、、、)
			</div>
		 */
	},
	/**
	 * 功能 --- 课程搜索显示模板
	 */
	courseSelectTemp: function () {
		/*
		 <div class="pr w300" :controller="courseSelectDefine" :mouseenter="showCourse_c()" :mouseleave="hideCourse_c()">
			 <div class="courseCon clearfix">
			 	<span class="">{{@defaultCName}}</span>
		 		<i class="fa fa-angle-down"></i>
			 </div>
			 <div class="courseListCon w800" :visible="@isShowTopCourseList">
			 	<div class="c_area">
			 		<div class="lh0 mb10">
						 <input type="text" class="inputText pl5 w250" placeholder="输入搜索科目"
						 :keyup="@searchCourse_c($event)" :duplex="@chooseCName"/>
			 		</div>
			 		<div class="crouseTableArea">
						 <table class="tb wp100">
							 <tr :for="el in @scienceItems">
								 <td class="w150" :for="loop in el">
									 <label :click="@chooseCourse_c($event)" :attr="{code:loop.code,title:loop.name}"
									 		class="w150">{{loop.name}}</label>
								 </td>
							 </tr>
						 </table>
			 		</div>
			 	</div>
			 </div>
		 </div>
		 */
	},
	/**
	 * 功能标题栏主模板中搜索区域显示模板
	 */
	titileBarSearchAreaTemp: function () {
		/*
		 <div class="searchArea fl mr10 clearfix">
		 	<input type="text" class="inputText pl5 vm w250" :duplex="fullTextSearch_v" placeholder="搜索该专业下试题"/>
		 	<i class="bg_icon vm ml5" :click="fullTextSearch_c($event)"></i>
		 </div>
		 */
	},
	/**
	 * 功能标题栏主模板中--试题管理，按钮区域显示模板
	 */
	titileBarBtnAreaTemp: function () {
		/*
		 <div class="btnArea fl mr10">
			 <input type="button" class="btn btn_impt w80 mr10 vm" :click="imptBachBtn_c($event)" value="批量导入"/>
			 <input type="button" class="btn btn_newCon w80 vm" :click="newQuestionsBtn_c($event)" value="新建试题"/>
		 </div>
		 */
	},
	/**
	 * 功能标题栏主模板中--面包屑显示模板
	 */
	titileBarBreadCrumbsTemp: function () {
		/*
		 <div class="searchArea mr10 fl clearfix">
		 	<span :html="@breadCrumbsValue"></span>
		 </div>
		 */
	},
	/**
	 * 纠错弹出框模板
	 */
	errorCorrectDialog: function () {
		/*
		 <div id="errorCorrect_pop" class="none detail_pop" :controller="errorCorrectVM">
			 <div class="pr hp100">
				 <div class="titlePop clearfix">
					 <h2 class="fl pop_title_new">纠错</h2>
					 <i class="fr close fa fa-times mt12"></i>
				 </div>
				 <div class="pop_conArea">
					 <div  class="errorCorrectionCon m15 f14">
						 <div class="corr_block clearfix">
							 <div class="cb_name fl mr30">
							 <span>题目编号</span>
							 </div>
						 	<div class="cb_con fl">{{topicNum}}</div>
						 </div>
						 <div class="corr_block mt10 clearfix">
						 	<div class="cb_name fl mr30 mt10">
						 		<span>纠错类型</span>
						 	</div>
							<div class="cb_con wp85 fl">
						 		<div class="corrType_btn mt10 mr10 fl" :for="(index el) in corrTypeList_vm"
						 			:attr="{id:el.id}" :click="corrType_c(el.id,$event)">{{el.name}}</div>
						 	</div>
						 </div>
						 <div class="corr_block mt20 clearfix">
						 	<div class="cb_name fl mr30">
						 		<span>错误描述</span>
						 	</div>
						 	<div class="cb_con wp85 fl">
						 		<div class="pr" id="corrDescribe"></div>
						 	</div>
						 </div>
					 </div>
				 </div>
				 <div class="footPop" :if="isShowPopFoot">
					 <div class="btnArea mt15">
						 <input type="button" id="pop_cancelBtn" class="vm btn w80 pop_canBtn mr10" value="取消"/>
						 <input type="button" id="pop_submiteBtn" class="vm btn w80 pop_confirmBtn" value="确定"/>
					 </div>
				 </div>
			 </div>
		 </div>
		*/
	},
	/**
	 * 页面底部版本信息模板temp
	 * <div class="parseHtml" style="display:none;"></div>是为了防止后台数据有不闭合标签而写的用来转换标签的，无意义
	 * 如果页面高度不固定，请一定要在相应页面的js异步（保证页面渲染完成）里面执行publicFn.bodyIndex_H();这个方法
	 */
	newFootTemp: function () {
		/*

		 <div id="copyright-fxl">
		 	<p class="main f14 ofh" :if="tenant == 'CJBZBE10206'">主办单位：长沙岳麓专修学院</p>
		 	<p class="main f14 ofh" :if="tenant == 'CJBZBE10228'">主办单位：湖南幼儿师范高等专科学校</p>
		 	<p class="main f14 ofh" :if="tenant != 'CJBZBE10206' && tenant != 'CJBZBE10228'">&copy;2014-<span :text='new Date().getFullYear()'></span>&nbsp;弘成科技发展有限公司&nbsp;&nbsp;版权所有</p>
		 </div>
		 <div class="parseHtml" style="display:none;"></div>
		 */
	},
	/**
	 * 考试页帮助弹窗temp
	 */
	helpPopTemp: function () {
		/*

		 <div id="helpPop">
		 	
		 </div>
		 */
	}
};
/**************   初始化区 ****************/
// 获取URL路径参数
PGParameters.urlRequestParam = publicFn.getRequest();
// 功能初始化  projectSettings      projectSettings
publicFn.projectSettings();
// 全局页面加FAQ链接
(function (document) {
	var _htmlName = PGParameters.urlRequestParam.htmlName;
	if(_htmlName.indexOf('UniverDetailApp') >= 0 || _htmlName.indexOf('OTS-MExam')>=0){ //吉大考试页不加
		return;
	}
	if(_htmlName.indexOf('University') < 0 && !(_htmlName.indexOf('index')>=0)){ //考试页不要
		//创建el
		var help_el = document.createElement('div');
		var helpLink = document.createElement('div');
		helpLink.id = "helpLink";
		helpLink.title = "帮助中心";
		var topLink = document.createElement('div');
		topLink.id = "topLink";
		help_el.appendChild(helpLink);
		help_el.appendChild(topLink);
		help_el.classList.add('helpBox');
		document.body.appendChild(help_el);
		$("#topLink").hide();
		//help链接
		document.getElementById("helpLink").addEventListener("click", function(){
			var aTenant = prefix.split("/");
			var sLoginTenant = aTenant[aTenant.length - 1];
		    window.open( "/" + sLoginTenant + '/OTS-FAQ.html?role=stu','_blank')
		});
		//TOP按钮隐藏或者显示
		$(window.document).scroll(function (e) {
			// 获取滚动条，滚动的距离值，兼容写法
			var _scrollTopNum = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			// 判断是否含有返回顶部按钮对象功能

			var topEL = $("#topLink");
			// 如果含有，则判定显示隐藏
			if (_scrollTopNum >= 300) {
				topEL.slideDown();
			} else {
				topEL.slideUp();
			}
		});
		document.getElementById("topLink").addEventListener("click", function(){
		    $('body,html').animate({
				scrollTop: 0
			}, 500);
		});
	}else {//考试页 添加在题卡下
		var helpLink = document.createElement('div');
		helpLink.id = "tika_helpLink";
		helpLink.innerText = "考试遇到问题？"
		helpLink.title = "帮助";
		document.getElementsByClassName("tika_new")[0].appendChild(helpLink);

		// 弹窗数据
		var otsExamHelpData = [
			{
				id:1,
				name: "人脸识别类",
				messages: [
					{
						title:"怎样检查摄像头是否正常？",
						content: "可以通过qq视频聊天功能来检测自己电脑的摄像头能否正常， 避免其他软件占用摄像头。"
					},
					{
						title:"如何设置摄像头？",
						content: "如果登录系统后页面中的摄像头显示白屏，需要手动设置浏览器允许使用摄像头。"
					},
					{
						title:"拍照验证不通过，能否考试？",
						content: "若验证不通过，选择“确定是我本人，继续考试”即可继续参加考试。（后续会有老师进行人工审核）"
					},
					{
						title:"人脸识别不通过怎么办？",
						content: "① 若进入系统后提示获取状态错误，是因为系统中没有照片，需要老师上传照片；</br> ② 若验证不通过，选择“确定是我本人，继续考试”即可继续参加考试。"
					},
					{
						title:"摄像头设备丢失、无画面怎么办？",
						content: "① 台式电脑的摄像头插头拔掉重新插上；摄像头开关是否打开；</br> ② 笔记本电脑关闭浏览器重新打开考试页面；</br> ③ 如果进入考试摄像头就是黑色画面，检查QQ能否视频如果不能视频则说明摄像头有问题，如果QQ可以视频，与技术老师反馈。"
					},
				]
			},
			{
				id:2,
				name: "考试类",
				messages: [
					{
						title:"日语韩语输入方法",
						content: "① 安装百度输入法；</br> ② 日语输入法与中文输入法不同的是 在切换到日语输入法之后 还是输入的英文,则要使用 ： alt+shift 来切换日文 英文。"
					},
					{
						title:"计算题无法输入公式?",
						content: "纸上作答，然后拍成图片上传。"
					},
					{
						title:"网络异常怎么办？",
						content: "① 点击“确定”继续做题；</br> ② 如点击确定后仍然提示，重启路由器并联网，2分钟后重新登录；</br> ③ 连手机热点。"
					},
					{
						title:"中途退出后是否计时？",
						content: "人脸识别通过之后，系统则判定为考试开始，并进行倒计时。务必在规定时间内进行答题。中途退出，计时不会停止。"
					},
				]
			},
			{
				id:3,
				name: "交卷类",
				messages: [
					{
						title:"交卷",
						content: "考生规定时间内交卷即可，如超时会提醒学生已超时并再次交卷。"
					},
				]
			},
		]
		var helpPopTemp = publicFn.dealTmpDomElement(publicTemp.helpPopTemp);
	    var helpNode = document.createRange().createContextualFragment(helpPopTemp);
	    document.body.appendChild(helpNode);
	    //遮罩
	    var helpLightBox = document.createElement('div');
	    helpLightBox.id = "helpLightBox";
	    document.body.appendChild(helpLightBox);
	    //往弹窗里塞数据（tab）
	    var tabline = document.createElement('div');
	    tabline.id = "helpTabLine";
	    //问题内容
	    var helpMainCon = document.createElement('div');
	    helpMainCon.id = "helpMainCon";
	    //关闭按钮
	    var closeEl = document.createElement('div');
	    closeEl.id = "helpClose";
	    closeEl.innerText = "×";

	    document.getElementById('helpPop').appendChild(tabline);
	    document.getElementById('helpPop').appendChild(helpMainCon);
	    document.getElementById('helpPop').appendChild(closeEl);

	    $.each(otsExamHelpData,function(index, el) {
	    	//tab
	    	var tabItem = document.createElement('div');
	    	tabItem.classList.add('tabItem');
	    	tabItem.innerText = el.name;
	    	tabItem.id = el.id;
	    	document.getElementById("helpTabLine").appendChild(tabItem);

	    	var itemOl = document.createElement('ol');
	    	itemOl.id = el.id;
	    	
	    	$.each(el.messages,function(kk, aa) {
	    		var liItemtemp = '<li><div class="helpItemTitle">'+aa.title+'</div><div class="helpItemCon">'+aa.content+'</div></li>'
	    		var liItemEl =  document.createRange().createContextualFragment(liItemtemp);

	    		itemOl.appendChild(liItemEl);
	    	});
	    	document.getElementById("helpMainCon").appendChild(itemOl);
	    });

	    $("#helpMainCon").perfectScrollbar();
	    //注册tab点击事件
	    $('.tabItem').on('click', function(e){
	    	var _itemEl = $(e.currentTarget);
	    	_itemEl.addClass('cur');
	    	_itemEl.siblings('.tabItem').removeClass('cur');
	    	var mId = e.currentTarget.id;

	    	var olLists = $('#helpMainCon ol');
	    	$.each(olLists, function(index, el) {
	    		if(el.id == mId){
	    			$(el).show()
	    		}else{
	    			$(el).hide()
	    		}
	    	});
	    });
	    //注册close事件
	    $('#helpClose').on('click', function(e){
	    	$('#helpPop').hide();
	    	$('#helpLightBox').hide();
	    });
		document.getElementById("tika_helpLink").addEventListener("click", function(){
		    $('#helpLightBox').show();
		    $('#helpPop').show();
		    $('.tabItem')[0].click();
		});
	}
})(document)
// 页面大小改变时，底部栏位置
$(window).resize(function () {
	publicFn.bodyIndex_H();
});
/******** avalon 配置参数 ****************/
avalon.config({
	debug: true
});