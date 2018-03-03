//mui初始化
mui.init();
var subpages = ['./pages/main_index.html', './pages/main_information.html', './pages/main_interactive.html', './pages/main_mine.html'];
var subpage_style = {
	top: '45px',
	bottom: '51px',
	hardwareAccelerated:true
};
var subpage_styleIn = {
	top: '0px',
	bottom: '51px',
	hardwareAccelerated:true
};
var aniShow = {};

//创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
	if(!App.getItem("lauchFlag")) {
		var url = "./pages/guide.html";
		var id = "./pages/guide.html";
		var extras = {};
		App.openWindow(url, id, extras);
	}
	var self = plus.webview.currentWebview();
	for(var i = 0; i < 4; i++) {
		var temp = {};
		if(i != 0) {
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		} else {
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_styleIn);
		}

		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
});
//当前激活选项
var activeTab = subpages[0];
/*var title_left = App.getID("title_left");
var title = App.getID("title");
var title1 = App.getID("title1");
var title_right = App.getID("title_right");*/

//选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if(targetTab == activeTab) {
		return;
	}
	if(targetTab == "./pages/main_index.html") {
		/*App.getID("mainIndex").style.display = 'block';*/
		/*var scrollApi = mui('#scroll1').scroll(); //获取插件对象
		scrollApi.refresh(); //刷新
		scrollApi.scrollTo(0, 0); //滚动至顶部*/
		App.getID("mainInformation").style.display = 'none';
		App.getID("mainInteractive").style.display = 'none';
		App.getID("mainMine").style.display = 'none';

	} else if(targetTab == "./pages/main_information.html") {
		/*App.getID("mainIndex").style.display = 'none';*/
		App.getID("mainInformation").style.display = 'block';
		App.getID("mainInteractive").style.display = 'none';
		App.getID("mainMine").style.display = 'none';
	} else if(targetTab == "./pages/main_interactive.html") {
		/*App.getID("mainIndex").style.display = 'none';*/
		App.getID("mainInformation").style.display = 'none';
		App.getID("mainInteractive").style.display = 'block';
		App.getID("mainMine").style.display = 'none';
	} else if(targetTab == "./pages/main_mine.html") {
		/*App.getID("mainIndex").style.display = 'none';*/
		App.getID("mainInformation").style.display = 'none';
		App.getID("mainInteractive").style.display = 'none';
		App.getID("mainMine").style.display = 'block';
	}
	//显示目标选项卡
	//若为iOS平台或非首次显示，则直接显示
	if(mui.os.ios || aniShow[targetTab]) {
		plus.webview.show(targetTab);
	} else {
		//否则，使用fade-in动画，且保存变量
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow, temp);
		plus.webview.show(targetTab, "", 300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});
/*main_index标题*/