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
/*刷新方法*/
var page = 1;

function collegesDaQuan(collegeUrl) {
	page = 1;
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh1.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		var url = App.url + collegeUrl;
		var dataOptions = {
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh1.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result.colleges.datas, data.result.name, data.result.video, data.result.img, data.result.introduce);
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

function collegesDaQuanReload(collegeUrl) {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh1.html");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	} else {
		page++;
		var url = App.url + collegeUrl;
		var dataOptions = {
			page: page
		};
		var success = function(data) {
			if(data.status) {
				var option = {
					list: data.result.colleges.datas,
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

function pulldownRefresh() {
	if(App.getItem("collegesKindFlag") == "colleges211") {
		collegesDaQuan("/college/get211List");
	} else if(App.getItem("collegesKindFlag") == "colleges985") {
		collegesDaQuan("/college/get985List");
	}
}

function pullupRefresh() {
	if(App.getItem("collegesKindFlag") == "colleges211") {
		collegesDaQuanReload("/college/get211List");
	} else if(App.getItem("collegesKindFlag") == "colleges985") {
		collegesDaQuanReload("/college/get985List");
	}
}

/*渲染数据方法*/
function paraData(result, name, video, img, introduce) {
	/*var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = "../js/video.min.js";
	document.body.appendChild(oScript);
	var img = App.url + img;
	var video = App.url + video;*/
	var option = {
		list: result,
		size: "@10h_10w_2e"
	};
	/*App.getID("videoSource").innerHTML = '<video id="myPlayer" class="video-js vjs-big-play-centered" preload="none" width=""  poster="' + img + '" data-setup="{}" webkit-playsinline controls="controls" src="' + video + '" type="video/mp4"></video>';
	App.getID("myPlayer").width = plus.display.resolutionWidth - 30;*/
	var templatehtml = template("daquan", option);
	App.getID("collegesDa").innerHTML = templatehtml;
	App.getID("colleges").innerText = name;
	App.getID("collegeIntroducebufen").innerText = introduce.substr(0, 200);
	App.getID("collegeIntroducezt").innerText = introduce;
}
/*面板伸缩*/
App.getID("accordion").addEventListener('tap', function() {
	if(App.getID("accordion").classList.contains("mui-collapse")) {
		App.getID("accordion").classList.remove("mui-collapse");
		App.getID("bufenContent").style.display = 'none';
		App.getID("bufenContentAll").style.display = 'block';
		App.getID("accordionimg").style.display = "none";
		App.getID("accordionimgxia").style.display = "block";
	} else {
		App.getID("accordion").classList.add("mui-collapse");
		App.getID("accordionimg").style.display = "block";
		App.getID("bufenContent").style.display = 'block';
		App.getID("bufenContentAll").style.display = 'none';
		App.getID("accordionimgxia").style.display = "none";

	}
})

function getDefault(collegeUrl) {
	var url = App.url + collegeUrl;
	var dataOptions = {
		page: 1
	};
	var success = function(data) {
		if(data.status) {
			paraData(data.result.colleges.datas, data.result.name, data.result.video, data.result.img, data.result.introduce);
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

/*默认加载*/
mui.plusReady(function() {
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh1.html");
		} else {
			if(App.getItem("collegesKindFlag") == "colleges211") {
				getDefault("/college/get211List");
			} else if(App.getItem("collegesKindFlag") == "colleges985") {
				getDefault("/college/get985List");
			}
		}

	})
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
	/*点击列表进入详情*/
mui("#collegesDa").on("tap", ".collegesDetailsFlag", function() {
	
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh1.html");
		} else {
			var collegeID = this.getAttribute("data-collegeID");
			var collegeLogo = this.getAttribute("data-collegeLogo");
			var collegeName = this.getAttribute("data-collegeName");
			var collegeTag = this.getAttribute("data-collegeTag");
			var collegeIDNumber = this.getAttribute("data-collegeIDNumber");
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
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		if(App.getItem("collegesKindFlag") == "colleges211") {
			collegesDaQuan("/college/get211List");
		} else if(App.getItem("collegesKindFlag") == "colleges985") {
			collegesDaQuan("/college/get985List");
		}
	}
}