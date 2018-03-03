mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							if(App.getItem("dataNewsPlanFlag") == "policyNews") {
								getZCNewsDown(10001, "ZSIdeal");
							} else if(App.getItem("dataNewsPlanFlag") == "remarksGuide") {
								getZCNewsDown(10002, "BKGiude");
							} else if(App.getItem("dataNewsPlanFlag") == "enrollmentPlan") {
								getZCNewsDown(10003, "ZCNews");
							}
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							if(App.getItem("dataNewsPlanFlag") == "policyNews") {
								getZCNewsUp(10001, "ZSIdeal");
							} else if(App.getItem("dataNewsPlanFlag") == "remarksGuide") {
								getZCNewsUp(10002, "BKGiude");
							} else if(App.getItem("dataNewsPlanFlag") == "enrollmentPlan") {
								getZCNewsUp(10003, "ZCNews");
							}
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
	});
})(mui);

function openDetailsHeader(newsId) {
	var url = "../pages/main_information_details.html";
	var id = "../pages/main_information_details.html";
	var extras = {
		newsId: newsId
	};
	App.openWindow(url, id, extras);
}
/*点击分享按钮*/
mui("#item1").on('tap', '.deatilscontent-flag', function() {
	var newsId = this.getAttribute("data-newsId");
	openDetailsHeader(newsId);
})
mui("#item2").on('tap', '.deatilscontent-flag', function() {
	var newsId = this.getAttribute("data-newsId");
	openDetailsHeader(newsId);
})
mui("#item3").on('tap', '.deatilscontent-flag', function() {
	var newsId = this.getAttribute("data-newsId");
	openDetailsHeader(newsId);
})
var page = 1;
/*获取政策新闻下拉刷新*/
function getZCNewsDown(type, zID) {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh13.html");
	} else {
		var url = App.url + '/news/getNewsList';
		var dataOptions = {
			type: type,
			page: 1
		};
		var success = function(data) {
			if(data.status) {
				paraData(data.result.datas, zID);
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
	}
}
/*获取政策新闻上拉加载*/
function getZCNewsUp(type, zID) {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh13.html");
	} else {
		page++;
		var url = App.url + '/news/getNewsList';
		var dataOptions = {
			type: type,
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					list: data.result.datas,
					size: "@20p"
				};
				if(zID == "ZCNews") {
					var templatehtml = template("newsData", option);
					var ZCNews = document.body.querySelector("#ZCNews");
					var spanflag = App.getID("ZCNews").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						ZCNews.appendChild(span);
					}
				}
				if(zID == "BKGiude") {
					var templatehtml = template("guideData", option);
					var BKGiude = document.body.querySelector("#BKGiude");
					var spanflag = App.getID("BKGiude").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						BKGiude.appendChild(span);
					}
				}
				if(zID == "ZSIdeal") {
					var templatehtml = template("idealData", option);
					var ZSIdeal = document.body.querySelector("#ZSIdeal");
					var spanflag = App.getID("ZSIdeal").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						ZSIdeal.appendChild(span);
					}
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
		};
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
}

function paraData(result, id) {
	var option = {
		list: result,
		size: "@20p"
	};
	var templatehtml = null;
	if(id == "ZCNews") {
		templatehtml = template("newsData", option);
		App.getID("ZCNews").innerHTML = templatehtml;
	}
	if(id == "BKGiude") {
		templatehtml = template("guideData", option);
		App.getID("BKGiude").innerHTML = templatehtml;
	}
	if(id == "ZSIdeal") {
		templatehtml = template("idealData", option);
		App.getID("ZSIdeal").innerHTML = templatehtml;
	}

}

function getMRData(type, zID) {
	var url = App.url + '/news/getNewsList';
	var dataOptions = {
		type: type,
		page: 1
	};
	var success = function(data) {
		var afresh = App.getWebviewID("afresh13.html");
		if(afresh) {
			afresh.close();
		}
		if(data.status) {
			paraData(data.result.datas, zID);
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
}
mui.plusReady(function() {
	App.setItem("dataNewsPlanFlag", "policyNews");
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh13.html");
		plus.nativeUI.closeWaiting();
	} else {
		getMRData(10003, "ZCNews");
		getMRData(10002, "BKGiude");
		getMRData(10001, "ZSIdeal")
	}
})
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
/*点击问答吐槽*/
mui("#sliderSegmentedControl").on("tap", "a", function() {
	page = 1;
	var dataNews = this.getAttribute("data-news");
	App.setItem("dataNewsPlanFlag", dataNews);
	/*var scrollApi = mui('#scroll1').scroll(); //获取插件对象
	scrollApi.refresh(); //刷新
	scrollApi.scrollTo(0, 0); //滚动至顶部
	var scrollApi = mui('#scroll2').scroll(); //获取插件对象
	scrollApi.refresh(); //刷新
	scrollApi.scrollTo(0, 0); //滚动至顶部*/

});
/*监听slider*/
document.getElementById('slider').addEventListener('slide', function(event) {
		page = 1;
		if(event.detail.slideNumber === 0) {
			App.setItem("dataNewsPlanFlag", "policyNews");
		} else if(event.detail.slideNumber === 1) {
			App.setItem("dataNewsPlanFlag", "remarksGuide");
		} else if(event.detail.slideNumber === 2) {
			App.setItem("dataNewsPlanFlag", "enrollmentPlan");
		}
	})
	/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getMRData(10003, "ZCNews");
		getMRData(10002, "BKGiude");
		getMRData(10001, "ZSIdeal")
	}
}