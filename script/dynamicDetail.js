(function($, owner) {
	/**
	 * 获取订单列表
	 **/
	owner.getList = function(param, container, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Bonus/get_sign_list.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell" style="height:103px;">';
						tmpl += '	<div class="record-number">';
						tmpl += '		<span class="record-badge mui-badge-success">'+(k+1)+'</span>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>产生人：'+v.l_aboutname+'</p>';
						tmpl += '		<p>资金变动：'+(v.l_moneytype == 1?'<font color="green">增加</font>':'<font color="red">减少</font>')+'</p>';
						tmpl += '		<p>记录时间：'+(formatLongDate(v.l_logtime))+'</p>';
						tmpl += '		<p>产生金额：'+parseInt(v.l_money)+'</p>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '	</div>';
						tmpl += '</li>';
						
						cntStr += tmpl;
					});
					document.querySelector("#" + container).innerHTML = cntStr;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	
	owner.getGradeList = function(param, type, container, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Bonus/get_grade_team1_list.html";
		if(type == 1) {
			uri = owner.serverURI + "Bonus/get_grade_team1_list.html";
		}
		if(type == 2) {
			uri = owner.serverURI + "Bonus/get_grade_team2_list.html";
		}
		if(type == 3) {
			uri = owner.serverURI + "Bonus/get_grade_team3_list.html";
		}
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell" style="background:#eee;" log-id="'+v.l_id+'">';
						tmpl += '	<div class="record-number">';
						tmpl += '		<span class="record-badge mui-badge-success">'+(k+1)+'</span>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>产生人：'+v.l_optionname+'</p>';
						tmpl += '		<p>资金变动：'+(v.l_moneytype == 1?'<font color="green">增加</font>':'<font color="red">减少</font>')+'</p>';
						tmpl += '		<p>记录时间：'+(formatLongDate(v.l_logtime))+'</p>';
						tmpl += '		<p>产生金额：'+parseInt(v.l_money)+'</p>';
						tmpl += '		<p>提成比例：'+_.precent+'%</p>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '	</div>';
						tmpl += '</li>';
						
						cntStr += tmpl;
					});
					document.querySelector("#item" + container + "_count").innerHTML = _.count;
					document.querySelector("#grade_team" + container).innerHTML = cntStr;
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	owner.getLogDetail = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		param.lid = param.lid || 0;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		if (param.lid == 0) {
			return callback('无详细记录！');
		}
		
		var uri = owner.serverURI + "Bonus/get_dynamic_detail.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					$.alert(_.data,"代数奖详情");
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
}(mui, window.app = commonApp));