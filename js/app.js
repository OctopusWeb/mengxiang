function formatDate(ns) {
	var now = new Date(parseInt(ns) * 1000);
	var year=now.getFullYear();     
	var month=now.getMonth()+1;     
	var day=now.getDate();     
	return year+"-"+month+"-"+day;     
}
function formatLongDate(ns) {
	var now = new Date(parseInt(ns) * 1000);
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	return year+"-"+month+"-"+day + " " + hour + ":" + minute;
}
(function($, owner) {
	
	owner.isCloseSite = 0;
	
	owner.serverWeb = "http://www.wxhymy.com";
	//远程服务器地址
	owner.serverURI = owner.serverWeb + "/Mobile/";
	owner.restartLogin = function(_){
		if(_.error == 3) {
			if(owner.isCloseSite == 0) {
				$.alert(_.msg,"拉拉平台","",function(){
					owner.setState({});
					plus.runtime.restart();
				});
				owner.isCloseSite = 1;
			}
			return;
		}
	}
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};
	
	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	
}(mui, window.commonApp = {}));
var webPageFunction;
(function($, doc) {
	$.plusReady(function() {
		var mainPage = $.preload({
			"id": 'main',
			"url": 'main.html',
			"subpages": {
				"id": "main_data",
				"url": "main_data.html"
			}
		});
		var shopPage = $.preload({
			"id": 'shop',
			"url": 'shop.html'
		});
		var userPage = $.preload({
			"id": 'user',
			"url": 'user.html'
		});
		var expandedPage = $.preload({
			"id": 'expanded',
			"url": 'expanded.html'
		});
		var mainButton = doc.getElementById('index_main');
		var expandedButton = doc.getElementById('index_expanded');
		var shopButton = doc.getElementById('index_shop');
		var userButton = doc.getElementById('index_user');
		userButton != null && mainButton.addEventListener('tap', function(event) {
			if(typeof webPageFunction == "function") {
				webPageFunction();
			}
			$.fire(mainPage,"refresh",null);
			$.openWindow({
				id: 'main',
				waiting: {
					autoShow: false
				}
			});
		})
		expandedButton != null && expandedButton.addEventListener('tap', function(event) {
			if(typeof webPageFunction == "function") {
				webPageFunction();
			}
			$.fire(expandedPage, 'changeCount', null);
			$.openWindow({
				id: 'expanded',
				waiting: {
					autoShow: false
				}
			});
		})
		shopButton != null && shopButton.addEventListener('tap', function(event) {
			if(typeof webPageFunction == "function") {
				webPageFunction();
			}
			$.openWindow({
				id: 'shop',
				waiting: {
					autoShow: false
				}
			});
		})
		userButton != null && userButton.addEventListener('tap', function(event) {
			if(typeof webPageFunction == "function") {
				webPageFunction();
			}
			$.fire(userPage, 'refreshData', null);
			$.openWindow({
				id: 'user',
				show: {
					autoShow: true,
					aniShow: 'slide-in-right'
				},
				waiting: {
					autoShow: false
				}
			});
		})
	});
}(mui, document));
