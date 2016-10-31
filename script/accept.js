(function($, owner) {
	
	owner.getAcceptInfo = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || "";
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback("账户错误！");
		}
		
		var uri = owner.serverURI + "System/get_accept.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					document.querySelector("#cash").placeholder = _.data.tips;
					document.querySelector("#notice-content").innerHTML = _.data.notice;
					document.querySelector("#static-fee").innerHTML = "有 "+_.data.static_fee + " 余额";
					document.querySelector("#dynamic-fee").innerHTML = "有 "+_.data.dynamic_fee + " 余额";
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.sendAccept = function(param, callback){
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || "";
		param.wallet = param.wallet || 0;
		param.cash = param.cash || 0;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback("账户错误！");
		}
		if(param.wallet == 0) {
			return callback("请选择您要取款的钱包");
		}
		if(param.cash == 0) {
			return callback("请填写您本次申请得到帮助的金额！");
		}
		
		var uri = owner.serverURI + "Deal/accept.html";
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
	
	owner.checkRealAudit = function(param, callback){
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || "";
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback("账户错误！");
		}
		
		var uri = owner.serverURI + "User/check_real_audit.html";
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