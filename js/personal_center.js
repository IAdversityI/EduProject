/*默认加载*/
mui.plusReady(function() {
	var url = App.url + '/user/userInfo';
	var dataOptions = {
		token: App.getItem("tokenflag")
	};
	var success = function(data) {
		if(data.status) {
			var sex = null;
			if(data.result.sex == 0) {
				sex = "男";
			} else if(data.result.sex == 1) {
				sex = "女";
			} else {
				sex = null;
			}
			if(data.result.birthday) {
				App.getID("date").value = changeDate(data.result.birthday, "yyyy-MM-dd");
			} else {
				App.getID("date").value = null;
			}
			App.getID("nicheng").value = data.result.nickName;
			App.getID("phone").value = data.result.phone;
			App.getID("sex").value = sex;
			App.getID("school").value = data.result.schoolName;
			App.getID("address").value = data.result.address;
			App.getID("qq").value = data.result.qq;
			App.getID("email").value = data.result.email;
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
});

/*转换成日期*/
function changeDate(a, c) {
	a = new Date(a);
	var b = {
		M: a.getMonth() + 1,
		d: a.getDate(),
		h: a.getHours(),
		m: a.getMinutes(),
		s: a.getSeconds(),
		q: Math.floor((a.getMonth() + 3) / 3),
		S: a.getMilliseconds()
	};
	c = c.replace(/([yMdhmsqS])+/g, function(f, e) {
		var d = b[e];
		if(d !== undefined) {
			if(f.length > 1) {
				d = "0" + d;
				d = d.substr(d.length - 2)
			}
			return d
		} else {
			if(e === "y") {
				return(a.getFullYear() + "").substr(4 - f.length)
			}
		}
		return f
	});
	return c
}
/*失去焦点*/
function losefocus() {
	App.getID("nicheng").blur();
	App.getID("phone").blur();
	App.getID("email").blur();
}
var userPicker = new mui.PopPicker();
userPicker.setData([{
	value: 'man',
	text: '男'
}, {
	value: 'woman',
	text: '女'
}]);
var sexButton = App.getID("sex");
sexButton.addEventListener('tap', function(event) {
	losefocus();
	userPicker.show(function(items) {
		sexButton.value = items[0].text;
	});
}, false);

var schoolButton = App.getID("school");
schoolButton.addEventListener('tap', function(event) {
	var url = "./getaddress_header.html";
	var id = "./getaddress_header.html";
	var extras = {};
	App.openWindow(url, id, extras);
}, false);
var cityPicker3 = new mui.PopPicker({
	layer: 3
});
cityPicker3.setData(cityData3);
var addressButton = App.getID("address");
addressButton.addEventListener('tap', function(event) {
	losefocus();
	cityPicker3.show(function(items) {
		addressButton.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
		//cityResult3.innerText = "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
		//返回 false 可以阻止选择框的关闭
		//return false;
	});
}, false);

App.getID('date').addEventListener('tap', function() {
		losefocus();
		var optionsJson = App.getID('date').getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		var picker = new mui.DtPicker(options);
		picker.show(function(rs) {
			App.getID('date').value = rs.text;
			//result.innerText = '选择结果: ' + rs.text
			picker.dispose();
		});
	})
	/*验证输入框是否为空*/
App.getID('save').addEventListener('tap', function() {
	var check = true;
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
		if(/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]{0,9}$/.test(App.clearSpace(App.getID("nicheng").value))) {
			if(/^\d{5,10}$/.test(App.clearSpace(App.getID("qq").value))) {
				if(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(App.clearSpace(App.getID("email").value))) {
					var sex = null;
					if(App.clearSpace(App.getID("sex").value) == "男") {
						sex = 0;
					} else {
						sex = 1;
					}
					var url = App.url + '/user/updateUserInfo';
					var dataOptions = {
						token: App.getItem("tokenflag"),
						nickName: App.clearSpace(App.getID("nicheng").value),
						sex: sex,
						qq: App.clearSpace(App.getID("qq").value),
						time: App.clearSpace(App.getID("date").value),
						email: App.clearSpace(App.getID("email").value),
						schoolName: App.clearSpace(App.getID("school").value),
						address: App.getID("address").value
					};
					var success = function(data) {
						if(data.status) {
							App.setItem("nickNameflag", App.clearSpace(App.getID("nicheng").value));
							App.evalJS("./pages/main_mine.html", "refreshNickName()");
							mui.toast(data.result);
							mui.back();
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
				} else {
					mui.alert("请输入正确的邮箱", function() {
						App.getID(id).focus();
						App.getID(id).value = "";
					});
				}
			} else {
				mui.alert("qq号在5~10位之间", function() {
					App.getID(id).focus();
					App.getID(id).value = "";
				});
			}
		} else {
			mui.alert("昵称由汉子、字母、数字组成，并且为1~10位不为数字开头", function() {
				App.getID(id).focus();
				App.getID(id).value = "";
			});
		}

	}
})

function getAddress(address) {
	App.getID("school").value = address;
}