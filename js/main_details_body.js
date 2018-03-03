(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('#pullrefresh').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('#pullrefresh .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							pullupRefresh();
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
	});
})(mui);
var page = 1;

function pullupRefresh() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh12.html");
		plus.nativeUI.closeWaiting();
	} else {
		page++;
		var url = App.url + '/command/getCommunicationCommandList';
		var dataOptions = {
			communicationID: App.getItem("communicationIDContFlag"),
			page: page
		};
		var success = function(data) {
			if(data.status) {
				if(data.result.datas.length != 0) {
					var option = {
						list: data.result.datas,
						size: "@20p"
					};
					var templatehtml = template("detailsDataB", option);
					var pinglun = document.body.querySelector("#pinglun");
					var spanflag = App.getID("pinglun").querySelectorAll(".spanflag");
					for(var g = spanflag.length, l = g + 1; g < l; g += 1) {
						var span = document.createElement("span");
						span.className = "spanflag";
						span.innerHTML = templatehtml;
						pinglun.appendChild(span);
					}
				} else {

				}
				App.getID("totalRecord").innerText = data.result.totalRecord;
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
	}
}
mui.previewImage();
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

function paraData(result, totalRecord, tID, id) {
	var option = {
		list: result,
		size: "@20p"
	};
	if(id == "pinglun") {
		App.getID("totalRecord").innerText = totalRecord;
	}
	var templatehtml = template(tID, option);
	App.getID(id).innerHTML = templatehtml;
}
/*默认加载*/
function getDetailsData() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh12.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/communication/getCommunicationInfo';
		var dataOptions = {
			communicationID: App.getItem("communicationIDContFlag")
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh12.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				App.evalJS("../pages/main_details_header.html", "addData('" + data.result.communication.userID + "'" + "," + "'" + data.result.communication.communicationID + "')")
				paraData(data.result, "null", "detailsDataT", "topDetails");
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
	}
}

