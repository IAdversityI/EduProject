mui("#collegesdaquan").on('tap', '.collegedaquanflag', function() {
	var isHeader = this.getAttribute("data-isHeader");
	if(isHeader == "collegesAll") {
		var url = "./colleges_daquan_details_header.html";
		var id = "./colleges_daquan_details_header.html";
		var extras = {};
		App.setItem("collegesAllFlag", isHeader);
		App.openWindow(url, id, extras);
	} else if(isHeader == "colleges211" || isHeader == "colleges985") {
		var url = "./colleges_211_985_header.html";
		var id = "./colleges_211_985_header.html";
		var extras = {
			title: "211"
		};
		if(isHeader == "colleges211") {
			extras.title = "211"
		} else {
			extras.title = "985"
		}
		App.setItem("collegesKindFlag", isHeader);
		App.openWindow(url, id, extras);
	} else if(isHeader == "collegesOrder") {
		var url = "./colleges_daquan_details_nopaihangheader.html";
		var id = "./colleges_daquan_details_nopaihangheader.html";
		App.setItem("collegesAllFlag", isHeader);
		var extras = {};
		App.openWindow(url, id, extras);
	} else if(isHeader == "collegesYe") {
		var url = "./colleges_daquan_ye.html";
		var id = "./colleges_daquan_ye.html";
		var extras = {};
		App.openWindow(url, id, extras);
	}

});