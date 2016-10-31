(function($, owner) {
	
	owner.sendFeedback = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || "";
		param.title = param.title || "";
		param.content = param.content || "";
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback("账户错误！");
		}
		
		if(param.title == "") {
			return callback("请填写反馈标题！");
		}
		
		if(param.content == "") {
			return callback("请详细填写您要反馈的内容！");
		}
		
		var uri = owner.serverURI + "Article/send_feedback.html";
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