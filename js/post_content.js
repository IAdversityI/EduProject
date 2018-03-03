/*!
 * ======================================================
 * FeedBack Template For MUI (http://dev.dcloud.net.cn/mui)
 * =======================================================
 * @version:1.0.0
 * @author:cuihongbao@dcloud.io
 */
(function() {
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var feedback = {
		question: App.getID('question'),
		imageList: App.getID('image-list'),
		submitBtn: App.getID('submit'),
		clearContentBtn: App.getID('clearContent')
	};
	feedback.files = [];
	feedback.uploader = null;
	feedback.deviceInfo = null;
	mui.plusReady(function() {
		if(App.getItem("dataquestiontalk") == "question") {
			App.getID("schoolItem").style.display = "none";
		} else {
			App.getID("schoolItem").style.display = "block";
		}
		getPositon();
		getSchoolName();
		feedback.newPlaceholder();
		var cityPicker = new mui.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		var schoolButton = App.getID('school');
		schoolButton.addEventListener('tap', function(event) {
			var url = "./getaddress_header.html";
			var id = "./getaddress_header.html";
			var extras = {};
			App.openWindow(url, id, extras);
		}, false);
		//设备信息，无需修改
	});
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
	var zishu = 200;
	feedback.question.addEventListener("input", function() {
		var sizishu = 200 - feedback.question.value.trim().length;
		if(sizishu.toFixed(0) >= 0) {
			App.getID("contentnumber").innerText = sizishu.toFixed(0);
		} else {
			App.getID("contentnumber").innerHTML = "<span style='font-size:10px;color:red;position:absolute;left:-10px;top:3px'>已超出" + Math.abs(sizishu.toFixed(0)) + "</span>";
		}
	})
	feedback.clearContentBtn.addEventListener('tap', function() {
		if(App.clearSpace(feedback.question.value) != "") {
			plus.nativeUI.confirm('是否清除内容?', function(event) {
				if(1 == event.index) {
					feedback.question.value = "";
				}
			}, '', ["否", "是"]);
		}
	})
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

	function getSchoolName() {
		var url = App.url + '/user/getUserSchool';
		var dataOptions = {
			token: App.getItem("tokenflag")
		};
		var success = function(data) {
			if(data.status) {
				App.getID("school").value = data.result;
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
				if(imageIndexIdNum <= 9) {
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
					mui.alert("图片不能超过9张");
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
				var address = p.address.province;
				address = address.split('省');
				App.setItem("addressShiFlag", address[0]);
			}, function(e) {
				/*plus.nativeUI.alert("定位错误: " + e.message);*/
			});
		}
	}
	var clickflag = true;
	feedback.submitBtn.addEventListener('tap', function(event) {
		if(clickflag) {
			clickflag = false;
			if(App.clearSpace(feedback.question.value) == '') {
				clickflag = true;
				return mui.alert("请输入内容", function() {});
			}
			if(App.clearSpace(feedback.question.value).length > 200) {
				clickflag = true;
				return mui.toast('内容不能超过200个字');
			}
			if(App.getItem("dataquestiontalk") == "talk") {
				if(App.getID("school").value == "") {
					clickflag = true;
					return mui.toast('请选择学校');
				}
			}
			//判断网络连接
			if(App.noNetwork()) {
				clickflag = true;
				return mui.toast("连接网络失败");
			}
			plus.nativeUI.showWaiting("正在上传...");
			/*var isSee = App.getID("isniming").checked ? 1 : 0;*/
			var getlength = feedback.files.length;
			App.log("<!--------[" + App.url + "/communication/addCommunication" + "]---------------------------------------------------------------");
			var collegeName = null;
			var city = null;
			if(App.getItem("dataquestiontalk") == "talk") {
				collegeName = App.getID("school").value;
				city = App.getID("school").dataCity;
			} else {
				collegeName = "null";
				city = App.getItem("addressShiFlag");
			}
			feedback.send(mui.extend({}, {}, {
				type: App.getItem("dataquestiontalk"),
				isSee: "" + 0,
				content: App.clearSpace(feedback.question.value),
				index: "" + getlength,
				token: App.getItem("tokenflag"),
				images: feedback.files,
				collegeName: collegeName,
				city: city
			}))
			App.log("----------[" + App.url + "/communication/addCommunication" + "]--------------------------------------------------------------->");
		}

	}, false);
	feedback.send = function(content) {
		feedback.uploader = plus.uploader.createUpload(App.url + "/communication/addCommunication", {
			method: 'POST',
			priority: 100
		}, function(upload, status) {
			console.log("kk" + feedback.uploader.responseText);
			var rsult = JSON.parse(feedback.uploader.responseText);
			if(status == 200) {
				plus.nativeUI.closeWaiting();
				clickflag = true;
				mui.alert(rsult.result, "确定", function() {
					feedback.clearForm();
					if(App.getItem("dataquestiontalk") == "talk") {
						App.evalJS("../pages/main_interactive_talk.html", "distribuRefresh()");
					} else {
						App.evalJS("../pages/main_interactive_question.html", "distribuRefresh()");
					}
					mui.back();
				});
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
	mui.back = function() {
		if(imageIndexIdNum > 1) {
			plus.nativeUI.confirm('放弃这条内容?', function(event) {
				if(0 == event.index) {
					plus.webview.currentWebview().close();
				}
			}, '温馨提示', ["放弃", "继续编辑"]);
		} else {
			plus.webview.currentWebview().close();
		}
	}
})();

function getAddress(address, city) {
	App.getID("school").value = address;
	App.getID("school").dataCity = city;
}