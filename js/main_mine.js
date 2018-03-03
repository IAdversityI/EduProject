//分享操作
var shares = {};

mui.plusReady(function() {
	defaultImg();
	plus.share.getServices(function(s) {
		if(s && s.length > 0) {
			for(var i = 0; i < s.length; i++) {
				var t = s[i];
				shares[t.id] = t;
			}
		}
	}, function() {
		console.log("获取分享服务列表失败");
	});
});
/*分享*/
function shareMessage(share, ex) {
	var msg = {
		extra: {
			scene: ex
		}
	};
	msg.href = App.url + "/download/" + App.getItem("tokenflag");
	msg.title = "成绩分析大师";
	msg.content = "成绩分析大师，领先的高考升学大数据平台。为学生提供考试成绩分析、成绩跟踪、自我定位、高考选校选专业等服务。通过对历年高考录取大数据分析，结合职业兴趣评测、大学专业就业情况分析，帮助高中生明确个人目标、清晰全省排名，结合学生兴趣制定可量化的、个性化的备考方案，助力学生成长。";
	msg.thumbs = ["_www/img/logo.png"];
	share.send(msg, function() {
		console.log("分享到\"" + share.description + "\"成功！ ");
	}, function(e) {
		console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
	});
}

function floatWebview() {
	if(plus.webview.getWebviewById('shareing.html')) { // 避免快速多次点击创建多个窗口
		return;
	}
	floatw = plus.webview.create("shareing.html", "shareing.html", {
		width: '90%',
		height: '200px',
		margin: "auto",
		background: "rgba(0,0,0,0.8)",
		scrollIndicator: 'none',
		scalable: false,
		popGesture: 'none'
	});
	floatw.addEventListener("loaded", function() {
		plus.webview.currentWebview().append(floatw);
		floatw.show('fade-in', 300);
	}, false);
}
/*九宫格*/
mui('#list').on('tap', '.jump-page-flag', function() {
	var dataFlag = this.getAttribute('data-flag');
	if(dataFlag == "../pages/personal_center.html" || dataFlag == "../pages/invite_friends.html" || dataFlag == "../pages/performance_management.html" || dataFlag == "../pages/my_collection.html" || dataFlag == "../pages/feedback.html" || dataFlag == "../pages/my_information_header.html") {
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
		if(dataFlag == "../pages/shareing.html") {
			mui("#middlePopover").popover("toggle");
		} else {
			var url = dataFlag;
			var id = dataFlag;
			var extras = {};
			App.openWindow(url, id, extras);

		}
	}

});
/*点击分享按钮*/
mui('#listshareing').on('tap', '.share-page-flag', function() {
	var datashareID = this.getAttribute('data-shareID');
	var datashareex = this.getAttribute("data-shareex");
	var share = shares[datashareID];
	if(share) {
		if(share.authenticated) {
			shareMessage(share, datashareex);
		} else {
			share.authorize(function() {
				shareMessage(share, datashareex);
			}, function(e) {
				console.log("认证授权失败：" + e.code + " - " + e.message);
			});
		}
	} else {
		mui.toast("无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包")
	}
});
/*点击头像*/
App.getID('login').addEventListener('tap', function() {
		if(App.getItem("tokenflag")) {
			var options = [{
				title: "拍照"
			}, {
				title: "从手机相册选择"
			}];
			plus.nativeUI.actionSheet({
				title: "修改头像",
				cancel: "取消",
				buttons: options
			}, function(a) {
				var index = a.index;
				switch(index) {
					case 0:
						break;
					case 1:
						var checkPer = App.checkPermission("CAMERA");
						if(checkPer && mui.os.ios) {
							getImage();
						} else {
							getImage();
						}
						break;

					case 2:
						var checkPer = App.checkPermission("GALLERY");
						if(checkPer && mui.os.ios) {
							galleryImg();
						} else {
							galleryImg();
						}
						break;
				}
			})
		} else {
			var url = "../pages/login.html";
			var id = "../pages/login.html";
			var extras = {};
			App.openWindow(url, id, extras);
		}
	})
	/*打开照相*/
