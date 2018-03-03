/*默认加载*/
mui.plusReady(function() {

})
var phone = null;
var password = null;
var code = null;
var getcode = null;
var isclick = true;
App.getID("getcode").addEventListener("tap", function() {
	if(isclick) {
		getcode = App.clearSpace(App.getID("getcode").value);
		phone = App.clearSpace(App.getID("phone").value);
		if(App.noNetwork()) {
			plus.nativeUI.alert("网络未成功连接", function(e) {}, "温馨提示", "确定");
		} else {
			if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
				mui.alert("手机号码格式有误");
			} else {
				var url = App.url + '/getForgetPwdSMSCode';
				var dataOptions = {
					uuid: plus.device.uuid,
					phone: phone
				};
				var success = function(data) {
					if(data.status) {
						var b = 60;
						var c = 0;
						c = window.setInterval(function() {
							isclick = false, App.getID("getcode").innerText = --b + "秒后重发", 0 >= b && (window.clearInterval(c), isclick = true, App.getID("getcode").innerText = "获取验证码")
						}, 1e3);
						mui.toast(data.result);
					} else {
						mui.toast(data.result);
					}
				};
				var dataType = "json";
				App.ajaxNoWait(url, dataOptions, success, dataType);
			}
		}
	}
})
App.getID("sure").addEventListener("tap", function() {
	if(App.noNetwork()) {
		plus.nativeUI.alert("网络未成功连接", function(e) {}, "温馨提示", "确定");
	} else {
		var check = true;
		phone = App.clearSpace(App.getID("phone").value);
		code = App.clearSpace(App.getID("code").value);
		password = App.clearSpace(App.getID("password").value);
		mui(".mui-input-group input").each(function() {
			//若当前input为空，则alert提醒
			if(!this.value) {
				var label = this.previousElementSibling;
				mui.alert(label.innerText + "不允许为空");
				check = false;
				return false;
			}
		});
		if(check) {
			if(password.length >= 6 && password.length <= 18) {
				var url = App.url + '/forgetPassword';
				var dataOptions = {
					uuid: plus.device.uuid,
					phone: phone,
					smsCode: code,
					password: password
				};
				var success = function(data) {
					if(data.status) {
						mui.toast(data.result);
						mui.back();
					}
				};
				var dataType = "json";
				App.ajaxNoWait(url, dataOptions, success, dataType);
			} else {
				mui.alert("密码必须在6~18为之间");
			}

		}
	}
})