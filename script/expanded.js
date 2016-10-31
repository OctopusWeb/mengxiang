(function($, owner) {
	/**
	 * 用户信息
	 **/
	owner.userinfo = function(param, callback) {
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
					var data = _.data;
					document.querySelector("#activate_count").innerHTML = data['activate_wallet'];
					
					var nState = owner.getState();
					nState.truename = data.truename;
					nState.group = data.group;
					nState.activate_count = data.activate_wallet;
					nState.lastsign = data.last_sign_time;
					
					owner.setState(nState);
					return callback();
				} 
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	/**
	 * 用户团队
	 **/
	owner.userteam = function(param, container, countContainer, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		param.level    = param.level || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") { 
			return callback('账号错误！');
		}
		if (param.level != 1 && param.level != 2 && param.level != 3) {
			return callback('无效访问！');
		}
		var uri = owner.serverURI + "User/user_team.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					cntStr = "";
					var provideStr = 'mui-badge mui-badge-success';
					var acceptStr = 'mui-badge mui-badge-warning';
					$.each(_.data, function(k,v) {
						var tmpl = "";
						if(v.frozen == 0){
							tmpl += '<tr data-id="'+v.uid+'">';
						}else{
							tmpl += '<tr data-id="'+v.uid+'" class="trBk">';
						}
						if(v.activatetime == null || v.activatetime == ""){
							var zhuangtai = '未激活'
						}else if(v.frozen == 1 || v.activatetime == ""){
							var zhuangtai = '冻结'
						}else{
							var zhuangtai = v.group
						}
						tmpl += '	<td align="center">'+(k+1)+'</td>';
						tmpl += '	<td align="center">'+v.truename+'</td>';
						tmpl += '	<td align="center">'+(formatDate(v.registertime))+'</td>';
						tmpl += '	<td align="center" id="active_'+v.uid+'">'+zhuangtai+'</td>';
						tmpl += '	<td align="center"><span class="'+(v.type == 3 ? acceptStr : provideStr)+'">'+(v.type == 3 ? "得" : (v.type == 1 ? '静':'动'))+'</span>'+v.money+'</td>';
						tmpl += '</tr>';
						cntStr += tmpl;
					});
					document.querySelector("#" + container).innerHTML = cntStr;
					document.querySelector("#" + countContainer).innerHTML = _.count;
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	/***
	 * 签到
	 */
	owner.sign = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账号错误！');
		}
		var uri = owner.serverURI + "User/sign.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					document.querySelector("#qiandao").setAttribute("class","yes");
					document.querySelector("#qiandao").innerHTML = "已签到";
					return owner.createState(_.data.time, callback);
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.createState = function(signTime, callback) {
		var state = owner.getState();
		state.lastsign = signTime;
		owner.setState(state);
		return callback(); 
	};
	
}(mui, window.app = commonApp));