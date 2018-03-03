var aniShow = {};
var subpages = ['../pages/my_information_question.html', '../pages/my_information_talk.html'];
var subpage_style = {
	top: '40px',
	bottom: '0px',
	hardwareAccelerated:true
};
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	for(var i = 0; i < 2; i++) {
		var temp = {};

		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);

		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}

})
var activeTab = subpages[0];
//选项卡点击事件
mui('#defaultTab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if(targetTab == activeTab) {
		return;
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