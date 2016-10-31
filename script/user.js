(function($, owner) {
	
	owner.setUserinfo = function(param, callback){
		
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		param.truename =  param.truename || '';
		param.idcard =  param.idcard || '';
		param.cardbank =  param.cardbank || '';
		param.cardaccount =  param.cardaccount || '';
		param.cardname =  param.cardname || '';
		param.cardnumber =  param.cardnumber || '';
		param.alipay =  param.alipay || '';
		param.lalacoin = param.lalacoin || '';
		param.isupload = param.isupload || 1;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback('账户错误！');
		}
		if(param.truename == "") {
			return callback("请填写您的真实姓名！");
		}
		if(param.idcard == "") {
			return callback("请填写您的身份证！");
		}
		
		var condition1 = ( param.cardbank == "" || param.cardaccount == "" || param.cardnumber == "" || param.cardname == "" );
		var condition2 = ( param.alipay == "" );
		var condition3 = ( param.lalacoin == "" );
		
		var condition11 = ( param.cardbank == null || param.cardaccount == null || param.cardnumber == null || param.cardname == null );
		var condition21 = ( param.alipay == null );
		var condition31 = ( param.lalacoin == null );
		
		var conditionStr = (condition1 || condition11 || condition2 || condition21) && (condition3 || condition31);

		if(conditionStr) {
			return callback("银行卡 / 支付宝 您必须要填写数据！");
		}
		
		var uri = owner.serverURI + "User/set_userinfo.html";
		if(param.isupload == 0) {
			postImages(function(rs){
				if(rs.error) {
					return callback(rs.msg);
				} else {
					param.cardpath = rs.path;
					document.querySelector("#spinner .want-text").innerHTML = "正在保存资料...";
					owner.postInfo(param, uri, callback);
				}
			});
		} else {
			owner.postInfo(param, uri, callback);
		}
	}
	
	owner.postInfo = function(param,uri,callback){
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					document.querySelector("#spinner").style.display = "none";
					return owner.updatePayInfo(_.data, callback);
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.updatePayInfo = function(user, callback) {
		var state = owner.getState();
		
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
	
	owner.getWallet = function(param, callback){
		
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账号错误！');
		}
		var uri = owner.serverURI + "User/userinfo.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					return owner.updateWallet(_.data, callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.updateWallet = function(user, callback){
		var state = owner.getState();
		
		state.staticwallet = user.static_wallet;
		state.dynamicwallet = user.dynamic_wallet;
		state.frozenwallet = user.frozen_wallet;
		state.activatewallet = user.activate_wallet;
		
		owner.setState(state);
		return callback(); 
	}
	
}(mui, window.app = commonApp));