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
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh22.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + '/news/getIndexNewsList';
		var dataOptions = {
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh22.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraDataI(data.result.datas);
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

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh22.html");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + '/news/getIndexNewsList';
		var dataOptions = {
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					list: data.result.datas,
					size: "@20p"
				};
				var templatehtml = template("biduRe", option);
				var bidu = document.body.querySelector("#bidu");
				var spanflag = App.getID("bidu").querySelectorAll(".spanflag");
				for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
					var span = document.createElement("span");
					span.className = "spanflag";
					span.innerHTML = templatehtml;
					bidu.appendChild(span);
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
		}
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
}
mui.plusReady(function() {
	getData();
})
var page = 1;

function getData() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh22.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/news/getIndexNewsList';
		var dataOptions = {
			page: 1
		};
		var success = function(data) {
			if(data.status) {
				paraDataI(data.result.datas);
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

function paraDataI(result) {
	var option = {
		list: result,
		size: "@20p"
	};
	var templatehtml = template("biduRe", option);
	App.getID("bidu").innerHTML = templatehtml;
}
template.helper("dateFormat", function(a, c) {
	a = new Date(a);
	var b = {
		M: a.getMonth() + 1,
		d: a.getDate(),
		h: a.getHours(),
		m: a.getMinutes(),
		s: a.getSeconds(),
		q: Math.floor((a.getMonth() + 3) / 3),
		S: a.getMilliseconds()
	};
	c = c.replace(/([yMdhmsqS])+/g, function(f, e) {
		var d = b[e];
		if(d !== undefined) {
			if(f.length > 1) {
				d = "0" + d;
				d = d.substr(d.length - 2)
			}
			return d
		} else {
			if(e === "y") {
				return(a.getFullYear() + "").substr(4 - f.length)
			}
		}
		return f
	});
	return c
});
/*点击列表进入详情*/
mui('#bidu').on('tap', '.detailsFlag', function() {
	var newsId = this.getAttribute("data-newsId");
	var url = "../pages/main_information_details.html";
	var id = "../pages/main_information_details.html";
	var extras = {
		newsId: newsId
	};
	App.openWindow(url, id, extras);
});
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		pulldownRefresh();
	}
}