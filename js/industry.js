mui.plusReady(function() {
	
		getIndustryData();
	})
	/*获取数据*/
function getIndustryData() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh17.html");
	} else {
		var url = App.url + '/occupation/industryList';
		var dataOptions = {};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh17.html");
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

function paraData(result) {
	var option = {
		list: result,
		size: "@20p"
	};
	templatehtml = template("industryRe", option);
	App.getID("industry").innerHTML = templatehtml;
}
/*点击列表*/
mui("#industry").on('tap', '.deatilscontent-flag', function() {
	var industry = this.getAttribute("data-industry");
	var url = "../pages/industry_list_header.html";
	var id = "../pages/industry_list_header.html";
	var extras = {};
	App.setItem("industryFlag",industry);
	App.openWindow(url, id, extras);
})
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getIndustryData();
	}
}