mui.plusReady(function() {
		App.getID("title").innerText = plus.webview.currentWebview().schoolName;
		var url = App.url + '/recommend/getRecommend';
		var dataOptions = {
			token: App.getItem("tokenflag"),
			score: plus.webview.currentWebview().score,
			userProvince: plus.webview.currentWebview().userProvince,
			peovinceNo: plus.webview.currentWebview().peovinceNo,
			collegeType: plus.webview.currentWebview().collegeType,
			collegeLevel: plus.webview.currentWebview().collegeLevel,
			studentType: plus.webview.currentWebview().studentType
		};
		var success = function(data) {
			if(data.status) {
				if(data.result) {
					if(plus.webview.currentWebview().schoolList == "sprintCollege") {
						paraData(data.result.sprintCollege);
					} else if(plus.webview.currentWebview().schoolList == "stableCollege") {
						paraData(data.result.stableCollege);
					} else if(plus.webview.currentWebview().schoolList == "endCollege") {
						paraData(data.result.endCollege);
					}

				} else {

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
		App.ajax(url, dataOptions, success, dataType);
	})
	/*渲染数据方法*/
function paraData(result) {
	var option = {
		resultList: result,
		size: "@10p"
	};
	var templatehtml = template("schoolListGX", option);
	App.getID("schoolList").innerHTML = templatehtml;

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
mui("#schoolList").on("tap", ".collegesDetailsFlag", function() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh1.html");
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