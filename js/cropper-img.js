$(function() {
	! function() {
		var b = {
			aspectRatio: 1 / 1
		}
	}()
});
(function(c) {
	var d = function() {};
	c.extend(d.prototype, {
		orientation: null,
		simg: null,
		simg2: null,
		urldata: null,
		view: null,
		num: 0,
		sbx: null,
		sby: null,
		n: 0,
		onReady: function() {
			var a = this;
			mui.init();
			a.bindEvent();
			a.view = plus.webview.currentWebview();
			a.simg = document.createElement("img");
			a.simg.setAttribute("id", "simg");
			document.body.appendChild(a.simg);
			var b = a.view.path;
			var f = document.createElement("img");
			f.setAttribute("src", b);
			f.addEventListener("load", function() {
				EXIF.getData(f, function() {
					var e = EXIF.getAllTags(this).Orientation;
					$("#im").attr("src", a.loadcopyImg(f, e));
					a.cropperImg()
				})
			})
		},
		cropperImg: function() {
			var a = this;
			$("#cropper-example-1 > img").cropper({
				aspectRatio: 1,
				autoCropArea: 0.5,
				strict: true,
				background: false,
				guides: false,
				highlight: false,
				dragCrop: false,
				movable: false,
				resizable: false,
				crop: function(b) {
					a.urldata = a.base64(b)
				}
			});
			plus.nativeUI.closeWaiting()
		},
		loadcopyImg: function(o, r) {
			var m = this;
			var q = document.createElement("canvas");
			var b = 500;
			var l, n;
			if(o.width > o.height) {
				n = b;
				l = Math.round(b * o.width / o.height)
			} else {
				n = b;
				l = Math.round(b * o.width / o.height)
			}
			q.height = n;
			q.width = l;
			if(r == 6) {
				m.num = 90
			} else {
				if(r == 3) {
					m.num = 180
				} else {
					if(r == 8) {
						m.num = 270
					}
				}
			}
			if(m.num == 360) {
				m.num = 0
			}
			var a = q.getContext("2d");
			a.translate(l / 2, n / 2);
			a.rotate(m.num * Math.PI / 180);
			a.translate(-l / 2, -n / 2);
			a.drawImage(o, 0, 0, l, n);
			var p = q.toDataURL("image/png", 1);
			return p
		},
		bindEvent: function() {
			document.getElementById("quxiao").addEventListener("tap", function() {
				window.cro.view.close()
			});
			document.getElementById("xuanqu").addEventListener("tap", function() {
				window.cro.showFace(window.cro.urldata);
				setTimeout(function() {
					window.cro.view.close()
				}, 1000)
			})
		},
		base64: function(l) {
			var m = this;
			var o = document.getElementById("im");
			var n = document.createElement("canvas");
			n.height = 200;
			n.width = 200;
			var a = l.x;
			var k = l.y;
			var p = n.getContext("2d");
			p.drawImage(o, a, k, l.width, l.height, 0, 0, 200, 200);
			var b = n.toDataURL("image/png", 0.5);
			return b
		},
		getdata: function() {
			window.cro.view.close()
		},
		showFace: function(a) {
			var b = new Image();
			b.src = a;
			App.setItem("cache_1", b.src);
			App.evalJS("./pages/main_mine.html", "refreshImage()");
			var url = App.url + '/user/userPhoto';
			var dataOptions = {
				photo: b.src,
				token:App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					mui.toast(data.result);
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
			App.getWebviewID("photo.html").close();

		}
	});
	window.cro = new d();
	c.plusReady(function() {
		window.cro.onReady()
	})
})(mui);