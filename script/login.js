function formatDate(ns) {
	var now = new Date(parseInt(ns) * 1000);
	var year=now.getFullYear();     
	var month=now.getMonth()+1;     
	var day=now.getDate();     
	return year+"-"+month+"-"+day;     
}
(function($, owner) {
	//远程服务器地址
	owner.serverURI = "http://www.wxhymy.com/Mobile/";
	
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		
		var uri = owner.serverURI + "Main/login.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, loginInfo, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					return owner.createState(_.data, callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	
	owner.createState = function(user, callback) {
		var state = {};
		state.token = user.token;
		
		state.username = user.username;
		state.jointime = user.jointime;
		state.level = user.level;
		state.group = user.group;
		state.lastsign = user.last_sign_time;
		state.telephone = user.telephone;
		state.parent = user.parent;
		
		state.truename = user.truename;
		state.idcard = user.idcard;
		state.cardpath = user.cardpath;
		state.lalacoin = user.lalacoin;
		state.aplipay = user.aplipay;
		state.cardbank = user.cardbank;
		state.cardnumber = user.cardnumber;
		state.cardaccount = user.cardaccount;
		state.cardname = user.cardname;
		
		owner.setState(state);
		return callback(); 
	};
	
	/**
	 * 新用户注册
	 **/
	owner.register = function(param, callback) {
		callback = callback || $.noop;
		
		param.username   = param.username || '';
		param.password   = param.password || '';
		param.repassword = param.repassword || '';
		param.mobilesms  = param.mobilesms || '';
		param.truename   = param.truename || '';
		param.parent     = param.parent || '';
		param.verify     = param.verify || '';
		
		if(param.username == "") {
			return callback('请填写您的手机号');
		}
		if(param.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(param.password != param.repassword) {
			return callback('两次密码输入不一致！');
		}
		if(param.mobilesms == "") {
			return callback('请填写您收到的短信验证码！');
		}
		if(param.truename == "") {
			return callback('请填写您的真实姓名！');
		}
		if(param.parent == "") {
			return callback('请填写您的推荐人手机号！');
		}
		if(param.verify == "") {
			return callback('请填写图片验证码！');
		}
		var uri = owner.serverURI + "Main/register.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					return callback();
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	
	owner.isReisger = function(callback) {
		callback = callback || $.noop;
		var uri = owner.serverURI + "Main/check_isregister.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, {}, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					return callback();
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.check_site_state = function(callback){
		callback = callback || $.noop;
		var uri = owner.serverURI + "Main/check_open.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, {}, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					return callback();
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}

	owner.sendVerify = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.telephone = param.telephone || "";
		param.sendpage = "register";
		
		if(param.telephone == "") {
			return callback("请先输入您的手机号码！");
		}
		
		var uri = owner.serverURI + "Main/send_verify.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					return callback();
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
		
	};
	
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
	
}(mui, window.app = {}));