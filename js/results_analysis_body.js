/*刷新初始化*/
mui.init({
	pullRefresh: {
		container: "#pullrefresh",
		down: {
			callback: pulldownRefresh
		}
	}
});
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

function getDownData() {
	var url = App.url + "/achievement/getAllAchievements";
	var dataOptions = {
		provinceNo: checkAddress(),
		token: App.getItem("tokenflag")
	};
	var success = function(data) {
		var afresh = App.getWebviewID("afresh10.html");
		if(afresh) {
			afresh.close();
		}
		if(data.status) {
			if(data.result) {
				App.getID("allID").style.display = "block";
				App.getID("resultsAnalysis").style.display = "none";
				paraData(data.result);
				echarts.init(byId('item-lineChart1')).setOption(getOption("line1", data.result.value.one, data.result.name));
				echarts.init(byId('item-lineChart2')).setOption(getOption("line2", data.result.value.two, data.result.name));
				echarts.init(byId('item-radar')).setOption(getOption('radar', data.result.value.three, data.result.name));
				echarts.init(byId('item-descartes')).setOption(getOption('descartes', data.result.value.four, data.result.name));
				echarts.init(byId('item-lineChart4')).setOption(getOption('line4', data.result.value.five, data.result.name));
				echarts.init(byId('item-lineChart5')).setOption(getOption('line5', data.result.value.sex, data.result.name));
			} else {
				App.getID("allID").style.display = "none";
				App.getID("resultsAnalysis").style.display = "block";
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
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	};
	var dataType = "json";
	App.ajaxNoWait(url, dataOptions, success, dataType);
}

/*刷新*/
function pulldownRefresh() {
	if(App.noNetwork()) {
		App.afreshWebview("0", "0", "afresh10.html");
		plus.nativeUI.closeWaiting();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
	} else {
		getDownData();
	}
}

function getOption(type, result, name) {
	var option = null;
	if(type == "line1") {
		var myData = null;
		if(name == "理科") {
			myData = ['语文', '数学', '英语', '物理', '化学', '生物'];
		} else if(name == "文科") {
			myData = ['语文', '数学', '英语', '政治', '历史', '地理'];
		}
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
				data: myData
			}],
			yAxis: [{
				type: 'value',
				max: 150
			}],
			series: []
		};
		for(var i = 0; i < result.length; i++) {
			var mySeries = {
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
			option.legend.data.push(result[i].remark);
			mySeries.name = result[i].remark;
			mySeries.data.push(result[i].chinese);
			mySeries.data.push(result[i].math);
			mySeries.data.push(result[i].english);
			if(name == "理科") {
				mySeries.data.push(result[i].physics);
				mySeries.data.push(result[i].chemistry);
				mySeries.data.push(result[i].biology);
			} else if(name == "文科") {
				mySeries.data.push(result[i].politics);
				mySeries.data.push(result[i].history);
				mySeries.data.push(result[i].geography);
			}
			option.series.push(mySeries);
		}

	} else if(type == "line2") {
		var myData = null;
		if(name == "理科") {
			myData = ['语文', '数学', '英语', '物理', '化学', '生物'];
		} else if(name == "文科") {
			myData = ['语文', '数学', '英语', '政治', '历史', '地理'];
		}
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
				data: myData
			}],
			yAxis: [{
				type: 'value',
				max: 150
			}],
			series: []
		};
		for(var i = 0; i < result.length; i++) {
			var mySeries = {
				name: '',
				type: 'bar',
				data: [],
				markPoint: {
					data: [{
						type: 'max',
						name: '最大值'
					}, {
						type: 'min',
						name: '最小值'
					}]
				},
				markLine: {
					data: [{
						type: 'average',
						name: '平均值'
					}]
				}
			}
			option.legend.data.push(result[i].remark);
			mySeries.name = result[i].remark;
			mySeries.data.push(result[i].chinese);
			mySeries.data.push(result[i].math);
			mySeries.data.push(result[i].english);
			if(name == "理科") {
				mySeries.data.push(result[i].physics);
				mySeries.data.push(result[i].chemistry);
				mySeries.data.push(result[i].biology);
			} else if(name == "文科") {
				mySeries.data.push(result[i].politics);
				mySeries.data.push(result[i].history);
				mySeries.data.push(result[i].geography);
			}
			option.series.push(mySeries);
		}
	} else if(type == "line3") {
		var myData = null;
		if(name == "理科") {
			myData = ['语文', '数学', '英语', '物理', '化学', '生物'];
		} else if(name == "文科") {
			myData = ['语文', '数学', '英语', '政治', '历史', '地理'];
		}
		option = {
			title: {
				text: '',
				subtext: ''
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: "{a} <br/>{b} : {c}%"
			},
			legend: {
				data: ['']
			},
			grid: {
				top: '3%',
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: myData,
				max: 150
			},
			series: []
		};
		var mySeries = {
			name: '',
			type: 'bar',
			barWidth: 20,
			data: []
		}
		mySeries.data.push(result[0]);
		mySeries.data.push(result[1]);
		mySeries.data.push(result[2]);
		mySeries.data.push(result[3]);
		mySeries.data.push(result[4]);
		mySeries.data.push(result[5]);
		option.series.push(mySeries);
	} else if(type == "line4") {
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
				axisLabel: {
					interval: 0,
					formatter: function(str) {
						var newstr = "";
						for(var i = 0; i < str.length; i += 3) {
							var tmp = str.substring(i, i + 3);
							newstr += tmp + "\n";
						}
						return newstr;
					}

				}
			}],
			yAxis: [{
				type: 'value',
				max: 750
			}],
			series: []
		};
		var mySeries = {
			name: '',
			type: 'line',
			data: [],
			markPoint: {
				data: []
			}
		}
		var markPointData = null;
		for(var i = 0; i < result.length; i++) {
			option.xAxis[0].data.push(result[i].name);
			markPointData = {
				name: result[i].name,
				value: result[i].value,
				xAxis: i,
				yAxis: result[i].value
			}
			mySeries.data.push(result[i]);
			mySeries.markPoint.data.push(markPointData);
		}
		option.series.push(mySeries);
	} else if(type == "line5") {
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
				max: 750
			}],
			series: []
		};
		var mySeries = null;
		for(var i = 0; i < result.value.length; i++) {
			option.legend.data.push(result.value[i].name);
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
			for(var k = 0; k < result.value[i].value.length; k++) {
				if(!contains(option.xAxis[0].data, result.value[i].value[k].year)) {
					option.xAxis[0].data.push(result.value[i].value[k].year);
				}
				mySeries.data.push(result.value[i].value[k].score);
			}
			mySeries.name = result.value[i].name;
			option.series.push(mySeries);
		}
		myMarkPoint = {
			name: '',
			type: 'line',
			data: [],
			markPoint: {
				itemStyle: {
					normal: {
						color: '#C23531'
					}
				},
				data: [{
					name: '你在这里',
					value: result.name,
					xAxis: 3,
					yAxis: result.name
				}]
			}
		}
		option.series.push(myMarkPoint);
	} else if(type == "descartes") {
		var myData = null;
		if(name == "理科") {
			myData = ['语文', '数学', '英语', '物理', '化学', '生物'];
		} else if(name == "文科") {
			myData = ['语文', '数学', '英语', '政治', '历史', '地理'];
		}
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
				data: myData
			}],
			yAxis: [{
				type: 'value'
			}],
			series: []
		};
		var mySeries = {
			name: '',
			type: 'line',
			data: [],
			markPoint: {
				data: []
			}
		}
		var markPointData = null;
		for(var i = 0; i < result.length; i++) {
			markPointData = {
				name: result[i].name,
				value: result[i].value,
				xAxis: i,
				yAxis: result[i].value
			}
			mySeries.data.push(result[i]);
			mySeries.markPoint.data.push(markPointData);
		}
		option.series.push(mySeries);
	} else if(type == "radar") {
		var myData = null;
		if(name == "理科") {
			myData = [{
				name: '语文',
				max: 100
			}, {
				name: '数学',
				max: 100
			}, {
				name: '英语',
				max: 100
			}, {
				name: '物理',
				max: 100
			}, {
				name: '化学',
				max: 100
			}, {
				name: '生物',
				max: 100
			}];
		} else if(name == "文科") {
			myData = [{
				name: '语文',
				max: 100
			}, {
				name: '数学',
				max: 100
			}, {
				name: '英语',
				max: 100
			}, {
				name: '政治',
				max: 100
			}, {
				name: '历史',
				max: 100
			}, {
				name: '地理',
				max: 100
			}];;
		}
		option = {
			title: {
				text: ''
			},
			tooltip: {},
			legend: {
				data: []
			},
			name: {
				show: true,
				formatter: null,
				textStyle: {
					//设置颜色
					color: '#000000'
				}
			},

			radar: {
				// shape: 'circle',
				indicator: myData
			},
			series: [{
				name: '',
				type: 'radar',
				//areaStyle: {normal: {}},
				data: [{
					value: [result[0].value, result[1].value, result[2].value, result[3].value, result[4].value, result[5].value]
				}]
			}]
		};

	}
	return option;
}

