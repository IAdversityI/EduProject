var clickFlag = false;

function getOption(type, result) {
	var option = null;
	if(type == "line1") {
		option = {
			title: {
				text: '',
				subtext: '',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}所"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['可冲刺', '稳妥', '保底']
			},
			series: [{
				name: '高校数',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: [{
					value: result.sprintCollege.length,
					name: '可冲刺'
				}, {
					value: result.stableCollege.length,
					name: '稳妥'
				}, {
					value: result.endCollege.length,
					name: '保底'
				}],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		clickFlag = true;
	} else if(type == "pie1") {
		option = {
			backgroundColor: '#FFFFFF',
			title: {
				text: '',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}%"
			},
			visualMap: {
				show: false,
				min: 1,
				max: 100,
				inRange: {
					colorLightness: [0.5, 1]
				}
			},
			series: []
		};
		var mySeries = {
			name: '',
			type: 'pie',
			radius: '55%',
			center: ['50%', '50%'],
			data: [],
			roseType: 'angle',
			label: {
				normal: {
					textStyle: {
						color: 'rgba(0, 0, 0, 1)'
					}
				}
			},
			labelLine: {
				normal: {
					lineStyle: {
						color: 'rgba(0, 0, 0, 1)'
					},
					smooth: 0.2,
					length: 10,
					length2: 20
				}
			},
			itemStyle: {
				normal: {
					color: '#c23531',
					shadowBlur: 200,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
		mySeries.data.push(JSON.parse(result.citys[0]));
		mySeries.data.push(JSON.parse(result.citys[1]));
		mySeries.data.push(JSON.parse(result.citys[2]));
		mySeries.data.push(JSON.parse(result.citys[3]));
		mySeries.data.push(JSON.parse(result.citys[4]));
		option.series.push(mySeries);
		clickFlag = true;
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
				type: 'value'
			}],
			series: []
		};
		var mySeries = {
			name: '',
			barWidth: 20,
			type: 'bar',
			data: []
		}
		for(var i = 0; i < result.colleges.length; i++) {
			var collegesName = JSON.parse(result.colleges[i]);
			option.xAxis[0].data.push(collegesName.name);
			mySeries.data.push(collegesName.value);
		}
		option.series.push(mySeries);

	} else if(type == "pie3") {
		option = {
			title: {
				text: '',
				subtext: '',
				x: ''
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}"
			},
			legend: {
				data: []
			},
			series: [],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		};
		var mySeries = {
			name: '',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: []
		}
		for(var i = 0; i < result.specialtys.length; i++) {
			option.legend.data.push(JSON.parse(result.specialtys[i]).name);
		}
		mySeries.data.push(JSON.parse(result.specialtys[0]));
		mySeries.data.push(JSON.parse(result.specialtys[1]));
		mySeries.data.push(JSON.parse(result.specialtys[2]));
		mySeries.data.push(JSON.parse(result.specialtys[3]));
		mySeries.data.push(JSON.parse(result.specialtys[4]));
		option.series.push(mySeries);
	}

	return option;
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
/*点击意向区域*/
/*按钮点击*/
function chooseItem(option) {
	userPicker = new mui.PopPicker();
	userPicker.setData(option);
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
var optionBZ = [{
	value: '',
	text: '本科',
	children: [{
		value: "",
		text: "不限"
	}, {
		value: "",
		text: "文学类"
	}, {
		value: "",
		text: "理学类"
	}, {
		value: "",
		text: "哲学类"
	}, {
		value: "",
		text: "教育学类"
	}, {
		value: "",
		text: "法学类"
	}, {
		value: "",
		text: "管理学类"
	}, {
		value: "",
		text: "经济学类"
	}, {
		value: "",
		text: "农学类"
	}, {
		value: "",
		text: "工学类"
	}, {
		value: "",
		text: "医学类"
	}, {
		value: "",
		text: "历史学类"
	}, {
		value: "",
		text: "艺术学类"
	}]
}, {
	value: '',
	text: '专科',
	children: [{
		value: "",
		text: "不限"
	}, {
		value: "",
		text: "交通运输类"
	}, {
		value: "",
		text: "生化与药品类"
	}, {
		value: "",
		text: "资源开发与测绘类"
	}, {
		value: "",
		text: "材料与能源类"
	}, {
		value: "",
		text: "土建类"
	}, {
		value: "",
		text: "水利类"
	}, {
		value: "",
		text: "制造类"
	}, {
		value: "",
		text: "环保、气象与安全类"
	}, {
		value: "",
		text: "财经类"
	}, {
		value: "",
		text: "医药卫生类"
	}, {
		value: "",
		text: "旅游类"
	}, {
		value: "",
		text: "公共事业类"
	}, {
		value: "",
		text: "文化教育类"
	}, {
		value: "",
		text: "艺术设计传媒类"
	}, {
		value: "",
		text: "公安类"
	}, {
		value: "",
		text: "轻纺食品类"
	}, {
		value: "",
		text: "法律类"
	}, {
		value: "",
		text: "农林牧渔类"
	}]
}];
var optionSchoolType = [{
	value: '0',
	text: '不限'
}, {
	value: '10039',
	text: '综合类'
}, {
	value: '10040',
	text: '理工类'
}, {
	value: '10041',
	text: '农林类'
}, {
	value: '10042',
	text: '医药类'
}, {
	value: '10043',
	text: '师范类'
}, {
	value: '10044',
	text: '语言类'
}, {
	value: '10045',
	text: '财经类'
}, {
	value: '10046',
	text: '政法类'
}, {
	value: '10047',
	text: '体育类'
}, {
	value: '10048',
	text: '艺术类'
}, {
	value: '10049',
	text: '民族类'
}, {
	value: '10097',
	text: '军事类'
}, {
	value: '10098',
	text: '其他'
}];
var optionSchoolJB = [{
	value: '0',
	text: '不限'
}, {
	value: '211',
	text: '211大学'
}, {
	value: '985',
	text: '985大学'
}];
/*意向区域*/
var sexButton = App.getID("area");
sexButton.addEventListener('tap', function(event) {
	chooseItem(optionAddress);
	userPicker.show(function(items) {
		var provinceNumber = null;
		for(var i = 0; i < optionAddress.length; i++) {
			if(optionAddress[i].text == items[0].text) {
				provinceNumber = parseInt(optionAddress[i].value);
			}
		}
		App.setItem("provinceNumberGXFlag", provinceNumber);
		var schoolNumber = App.getItem("schoolNumberGXFlag") ? App.getItem("schoolNumberGXFlag") : 0;
		var schoolJB = App.getItem("schoolJBGXFlag") ? App.getItem("schoolJBGXFlag") : 0;
		getEchartsData("address", items[0].text, provinceNumber, schoolNumber, schoolJB);
	});
}, false);
/*意向专业*/
/*var sexButton = App.getID("proBZ");
var proBZPicker = new mui.PopPicker({
	layer: 2
});
proBZPicker.setData(optionBZ);
sexButton.addEventListener('tap', function(event) {
	proBZPicker.show(function(items) {

	});
}, false);*/
/*学校类型*/
var sexButton = App.getID("schoolType");
sexButton.addEventListener('tap', function(event) {
	chooseItem(optionSchoolType);
	userPicker.show(function(items) {
		var schoolNumber = null;
		for(var i = 0; i < optionSchoolType.length; i++) {
			if(optionSchoolType[i].text == items[0].text) {
				schoolNumber = parseInt(optionSchoolType[i].value);
			}
		}
		App.setItem("schoolNumberGXFlag", schoolNumber);
		var schoolJB = App.getItem("schoolJBGXFlag") ? App.getItem("schoolJBGXFlag") : 0;
		var provinceNumber = App.getItem("provinceNumberGXFlag") ? App.getItem("provinceNumberGXFlag") : checkAddress();
		getEchartsData("mySchoolType", items[0].text, provinceNumber, schoolNumber, schoolJB);
	});
}, false);
/*学校级别*/
var sexButton = App.getID("schoolJB");
sexButton.addEventListener('tap', function(event) {
	chooseItem(optionSchoolJB);
	userPicker.show(function(items) {
		var schoolJB = null;
		for(var i = 0; i < optionSchoolJB.length; i++) {
			if(optionSchoolJB[i].text == items[0].text) {
				schoolJB = parseInt(optionSchoolJB[i].value);
			}
		}
		App.setItem("schoolJBGXFlag", schoolJB);
		var schoolNumber = App.getItem("schoolNumberGXFlag") ? App.getItem("schoolNumberGXFlag") : 0;
		var provinceNumber = App.getItem("provinceNumberGXFlag") ? App.getItem("provinceNumberGXFlag") : checkAddress();
		getEchartsData("schoolLB", items[0].text, provinceNumber, schoolNumber, schoolJB);
	});
}, false);
/*默认加载*/
mui.plusReady(function() {
		App.removeItem("provinceNumberGXFlag");
		App.removeItem("schoolNumberGXFlag");
		App.removeItem("schoolJBGXFlag");
		if(App.noNetwork()) {
			App.afreshWebview("45", "0", "afresh11.html");;
			plus.nativeUI.closeWaiting();
		} else {
			var url = App.url + '/achievement/getUserAchievement';
			var dataOptions = {
				token: App.getItem("tokenflag")
			};
			var success = function(data) {
				if(data.status) {
					if(data.result) {
						App.getID("noData").style.display = "block";
						App.getID("resultsAnalysis").style.display = "none";
						App.getID("studentTypeValue").innerText = data.result.value;
						App.getID("studentType").innerText = data.result.name;
						App.getID("getAddress").innerText = App.getItem("addressFlag");
						App.getID("address").innerText = App.getItem("addressFlag");
						getEchartsData("null", "null", checkAddress(), 0, 0);
					} else {
						/*App.getID("noData").style.display="none";
						App.getID("resultsAnalysis").style.display="block";*/
					}

				} else {
					mui.toast(data.result);
					if(data.signal == 1) {
						App.removeItem("tokenflag");
						var url = "../pages/login.html";
						var id = "../pages/login.html";
						var extras = {};
						App.openWindow(url, id, extras);
					} else {
						App.getID("noData").style.display = "none";
						App.getID("resultsAnalysis").style.display = "block";
					}
				}
			};
			var dataType = "json";
			App.ajax(url, dataOptions, success, dataType);
		}
	})
	/*获取echarts数据*/
function getEchartsData(gid, gvalue, peovinceNo, collegeType, collegeLevel) {
	var url = App.url + '/recommend/getRecommend';
	var dataOptions = {
		token: App.getItem("tokenflag"),
		score: App.getID("studentTypeValue").innerText,
		userProvince: checkAddress(),
		peovinceNo: peovinceNo,
		collegeType: collegeType,
		collegeLevel: collegeLevel,
		studentType: App.getID("studentType").innerText
	};
	var success = function(data) {
		if(data.status) {
			if(data.result) {
				if(gid != "null") {
					App.getID(gid).innerText = gvalue;
				} else {
					App.getID("mySchoolType").innerText = "不限";
					App.getID("schoolLB").innerText = "不限";
				}
				App.getID("CCID").setAttribute("dataPeovinceNo", peovinceNo);
				App.getID("CCID").setAttribute("dataCollegeType", collegeType);
				App.getID("CCID").setAttribute("dataCollegeLevel", collegeLevel);

				App.getID("WTID").setAttribute("dataPeovinceNo", peovinceNo);
				App.getID("WTID").setAttribute("dataCollegeType", collegeType);
				App.getID("WTID").setAttribute("dataCollegeLevel", collegeLevel);

				App.getID("BDID").setAttribute("dataPeovinceNo", peovinceNo);
				App.getID("BDID").setAttribute("dataCollegeType", collegeType);
				App.getID("BDID").setAttribute("dataCollegeLevel", collegeLevel);
				App.getID("chongchiNo").innerText = data.result.sprintCollege.length;
				App.getID("wentuoNo").innerText = data.result.stableCollege.length;
				App.getID("baodiNo").innerText = data.result.endCollege.length;
				/*App.getID("spinner").style.display = "none";*/
				echarts.init(App.getID('line1')).setOption(getOption('line1', data.result));
				echarts.init(App.getID('pie1')).setOption(getOption('pie1', data.result));
				echarts.init(App.getID('line2')).setOption(getOption('line2', data.result));
				echarts.init(App.getID('pie3')).setOption(getOption('pie3', data.result));
			} else {

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
/*点击选择学校*/

mui("#echartsData").on("tap", ".schoolChooseFlag", function() {
	if(clickFlag) {
		var school = this.getAttribute("data-school");
		var peovinceNo = this.getAttribute("dataPeovinceNo");
		var collegeType = this.getAttribute("dataCollegeType");
		var collegeLevel = this.getAttribute("dataCollegeLevel");
		var url = "../pages/personalized_recommendation_schoollist.html";
		var id = "../pages/personalized_recommendation_schoollist.html";
		var pName = null;
		if(school == "可冲刺") {
			pName = "sprintCollege";
		} else if(school == "稳妥") {
			pName = "stableCollege";
		} else if(school == "保底") {
			pName = "endCollege";
		}
		var extras = {
			schoolName: school,
			schoolList: pName,
			score: App.getID("studentTypeValue").innerText,
			userProvince: checkAddress(),
			peovinceNo: peovinceNo,
			collegeType: collegeType,
			collegeLevel: collegeLevel,
			studentType: App.getID("studentType").innerText,
		};
		App.openWindow(url, id, extras);
	}
});
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/achievement/getUserAchievement';
		var dataOptions = {
			token: App.getItem("tokenflag")
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh11.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				if(data.result) {
					App.getID("studentTypeValue").innerText = data.result.value;
					App.getID("studentType").innerText = data.result.name;
					App.getID("getAddress").innerText = App.getItem("addressFlag");
					App.getID("address").innerText = App.getItem("addressFlag");
					getEchartsData("null", "null", checkAddress(), 0, 0);
				} else {

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