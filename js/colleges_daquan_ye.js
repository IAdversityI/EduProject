/*渲染数据方法*/
function paraData(result, name, video, img, introduce) {
	/*var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = "../js/video.min.js";
	document.body.appendChild(oScript);
	var img = App.url + img;
	var video = App.url + video;*/
	var zhanwei = [1, 2];
	var option = {
		list: result,
		zhanwei: zhanwei
	};
	/*App.getID("videoSource").innerHTML = '<video id="myPlayer" class="video-js vjs-big-play-centered" preload="none" width=""  poster="' + img + '" data-setup="{}" webkit-playsinline controls="controls" src="' + video + '" type="video/mp4"></video>';
	App.getID("myPlayer").width = plus.display.resolutionWidth - 30;*/
	var templatehtml = template("collegesYe", option);
	App.getID("collegesYeJi").innerHTML = templatehtml;
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
	/*默认加载*/
mui.plusReady(function() {
		if(App.noNetwork()) {
			App.afreshWebview("45", "0", "afresh3.html");
			plus.nativeUI.closeWaiting();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
		} else {
			var url = App.url + '/college/getYjdxList';
			var dataOptions = {};
			var success = function(data) {
				if(data.status) {
					paraData(data.result.colleges, data.result.name, data.result.video, data.result.img, data.result.introduce);
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
	/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/college/getYjdxList';
		var dataOptions = {};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh3.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result.colleges, data.result.name, data.result.video, data.result.img, data.result.introduce);
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
