/*默认加载*/
mui.plusReady(function() {
	/*滚动*/
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh9.html");
		plus.nativeUI.closeWaiting();
	} else {
		getEchartsData(checkAddress());
		App.getID("getAddress").innerText = App.getItem("addressFlag");
	}
})

function getEchartsData(provinceNo) {
	if(plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {} else {
		var url = App.url + '/province/controllerScore';
		var dataOptions = {
			provinceNo: provinceNo
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh9.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				if(data.result[0].name == "like") {
					echarts.init(App.getID('line1')).setOption(getOption("line1", data.result[0].value));
				}
				if(data.result[1].name == "wenke") {
					echarts.init(App.getID('line2')).setOption(getOption("line2", data.result[1].value));
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
/*查找地址*/
function checkAddress() {
	var provinceNumber = null;
	for(var i = 0; i < optionAddress.length; i++) {
		if(optionAddress[i].text == App.getItem("addressFlag")) {
			provinceNumber = parseInt(optionAddress[i].value);
		}
	}
	return provinceNumber;
}

function getOption(type, result) {
	var option = null;
	if(type == "line1") {
		option = {
			title: {
				text: '',
				subtext: ''
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: []
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: []
			}],
			yAxis: [{
				type: 'value',
				max:750
			}],
			series: []
		};
		var mySeries = null;
		for(var i = 0; i < result.length; i++) {
			option.legend.data.push(result[i].name);
			mySeries = {
				name: '',
				type: 'line',
				data: [],
				markLine: {
					data: [{
						type: 'average',
						name: '平均值'
					}]
				}
			}
			for(var k = 0; k < result[i].value.length; k++) {
				if(!contains(option.xAxis[0].data, result[i].value[k].year)) {
					option.xAxis[0].data.push(result[i].value[k].year);
				}
				mySeries.data.push(result[i].value[k].score);
			}
			mySeries.name = result[i].name;
			option.series.push(mySeries);
		}
	} else if(type == "line2") {
		option = {
			title: {
				text: '',
				subtext: ''
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: []
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: [],

			}],
			yAxis: [{
				type: 'value',
				max:750
			}],
			series: []
		};
		var mySeries = null;
		for(var i = 0; i < result.length; i++) {
			option.legend.data.push(result[i].name);
			mySeries = {
				name: '',
				type: 'line',
				data: [],
				markLine: {
					data: [{
						type: 'average',
						name: '平均值'
					}]
				}
			}
			for(var k = 0; k < result[i].value.length; k++) {
				if(!contains(option.xAxis[0].data, result[i].value[k].year)) {
					option.xAxis[0].data.push(result[i].value[k].year);
				}
				mySeries.data.push(result[i].value[k].score);
			}
			mySeries.name = result[i].name;
			option.series.push(mySeries);
		}
	}
	return option;
}
var optionAddress = [{
	value: '10000',
	text: '上海'
}, {
	value: '10001',
	text: '云南'
}, {
	value: '10002',
	text: '内蒙古'
}, {
	value: '10003',
	text: '北京'
}, {
	value: '10004',
	text: '吉林'
}, {
	value: '10005',
	text: '四川'
}, {
	value: '10006',
	text: '天津'
}, {
	value: '10007',
	text: '宁夏'
}, {
	value: '10008',
	text: '安徽'
}, {
	value: '10009',
	text: '山东'
}, {
	value: '10010',
	text: '山西'
}, {
	value: '10011',
	text: '广东'
}, {
	value: '10012',
	text: '广西'
}, {
	value: '10013',
	text: '新疆'
}, {
	value: '10014',
	text: '江苏'
}, {
	value: '10015',
	text: '江西'
}, {
	value: '10016',
	text: '河北'
}, {
	value: '10017',
	text: '河南'
}, {
	value: '10018',
	text: '浙江'
}, {
	value: '10019',
	text: '海南'
}, {
	value: '10020',
	text: '香港'
}, {
	value: '10021',
	text: '湖北'
}, {
	value: '10022',
	text: '湖南'
}, {
	value: '10023',
	text: '甘肃'
}, {
	value: '10024',
	text: '福建'
}, {
	value: '10025',
	text: '西藏'
}, {
	value: '10026',
	text: '贵州'
}, {
	value: '10027',
	text: '辽宁'
}, {
	value: '10028',
	text: '重庆'
}, {
	value: '10029',
	text: '陕西'
}, {
	value: '10030',
	text: '青海'
}, {
	value: '10031',
	text: '黑龙江'
}, {
	value: '10145',
	text: '澳门'
}, {
	value: '10146',
	text: '台湾'
}];
/*点击地址*/
App.getID("address").addEventListener('tap', function() {
		userPicker = new mui.PopPicker();
		userPicker.setData(optionAddress);
		userPicker.show(function(items) {
			getEchartsData(parseInt(items[0].value));
			App.getID("getAddress").innerText = items[0].text;
		});
	})
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
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getEchartsData(checkAddress());
		App.getID("getAddress").innerText = App.getItem("addressFlag");
	}
}