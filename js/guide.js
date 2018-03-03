mui.plusReady(function() {
	if(mui.os.ios) {
		plus.navigator.setFullscreen(true);
	}
	plus.navigator.closeSplashscreen();
	mui.back = function() {
		plus.runtime.quit();
	};
});
//立即体验按钮点击事件
document.getElementById("close").addEventListener('tap', function(event) {
	App.setItem("lauchFlag", "true");
	plus.navigator.setFullscreen(false);
	update();
	plus.webview.currentWebview().hide();
}, false);
var checkUrl = App.url + "/version/update";
var wgtVer = null;
var apkwgtVer = null;

function update() {
	plus.runtime.getProperty(plus.runtime.appid, function(b) {
		wgtVer = b.version;
		mui.getJSON(checkUrl, {
			versionNo: wgtVer,
			type: "android"
		}, function(d) {
			if(d.status) {
				if(d.result.way == "apk") {
					var versionDes = d.result.versionDes;
					plus.nativeUI.confirm(versionDes, function(e) {
						if(0 == e.index) {
							var g = plus.downloader.createDownload(d.result.url, {}, function(j, h) {
								if(h == 200) {
									var i = j.filename;
									plus.runtime.install(j.filename, {}, function(k) {
										App.removeItem("lauchFlag");
									}, function(k) {
										App.removeItem("lauchFlag");
									})
								} else {
									alert("Download failed: " + h)
								}
							});
							g.start();
							var e = plus.nativeUI.showWaiting("   开始下载...   ");
							g.addEventListener("statechanged", function(i, h) {
								switch(i.state) {
									case 1:
										e.setTitle("   开始下载...   ");
										break;
									case 2:
										e.setTitle("   开始下载...   ");
										break;
									case 3:
										setTimeout(function() {
											var j = parseInt(i.downloadedSize / i.totalSize * 100);
											if(j <= 100) {
												e.setTitle("   已下载" + j + "%   ")
											}
										}, 100);
										break;
									case 4:
										e.close();
										break
								}
							})
						}
					}, "版本号v" + d.result.versionNo, ["马上更新", "稍后再说"])
				} else {
					mui.ajax(checkUrl, {
						data: {
							versionNo: wgtVer,
							type: "android"
						},
						dataType: "json",
						type: "get",
						success: function(e) {
							if(e.status) {
								var versionDes = e.result.versionDes;
								plus.nativeUI.confirm(versionDes, function(g) {
									if(0 == g.index) {
										downloadWgt(e.result.url)
									}
								}, "更新数据包v" + e.result.versionNo, ["马上更新", "稍后再说"])
							}
						},
						error: function(g, e, f) {
							plus.nativeUI.alert("检测更新失败！")
						}
					})
				}
			}
		})
	})
}
var wgtWaiting = null;
var wswgt = null;

function downloadWgt(c) {
	wgtWaiting = plus.nativeUI.showWaiting("   开始下载...   ");
	var d = c;
	var b = {
		filename: "_doc/update/",
		retry: 1
	};
	var a = plus.downloader.createDownload(d, b, function(f, e) {
		if(e == 200) {
			setTimeout(function() {
				wgtWaiting.setTitle("   开始安装...   ");
				installWgt(f.filename)
			}, 100)
		} else {
			mui.alert("应用升级失败！");
			wgtWaiting.close()
		}
	});
	a.start();
	a.addEventListener("statechanged", function(f, e) {
		switch(f.state) {
			case 2:
				wgtWaiting.setTitle("   开始下载...   ");
				break;
			case 3:
				setTimeout(function() {
					var g = parseInt(f.downloadedSize / f.totalSize * 100);
					if(g <= 100) {
						wgtWaiting.setTitle("   已下载" + g + "%   ")
					}
				}, 0);
				break;
			case 4:
				break
		}
	})
}

function installWgt(a) {
	plus.runtime.install(a, {}, function(b) {
		wgtWaiting.close();
		mui.alert("更新完成，须重启应用！", function() {
			App.removeItem("lauchFlag");
			plus.runtime.restart()
		})
	}, function(b) {
		wgtWaiting.close();
		mui.alert("应用更新失败！\n" + b.message)
	})
};