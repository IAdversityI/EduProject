/*默认加载*/
mui.plusReady(function() {
		App.setItem("zyidFlag", plus.webview.currentWebview().zyid);
		if(App.noNetwork()) {
			App.afreshWebview("45", "0", "afresh7.html");
			plus.nativeUI.closeWaiting();
		} else {
			App.getID("title").innerText = plus.webview.currentWebview().specialName;
			var url = App.url + "/specialty/getSpecialtyInfo";
			var dataOptions = {
				zyid: plus.webview.currentWebview().zyid,
				uuid: plus.device.uuid,
				token: App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					if(data.result.isCollection) {
						App.getID("shouCang").classList.remove("icon-shoucang");
						App.getID("shouCang").classList.add("icon-shoucangcang");
					}
					paraData(data.result);
				} else {
					mui.toast(data.result);
					if(data.signal == 1) {
						App.removeItem("tokenflag");
						var url = "../pages/login.html";
						var id = "../pages/login.html";
						var extras = {};
						App.openWindow(url, id, extras);
					}
				}
			};
			var dataType = "json";
			App.ajax(url, dataOptions, success, dataType);
		}
	})
	/*渲染数据方法*/
function paraData(result) {
	var option = {
		resultList: result
	};
	var templatehtml = template("proDaQuan", option);
	App.getID("proDaQuanCo").innerHTML = templatehtml;
	App.getID("inTrouce").innerHTML = result.zyIntroduce.replace(/\s+/g, '<br/>').replace("<br/>", "\r\n");
}
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		App.getID("title").innerText = plus.webview.currentWebview().specialName;
		var url = App.url + "/specialty/getSpecialtyInfo";
		var dataOptions = {
			zyid: plus.webview.currentWebview().zyid,
			uuid: plus.device.uuid
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh7.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result);
			} else {
				mui.toast(data.result);
				if(data.signal == 1) {
					App.removeItem("tokenflag");
					var url = "../pages/login.html";
					var id = "../pages/login.html";
					var extras = {};
					App.openWindow(url, id, extras);
				}
			}
		};
		var dataType = "json";
		App.ajax(url, dataOptions, success, dataType);
	}
}
App.getID("shouCang").addEventListener('tap', function() {
	if(App.getID("shouCang").classList.contains("icon-shoucang")) {
		if(App.getItem("tokenflag")) {
			var url = App.url + '/collection';
			var dataOptions = {
				type: "specialty",
				token: App.getItem("tokenflag"),
				commonID: App.getItem("zyidFlag")
			};
			var success = function(data) {
				if(data.status) {
					App.getID("shouCang").classList.remove("icon-shoucang");
					App.getID("shouCang").classList.add("icon-shoucangcang");
					mui.toast(data.result);
				} else {
					mui.toast(data.result);
					if(data.signal == 1) {
						App.removeItem("tokenflag");
						var url = "../pages/login.html";
						var id = "../pages/login.html";
						var extras = {};
						App.openWindow(url, id, extras);
					}
				}
			};
			var dataType = "json";
			App.ajaxNoWait(url, dataOptions, success, dataType);
		} else {
			var url = "../pages/login.html";
			var id = "../pages/login.html";
			var extras = {};
			App.openWindow(url, id, extras);
		}
	} else {
		if(App.getItem("tokenflag")) {
			var url = App.url + '/collection';
			var dataOptions = {
				type: "specialty",
				token: App.getItem("tokenflag"),
				commonID: App.getItem("zyidFlag")
			};
			var success = function(data) {
				if(data.status) {
					App.getID("shouCang").classList.add("icon-shoucang");
					App.getID("shouCang").classList.remove("icon-shoucangcang");
					mui.toast(data.result);
				} else {
					mui.toast(data.result);
					if(data.signal == 1) {
						App.removeItem("tokenflag");
						var url = "../pages/login.html";
						var id = "../pages/login.html";
						var extras = {};
						App.openWindow(url, id, extras);
					}
				}
			};
			var dataType = "json";
			App.ajaxNoWait(url, dataOptions, success, dataType);
		} else {
			var url = "../pages/login.html";
			var id = "../pages/login.html";
			var extras = {};
			App.openWindow(url, id, extras);
		}
	}
})