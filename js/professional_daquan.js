/*刷新初始化*/
mui.init({
	pullRefresh: {
		container: "#pullrefresh",
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: "正在加载...",
			contentnomore: "暂无更多",
			callback: pullupRefresh
		}
	}
});

var page = 1;

function getProRefreshDown(typeName, pUrl) {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh8.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + pUrl;
		var dataOptions = {
			typeName: typeName,
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh8.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraDataRefresh(data.result.datas);
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

window.onscroll = function() {
	App.getID("middlePopover1").style.top = window.pageYOffset + "px";
	App.getID("middlePopover2").style.top = window.pageYOffset + "px";
	App.getID("middlePopover3").style.top = window.pageYOffset + "px";
}

function pulldownRefresh() {
	var proBenKeValue = App.getItem("undergraduateCourseFlag");
	var proZKValue = App.getItem("specialistFlag");
	var proFilter = App.getItem("filterFlag");
	if(proBenKeValue) {
		getProRefreshDown(proBenKeValue, "/specialty/getBenKeSpecialtyListByType");
	}
	if(proZKValue) {
		getProRefreshDown(proZKValue, "/specialty/getZKSpecialtyListByType");
	}
	if(proFilter) {
		getProRefreshDown(proFilter, "/specialty/getSpecialtyListByCondition");
	}
	if(App.getItem("firstProFlag")) {
		getProRefreshDown("不限", "/specialty/getBenKeSpecialtyListByType");
	}
}

function getProRefreshUp(typeName, pUrl) {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh8.html");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + pUrl;
		var dataOptions = {
			typeName: typeName,
			page: page
		};
		var success = function(data) {
			if(data.status&&data.result) {
				var option = {
					resultList: data.result.datas
				};
				var templatehtml = template("proDaQuan", option);
				var question = document.body.querySelector("#proDaQuanCo");
				var spanflag = App.getID("proDaQuanCo").querySelectorAll(".spanflag");
				for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
					var span = document.createElement("span");
					span.className = "spanflag";
					span.innerHTML = templatehtml;
					question.appendChild(span);
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

function pullupRefresh() {
	var proBenKeValue = App.getItem("undergraduateCourseFlag");
	var proZKValue = App.getItem("specialistFlag");
	var proFilter = App.getItem("filterFlag");
	if(proBenKeValue) {
		getProRefreshUp(proBenKeValue, "/specialty/getBenKeSpecialtyListByType");
	}
	if(proZKValue) {
		getProRefreshUp(proZKValue, "/specialty/getZKSpecialtyListByType");
	}
	if(proFilter) {
		getProRefreshUp(proFilter, "/specialty/getSpecialtyListByCondition");
	}
	if(App.getItem("firstProFlag")) {
		getProRefreshUp("不限", "/specialty/getBenKeSpecialtyListByType");
	}
}

function getProDaQaun(typeName, pUrl, popID, inID) {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh8.html");
	} else {
		var url = App.url + pUrl;
		var dataOptions = {
			typeName: typeName,
			page: 1
		};
		var success = function(data) {
			App.evalJS("../pages/professional_daquan_header.html", "areaFresh('" + typeName + "'" + "," + "'" + inID + "')")
			mui(popID).popover("toggle");
			page = 1;
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
}
/*弹出菜单*/
function personalizedFloatWeb(id) {
	var i = id.substr(-1);
	/*App.setItem("arrowdownMyID", id);*/
	mui("#middlePopover" + i).popover("toggle");
}
/*滚动*/
mui('#scroll1').scroll();
mui('#scroll2').scroll();
mui('#scroll3').scroll();
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
	mui('#pullrefresh').pullRefresh().setStopped(true);
});
mui('body').on('hidden', '.mui-popover', function(e) {
	//console.log('hidden', e.detail.id);//detail为当前popover元素
	mui('#pullrefresh').pullRefresh().setStopped(false);
});
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
template.helper("clearSpace", function(data) {
		return App.clearSpace(data).length;
	})
	/*渲染数据方法*/
function paraData(result) {
	var option = {
		resultList: result
	};
	var templatehtml = template("proDaQuan", option);
	App.getID("proDaQuanCo").innerHTML = templatehtml;

}

function paraDataRefresh(result) {
	var option = {
		resultList: result
	};
	var templatehtml = template("proDaQuan", option);
	App.getID("proDaQuanCo").innerHTML = templatehtml;

}

function paraDataSXuan(result) {
	var option = {
		list: result
	};
	var templatehtml = template("sXuanZ", option);
	App.getID("sXuan").innerHTML = templatehtml;

}

function getSXuan() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh8.html");
	} else {
		var url = App.url + "/specialty/getConditionList";
		var dataOptions = {};
		var success = function(data) {
			if(data.status) {
				paraDataSXuan(data.result);
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
/*默认加载*/
mui.plusReady(function() {
		App.removeItem("specialistFlag");
		App.removeItem("undergraduateCourseFlag");
		App.removeItem("filterFlag");
		App.setItem("firstProFlag", "firstProFlag");
		if(App.noNetwork()) {
			App.afreshWebview("45", "0", "afresh8.html");
		} else {
			getSXuan();
			var url = App.url + "/specialty/getBenKeSpecialtyListByType";
			var dataOptions = {
				typeName: "不限",
				page: 1
			};
			var success = function(data) {
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
	/*点击列表进入详情*/
mui("#proDaQuanCo").on("tap", ".proDaQuanFlag", function() {
		var zyid = this.getAttribute("data-zyid");
		var specialName = this.getAttribute("data-specialName");
		var url = "../pages/professional_daquan_details.html";
		var id = "../pages/professional_daquan_details.html";
		var extras = {
			zyid: zyid,
			specialName: specialName
		};
		App.openWindow(url, id, extras);
	})
	/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		pulldownRefresh();
	}
}
/*点击本科*/
mui("#scroll1").on("tap", ".undergraduateCourseFlag", function() {
		var benkenName = this.getAttribute("data-undergraduateCourse");
		App.setItem("undergraduateCourseFlag", benkenName);
		getProDaQaun(benkenName, '/specialty/getBenKeSpecialtyListByType', "#middlePopover1", "undergraduateCourse");

	})
	/*点击专科*/
mui("#scroll2").on("tap", ".specialistFlag", function() {
		var specialistName = this.getAttribute("data-specialist");
		App.setItem("specialistFlag", specialistName);
		getProDaQaun(specialistName, '/specialty/getZKSpecialtyListByType', "#middlePopover2", "specialist");

	})
	/*点击筛选*/
mui("#scroll3").on("tap", ".filterFlag", function() {
	/*var scrollApi = mui('#pullrefresh').scroll(); //获取插件对象
	scrollApi.refresh(); //刷新
	scrollApi.scrollTo(0, 0); //滚动至顶部*/
	var filterName = this.getAttribute("data-filter");
	App.setItem("filterFlag", filterName);
	getProDaQaun(filterName, '/specialty/getSpecialtyListByCondition', "#middlePopover3", "filter");

})