function getDetailsPingLunData() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh12.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/command/getCommunicationCommandList';
		var dataOptions = {
			communicationID: App.getItem("communicationIDContFlag"),
			page: 1
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh12.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				if(data.result.datas.length != 0) {
					/*App.getID("mainDetails").style.display="none";*/
				} else {
					/*App.getID("mainDetails").style.display="block";*/
				}
				paraData(data.result.datas, data.result.totalRecord, "detailsDataB", "pinglun");
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
	}
}
//分享操作
var shares = {};
mui.plusReady(function() {
		getDetailsData();
		getDetailsPingLunData();
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
mui('#topDetails').on('tap', '.clickshare-page-flag', function() {
	mui("#middlePopover").popover("toggle");
});
mui("#topDetails").on('tap', '.shoucang-changeflag', function() {
		var collectID = this.getAttribute("data-communicationID");
		var shoucangID = this.getAttribute("data-shoucangID");
		var shoucanglikes = this.getAttribute("data-shoucanglikes");
		shoucang(collectID, shoucangID, shoucanglikes);
	})
	/*文本区*/
function pinglun(oField) {
	if(oField.scrollHeight > oField.clientHeight) {
		oField.style.height = oField.scrollHeight + "px";
	}
}
App.getID("addBtn").addEventListener("tap", function() {
		App.getID("addBtn").style.color = "#00BBFF";
		App.getID("question").focus();
		feedback.newPlaceholder();
		App.getID("image-list").style.display = "block";
	})
	/*点击收藏*/
function shoucang(collectID, shoucangID, shoucanglikes) {
	var url = App.url + '/communication/addLikes';
	var dataOptions = {
		communicationID: collectID
	};
	var success = function(data) {
		if(data.status) {
			App.getID(shoucangID).innerText = shoucanglikes + 1;
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
var index = 1;
var size = null;
var imageIndexIdNum = 0;
var starIndex = 0;
var feedback = {
	question: App.getID('question'),
	imageList: App.getID('image-list'),
	submitBtn: App.getID('submit')
};
feedback.files = [];
feedback.uploader = null;
feedback.deviceInfo = null;
/**
 *提交成功之后，恢复表单项 
 */
feedback.clearForm = function() {
	feedback.question.value = '';
	feedback.imageList.innerHTML = '';
	feedback.newPlaceholder();
	feedback.files = [];
	index = 0;
	size = 0;
	imageIndexIdNum = 0;
	starIndex = 0;
};
feedback.getFileInputArray = function() {
	return [].slice.call(feedback.imageList.querySelectorAll('.file'));
};
feedback.addFile = function(path) {
	feedback.files.push({
		name: "image" + index,
		path: path
	});
	index++;
};
mui("#image-list").on("tap", '.image-close', function() {
	imageIndexIdNum--;
	var imgid = this.getAttribute("id");
	for(var i = 0; i < feedback.files.length; i++) {
		if(feedback.files[i] == null) {
			continue;
		}
		if(feedback.files[i]["name"] == imgid) {
			delete feedback.files[i];
			console.log(JSON.stringify(feedback.files));
			break;

		}
	}
})

function getImage(self, placeholder, up, index) {
	plus.camera.getCamera().captureImage(function(e) {
		var name = e.substr(e.lastIndexOf('/') + 1);
		plus.zip.compressImage({
			src: e,
			dst: '_doc/' + name,
			overwrite: true,
			quality: 50
		}, function(zip) {
			size += zip.size
			App.log("文件大小: " + zip.size + ",文件总大小: " + size);
			if(size > (10 * 1024 * 1024)) {
				return mui.toast('文件超大,请重新选择~');
			}
			if(!self.parentNode.classList.contains('space')) { //已有图片
				feedback.files.splice(index - 1, 1, {
					name: "image" + index,
					path: e
				});
			} else { //加号
				placeholder.classList.remove('space');
				feedback.addFile(zip.target);
				feedback.newPlaceholder();
			}
			up.classList.remove('image-up');
			placeholder.style.backgroundImage = 'url(' + zip.target + ')';
		}, function(zipe) {
			mui.toast('压缩失败！')
		});

	}, function(e) {
		mui.toast("已取消选择图片");
	}, {})

}

function galleryImg(self, placeholder, up, index) {
	plus.gallery.pick(function(e) {
		var name = e.substr(e.lastIndexOf('/') + 1);
		plus.zip.compressImage({
			src: e,
			dst: '_doc/' + name,
			overwrite: true,
			quality: 50
		}, function(zip) {
			size += zip.size
			App.log("文件大小: " + zip.size + ",文件总大小: " + size);
			if(size > (10 * 1024 * 1024)) {
				return mui.toast('文件超大,请重新选择~');
			}
			if(!self.parentNode.classList.contains('space')) { //已有图片
				feedback.files.splice(index - 1, 1, {
					name: "image" + index,
					path: e
				});
			} else { //加号
				placeholder.classList.remove('space');
				feedback.addFile(zip.target);
				feedback.newPlaceholder();
			}
			up.classList.remove('image-up');
			placeholder.style.backgroundImage = 'url(' + zip.target + ')';
		}, function(zipe) {
			mui.toast('压缩失败！')
		});

	}, function(e) {
		mui.toast("已取消选择图片");
	}, {});
}
/**
 * 初始化图片域占位
 */
feedback.newPlaceholder = function() {
	var fileInputArray = feedback.getFileInputArray();
	if(fileInputArray &&
		fileInputArray.length > 0 &&
		fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
		return;
	};
	imageIndexIdNum++;
	var placeholder = document.createElement('div');
	placeholder.setAttribute('class', 'image-item space');
	var up = document.createElement("div");
	up.setAttribute('class', 'image-up')
		//删除图片
	var closeButton = document.createElement('div');
	closeButton.setAttribute('class', 'image-close');
	closeButton.setAttribute('id', 'image' + imageIndexIdNum);
	closeButton.innerHTML = 'X';
	//小X的点击事件
	closeButton.addEventListener('tap', function(event) {
		setTimeout(function() {
			feedback.imageList.removeChild(placeholder);
		}, 0);
		return false;
	}, false);

	//

	var fileInput = document.createElement('div');
	fileInput.setAttribute('class', 'file');
	fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
	fileInput.addEventListener('tap', function(event) {
		var self = this;
		var index = (this.id).substr(-1);
		var space = this.parentNode.classList.contains('space');
		if(space) {
			if(imageIndexIdNum <= 5) {
				var options = [{
					title: "拍照"
				}, {
					title: "从手机相册选择"
				}];
				plus.nativeUI.actionSheet({
					title: "选择图片",
					cancel: "取消",
					buttons: options
				}, function(a) {
					var chooseindex = a.index;
					switch(chooseindex) {
						case 0:
							break;
						case 1:
							var checkPer = App.checkPermission("CAMERA");
							if(checkPer && mui.os.ios) {
								getImage(self, placeholder, up);
							} else {
								getImage(self, placeholder, up);
							}
							break;
						case 2:
							var checkPer = App.checkPermission("GALLERY");
							if(checkPer && mui.os.ios) {
								galleryImg(self, placeholder, up);
							} else {
								galleryImg(self, placeholder, up);
							}
							break;
					}
				})
			} else {
				mui.alert("图片不能超过5张");
			}
		}

	}, false);
	placeholder.appendChild(closeButton);
	placeholder.appendChild(up);
	placeholder.appendChild(fileInput);
	feedback.imageList.appendChild(placeholder);
};
/*获取定位*/
function getPositon() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		mui.toast('网络未连接');
	} else {
		plus.geolocation.getCurrentPosition(function(p) {
			var address = p.addresses;
			address = address.split('中国');
			address = address[1].split('市');
			address = address[0].split('省');
			App.setItem("addressShiFlag", address[1] + '市');
		}, function(e) {
			plus.nativeUI.alert("定位错误: " + e.message);
		});
	}
}
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getDetailsData();
		getDetailsPingLunData();
	}
}
var clickflag = true;
feedback.submitBtn.addEventListener('tap', function(event) {
	if(clickflag) {
		clickflag = false;
		if(!App.getItem("tokenflag")) {
			clickflag = true;
			var url = "../pages/login.html";
			var id = "../pages/login.html";
			var extras = {};
			App.openWindow(url, id, extras);
		} else {
			if(App.clearSpace(feedback.question.value) == '') {
				clickflag = true;
				return mui.toast("请输入内容", function() {});
			}
			if(App.clearSpace(feedback.question.value).length > 200) {
				clickflag = true;
				return mui.toast('内容不能超过200个字');
			}
			//判断网络连接
			if(App.noNetwork()) {
				clickflag = true;
				return mui.toast("连接网络失败");
			}
			plus.nativeUI.showWaiting("正在发送...");
			var getlength = feedback.files.length;
			App.log("<!--------[" + App.url + "/communication/addCommand" + "]---------------------------------------------------------------");
			var collegeName = null;
			var city = null;
			feedback.send(mui.extend({}, {}, {
				communicationID: App.getItem("communicationIDContFlag"),
				token: App.getItem("tokenflag"),
				content: App.clearSpace(feedback.question.value),
				index: "" + getlength,
				images: feedback.files
			}))
			App.log("----------[" + App.url + "/communication/addCommand" + "]--------------------------------------------------------------->");
		}
	}

}, false);
feedback.send = function(content) {
	feedback.uploader = plus.uploader.createUpload(App.url + "/command/addCommand", {
		method: 'POST',
		priority: 100
	}, function(upload, status) {
		var rsult = JSON.parse(feedback.uploader.responseText);
		if(status == 200) {
			plus.nativeUI.closeWaiting();
			clickflag = true;
			mui.toast(rsult.result);
			App.getID("addBtn").style.color = "#ccc";
			App.getID("image-list").style.display = "none";
			plus.webview.currentWebview().reload(true);
			feedback.question.style.height = "45px";
			feedback.clearForm();

		} else {
			plus.nativeUI.closeWaiting();
			mui.alert(rsult.result, "确定", function() {
				clickflag = true;
			});

		}

	});
	//添加上传数据
	mui.each(content, function(index, element) {
		if(index !== 'images') {
			App.log("添加数据: " + index + "," + element);
			feedback.uploader.addData(index, element)
		}
	});
	//添加上传文件
	mui.each(feedback.files, function(index, element) {
		var f = feedback.files[index];
		App.log("添加文件: " + JSON.stringify(f));
		feedback.uploader.addFile(f.path, {
			key: f.name
		});
	});
	//开始上传任务
	feedback.uploader.start();
};