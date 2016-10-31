(function($, owner) {
	owner.getUserDetail = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.uid = param.uid || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		param.username = tokenState.username;
		
		var uri = owner.serverURI + "User/get_team_user.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					document.querySelector("#username").innerHTML = _.data.username;
					document.querySelector("#truename").innerHTML = _.data.truename;
					document.querySelector("#registertime").innerHTML = _.data.registertime;
					document.querySelector("#group").innerHTML = _.data.group;
					document.querySelector("#money").innerHTML = _.data.money;
					document.querySelector("#contact").innerHTML = _.data.contact;
					if(_.data.status == 0 && _.data.activatetime == "未激活"){
						document.querySelector("#btn-div").innerHTML = ('<button id="activate-btn" type="button" class="mui-btn mui-btn-block mui-btn-primary" uid="'+_.data.uid+'">激活会员</button>')
					}
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	owner.activateUser = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		param.uid = param.uid || 0;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		if (param.uid == 0) {
			return callback('要激活的账户错误！');
		}
		
		var uri = owner.serverURI + "User/activate_user.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					return owner.createState(_.data, callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	
	owner.createState = function(data, callback) {
		var state = owner.getState();
		state.activateCount = data.count;
		owner.setState(state);
		returnData = {};
		returnData.count = data.count;
		returnData.group = data.group;
		return callback(false,returnData); 
	};
	
}(mui, window.app = commonApp));