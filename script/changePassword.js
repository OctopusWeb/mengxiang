(function($, owner) {
	
	owner.setNewPassword = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		param.rPassword = param.rPassword || '';
		param.nPassword = param.nPassword || '';
		param.cPassword = param.cPassword || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账号错误！');
		}
		if (param.rPassword == "") {
			return callback('请填写原密码！');
		}
		if (param.nPassword == "") {
			return callback('请填写新密码！');
		}
		if (param.nPassword == param.rPassword) {
			return callback('新密码不能与原密码一致！');
		}
		if (param.nPassword != param.cPassword) {
			return callback('两次密码输入不一致');
		}
		var uri = owner.serverURI + "User/change_password.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					return owner.createState(callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.createState = function(callback) {
		owner.setState({});
		return callback(); 
	};
	
}(mui, window.app = commonApp));