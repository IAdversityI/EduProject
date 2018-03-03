App.getID("save").addEventListener("tap", function() {
	if(App.getItem("tokenflag")) {
		if(App.clearSpace(App.getID("question").value) != "") {
			var url = App.url + '/user/feedback';
			var dataOptions = {
				content: App.clearSpace(App.getID("question").value),
				token: App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					mui.toast(data.result);
					mui.back();
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
		}else{
			mui.toast("请输入您的意见");
		}

	} else {
		var url = "../pages/login.html";
		var id = "../pages/login.html";
		var extras = {};
		App.openWindow(url, id, extras);
	}

})