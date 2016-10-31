(function($, owner) {
	
	owner.getProvideInfo = function(callback) {
		callback = callback || $.noop;
		
		var tokenState = owner.getState();
		param = {};
		param.token = tokenState.token;
		param.username = tokenState.username;
		
		var uri = owner.serverURI + "System/get_provide.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, {}, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					document.querySelector("#cash").placeholder = _.data.tips;
					document.querySelector("#warning-content").innerHTML = _.data.warning;
					document.querySelector("#notice-content").innerHTML = _.data.notice;
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.sendProvide = function(param, callback){
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || "";
		param.isread = param.isread || 0;
		param.cash = param.cash || 0;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback("账户错误！");
		}
		if(param.isread == "no") {
			return callback("您应该先点击  我同意《风险提示内容》");
		}
		if(param.cash == 0) {
			return callback("请正确填写您承诺提供的金额！");
		}
		
		var uri = owner.serverURI + "Deal/provide.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	
}(mui, window.app = commonApp));