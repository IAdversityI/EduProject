mui("#scroll1").scroll();
mui("#scroll2").scroll();

function gundong() {
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
								if(App.getItem("searchTFlag") == "school") {
									collegesDaQuan("/college/getCollegeListByCollegeName");
								} else if(App.getItem("searchTFlag") == "profession") {
									collegesDaQuan("/specialty/specialtySearch");
								}
								self.endPullDownToRefresh();
							}, 1000);
						}
					},
					up: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								if(App.getItem("searchTFlag") == "school") {
									collegesDaQuanReload("/college/getCollegeListByCollegeName");
								} else if(App.getItem("searchTFlag") == "profession") {
									collegesDaQuanReload("/specialty/specialtySearch");
								}
								self.endPullUpToRefresh();
							}, 1000);
						}
					}
				});
			});
		});
	})(mui);
}
var page = 1;
/*刷新方法*/
function collegesDaQuan(SPUrl) {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + SPUrl;
		var dataOptions = null;
		if(App.getItem("searchTFlag") == "school") {
			dataOptions = {
				collegeName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
				page: 1
			};
		} else if(App.getItem("searchTFlag") == "profession") {
			dataOptions = {
				specialtyName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
				page: 1
			};
		}
		var success = function(data) {
			var afresh = App.getWebviewID("afresh4.html");
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
		App.ajaxNoWait(url, dataOptions, success, dataType);

	}
}

