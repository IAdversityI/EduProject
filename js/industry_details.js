var occupationID = null;
mui.plusReady(function() {
	occupationID = plus.webview.currentWebview().occupationID;
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh20.html");
	} else {
		var url = App.url + '/occupation/getOccupationInfo';
		var dataOptions = {
			occupationID: occupationID
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh20.html");
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

})

function paraData(result) {
	var option = {
		list: result,
		size: "@20p"
	};
	templatehtml = template("industryDetailsRe", option);
	App.getID("industryDetails").innerHTML = templatehtml;
}
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/occupation/getOccupationInfo';
		var dataOptions = {
			occupationID: occupationID
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh20.html");
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