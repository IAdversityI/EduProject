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

function like() {
	var like =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>语文</label><input id="kemu1" type="tel" class="mui-input-clear mui-input" placeholder="请输入语文成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>数学</label><input id="kemu2" type="tel" class="mui-input-clear mui-input" placeholder="请输入数学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>英语</label><input id="kemu3" type="tel" class="mui-input-clear mui-input" placeholder="请输入英语成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>物理</label><input id="kemu4" type="tel" class="mui-input-clear mui-input" placeholder="请输入物理成绩 " oninput="checkNumber(this.value, this.id)"></div>' +
		'<div class="mui-input-row"><label>化学</label><input id="kemu5" type="tel" class="mui-input-clear mui-input" placeholder="请输入化学成绩" oninput="checkNumber(this.value,this.id)"></div>' +
		'<div class="mui-input-row"><label>生物</label><input id="kemu6" type="tel" class="mui-input-clear mui-input" placeholder="请输入生物成绩" oninput="checkNumber(this.value,this.id)"></div>'
	return like;
}

function wenke() {
	var wenke =
		'<div class="mui-input-row"><label>备注</label><input id="kemu10" type="text" class="mui-input-clear mui-input" placeholder="第几次月考成绩" oninput="checkNumber(this.value,this.id)"></div>' +
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
var userPicker = new mui.PopPicker();
userPicker.setData([{
	value: 'like',
	text: '理科'
}, {
	value: 'wenke',
	text: '文科'
}]);
var showUserPickerButton = App.getID('showUserPicker');
showUserPickerButton.addEventListener('tap', function(event) {
	document.activeElement.blur();
	var kemu = App.getID("typeOf");
	userPicker.show(function(items) {
		kemu.innerHTML = "";
		if(items[0].text == "理科") {
			App.getID("choosekemu").value = "理科";
			kemu.innerHTML = like();
		} else if(items[0].text == "文科") {
			App.getID("choosekemu").value = "文科";
			kemu.innerHTML = wenke();
		}
	});
}, false);

/*默认加载*/
mui.plusReady(function() {
	if(App.noNetwork()) {
		mui.toast("网络未成功连接");
		plus.nativeUI.closeWaiting();
	} else {
		App.getID("typeOf").innerHTML = like();
	}
})

/*提交成绩成功清空输入框内容和失去焦点*/
function clearFocusContent() {
	variable();
	if(App.getID("choosekemu").value == "理科") {
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
	} else if(App.getID("choosekemu").value == "文科") {
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
	} else if(App.getID("choosekemu").value == "综合") {
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
	} else if(App.getID("choosekemu").value == "初中") {
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
/*录入成绩*/
function addAchievement(dataOptions, dataUrl, type) {
	var url = App.url + dataUrl;
	var dataOptions = dataOptions;
	var success = function(data) {
		if(data.status) {
			mui.toast(data.result);
			clearFocusContent();
			App.evalJS('results_analysis_body.html', "getDownData()");
			mui.back();
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

/*验证输入框是否为空*/
var token = null;
var dataOptions = null;
var dataUrl = null;
var type = null;
App.getID('submit').addEventListener('tap', function() {
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
			document.activeElement.blur();
			if(App.getID("choosekemu").value == "理科") {
				dataOptions = {
					token: token,
					studentType: "like",
					chinese: kemu1.value.trim(),
					math: kemu2.value.trim(),
					english: kemu3.value.trim(),
					physics: kemu4.value.trim(),
					chemistry: kemu5.value.trim(),
					biology: kemu6.value.trim(),
					remark: kemu10.value.trim()
				}
				dataUrl = "/achievement/addAchievement/like";
				type = "like";
			} else if(App.getID("choosekemu").value == "文科") {
				dataOptions = {
					token: token,
					studentType: "wenke",
					chinese: kemu1.value.trim(),
					math: kemu2.value.trim(),
					english: kemu3.value.trim(),
					politics: kemu7.value.trim(),
					history: kemu8.value.trim(),
					geography: kemu9.value.trim(),
					remark: kemu10.value.trim()
				}
				dataUrl = "/achievement/addAchievement/wenke";
				type = "wenke";
			} else if(App.getID("choosekemu").value == "综合") {
				dataOptions = {
					token: token,
					studentType: "zonghe",
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
				dataUrl = "/achievement/addAchievement/zonghe";
				type = "zonghe";
			} else if(App.getID("choosekemu").value == "初中") {
				dataOptions = {
					token: token,
					studentType: "chuzhong",
					chinese: kemu1.value.trim(),
					math: kemu2.value.trim(),
					english: kemu3.value.trim(),
					physics: kemu4.value.trim(),
					chemistry: kemu5.value.trim(),
					politics: kemu6.value.trim(),
					history: kemu7.value.trim(),
					remark: kemu10.value.trim()
				}
				dataUrl = "/achievement/addAchievement/chuzhong";
				type = "chuzhong";
			}
			addAchievement(dataOptions, dataUrl, type);
		}
	}
})

/*理科判断分数*/
var choosekemu = App.getID("choosekemu").value;

function checklike(v, id) {
	if(choosekemu != "初中") {
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
/*判断数组元素不能重复*/
function contains(array, obj) {
	var i = array.length;
	while(i--) {
		if(array[i] === obj && array[i] === "null") {
			return true;
		}
	}
	return false;
}