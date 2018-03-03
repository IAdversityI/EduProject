mui.previewImage();
mui("#scroll1").scroll();
mui("#scroll2").scroll();
mui("#scroll3").scroll();
mui("#scroll4").scroll();
/*渲染数据方法*/
function paraData(result) {
	var baseInfo = JSON.parse(result.baseInfo);
	var collegeIntroduceJieQu = result.collegeIntroduce;
	collegeIntroduceJieQu = collegeIntroduceJieQu.substr(0, 200);
	var option = {
		list: result,
		baseInfo: baseInfo
	};
	var templatehtml = template("baseIn", option);
	App.getID("baseInfo").innerHTML = templatehtml;
	if(result.expectScore && result.batch) {
		App.getID("fenshuheight1").style.height = result.expectScore / 750 * 100 + "%";
		App.getID("fenshu1").innerText = result.expectScore;
		App.getID("fenshuCon1").innerText = result.batch;
	} else {
		App.getID("fenshu1").innerText = "﹣·﹣";
		App.getID("fenshuCon1").innerText = "﹣·﹣";
	}
	App.getID("collegeIntroducebufen").innerText = collegeIntroduceJieQu;

	App.getID("collegeIntroducezt").innerText = result.collegeIntroduce;
	var collegeBrochures = JSON.parse(result.collegeBrochures);
	App.getID("brochuresName").innerText = collegeBrochures[0].name;
	App.getID("brochuresDetails").innerHTML = App.clearSpace(collegeBrochures[0].details).replace(/\\r\\n/g, '<br/>');
}

function paraDataLiNian(result) {
	var option = {
		list: result
	};
	var templatehtml = template("liNianFen", option);
	App.getID("liNian").innerHTML = templatehtml;
}

