mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
mui.plusReady(function() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh18.html");
	} else {
		var url = App.url + '/occupation/getOccupationList';
		var dataOptions = {
			industry: App.getItem("industryFlag"),
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh18.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result.datas);
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
	templatehtml = template("industryBodyRe", option);
	App.getID("industryBody").innerHTML = templatehtml;
}
/*添加辅助方法*/
template.helper("JSON", function(data) {
		var collegeTag = null;
		try {
			if(data) {
				collegeTag = JSON.parse(data);
			} else {
				collegeTag = [];
			}
		} catch(e) {
			//TODO handle the exception
			collegeTag = [data];
		}
		return collegeTag;
	})
	/**
	 * 下拉刷新具体业务实现
	 */
var page = 1;

function pulldownRefresh() {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh18.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + '/occupation/getOccupationList';
		var dataOptions = {
			industry: App.getItem("industryFlag"),
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh18.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result.datas);
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
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
		};
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh18.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + '/occupation/getOccupationList';
		var dataOptions = {
			industry: App.getItem("industryFlag"),
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					list: data.result.datas,
					size: "@20p"
				};
				var templatehtml = template("industryBodyRe", option);
				var industryBody = document.body.querySelector("#industryBody");
				var spanflag = App.getID("industryBody").querySelectorAll(".spanflag");
				for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
					var span = document.createElement("span");
					span.className = "spanflag";
					span.innerHTML = templatehtml;
					industryBody.appendChild(span);
				}

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
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			mui.later(function() {
				mui('#pullrefresh').pullRefresh().refresh(true);
			}, 1000)
		};
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
}
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		pulldownRefresh();
	}
}
/*点击列表*/
mui("#industryBody").on("tap", ".industryDetailsFlag", function() {
	var occupationID = this.getAttribute("data-occupationID");
	var url = "../pages/industry_details.html";
	var id = "../pages/industry_details.html";
	var extras = {
		occupationID: occupationID
	};
	App.openWindow(url, id, extras);
});