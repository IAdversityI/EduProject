/*(function($, doc) {
	$.plusReady(function() {
		//第三方登录
		var authBtns = ['weixin', 'sinaweibo', 'qq']; //配置业务支持的第三方登录
		var auths = {};
		var oauthArea = doc.querySelector('.oauth-area');
		plus.oauth.getServices(function(services) {
			for(var i in services) {
				var service = services[i];
				auths[service.id] = service;
				if(~authBtns.indexOf(service.id)) {
					var isInstalled = App.isInstalled(service.id);
					var btn = document.createElement('div');
					//如果微信未安装，则为不启用状态
					btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
					btn.authId = service.id;
					btn.style.backgroundImage = 'url("../img/' + service.id + '.png")'
					oauthArea.appendChild(btn);
				}
			}
			$(oauthArea).on('tap', '.oauth-btn', function() {
				if(this.classList.contains('disabled')) {
					plus.nativeUI.toast('您尚未安装微信客户端');
					return;
				}
				var auth = auths[this.authId];
				var waiting = plus.nativeUI.showWaiting();
				auth.login(function() {
					waiting.close();
					plus.nativeUI.toast("登录认证成功");
					auth.getUserInfo(function() {
						plus.nativeUI.toast("获取用户信息成功");
						var name = auth.userInfo.nickname || auth.userInfo.name;
						App.createState(name, function() {
							toMain();
						});
					}, function(e) {
						plus.nativeUI.toast("获取用户信息失败：" + e.message);
					});
				}, function(e) {
					waiting.close();
					plus.nativeUI.toast("登录认证失败：" + e.message);
				});
			});
		}, function(e) {
			oauthArea.style.display = 'none';
			plus.nativeUI.toast("获取登录认证失败：" + e.message);
		});

	});
}(mui, document));*/
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
				var url = App.url + '/getSMSCode';
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
					}else{
						mui.toast(data.result);
					}
				};
				var dataType = "json";
				App.ajaxNoWait(url, dataOptions, success, dataType);
			}
		}
	}
})
App.getID("register").addEventListener("tap", function() {
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
				var url = App.url + '/register';
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