function paraDataProfessional(result) {
	var option = {
		list: result
	};
	var templatehtml = template("professional", option);
	App.getID("professionalFen").innerHTML = templatehtml;
}
/*历年分数线*/
function getLiNian(provinceNumber, studentNumber, batchNumber, dID, dContent) {
	var urlProvince = App.url + '/college/getCollegeAdmissionLineByProvince';
	var collegeIDNumber = parseInt(App.getItem("collegeIDNumber"));
	var dataOptions = {
		provinceNumber: provinceNumber,
		collegeNumber: collegeIDNumber,
		studentNumber: studentNumber,
		batchNumber: batchNumber
	};
	var success = function(data) {
		if(data.status) {
			App.getID(dID).innerText = dContent;
			if(data.result.length != 0) {
				echarts.init(App.getID('line1')).setOption(getOption("line1", data.result));
			} else {
				App.getID("line1").innerText = "暂无数据";
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
	App.ajax(urlProvince, dataOptions, success, dataType);
}
/*各专业录取分数线*/
function getProfessionalAdmission(provinceNumber, studentTypeNumber, year, dID, dContent) {
	var urlProvince = App.url + '/college/getSpecialtyScore';
	var collegeIDNumber = parseInt(App.getItem("collegeIDNumber"));
	var dataOptions = {
		collegeNo: collegeIDNumber,
		provinceNumber: provinceNumber,
		studentTypeNumber: studentTypeNumber,
		year: year
	};
	var success = function(data) {
		if(data.status) {
			App.getID(dID).innerText = dContent;
			if(data.result.length != 0) {
				paraDataProfessional(data.result);
			} else {
				App.getID("professionalFen").innerText = "暂无数据";
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
	App.ajax(urlProvince, dataOptions, success, dataType);
}
mui.plusReady(function() {
		/*录取分数线*/
		if(App.noNetwork()) {
			App.afreshWebview("45", "0", "afresh4.html");
			plus.nativeUI.closeWaiting();
		} else {
			var url = App.url + '/college/getCollegeInfo';
			var dataOptions = {
				collegeID: App.getItem("collegeID"),
				uuid: plus.device.uuid,
				token: App.getItem("tokenflag"),
				provinceNumber: 10026
			};
			var success = function(data) {
				if(data.status) {
					App.evalJS("../pages/colleges_details_header.html", "addData('" + data.result.college.collegeName + "'" + "," + "'" + data.result.college.collegeLogo + "'" + "," + "'" + data.result.college.is211 + "'" + "," + "'" + data.result.college.is985 + "'" + "," + "'" + data.result.college.collegeType + "'" + "," + "'" + data.result.college.ranking + "'" + "," + "'" + data.result.college.isCollection + "')");
					if(data.result.userScore) {
						App.getID("fenshuheight2").style.height = data.result.userScore / 750 * 100 + "%";
						App.getID("fenshu2").innerText = data.result.userScore;
					} else {
						App.getID("fenshu2").innerText = "﹣·﹣";
					}
					paraData(data.result.college);
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
			/*历年分数线*/
			App.getID("area").innerText = App.getItem("addressFlag");
			App.getID("kind").innerText = "理科";
			App.getID("pici").innerText = "一批";
			var urlProvince = App.url + '/college/getCollegeAdmissionLineByProvince';
			var collegeIDNumber = parseInt(App.getItem("collegeIDNumber"));
			var dataOptions = {
				provinceNumber: checkAddress(),
				collegeNumber: collegeIDNumber,
				studentNumber: 10035,
				batchNumber: 10036
			};
			var success = function(data) {
				if(data.status) {
					if(data.result.length != 0) {
						echarts.init(App.getID('line1')).setOption(getOption("line1", data.result));
					} else {
						App.getID("line1").innerText = "暂无数据";
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
			App.ajax(urlProvince, dataOptions, success, dataType);

			/*专业分数线*/
			App.getID("larea").innerText = App.getItem("addressFlag");
			App.getID("lkind").innerText = "理科";
			App.getID("lyear").innerText = 2015;
			var urlProfessional = App.url + '/college/getSpecialtyScore';
			var dataOptionsProfessional = {
				provinceNumber: checkAddress(),
				collegeNo: collegeIDNumber,
				studentTypeNumber: 10035,
				year: 2015
			};
			var success = function(data) {
				if(data.status) {
					if(data.result.length != 0) {
						paraDataProfessional(data.result);
					} else {
						App.getID("professionalFen").innerText = "暂无数据";
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
			App.ajax(urlProfessional, dataOptionsProfessional, success, dataType);
			getxiaoyuan();
		}
	})
	/*面板伸缩*/
App.getID("accordion").addEventListener('tap', function() {
		if(App.getID("accordion").classList.contains("mui-collapse")) {
			App.getID("accordion").classList.remove("mui-collapse");
			App.getID("bufenContent").style.display = 'none';
			App.getID("bufenContentAll").style.display = 'block';
			App.getID("accordionimg").style.display = "none";
			App.getID("accordionimgxia").style.display = "block";
		} else {
			App.getID("accordion").classList.add("mui-collapse");
			App.getID("accordionimg").style.display = "block";
			App.getID("bufenContent").style.display = 'block';
			App.getID("bufenContentAll").style.display = 'none';
			App.getID("accordionimgxia").style.display = "none";

		}
	})
	/*按钮点击*/
function chooseItem(option) {
	userPicker = new mui.PopPicker();
	userPicker.setData(option);
}
/*查找地址*/
function checkAddress() {
	var provinceNumber = null;
	for(var i = 0; i < option1.length; i++) {
		if(option1[i].text == App.getItem("addressFlag")) {
			provinceNumber = parseInt(option1[i].value);
		}
	}
	return provinceNumber;
}
var option1 = [{
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
var option2 = [{
	value: '10035',
	text: '理科'
}, {
	value: '10034',
	text: '文科'
}];
var option3 = [{
	value: '2006',
	text: '2006'
}, {
	value: '2007',
	text: '2007'
}, {
	value: '2008',
	text: '2008'
}, {
	value: '2009',
	text: '2009'
}, {
	value: '2010',
	text: '2010'
}, {
	value: '2011',
	text: '2011'
}, {
	value: '2012',
	text: '2012'
}, {
	value: '2013',
	text: '2013'
}, {
	value: '2014',
	text: '2014'
}, {
	value: '2015',
	text: '2015'
}, {
	value: '2016',
	text: '2016'
}]
var option4 = [{
	value: '10036',
	text: '一批'
}, {
	value: '10037',
	text: '二批'
}, {
	value: '10038',
	text: '三批'
}, {
	value: '10148',
	text: '专科'
}];
var sexButton = App.getID("area");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option1);
	userPicker.show(function(items) {
		var provinceNumber = items[0].value;
		var studentNumber = parseInt(App.getItem("studentNumber")) ? parseInt(App.getItem("studentNumber")) : 10035;
		var batchNumber = parseInt(App.getItem("batchNumber")) ? parseInt(App.getItem("batchNumber")) : 10036;
		App.setItem("provinceNumber", provinceNumber);
		getLiNian(parseInt(provinceNumber), studentNumber, batchNumber, "area", items[0].text);
	});
}, false);

var sexButton = App.getID("kind");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option2);
	userPicker.show(function(items) {
		var studentNumber = items[0].value;
		var provinceNumber = parseInt(App.getItem("provinceNumber")) ? parseInt(App.getItem("provinceNumber")) : checkAddress();
		var batchNumber = parseInt(App.getItem("batchNumber")) ? parseInt(App.getItem("batchNumber")) : 10036;
		App.setItem("studentNumber", studentNumber);
		getLiNian(provinceNumber, parseInt(studentNumber), batchNumber, "kind", items[0].text);
	});
}, false);

var sexButton = App.getID("pici");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option4);
	userPicker.show(function(items) {
		var batchNumber = items[0].value;
		var provinceNumber = parseInt(App.getItem("provinceNumber")) ? parseInt(App.getItem("provinceNumber")) : checkAddress();
		var studentNumber = parseInt(App.getItem("studentNumber")) ? parseInt(App.getItem("studentNumber")) : 10035;
		App.setItem("batchNumber", batchNumber);
		getLiNian(provinceNumber, studentNumber, parseInt(batchNumber), "pici", items[0].text);
	});
}, false);

var sexButton = App.getID("lkind");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option2);
	userPicker.show(function(items) {
		var studentTypeNumber = items[0].value;
		var lareaYear = parseInt(App.getItem("lareaYear")) ? parseInt(App.getItem("lareaYear")) : 2015;
		var provinceNumber = parseInt(App.getItem("lareaProvinceNumber")) ? parseInt(App.getItem("lareaProvinceNumber")) : checkAddress();
		App.setItem("lareaStudentTypeNumber", studentTypeNumber);
		getProfessionalAdmission(provinceNumber, parseInt(studentTypeNumber), lareaYear, "lkind", items[0].text);

	});
}, false);
var sexButton = App.getID("lyear");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option3);
	userPicker.show(function(items) {
		var lareaYear = items[0].value;
		var studentTypeNumber = parseInt(App.getItem("lareaStudentTypeNumber")) ? parseInt(App.getItem("lareaStudentTypeNumber")) : 10035;
		var provinceNumber = parseInt(App.getItem("lareaProvinceNumber")) ? parseInt(App.getItem("lareaProvinceNumber")) : checkAddress();
		App.setItem("lareaYear", lareaYear);
		getProfessionalAdmission(provinceNumber, studentTypeNumber, parseInt(lareaYear), "lyear", items[0].text);
	});
}, false);

var sexButton = App.getID("larea");
sexButton.addEventListener('tap', function(event) {
	chooseItem(option1)
	userPicker.show(function(items) {
		var provinceNumber = items[0].value;
		var studentTypeNumber = parseInt(App.getItem("lareaStudentTypeNumber")) ? parseInt(App.getItem("lareaStudentTypeNumber")) : 10035;
		var lareaYear = parseInt(App.getItem("lareaYear")) ? parseInt(App.getItem("lareaYear")) : 2015;
		App.setItem("lareaProvinceNumber", provinceNumber);
		getProfessionalAdmission(parseInt(provinceNumber), studentTypeNumber, lareaYear, "larea", items[0].text);
	});
}, false);
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		var url = App.url + '/college/getCollegeInfo';
		var dataOptions = {
			collegeID: App.getItem("collegeID"),
			uuid: plus.device.uuid
		};
		var success = function(data) {
			var afresh = App.getWebviewID("afresh4.html");
			if(afresh) {
				afresh.close();
			}
			if(data.status) {
				paraData(data.result);
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
		/*历年分数线*/
		App.getID("area").innerText = App.getItem("addressFlag");
		App.getID("kind").innerText = "理科";
		App.getID("pici").innerText = "一批";
		var urlProvince = App.url + '/college/getCollegeAdmissionLineByProvince';
		var collegeIDNumber = parseInt(App.getItem("collegeIDNumber"));
		var dataOptions = {
			provinceNumber: checkAddress(),
			collegeNumber: collegeIDNumber,
			studentNumber: 10035,
			batchNumber: 10036
		};
		var success = function(data) {
			if(data.status) {
				if(data.result.length != 0) {
					paraDataLiNian(data.result);
				} else {
					App.getID("liNian").innerText = "暂无数据";
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
		App.ajax(urlProvince, dataOptions, success, dataType);

		/*专业分数线*/
		App.getID("larea").innerText = App.getItem("addressFlag");
		App.getID("lkind").innerText = "理科";
		App.getID("lyear").innerText = 2015;
		var urlProfessional = App.url + '/college/getSpecialtyScore';
		var dataOptionsProfessional = {
			provinceNumber: checkAddress(),
			collegeNo: collegeIDNumber,
			studentTypeNumber: 10035,
			year: 2015
		};
		var success = function(data) {
			if(data.status) {
				if(data.result.length != 0) {
					paraDataProfessional(data.result);
				} else {
					App.getID("professionalFen").innerText = "暂无数据";
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
		App.ajax(urlProfessional, dataOptionsProfessional, success, dataType);
	}
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
		var markPointData = null;
		var mySeries = {
			name: '',
			type: 'line',
			data: [],
			markPoint: {
				data: []
			}
		}
		for(var i = 0; i < result.length; i++) {
			markPointData = {
				name: result[i].year,
				value: result[i].average,
				xAxis: i,
				yAxis: result[i].average
			}
			mySeries.data.push(result[i].average);
			mySeries.markPoint.data.push(markPointData);
			option.xAxis[0].data.push(result[i].year);
		}
		option.series.push(mySeries);
	}
	return option;
}

function paraDataX(result) {
	var option = {
		list: result,
		size: "@20p"
	};
	var templatehtml = template("xiaoyuanRe", option);
	App.getID("xiaoyuan").innerHTML = templatehtml;
}

function getxiaoyuan() {
	var collegeIDNumber = parseInt(App.getItem("collegeIDNumber"));
	var url = App.url + '/college/getCollegeOnlineSP';
	var dataOptions = {
		collegeIDNumber: collegeIDNumber
	};
	var success = function(data) {
		var afresh = App.getWebviewID("afresh4.html");
		if(afresh) {
			afresh.close();
		}
		if(data.status) {
			if(data.result.length!=0){
				paraDataX(data.result);
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
