mui.plusReady(function() {
	plus.navigator.closeSplashscreen();
	if(App.getItem("lauchFlag")) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "../js/update.js";
		document.body.appendChild(script);
	}
	getLunBoData();
	getPositon();
	getData();
})

function paraData(result) {
	App.getID("img1").src = result[0].image + "@333h_500w_2e";
	App.getID("img2").src = result[1].image + "@333h_500w_2e";
	App.getID("img3").src = result[2].image + "@333h_500w_2e";
	App.getID("img4").src = result[3].image + "@333h_500w_2e";
	App.getID("img5").src = result[1].image + "@333h_500w_2e";
	App.getID("img6").src = result[0].image + "@333h_500w_2e";
	App.getID("newsId1").setAttribute("newsId", result[0].newsId);
	App.getID("newsId2").setAttribute("newsId", result[1].newsId);
	App.getID("newsId3").setAttribute("newsId", result[2].newsId);
	App.getID("newsId4").setAttribute("newsId", result[3].newsId);
	App.getID("newsId5").setAttribute("newsId", result[1].newsId);
	App.getID("newsId6").setAttribute("newsId", result[0].newsId);
	App.getID("img-con1").innerHTML = result[0].title;
	App.getID("img-con2").innerHTML = result[1].title;
	App.getID("img-con3").innerHTML = result[2].title;
	App.getID("img-con4").innerHTML = result[3].title;
	App.getID("img-con5").innerHTML = result[1].title;
	App.getID("img-con6").innerHTML = result[0].title;
}

function getLunBoData() {
	var url = App.url + '/index/getCarousel';
	var dataOptions = {};
	var success = function(data) {
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
	App.ajaxNoWait(url, dataOptions, success, dataType);
}
/*轮播*/
mui("#slider").slider({
	interval: 5000
});
mui('#slider').on('tap', '.mui-slider-item', function() {
	var newsId = this.getAttribute("newsId");
	var url = "../pages/main_information_details.html";
	var id = "../pages/main_information_details.html";
	var extras = {
		newsId: newsId
	};
	App.openWindow(url, id, extras);
});
/*获取定位*/
function getPositon() {
	plus.geolocation.getCurrentPosition(function(p) {
		var checkPer = App.checkPermission("LOCATION");
		if(checkPer && mui.os.ios) {
			if(App.noNetwork()) {
				mui.toast('网络未连接');
			} else {
				var address = p.address.province;
				address = address.split('省');
				App.setItem("addressFlag", address[0]);
			}
		} else {
			if(App.noNetwork()) {
				mui.toast('网络未连接');
			} else {
				if(p.address.province) {

				} else {
					plus.nativeUI.alert("请在系统[设置]选项中找到应用权限管理，允许访问您的位置", function(e) {}, "无法定位", "确定");
				}
			}
			var address = p.address.province;
			address = address.split('省');
			App.setItem("addressFlag", address[0]);
		}
	}, function(e) {
		/*plus.nativeUI.alert("定位错误: " + e.message);*/
	});

}
/*获取地址显示*/
/*function getAddress(pos) {
	App.getID("address").innerHTML = pos;
	App.setItem("addressFlag", pos);
}*/
/*App.getID('mainIndex-title-left').addEventListener('tap', function() {
		var url = "../pages/city_list.html";
		var id = "../pages/city_list.html";
		var extras = {};
		App.openWindow(url, id, extras);
	})*/
/*搜索框*/
App.getID('mainIndex-title1').addEventListener('tap', function() {
		App.removeItem("searchValueFlag");
		var url = "../pages/search_header.html";
		var id = "../pages/search_header.html";
		var extras = {};
		App.openWindow(url, id, extras);
	})
	/*九宫格*/
mui('#list').on('tap', '.jump-page-flag', function() {
	var dataFlag = this.getAttribute('data-flag');
	if(dataFlag == "../pages/results_analysis_header.html" || dataFlag == "../pages/personalized_recommendation.html" || dataFlag == "../pages/personal_timetable.html") {
		if(!App.getItem("tokenflag")) {
			var url = "../pages/login.html";
			var id = "../pages/login.html";
			var extras = {};
			App.openWindow(url, id, extras);
		} else {
			var url = dataFlag;
			var id = dataFlag;
			var extras = {};
			App.openWindow(url, id, extras);
		}
	} else {
		var url = dataFlag;
		var id = dataFlag;
		var extras = {};
		App.openWindow(url, id, extras);
	}

});
/*点击更多*/
App.getID("more").addEventListener("tap", function() {
	var url = "../pages/skills_mention_header.html";
	var id = "../pages/skills_mention_header.html";
	var extras = {};
	App.openWindow(url, id, extras);
})

function getData() {
	if(App.noNetwork()) {
		mui.toast("网络出现问题");
	} else {
		var url = App.url + '/news/getIndexNewsList';
		var dataOptions = {
			page: 0
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
		App.ajaxNoWait(url, dataOptions, success, dataType);
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