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

function pulldownRefresh() {
	collegesDaQuan();
}

function pullupRefresh() {
	collegesDaQuanReload();
}
/*刷新方法*/
function collegesDaQuan() {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + '/college/getCollegeListByCollegeName';
		var dataOptions = {
			collegeName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
			page: 1
		};
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
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
		};
		var dataType = "json";
		App.ajaxNoWait(url, dataOptions, success, dataType);

	}
}

function collegesDaQuanReload() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + '/college/getCollegeListByCollegeName';
		var dataOptions = {
			collegeName: App.getItem("searchValueFlag") ? App.getItem("searchValueFlag") : 0,
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					searchList: data.result.datas,
					size: "@10h_10w_2e"
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
/*渲染数据方法*/
function paraData(result) {
	if(result.length != 0) {
		var option = {
			searchList: result,
			size: "@10h_10w_2e"
		};
		var templatehtml = template("daquan", option);
		App.getID("collegesDa").innerHTML = templatehtml;
	} else {
		mui.toast("没有数据");
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
	App.removeItem("searchValueFlag");
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh4.html");
	} else {
		if(App.clearSpace(value)) {
			App.setItem("searchValueFlag", value);
			var url = App.url + '/college/getCollegeListByCollegeName';
			var dataOptions = {
				collegeName: value,
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
			mui.toast("请输入搜索内容");
		}
	}
}
/*点击列表进入详情*/
mui("#collegesDa").on("tap", ".collegesDetailsFlag", function() {
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
/*默认加载*/
mui.plusReady(function() {
	/*App.clear();*/
	/*for(var i = 0; i < App.getLength(); i++) {
		if(App.getItemByIndex(i).keyname.indexOf("collegeNameFlag")!=-1) {
			alert(App.getItemByIndex(i).keyname)
		}
	}*/
})