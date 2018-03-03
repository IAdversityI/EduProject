mui.init();
mui.ready(function() {
	var header = document.querySelector('header.mui-bar');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
});
/*获取定位*/
function getPositon() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		mui.toast('网络未连接');
	} else {
		plus.geolocation.getCurrentPosition(function(p) {
			var address = p.addresses;
			address = address.split('中国');
			address = address[1].split('市');
			address = address[0].split('省');
			document.getElementById("address").innerHTML = address[1] + '市' + '<span style="color: gray;margin-left: 10px;">定位城市</span>';
		}, function(e) {
			plus.nativeUI.alert("定位错误: " + e.message);
		});
	}
}
/*点击城市列表*/
mui("#city-list").on('tap', '.mui-navigate-right', function() {
	var city = App.clearSpace(this.innerHTML);
	console.log(city);
	App.evalJS("./pages/main_index_header.html","getAddress(\"" + city + "\")");
	mui.back();
});
mui.plusReady(function() {
	getPositon();
});