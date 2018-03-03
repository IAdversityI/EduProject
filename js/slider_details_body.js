mui.previewImage();
/*分享*/
function shareMessage(share, ex) {
	var msg = {
		extra: {
			scene: ex
		}
	};
	msg.href = "akang";
	msg.title = "akang";
	msg.content = "akang";
	if(~share.id.indexOf('weibo')) {
		msg.content += "akang";
	}
	msg.thumbs = ["akang"];
	share.send(msg, function() {
		console.log("分享到\"" + share.description + "\"成功！ ");
	}, function(e) {
		console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
	});
}

//分享操作
var shares = {};
mui.plusReady(function() {
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
	})
	/*点击分享按钮*/
mui('#sliderpage').on('tap', '.share-page-flag', function() {
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
mui('#sliderpage').on('tap', '.clickshare-page-flag', function() {
	mui("#middlePopover").popover("toggle");
});
mui('.mui-scroll-wrapper').scroll({
	bounce: true,
	indicators: true, //是否显示滚动条
	deceleration: 0.0003
});
mui(".mui-scroll-wrapper").scroll().refresh();
/*文本区*/
function pinglun(oField) {
	if(oField.scrollHeight > oField.clientHeight) {
		oField.style.height = oField.scrollHeight + "px";
	}
}