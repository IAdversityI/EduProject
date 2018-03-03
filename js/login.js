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
App.getID('reg').addEventListener('tap', function() {
	document.activeElement.blur();
	var url = "../pages/register.html";
	var id = "../pages/register.html";
	var extras = {};
	App.openWindow(url, id, extras);

})
App.getID('forgetPassword').addEventListener('tap', function() {
	document.activeElement.blur();
	var url = "../pages/forget_password.html";
	var id = "../pages/forget_password.html";
	var extras = {};
	App.openWindow(url, id, extras);
})
var phone = null;
var password = null;
App.getID('login').addEventListener('tap', function() {
	if(App.noNetwork()) {
		plus.nativeUI.alert("网络未成功连接", function(e) {}, "温馨提示", "确定");
	} else {
		phone = App.clearSpace(App.getID("phone").value);
		password = App.clearSpace(App.getID("password").value);
		if(phone && password) {
			var url = App.url + '/user/login';
			var dataOptions = {
				phone: phone,
				password: password
			};
			var dataType = "json";
			App.ajaxNoWait(url, dataOptions, function(data) {
				if(data.status) {
					console.log(JSON.stringify(data));
					App.setItem("tokenflag",data.result.token);
					App.setItem("nickNameflag",data.result.user.nickName);
					App.setItem("cache_1", data.result.user.photo);
					App.evalJS("./pages/main_mine.html", "refreshImage()");
					App.evalJS("./pages/main_mine.html", "refreshNickName()");
					mui.back();
				} else {
					plus.nativeUI.alert(data.result, function(e) {}, "温馨提示", "确定");
				}
			}, dataType);
		} else if(!phone) {
			plus.nativeUI.alert("账号不能为空", function(e) {}, "温馨提示", "确定");
		} else if(phone && !password) {
			plus.nativeUI.alert("密码不能为空", function(e) {}, "温馨提示", "确定");
		}
	}
})