function byId(id) {
	return document.getElementById(id);
};

function paraData(result) {
	var option = {
		list: result
	};
	var templatehtml = template("paihangRe", option);
	App.getID("paihang").innerHTML = templatehtml;

}
/*echart加载数据*/
function getEchartsData() {
	var url = App.url + '/achievement/getAllAchievements';
	var dataOptions = {
		provinceNo: checkAddress(),
		token: App.getItem("tokenflag")
	};
	var success = function(data) {
		if(data.status) {
			if(data.result) {
				App.getID("allID").style.display = "block";
				App.getID("resultsAnalysis").style.display = "none";
				paraData(data.result);
				echarts.init(byId('item-lineChart1')).setOption(getOption("line1", data.result.value.one, data.result.name));
				echarts.init(byId('item-lineChart2')).setOption(getOption("line2", data.result.value.two, data.result.name));
				echarts.init(byId('item-radar')).setOption(getOption('radar', data.result.value.three, data.result.name));
				echarts.init(byId('item-descartes')).setOption(getOption('descartes', data.result.value.four, data.result.name));
				echarts.init(byId('item-lineChart4')).setOption(getOption('line4', data.result.value.five, data.result.name));
				echarts.init(byId('item-lineChart5')).setOption(getOption('line5', data.result.value.sex, data.result.name));
			} else {
				App.getID("allID").style.display = "none";
				App.getID("resultsAnalysis").style.display = "block";
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

/*默认加载*/
mui.plusReady(function() {
		/*滚动*/
		if(App.noNetwork()) {
			App.afreshWebview("0", "0", "afresh10.html");;
			plus.nativeUI.closeWaiting();
		} else {
			getEchartsData();
		}
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
		getDownData();
	}
}