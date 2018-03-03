function getOption(type, result) {
	var option = null;
	if(type == "line1") {
		option = {
			title: {
				text: '',
				subtext: ''
			},
			tooltip: {
				trigger: 'axis',
				formatter: "{a} <br/>{b} : {c} (万)"
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
				type: 'value'
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

		for(var i = 0; i < result[0].length; i++) {
			markPointData = {
				name: result[0][i].year,
				value: result[0][i].renshu,
				xAxis: i,
				yAxis: result[0][i].renshu
			}
			mySeries.data.push(result[0][i].renshu);
			mySeries.markPoint.data.push(markPointData);
			option.xAxis[0].data.push(result[0][i].year);
		}
		option.series.push(mySeries);

	}
	return option;
}

function paraData(result) {
	var option = {
		list: result,
		address: App.getItem("addressFlag")
	};
	var templatehtml = template("highDataRe", option);
	App.getID("highData").innerHTML = templatehtml;
}

function getEchartsData() {
	var url = App.url + '/admission/getAdmission';
	var dataOptions = {
		province: App.getItem("addressFlag")
	};
	var success = function(data) {
		var afresh = App.getWebviewID("afresh15.html");
		if(afresh) {
			afresh.close();
		}
		if(data.status) {
			if(data.result) {
				App.getID("address").innerText = App.getItem("addressFlag");
				echarts.init(App.getID('line1')).setOption(getOption("line1", data.result));
				paraData(data.result[1]);
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
mui.plusReady(function() {
	if(App.noNetwork()) {
		App.afreshWebview("45", "0", "afresh15.html");
		plus.nativeUI.closeWaiting();
	} else {
		getEchartsData();
	}
})
template.helper("checkValue", function(value) {
	if(!value) {
		value = "﹣·﹣";
		return value
	} else {
		return value
	}
});
/*重新加载数据按钮*/
function refreshData() {
	plus.nativeUI.showWaiting("  正在加载...  ");
	if(App.noNetwork()) {
		plus.nativeUI.closeWaiting();
	} else {
		getEchartsData();
	}
}