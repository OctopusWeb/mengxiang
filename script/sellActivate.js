(function($, owner) {
	
	owner.createState = function(count, callback) {
		var state = owner.getState();
		state.activateCount = count;
		owner.setState(state);
		return callback(); 
	};
	
	owner.sellActivate = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.fromuser = param.fromuser || '';
		param.touser = param.touser || '';
		param.sellcount = param.sellcount || 0;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		param.username = tokenState.username;
		
		if (param.fromuser == "") {
			return callback('账号错误！');
		}
		if (param.touser == "") {
			return callback('请填写要转让的账号！');
		}
		if (parseInt(param.sellcount) == 0) {
			return callback('请填写要转让的数量！');
		}
		var uri = owner.serverURI + "User/sell_activate.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					return owner.createState(_.data.count, callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
}(mui, window.app = commonApp));