/**
 *  公共帮助类
 * @author 代荣康[QQ:1094836761]
 **/
(function() {
	var isDebug = true;
	App = {};
//	App.url = "http://192.168.1.105:8080";//http://192.168.1.33:8080 http://120.76.117.14/EduDataSign
		App.url = "http://192.168.43.64:8080";//http://192.168.1.33:8080 http://120.76.117.14/EduDataSign

	/*打印日志*/
	App.log = function(data) {
		if(isDebug) {
			console.log(data);
		}
	};
	/*沉浸式状态栏*/
	App.statusbar = function(color) {
		if(color == null || color == undefined) {
			color = "#4D78AF";
		}
		//沉浸式状态栏
		plus.navigator.setStatusBarBackground(color);
		plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
		//仅支持竖屏显示
		plus.screen.lockOrientation("portrait-primary");
	};
	/*数据进行MD5加密*/
	App.paramIsOk = function() {
		var time = parseInt((new Date()).getTime() / 60000);
		var secretKey = MD5("tjj" + time).toUpperCase();
		App.log("secretKey=" + secretKey);
		return secretKey;
	};
	/*获取标签id*/
	App.getID = function(id) {
		return document.getElementById(id);
	};
	/*获取窗口id*/
	App.getWebviewID = function(id) {
		return plus.webview.getWebviewById(id);
	};
	App.iosPage = function(url) {
		return plus.runtime.openURL(url);
	};
	/*evaljs方法*/
	App.evalJS = function(id, methodName) {
		if(plus.webview.getWebviewById(id)) {
			return plus.webview.getWebviewById(id).evalJS(methodName);
		}
	};
	/*检查权限*/
	App.checkPermission = function(checkPermission) {
		var checkPer = plus.navigator.checkPermission(checkPermission);
		var message = null;
		var title = null;
		if(checkPermission == "CAMERA") {
			message = "请在系统[设置]>[隐私]>[相机]选项中，允许访问您的相机";
			title = "无法访问相机";
		} else if(checkPermission == "GALLERY") {
			message = "请在系统[设置]>[隐私]>[照片]选项中，允许访问您的相册";
			title = "无法访问相册";
		} else if(checkPermission == "LOCATION") {
			message = '请在系统[设置]>[隐私]>[定位服务]选项中，允许访问您的位置';
			title = "无法定位";
		}
		switch(checkPer) {
			case "authorized":
				return true;
				break;
			case "denied":
				plus.nativeUI.alert(message, function(e) {}, title, "好");
				return false;
				break;
			case "undetermined":
				/*plus.nativeUI.alert("未确定定位权限");*/
				break;
			case "unknown":
				/*plus.nativeUI.alert("无法查询定位权限");*/
				break;
			default:
				/*plus.nativeUI.alert("不支持定位权限");*/
				break;
		}
	};
	/*无网打开重新加载*/
	App.afreshWebview = function(top,bottom,id) {
		if(App.getWebviewID(id)) {// 避免快速多次点击创建多个窗口
			return;
		}
		var floatw = plus.webview.create("afresh.html", id, {
			width: '100%',
			height: '100%',
			top: top,
			bottom: bottom,
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none'
		});
		floatw.addEventListener("loaded", function() {
			plus.webview.currentWebview().append(floatw);
			floatw.show('slide-in-bottom', 300);
		}, false);
	};
	/*打开页面*/
	App.openWindow = function(urlStr, id, extras) {
		mui.openWindow({
			url: urlStr,
			id: id,
			styles: {
				hardwareAccelerated:true
			},
			extras: extras,
			show: {
				autoShow: true,
				aniShow: "slide-in-right", //默认为”slide-in-right“；
				duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			waiting: {
				autoShow: false,
				title: ''
			}
		})
	};
	/*post方法*/
	App.ajax = function(urlStr, data, success, dataType) {
		if(dataType === undefined) {
			dataType = "json";
		}
		App.log("<!--------[" + urlStr + "]---------------------------------------------------------------");
		App.log("地址: " + urlStr);
		try {
			var dataStr = JSON.stringify(data);
			if(dataStr.length > 500) {
				//过长的话控制台打印时会报错：java.io.EOFException
				dataStr = dataStr.substr(0, 500) + "...";
			}
			App.log("参数: " + dataStr);
		} catch(e) {
			App.log(e);
		}
		plus.nativeUI.showWaiting(" 正在加载... ");
		mui.ajax(urlStr, {
			data: data,
			dataType: dataType,
			type: 'post',
			timeout: 20000,
			success: function(response) {
				App.log("响应: " + JSON.stringify(response));
				App.log("----------[" + urlStr + "]--------------------------------------------------------------->");
				try {
					success(response);
				} catch(e) {
					App.log(e);
				}
				plus.nativeUI.closeWaiting();
			},
			error: function(xhr, type, errorThrown) {
				if(type=="timeout"){
					mui.toast("网络超时,请重试");
				}else if(type=="abort"){
					mui.toast("网络出现问题");
				}
				if(errorThrown == null) {
					errorThrown = "请重试";
				}
				console.log("xhr" + xhr);
				console.log("type" + type);
				App.log("出错: " + errorThrown);
				//mui.alert("出错了：" + errorThrown, "温馨提示");
				plus.nativeUI.closeWaiting();
			}
		});
	};
	/*无等待匡出现post方法*/
	App.ajaxNoWait = function(urlStr, data, success, dataType) {
		if(dataType === undefined) {
			dataType = "json";
		}
		App.log("<!--------[" + urlStr + "]---------------------------------------------------------------");
		App.log("地址: " + urlStr);
		try {
			var dataStr = JSON.stringify(data);
			if(dataStr.length > 500) {
				//过长的话控制台打印时会报错：java.io.EOFException
				dataStr = dataStr.substr(0, 500) + "...";
			}
			App.log("参数: " + dataStr);
		} catch(e) {
			App.log(e);
		}
		mui.ajax(urlStr, {
			data: data,
			dataType: dataType,
			type: 'post',
			timeout: 20000,
			success: function(response) {
				App.log("响应: " + JSON.stringify(response));
				App.log("----------[" + urlStr + "]--------------------------------------------------------------->");
				try {
					success(response);
				} catch(e) {
					App.log(e);
				}
				plus.nativeUI.closeWaiting();
			},
			error: function(xhr, type, errorThrown) {
				if(type=="timeout"){
					mui.toast("网络超时,请重试");
				}else if(type=="abort"){
					mui.toast("网络出现问题");
				}
				if(errorThrown == null) {
					errorThrown = "请重试";
				}
				App.log("出错: " + errorThrown);
			}
		});
	};
	/*判断是否连接网络*/
	App.noNetwork = function() {
		return plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE;
	};
	/*客户端标识*/
	App.bindUserId = function() {
		var info = plus.push.getClientInfo();
		App.log("客户端推送标识信息：");
		App.log("token: " + info.token);
		App.log("clientid: " + info.clientid);
		App.log("appid: " + info.appid);
		App.log("appkey: " + info.appkey);
		App.log("Current APP: " + plus.runtime.appid);
	};
	/*状态*/
	App.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	/**
	 * 获取本地是否安装客户端
	 **/
	App.isInstalled = function(id) {
			if(id === 'qihoo' && mui.os.plus) {
				return true;
			}
			if(mui.os.android) {
				var main = plus.android.runtimeMainActivity();
				var packageManager = main.getPackageManager();
				var PackageManager = plus.android.importClass(packageManager)
				var packageName = {
					"qq": "com.tencent.mobileqq",
					"weixin": "com.tencent.mm",
					"sinaweibo": "com.sina.weibo"
				}
				try {
					return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
				} catch(e) {}
			} else {
				switch(id) {
					case "qq":
						var TencentOAuth = plus.ios.import("TencentOAuth");
						return TencentOAuth.iphoneQQInstalled();
					case "weixin":
						var WXApi = plus.ios.import("WXApi");
						return WXApi.isWXAppInstalled()
					case "sinaweibo":
						var SinaAPI = plus.ios.import("WeiboSDK");
						return SinaAPI.isWeiboAppInstalled()
					default:
						break;
				}
			}
		}
		/**
		 * 日期格式化处理扩展，参见http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
		 */
	Date.prototype.format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	/**
	 * 字符串处理扩展，参见http://blog.sina.com.cn/s/blog_670884360100mz22.html
	 */
	App.clearSpace = function(value) {
		return value.replace(/\s+/g, "");　　
	}　　
	String.prototype.ltrim = function() {
		return this.replace(/(^\s*)/g, "");
	}　　
	String.prototype.rtrim = function() {
		return this.replace(/(\s*$)/g, "");　　
	}
	String.prototype.endWith = function(str) {
		if(str == null || str == "" || this.length == 0 || str.length > this.length)
			return false;
		if(this.substring(this.length - str.length) == str)
			return true;
		else
			return false;
		return true;
	}
	String.prototype.startWith = function(str) {
			if(str == null || str == "" || this.length == 0 || str.length > this.length)
				return false;
			if(this.substr(0, str.length) == str)
				return true;
			else
				return false;
			return true;
		}
		/*先使用localstroage存储数据,如果数据大于就使用storage存储*/

	/**
	 * @author 1020450921@qq.com
	 * @link http://www.cnblogs.com/phillyx
	 * @link http://ask.dcloud.net.cn/people/%E5%B0%8F%E4%BA%91%E8%8F%9C
	 * @description 本地存储
	 */
	function getItem(k) {
		var jsonStr = window.localStorage.getItem(k.toString());
		return jsonStr ? JSON.parse(jsonStr).data : null;
	};

	function getItemPlus(k) {
		var jsonStr = plus.storage.getItem(k.toString());
		return jsonStr ? JSON.parse(jsonStr).data : null;
	};
	App.getItem = function(k) {
		return getItem(k) || getItemPlus(k);
	};
	App.setItem = function(k, value) {
		value = JSON.stringify({
			data: value
		});
		k = k.toString();
		try {
			window.localStorage.setItem(k, value);
		} catch(e) {
			console.log(e);
			//TODO 超出localstorage容量限制则存到plus.storage中
			//且删除localStorage重复的数据
			removeItem(k);
			plus.storage.setItem(k, value);
		}
	};

	function getLength() {
		return window.localStorage.length;
	};
	App.getLength = getLength;

	function getLengthPlus() {
		return plus.storage.getLength();
	};
	App.getLengthPlus = getLengthPlus;

	function removeItem(k) {
		return window.localStorage.removeItem(k);
	};

	function removeItemPlus(k) {
		return plus.storage.removeItem(k);
	};
	App.removeItem = function(k) {
		window.localStorage.removeItem(k);
		return plus.storage.removeItem(k);
	}
	App.clear = function() {
		window.localStorage.clear();
		return plus.storage.clear();
	};

	function key(index) {
		return window.localStorage.key(index);
	};
	App.key = key;

	function keyPlus(index) {
		return plus.storage.key(index);
	};
	App.keyPlus = keyPlus;

	function getItemByIndex(index) {
		var item = {
			keyname: '',
			keyvalue: ''
		};
		item.keyname = key(index);
		item.keyvalue = getItem(item.keyname);
		return item;
	};
	App.getItemByIndex = getItemByIndex;

	function getItemByIndexPlus(index) {
		var item = {
			keyname: '',
			keyvalue: ''
		};
		item.keyname = keyPlus(index);
		item.keyvalue = getItemPlus(item.keyname);
		return item;
	};
	App.getItemByIndexPlus = getItemByIndexPlus;
	/**
	 * @author liuyf 2015-05-04
	 * @description 获取所有存储对象
	 * @param {Object} key 可选，不传参则返回所有对象，否则返回含有该key的对象
	 */
	App.getItems = function(k) {
		var items = [];
		var numKeys = getLength();
		var numKeysPlus = getLengthPlus();
		var i = 0;
		if(k) {
			for(; i < numKeys; i++) {
				if(key(i).toString().indexOf(k) != -1) {
					items.push(getItemByIndex(i));
				}
			}
			for(i = 0; i < numKeysPlus; i++) {
				if(keyPlus(i).toString().indexOf(k) != -1) {
					items.push(getItemByIndexPlus(i));
				}
			}
		} else {
			for(i = 0; i < numKeys; i++) {
				items.push(getItemByIndex(i));
			}
			for(i = 0; i < numKeysPlus; i++) {
				items.push(getItemByIndexPlus(i));
			}
		}
		return items;
	};
	/**
	 * @description 清除指定前缀的存储对象
	 * @param {Object} keys
	 * @default ["filePathCache_","ajax_cache_"]
	 * @author liuyf 2015-07-21
	 */
	App.removeItemByKeys = function(keys, cb) {
		if(typeof(keys) === "string") {
			keys = [keys];
		}
		var numKeys = getLength();
		var numKeysPlus = getLengthPlus();
		//TODO plus.storage是线性存储的，从后向前删除是可以的 
		//稳妥的方案是将查询到的items，存到临时数组中，再删除  
		var tmpks = [];
		var tk,
			i = numKeys - 1;
		for(; i >= 0; i--) {
			tk = key(i);
			Array.prototype.forEach.call(keys, function(k, index, arr) {
				if(tk.toString().indexOf(k) != -1) {
					tmpks.push(tk);
				}
			});
		}
		tmpks.forEach(function(k) {
			removeItem(k);
		});
		for(i = numKeysPlus - 1; i >= 0; i--) {
			tk = keyPlus(i);
			Array.prototype.forEach.call(keys, function(k, index, arr) {
				if(tk.toString().indexOf(k) != -1) {
					tmpks.push(tk);
				}
			});
		}
		tmpks.forEach(function(k) {
			removeItemPlus(k);
		})
		cb && cb();
	};
})();