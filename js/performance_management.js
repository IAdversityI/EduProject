mui.plusReady(function() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh6.html");
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/user/manageAchievement';
		var dataOptions = {
			token: App.getItem("tokenflag")
		};
		var success = function(data) {
			if(data.status) {
				if(data.result) {
					App.getID("performanceMan").style.display="none";
					paraData(data.result);
					App.setItem("studentTypeFlag", data.result[0].value.studentType);
				} else {
					App.getID("performanceMan").style.display="block";
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
		App.ajax(url, dataOptions, success, dataType);
	}
})

function paraData(result) {
	var option = {
		list: result,
		name: result[0].value.studentType
	};
	var templatehtml = template("performanceM", option);
	App.getID("performance").innerHTML = templatehtml;
}
/*点击编辑按钮*/
mui("#performance").on("tap", ".bianjiFlag", function() {
	var name = this.getAttribute("data-name");
	if(name == "wenke") {
		var remark = this.getAttribute("data-remark");
		var chinese = this.getAttribute("data-chinese");
		var math = this.getAttribute("data-math");
		var english = this.getAttribute("data-english");
		var politics = this.getAttribute("data-politics");
		var history = this.getAttribute("data-history");
		var geography = this.getAttribute("data-geography");
		var nameID = this.getAttribute("data-nameID");
		App.setItem("achievementIDFlag", nameID);
		App.getID("kemu").innerHTML = wenke();
		App.getID("kemu1").value = chinese;
		App.getID("kemu2").value = math;
		App.getID("kemu3").value = english;
		App.getID("kemu7").value = politics;
		App.getID("kemu8").value = history;
		App.getID("kemu9").value = geography;
		App.getID("kemu10").value = remark;
		mui("#middlePopover").popover("toggle");
	} else if(name == "like") {
		var remark = this.getAttribute("data-remark");
		var chinese = this.getAttribute("data-chinese");
		var math = this.getAttribute("data-math");
		var english = this.getAttribute("data-english");
		var physics = this.getAttribute("data-physics");
		var chemistry = this.getAttribute("data-chemistry");
		var biology = this.getAttribute("data-biology");
		var nameID = this.getAttribute("data-nameID");
		App.setItem("achievementIDFlag", nameID);
		App.getID("kemu").innerHTML = like();
		App.getID("kemu1").value = chinese;
		App.getID("kemu2").value = math;
		App.getID("kemu3").value = english;
		App.getID("kemu4").value = physics;
		App.getID("kemu5").value = chemistry;
		App.getID("kemu6").value = biology;
		App.getID("kemu10").value = remark;
		mui("#middlePopover").popover("toggle");
	}

})

function like() {
	var like =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>语文</label><input id="kemu1" type="tel" class="mui-input-clear mui-input" placeholder="请输入语文成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>数学</label><input id="kemu2" type="tel" class="mui-input-clear mui-input" placeholder="请输入数学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>英语</label><input id="kemu3" type="tel" class="mui-input-clear mui-input" placeholder="请输入英语成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>物理</label><input id="kemu4" type="tel" class="mui-input-clear mui-input" placeholder="请输入物理成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>化学</label><input id="kemu5" type="tel" class="mui-input-clear mui-input" placeholder="请输入化学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>生物</label><input id="kemu6" type="tel" class="mui-input-clear mui-input" placeholder="请输入生物成绩" oninput="checkNumber(this.value,this.id)"></div>'
	return like;
}

function wenke() {
	var wenke =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)" ></div>' +
		'<div class="mui-input-row"><label>语文</label><input id="kemu1" type="tel" class="mui-input-clear mui-input" placeholder="请输入语文成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>数学</label><input id="kemu2" type="tel" class="mui-input-clear mui-input" placeholder="请输入数学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>英语</label><input id="kemu3" type="tel" class="mui-input-clear mui-input" placeholder="请输入英语成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>政治</label><input id="kemu7" type="tel" class="mui-input-clear mui-input" placeholder="请输入政治成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>历史</label><input id="kemu8" type="tel" class="mui-input-clear mui-input" placeholder="请输入历史成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>地理</label><input id="kemu9" type="tel" class="mui-input-clear mui-input" placeholder="请输入地理成绩" oninput="checkNumber(this.value,this.id)"></div>'
	return wenke;
}

function zonghe() {
	var zonghe =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>语文</label><input id="kemu1" type="tel" class="mui-input-clear mui-input" placeholder="请输入语文成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>数学</label><input id="kemu2" type="tel" class="mui-input-clear mui-input" placeholder="请输入数学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>英语</label><input id="kemu3" type="tel" class="mui-input-clear mui-input" placeholder="请输入英语成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>物理</label><input id="kemu4" type="tel" class="mui-input-clear mui-input" placeholder="请输入物理成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>化学</label><input id="kemu5" type="tel" class="mui-input-clear mui-input" placeholder="请输入化学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>生物</label><input id="kemu6" type="tel" class="mui-input-clear mui-input" placeholder="请输入生物成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>政治</label><input id="kemu7" type="tel" class="mui-input-clear mui-input" placeholder="请输入政治成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>历史</label><input id="kemu8" type="tel" class="mui-input-clear mui-input" placeholder="请输入历史成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>地理</label><input id="kemu9" type="tel" class="mui-input-clear mui-input" placeholder="请输入地理成绩" oninput="checkNumber(this.value,this.id)"></div>'
	return zonghe;
}

