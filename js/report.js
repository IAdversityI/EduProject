var dataUserID = null;
var dataCommunicationID = null;
mui.plusReady(function() {
	dataUserID = plus.webview.currentWebview().userID;
	dataCommunicationID = plus.webview.currentWebview().communicationID;
})
App.getID("submit").addEventListener("tap", function() {
	var check = true;
	var label = null;
	if(!App.getID("radio1").checked&&!App.getID("radio2").checked&&!App.getID("radio3").checked&&!App.getID("radio4").checked&&!App.getID("radio5").checked&&!App.getID("radio6").checked){
		mui.toast("请选择一种类型");
		check=false;
	}else{
		if(App.getID("radio1").checked){
			label = App.getID("radio1").previousElementSibling.innerText;
		}else if(App.getID("radio2").checked){
			label = App.getID("radio2").previousElementSibling.innerText;
		}else if(App.getID("radio3").checked){
			label = App.getID("radio3").previousElementSibling.innerText;
		}else if(App.getID("radio4").checked){
			label = App.getID("radio4").previousElementSibling.innerText;
		}else if(App.getID("radio5").checked){
			label = App.getID("radio5").previousElementSibling.innerText;
		}else if(App.getID("radio6").checked){
			label = App.getID("radio6").previousElementSibling.innerText;
		}
		if(App.getID("textarea").value.length>200){
			mui.toast("不能超过200字")
		}else{
			check=true;
		}
		
	}
	if(check) {
		var url = App.url + '/report/addReport';
		var dataOptions = {
			token: App.getItem("tokenflag"),
			reportType: label,
			reportContent: App.clearSpace(App.getID("textarea").value) ? App.clearSpace(App.getID("textarea").value) : "null",
			userID: dataUserID,
			communicationID: dataCommunicationID
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
		App.ajaxNoWait(url, dataOptions, success, dataType);
	}
})