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

function collegesDaQuan() {
	var provinceNumber = parseInt(App.getItem("provinceNumberFlag")) ? parseInt(App.getItem("provinceNumberFlag")) : 0;
	var zongheNumber = parseInt(App.getItem("zongheNumberFlag")) ? parseInt(App.getItem("zongheNumberFlag")) : 0;
	var degreeNumber = parseInt(App.getItem("degreeNumberFlag")) ? parseInt(App.getItem("degreeNumberFlag")) : 0;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh2.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + '/college/getCollegeListByParm';
		var dataOptions = {
			provinceNo: provinceNumber,
			typeNo: zongheNumber,
			conditionNo: degreeNumber,
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh2.html");
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

function collegesDaQuanReload() {
	var provinceNumber = parseInt(App.getItem("provinceNumberFlag")) ? parseInt(App.getItem("provinceNumberFlag")) : 0;
	var zongheNumber = parseInt(App.getItem("zongheNumberFlag")) ? parseInt(App.getItem("zongheNumberFlag")) : 0;
	var degreeNumber = parseInt(App.getItem("degreeNumberFlag")) ? parseInt(App.getItem("degreeNumberFlag")) : 0;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh2.html");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + '/college/getCollegeListByParm';
		var dataOptions = {
			provinceNo: provinceNumber,
			typeNo: zongheNumber,
			conditionNo: degreeNumber,
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					list: data.result.datas,
					size: "@10p"
				};
				var templatehtml = template("daquan", option);
				var question = document.body.querySelector("#collegesDa");
				var spanflag = App.getID("collegesDa").querySelectorAll(".spanflag");
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

function pulldownRefresh() {
	page = 1;
	if(App.getItem("collegesAllFlag") == "collegesAll") {
		collegesDaQuan();
	} else {
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh2.html");
			plus.nativeUI.closeWaiting();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
		} else {
			var url = App.url + '/college/getRanking';
			var dataOptions = {
				page: 1
			};
			var success = function(data) {
				var afresh = App.getWebviewID("afresh2.html");
				if(afresh) {
					afresh.close();
				}
				if(data.status) {
					paraData1(data.result.datas);
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
}

function pullupRefresh() {
	if(App.getItem("collegesAllFlag") == "collegesAll") {
		collegesDaQuanReload();
	} else {
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh2.html");
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		} else {
			page++;
			var url = App.url + '/college/getRanking';
			var dataOptions = {
				page: page
			};
			var success = function(data) {
				if(data.status) {
					var option = {
						resultList: data.result.datas,
						size: "@10p"
					};
					var templatehtml = template("daquan", option);
					var question = document.body.querySelector("#collegesDa");
					var spanflag = App.getID("collegesDa").querySelectorAll(".spanflag");
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

}
/*弹出菜单*/
function personalizedFloatWeb(id) {
	var i = id.substr(-1);
	/*App.setItem("arrowdownID", id);*/
	mui("#middlePopover" + i).popover("toggle");
}
window.onscroll = function() {
	App.getID("middlePopover1").style.top = window.pageYOffset + "px";
	App.getID("middlePopover2").style.top = window.pageYOffset + "px";
	App.getID("middlePopover3").style.top = window.pageYOffset + "px";
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
		list: result,
		size: "@10p"
	};
	var templatehtml = template("daquan", option);
	App.getID("collegesDa").innerHTML = templatehtml;

}

function paraData1(result) {
	var option = {
		resultList: result,
		size: "@10p"
	};
	var templatehtml = template("daquan", option);
	App.getID("collegesDa").innerHTML = templatehtml;

}
/*默认加载*/
mui.plusReady(function() {
		App.removeItem("provinceNumberFlag");
		App.removeItem("zongheNumberFlag");
		App.removeItem("degreeNumberFlag");
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh2.html");
		} else {
			if(App.getItem("collegesAllFlag") == "collegesAll") {
				var url = App.url + '/college/getCollegeListByParm';
				var dataOptions = {
					provinceNo: 0,
					typeNo: 0,
					conditionNo: 0,
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
			} else {
				var url = App.url + '/college/getRanking';
				var dataOptions = {
					page: 1
				};
				var success = function(data) {
					if(data.status) {
						paraData1(data.result.datas);
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
	})
	/*点击列表进入详情*/
mui("#collegesDa").on("tap", ".collegesDetailsFlag", function() {
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh2.html");
		} else {
			var collegeID = this.getAttribute("data-collegeID");
			var collegeIDNumber = this.getAttribute("data-collegeIDNumber");
			/*try {
				if(collegeTag) {
					collegeTag = JSON.parse(collegeTag);
				} else {
					collegeTag = [];
				}
			} catch(e) {
				//TODO handle the exception
				collegeTag = [collegeTag];
			}*/

			var url = "../pages/colleges_details_header.html";
			var id = "../pages/colleges_details_header.html";
			var extras = {};
			App.setItem("collegeID", collegeID);
			App.setItem("collegeIDNumber", collegeIDNumber);
			App.removeItem("provinceNumber");
			App.removeItem("lareaProvinceNumber");
			App.removeItem("lareaYear");
			App.openWindow(url, id, extras);
		}

	})
	/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		collegesDaQuan();
	}
}

/*选择执行方法*/
function araeKindSxuan(provinceNumber, typeNo, conditionNo, pageIndex, citykindSxuan, inID, popoverID) {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh2.html");
	} else {
		var url = App.url + '/college/getCollegeListByParm';
		var dataOptions = {
			provinceNo: provinceNumber,
			typeNo: typeNo,
			conditionNo: conditionNo,
			page: pageIndex
		};
		var success = function(data) {
			App.evalJS("./colleges_daquan_details_header.html", "areaFresh('" + citykindSxuan + "'" + "," + "'" + inID + "')")
			mui(popoverID).popover("toggle");
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
/*点击地区*/
mui("#scroll1").on("tap", ".areaFlag", function() {
		var provinceNumber = parseInt(this.getAttribute("data-provinceNumber"));
		var zongheNumber = parseInt(App.getItem("zongheNumberFlag")) ? parseInt(App.getItem("zongheNumberFlag")) : 0;
		var degreeNumber = parseInt(App.getItem("degreeNumberFlag")) ? parseInt(App.getItem("degreeNumberFlag")) : 0;
		App.setItem("provinceNumberFlag", provinceNumber);
		var city = this.getAttribute("data-city");
		araeKindSxuan(provinceNumber, zongheNumber, degreeNumber, 1, city, "area", "#middlePopover1");
	})
	/*点击类别*/
mui("#scroll2").on("tap", ".kindFlag", function() {
		var zongheNumber = parseInt(this.getAttribute("data-zongheNumber"));
		var kind = this.getAttribute("data-kind");
		var provinceNumber = parseInt(App.getItem("provinceNumberFlag")) ? parseInt(App.getItem("provinceNumberFlag")) : 0;
		var degreeNumber = parseInt(App.getItem("degreeNumberFlag")) ? parseInt(App.getItem("degreeNumberFlag")) : 0;
		App.setItem("zongheNumberFlag", zongheNumber);
		araeKindSxuan(provinceNumber, zongheNumber, degreeNumber, 1, kind, "kind", "#middlePopover2");
	})
	/*点击筛选*/
mui("#scroll3").on("tap", ".sxuanFlag", function() {
	var degreeNumber = parseInt(this.getAttribute("data-degreeNumber"));
	var sxuan = this.getAttribute("data-sxuan");
	var provinceNumber = parseInt(App.getItem("provinceNumberFlag")) ? parseInt(App.getItem("provinceNumberFlag")) : 0;
	var zongheNumber = parseInt(App.getItem("zongheNumberFlag")) ? parseInt(App.getItem("zongheNumberFlag")) : 0;
	App.setItem("degreeNumberFlag", degreeNumber);
	araeKindSxuan(provinceNumber, zongheNumber, degreeNumber, 1, sxuan, "sXuan", "#middlePopover3");
})