function chuzhong() {
	var chuzhong =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>语文</label><input id="kemu1" type="tel" class="mui-input-clear mui-input" placeholder="请输入语文成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>数学</label><input id="kemu2" type="tel" class="mui-input-clear mui-input" placeholder="请输入数学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>英语</label><input id="kemu3" type="tel" class="mui-input-clear mui-input" placeholder="请输入英语成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>物理</label><input id="kemu4" type="tel" class="mui-input-clear mui-input" placeholder="请输入物理成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>化学</label><input id="kemu5" type="tel" class="mui-input-clear mui-input" placeholder="请输入化学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>政治</label><input id="kemu6" type="tel" class="mui-input-clear mui-input" placeholder="请输入政治成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>历史</label><input id="kemu7" type="tel" class="mui-input-clear mui-input" placeholder="请输入历史成绩" oninput="checkNumber(this.value,this.id)"></div>'
	return chuzhong;
}
/*点击删除按钮*/
mui("#performance").on("tap", ".deleteFlag", function() {
	var remark = this.getAttribute("data-remark");
	var name = this.getAttribute("data-name");
	plus.nativeUI.confirm("你确定删除" + remark + "成绩吗?", function(event) {
		if(0 == event.index) {
			var url = App.url + '/achievement/deleteAchievementOne';
			var dataOptions = {
				token: App.getItem("tokenflag"),
				achievementID: name
			};
			var success = function(data) {
				if(data.status) {
					mui.toast(data.result);
					plus.webview.currentWebview().reload(true);
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
	}, "", ["确定", "取消"])
});
/*点击删除全部按钮*/
mui("#performance").on("tap", ".deleteAllFlag", function() {
	plus.nativeUI.confirm("你确定删除全部成绩吗?", function(event) {
		if(0 == event.index) {
			var url = App.url + '/achievement/deleteAchievementAll';
			var dataOptions = {
				token: App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					mui.toast(data.result);
					plus.webview.currentWebview().reload(true);
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
	}, "", ["确定", "取消"])
})

function variable() {
	/*获取标签id*/
	var kemu1 = App.getID("kemu1");
	var kemu2 = App.getID("kemu2");
	var kemu3 = App.getID("kemu3");
	var kemu4 = App.getID("kemu4");
	var kemu5 = App.getID("kemu5");
	var kemu6 = App.getID("kemu6");
	var kemu7 = App.getID("kemu7");
	var kemu8 = App.getID("kemu8");
	var kemu9 = App.getID("kemu9");
	var kemu10 = App.getID("kemu10");
}

var token = null;
var dataOptions = null;
var dataUrl = null;
var type = null;
App.getID('submit').addEventListener('tap', function() {
		var name = this.getAttribute("data-name");
		variable();
		if(App.noNetwork()) {
			mui.toast("网络未成功连接");
		} else {
			var check = true;
			token = App.getItem("tokenflag");
			mui(".mui-input-group input").each(function() {
				//若当前input为空，则alert提醒
				if(!this.value) {
					var label = this.previousElementSibling;
					mui.alert(label.innerText + "不允许为空");
					check = false;
					return false;
				}
			});
			if(check && token) {
				if(App.getItem("studentTypeFlag") == "like") {
					dataOptions = {
						token: token,
						achievementID: App.getItem("achievementIDFlag"),
						type: App.getItem("studentTypeFlag"),
						chinese: kemu1.value.trim(),
						math: kemu2.value.trim(),
						english: kemu3.value.trim(),
						physics: kemu4.value.trim(),
						chemistry: kemu5.value.trim(),
						biology: kemu6.value.trim(),
						remark: kemu10.value.trim()
					}
					dataUrl = "/achievement/changeAchievement";
				} else if(App.getItem("studentTypeFlag") == "wenke") {
					dataOptions = {
						token: token,
						achievementID: App.getItem("achievementIDFlag"),
						type: App.getItem("studentTypeFlag"),
						chinese: kemu1.value.trim(),
						math: kemu2.value.trim(),
						english: kemu3.value.trim(),
						politics: kemu7.value.trim(),
						history: kemu8.value.trim(),
						geography: kemu9.value.trim(),
						remark: kemu10.value.trim()
					}
					dataUrl = "/achievement/changeAchievement";
				} else if(App.getItem("studentTypeFlag") == "zonghe") {
					dataOptions = {
						token: token,
						achievementID: App.getItem("achievementIDFlag"),
						type: App.getItem("studentTypeFlag"),
						chinese: kemu1.value.trim(),
						math: kemu2.value.trim(),
						english: kemu3.value.trim(),
						physics: kemu4.value.trim(),
						chemistry: kemu5.value.trim(),
						biology: kemu6.value.trim(),
						politics: kemu7.value.trim(),
						history: kemu8.value.trim(),
						geography: kemu9.value.trim(),
						remark: kemu10.value.trim()
					}
					dataUrl = "/achievement/changeAchievement";
				} else if(App.getItem("studentTypeFlag") == "chuzhong") {
					dataOptions = {
						token: token,
						achievementID: App.getItem("achievementIDFlag"),
						type: App.getItem("studentTypeFlag"),
						chinese: kemu1.value.trim(),
						math: kemu2.value.trim(),
						english: kemu3.value.trim(),
						physics: kemu4.value.trim(),
						chemistry: kemu5.value.trim(),
						politics: kemu6.value.trim(),
						history: kemu7.value.trim(),
						remark: kemu10.value.trim()
					}
					dataUrl = "/achievement/changeAchievement";
				}
				addAchievement(dataOptions, dataUrl);
			}
		}
	})
	/*录入成绩*/
function addAchievement(dataOptions, dataUrl) {
	var url = App.url + dataUrl;
	var dataOptions = dataOptions;
	var success = function(data) {
		if(data.status) {
			mui.toast(data.result);
			plus.webview.currentWebview().reload(true);
			clearFocusContent();
			mui("#middlePopover").popover("toggle");
		} else {
			mui.alert(data.result, "温馨提示", "好", function() {
				clearFocusContent();
			});
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
/*录入成绩按钮*/
function checklike(v, id) {
	if(App.getItem("studentTypeFlag") != "chuzhong") {
		if(id == "kemu1" || id == "kemu2" || id == "kemu3") {
			if(v >= 1 && v <= 150) {

			} else {
				mui.alert("分数范围在1~150之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu4") {
			if(v >= 1 && v <= 120) {

			} else {
				mui.alert("分数范围在1~120之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu5") {
			if(v >= 1 && v <= 108) {

			} else {
				mui.alert("分数范围在1~108之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu6") {
			if(v >= 1 && v <= 72) {

			} else {
				mui.alert("分数范围在1~72之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu7" || id == "kemu8" || id == "kemu9") {
			if(v >= 1 && v <= 100) {

			} else {
				mui.alert("分数范围在1~100之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu10") {
			if(v.length < 11) {

			} else {
				mui.alert("备注不能超过10个字符", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		}
	} else {
		if(id == "kemu1" || id == "kemu2" || id == "kemu3" || id == "kemu4" || id == "kemu5" || id == "kemu6" || id == "kemu7") {
			if(v >= 1 && v <= 150) {

			} else {
				mui.alert("分数范围在1~150之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else if(id == "kemu10") {
			if(v.length < 11) {

			} else {
				mui.alert("备注不能超过10个字符", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		}
	}
}
/*检验分数范围*/
function checkNumber(v, id) {
	checklike(v, id);
}
/*提交成绩成功清空输入框内容和失去焦点*/
function clearFocusContent() {
	variable();
	if(App.getItem("studentTypeFlag") == "like") {
		kemu1.blur();
		kemu1.value = "";
		kemu2.blur();
		kemu2.value = "";
		kemu3.blur();
		kemu3.value = "";
		kemu4.blur();
		kemu4.value = "";
		kemu5.blur();
		kemu5.value = "";
		kemu6.blur();
		kemu6.value = "";
		kemu10.blur();
		kemu10.value = "";
	} else if(App.getItem("studentTypeFlag") == "wenke") {
		kemu1.blur();
		kemu1.value = "";
		kemu2.blur();
		kemu2.value = "";
		kemu3.blur();
		kemu3.value = "";
		kemu7.blur();
		kemu7.value = "";
		kemu8.blur();
		kemu8.value = "";
		kemu9.blur();
		kemu9.value = "";
		kemu10.blur();
		kemu10.value = "";
	} else if(App.getItem("studentTypeFlag") == "zonghe") {
		kemu1.blur();
		kemu1.value = "";
		kemu2.blur();
		kemu2.value = "";
		kemu3.blur();
		kemu3.value = "";
		kemu4.blur();
		kemu4.value = "";
		kemu5.blur();
		kemu5.value = "";
		kemu6.blur();
		kemu6.value = "";
		kemu7.blur();
		kemu7.value = "";
		kemu8.blur();
		kemu8.value = "";
		kemu9.blur();
		kemu9.value = "";
		kemu10.blur();
		kemu10.value = "";
	} else if(App.getItem("studentTypeFlag") == "chuzhong") {
		kemu1.blur();
		kemu1.value = "";
		kemu2.blur();
		kemu2.value = "";
		kemu3.blur();
		kemu3.value = "";
		kemu4.blur();
		kemu4.value = "";
		kemu5.blur();
		kemu5.value = "";
		kemu6.blur();
		kemu6.value = "";
		kemu7.blur();
		kemu7.value = "";
		kemu10.blur();
		kemu10.value = "";
	}
}
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/user/manageAchievement';
		var dataOptions = {
			token: App.getItem("tokenflag")
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh6.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				if(data.result) {
					paraData(data.result);
					App.setItem("studentTypeFlag", data.result[0].value.studentType);
				} else {
					/*App.getID("performance").innerText = "暂无数据";*/
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
		App.ajax(url, dataOptions, success, dataType);
	}
}