function collegesDaQuanReload(SPUrl) {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
	} else {
		page++;
		var url = App.url + SPUrl;
		var dataOptions = null;
		if(App.getItem("searchTFlag") == "school") {
			dataOptions = {
				collegeName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
				page: page
			};
		} else if(App.getItem("searchTFlag") == "profession") {
			dataOptions = {
				specialtyName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
				page: page
			};
		}
		var success = function(data) {
			if(data.status) {
				var option = null;
				if(App.getItem("searchTFlag") == "school") {
					option = {
						schoolList: data.result.datas,
						size: "@10h_10w_2e"
					};
					var templatehtml = template("schoolSearch", option);
					var school = document.body.querySelector("#school");
					var spanflag = App.getID("school").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						school.appendChild(span);
					}
				} else if(App.getItem("searchTFlag") == "profession") {
					option = {
						proList: data.result.datas
					};
					var templatehtml = template("proDaQuan", option);
					var proDaQuanCo = document.body.querySelector("#proDaQuanCo");
					var spanflag = App.getID("proDaQuanCo").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						proDaQuanCo.appendChild(span);
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
		}
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
}
/*渲染数据方法*/
function paraData(result) {
	gundong();
	var option = null;
	if(result.length != 0) {
		if(App.getItem("searchTFlag") == "school") {
			option = {
				schoolList: result,
				size: "@10h_10w_2e"
			};
			var templatehtml = template("schoolSearch", option);
			App.getID("school").innerHTML = templatehtml;
		} else if(App.getItem("searchTFlag") == "profession") {
			option = {
				proList: result
			};
			var templatehtml = template("proDaQuan", option);
			App.getID("proDaQuanCo").innerHTML = templatehtml;
		}

	} else {
		mui.toast("没有数据");
		App.getID("proDaQuanCo").innerHTML = "";
		App.getID("school").innerHTML = "";
	}

}

function paraDataLike(result) {
	var option = null;
	if(result[0].name == "college") {
		option = {
			schoolList: result[0].value,
			myHistory: result[0].name,
			size: "@10h_10w_2e"
		};
		var templatehtml = template("schoolSearch", option);
		App.getID("school").innerHTML = templatehtml;
	}
	if(result[1].name == "specialty") {
		option = {
			proList: result[1].value,
			myHistory: result[1].name
		};
		var templatehtml = template("proDaQuan", option);
		App.getID("proDaQuanCo").innerHTML = templatehtml;
	}

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
template.helper("clearSpace", function(data) {
		return App.clearSpace(data).length;
	})
	/*搜索框*/
function searchData(value) {
	if(App.getItem("searchTFlag") == "school") {
		getSearchData(value, "/college/getCollegeListByCollegeName");
	} else if(App.getItem("searchTFlag") == "profession") {
		getSearchData(value, "/specialty/specialtySearch");
	}
}

function getSearchData(value, sUrl) {
	App.removeItem("searchValueFlag");
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
	} else {
		if(App.clearSpace(value)) {
			App.setItem("searchValueFlag", value);
			var url = App.url + sUrl;
			var dataOptions = null;
			if(App.getItem("searchTFlag") == "school") {
				dataOptions = {
					collegeName: value,
					page: 1
				};
			} else if(App.getItem("searchTFlag") == "profession") {
				dataOptions = {
					specialtyName: value,
					page: 1
				};
			}
			var success = function(data) {
				if(data.status) {
					App.evalJS("../pages/search_header.html", "loseFocus()");
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
			mui.toast("请输入搜索内容");
		}
	}
}
/*点击学校列表进入详情*/
mui("#school").on("tap", ".collegesDetailsFlag", function() {
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh4.html");
		} else {
			var collegeID = this.getAttribute("data-collegeID");
			var collegeLogo = this.getAttribute("data-collegeLogo");
			var collegeName = this.getAttribute("data-collegeName");
			var collegeTag = this.getAttribute("data-collegeTag");
			var collegeIDNumber = this.getAttribute("data-collegeIDNumber");
			/*var index = this.getAttribute("data-i");
			var collegeNameArr = {records:[]};
			var collegeNameArray ={index:index,collegeName:collegeName};
			collegeNameArr.records.push(collegeNameArray);
			alert(JSON.stringify(collegeNameArr));*/
			/*App.setItem("collegeNameFlag", collegeNameArr);*/
			try {
				if(collegeTag) {
					collegeTag = JSON.parse(collegeTag);
				} else {
					collegeTag = [];
				}
			} catch(e) {
				//TODO handle the exception
				collegeTag = [collegeTag];
			}

			var url = "../pages/colleges_details_header.html";
			var id = "../pages/colleges_details_header.html";
			var extras = {
				collegeLogo: collegeLogo,
				collegeName: collegeName,
				collegeTag: collegeTag
			};
			App.setItem("collegeID", collegeID);
			App.setItem("collegeIDNumber", collegeIDNumber);
			App.openWindow(url, id, extras);
		}

	})
	/*点击专业列表*/
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
	plus.nativeUI.showWaiting("  正在搜索...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
		App.iosPage("prefs:root=WIFI");
	} else {
		collegesDaQuan();
	}
}

function getLike() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + "/click/getClickListByUUID";
		var dataOptions = {
			uuid: plus.device.uuid
		};

		var success = function(data) {
			var afresh = App.getWebviewID("afresh4.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraDataLike(data.result);
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
/*默认加载*/
mui.plusReady(function() {
	App.setItem("searchTFlag", "school");
	getLike();
})
mui("#sliderSegmentedControl").on("tap", ".mui-control-item", function() {
		var search = this.getAttribute("data-search");
		App.setItem("searchTFlag", search);
	})
	/*监听slider*/
App.getID('slider').addEventListener('slide', function(event) {
		if(event.detail.slideNumber === 1) {
			App.setItem("searchTFlag", "profession");
			var scrollApi = mui('#scroll2').scroll(); //获取插件对象
			scrollApi.refresh(); //刷新
			scrollApi.scrollTo(0, 0); //滚动至顶部
		} else {
			App.setItem("searchTFlag", "school");
			var scrollApi = mui('#scroll1').scroll(); //获取插件对象
			scrollApi.refresh(); //刷新
			scrollApi.scrollTo(0, 0); //滚动至顶部
		}
	})
	/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getLike();
	}
}