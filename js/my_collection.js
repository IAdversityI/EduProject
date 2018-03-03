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
							if(App.getItem("datashoucang") == "school") {
								getSchoolMo("college", App.getItem("collegeID"), "school");
							} else if(App.getItem("datashoucang") == "zhuanye") {
								getSchoolMo("specialty", App.getItem("zyidFlag"), "zhuanye");
							}
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							if(App.getItem("datashoucang") == "school") {
								getSchoolUp("college", App.getItem("collegeID"), "school");
							} else if(App.getItem("datashoucang") == "zhuanye") {
								getSchoolUp("specialty", App.getItem("zyidFlag"), "zhuanye");
							}
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
	});
})(mui);

function paraData(result, id) {
	var option = {
		list: result
	};
	if(id == "school") {
		var templatehtml = template("schoolRender", option);
		App.getID("school").innerHTML = templatehtml;
	}
	if(id == "zhuanye") {
		var templatehtml = template("zhuanyeData", option);
		App.getID("zhuanye").innerHTML = templatehtml;
	}

}

function getSchoolMo(type, zid) {
	page = 1;
	var url = App.url + '/collectionList';
	var dataOptions = {
		page: 1,
		token: App.getItem("tokenflag"),
		type: type
	};
	var success = function(data) {
		if(data.status) {
			paraData(data.result.datas, zid);
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

function getSchoolUp(type, zid) {
	page++;
	var url = App.url + '/collectionList';
	var dataOptions = {
		page: page,
		token: App.getItem("tokenflag"),
		type: type
	};
	var success = function(data) {
		if(data.status) {
			var option = {
				list: data.result.datas,
				size: "@20p"
			};
			if(zID == "school") {
				var templatehtml = template("schoolRender", option);
				var school = document.body.querySelector("#school");
				var spanflag = App.getID("school").querySelectorAll(".spanflag");
				for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
					var span = document.createElement("span");
					span.className = "spanflag";
					span.innerHTML = templatehtml;
					school.appendChild(span);
				}
			}
			if(zID == "zhuanye") {
				var templatehtml = template("zhuanyeData", option);
				var zhuanye = document.body.querySelector("#zhuanye");
				var spanflag = App.getID("zhuanye").querySelectorAll(".spanflag");
				for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
					var span = document.createElement("span");
					span.className = "spanflag";
					span.innerHTML = templatehtml;
					zhuanye.appendChild(span);
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
mui.plusReady(function() {
		App.setItem("datashoucang", "school");
		getSchoolMo("college", "school");
		getSchoolMo("specialty", "zhuanye");
	})
	/*点击列表进入详情*/
mui("#zhuanye").on("tap", ".proDaQuanFlag", function() {
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
	/*点击列表进入详情*/
mui("#school").on("tap", ".collegesDetailsFlag", function() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh2.html");
	} else {
		var collegeID = this.getAttribute("data-collegeID");
		var collegeIDNumber = this.getAttribute("data-collegeIDNumber");
		var url = "../pages/colleges_details_header.html";
		var id = "../pages/colleges_details_header.html";
		var extras = {};
		App.setItem("collegeID", collegeID);
		App.setItem("collegeIDNumber", collegeIDNumber);
		App.removeItem("provinceNumber");
		App.removeItem("lareaProvinceNumber");
		App.openWindow(url, id, extras);
	}

})
var page = 1;
/*点击问答吐槽*/
mui("#sliderSegmentedControl").on("tap", "a", function() {
	page = 1;
	var datashoucang = this.getAttribute("data-shoucang");
	App.setItem("datashoucang", datashoucang);
});
/*监听slider*/
document.getElementById('slider').addEventListener('slide', function(event) {
	page = 1;
	if(event.detail.slideNumber === 1) {
		App.setItem("datashoucang", "zhuanye");
		var scrollApi = mui('#scroll2').scroll(); //获取插件对象
		scrollApi.refresh(); //刷新
		scrollApi.scrollTo(0, 0); //滚动至顶部
	} else {
		App.setItem("datashoucang", "school");
		var scrollApi = mui('#scroll1').scroll(); //获取插件对象
		scrollApi.refresh(); //刷新
		scrollApi.scrollTo(0, 0); //滚动至顶部
	}
})