function getImage() {
	var b = plus.camera.getCamera();
	b.captureImage(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(d) {
			var url = "photo.html";
			var id = "photo.html";
			var extras = {
				path: "file:///" + d.fullPath
			};
			App.openWindow(url, id, extras);
		}, function(d) {
			console.log("读取拍照文件错误：" + d.message)
		})
	}, function(a) {
		console.log("error" + a)
	}, {
		filename: "_doc/head.jpg"
	})
}
/*打开相册*/
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(b) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(d) {
				d.getFile("head.jpg", {}, function(c) {
					c.remove(function() {
						console.log("file remove success");
						b.copyTo(d, "head.jpg", function(g) {
							var url = "photo.html";
							var id = "photo.html";
							var extras = {
								path: "file:///" + b.fullPath
							};
							App.openWindow(url, id, extras);

						}, function(g) {
							console.log("copy image fail:" + g.message)
						})
					}, function() {
						console.log("delete image fail:" + e.message)
					})
				}, function() {
					b.copyTo(d, "head.jpg", function(c) {
						var url = "photo.html";
						var id = "photo.html";
						var extras = {
							path: "file:///" + b.fullPath
						};
						App.openWindow(url, id, extras);
					}, function(c) {
						console.log("copy image fail:" + c.message)
					})
				})
			}, function(d) {
				console.log("get _www folder fail")
			})
		}, function(b) {
			console.log("读取拍照文件错误：" + b.message)
		})
	}, function(a) {}, {
		filter: "image"
	})
} /*默认加载头像*/
function defaultImg() {
	if(App.getItem("tokenflag")) {
		if(App.getItem("cache_1") && App.getItem("nickNameflag")) {
			App.getID("nickName").innerText = "";
			App.getID("nickName").innerText = App.getItem("nickNameflag");
			App.getID("defaultImage").style.display = 'none';
			App.getID("baseImage").src = "";
			App.getID("baseImage").style.display = 'inline-block';
			App.getID("baseImage").src = App.getItem("cache_1");
		} else {
			var url = App.url + '/user/getUserPhotoAndName';
			var dataOptions = {
				token: App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					App.getID("nickName").innerText = "";
					App.getID("nickName").innerText = data.result.nickName;
					if(data.result.photo) {
						App.getID("defaultImage").style.display = 'none';
						App.getID("baseImage").src = "";
						App.getID("baseImage").style.display = 'inline-block';
						App.getID("baseImage").src = data.result.photo;
					} else {
						App.getID("defaultImage").style.display = 'inline-block';
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
	} else {
		App.getID("defaultImage").style.display = 'inline-block';
		App.getID("baseImage").style.display = 'none';
		App.getID("nickName").innerText = "登录/注册";
	}
	/*plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function(d) {
		var a = plus.storage.getItem("canvascrs");
		if(a) {
			document.getElementById("head-img").src = a
		} else {
			if(b != "null") {
				document.getElementById("headmy").innerHTML = '<img class="head-img" id="head-img" src="" style="margin-top: -14px;margin-left: -14px;">';
				document.getElementById("head-img").src = b
			} else {
				document.getElementById("head-img").remove();
				document.getElementById("headmy").innerHTML = '<span class="mui-icon mui-icon-person" id="personc" style="padding:0px 5px;"></span>'
			}
		}
	}, function(a) {
		if(b != "null") {
			document.getElementById("headmy").innerHTML = '<img class="head-img" id="head-img" src="" style="margin-top: -14px;margin-left: -14px;">';
			document.getElementById("head-img").src = b
		} else {
			document.getElementById("head-img").remove();
			document.getElementById("headmy").innerHTML = '<span class="mui-icon mui-icon-person" id="personc" style="padding:0px 5px;"></span>'
		}
	})*/
};
/*刷新头像*/
function refreshImage() {
	if(App.getItem("tokenflag") && App.getItem("cache_1")) {
		App.getID("defaultImage").style.display = 'none';
		App.getID("baseImage").src = "";
		App.getID("baseImage").style.display = 'inline-block';
		App.getID("baseImage").src = App.getItem("cache_1");
	} else {
		App.getID("defaultImage").style.display = 'inline-block';
		App.getID("baseImage").style.display = 'none';
	}
}
/*刷新昵称*/
function refreshNickName() {
	if(App.getItem("tokenflag")) {
		App.getID("nickName").innerText = "";
		App.getID("nickName").innerText = App.getItem("nickNameflag");
	} else {
		App.getID("nickName").innerText = "登录/注册";
	}
}
/*设置页面点击退出按钮时清除本地数据*/
function removeImageName() {
	App.getID("defaultImage").style.display = 'inline-block';
	App.getID("baseImage").style.display = 'none';
	App.getID("nickName").innerText = "";
	App.getID("nickName").innerText = "登录/注册";
}