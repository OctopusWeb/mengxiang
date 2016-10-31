(function($, owner) {
	/**
	 * 获取冻结日志
	 **/
	owner.getFrozenList = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Bonus/get_frozen_list.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell">';
						tmpl += '	<div class="record-number">';
						tmpl += '		<span class="record-badge mui-badge-success">'+(k+1)+'</span>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>冻结金额：'+parseInt(v.l_money)+'</p>';
						tmpl += '		<p>资金变动：'+(v.l_moneytype == 1?'<font color="green">未解冻</font>':'<font color="red">已解冻</font>')+'</p>';
						tmpl += '		<p>记录时间：'+(formatLongDate(v.l_logtime))+'</p>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '		<input type="hidden" class="logid" value="'+v.l_id+'" />';
						tmpl += '		<button class="mui-btn mui-btn-blue showDetail" style="margin-top: 5px;">查看详情</button>';
						tmpl += '	</div>';
						tmpl += '</li>';
						 
						cntStr += tmpl;
					});
					document.querySelector("#forzen-list").innerHTML = cntStr;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	};
	/**
	 * 获取利息日志
	 **/
	owner.getInterestList = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Bonus/get_interest_list.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell">';
						tmpl += '	<div class="record-number">';
						tmpl += '		<span class="record-badge mui-badge-success">'+(k+1)+'</span>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>利息金额：'+parseInt(v.l_money)+'</p>';
						tmpl += '		<p>资金变动：'+(v.l_moneytype == 1?'<font color="green">增加</font>':'<font color="red">减少</font>')+'</p>';
						tmpl += '		<p>记录时间：'+(formatLongDate(v.l_logtime))+'</p>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '		<input type="hidden" class="logid" value="'+v.l_id+'" />';
						tmpl += '		<button class="mui-btn mui-btn-blue showDetail" style="margin-top: 5px;">查看详情</button>';
						tmpl += '	</div>';
						tmpl += '</li>';
						
						cntStr += tmpl;
					});
					document.querySelector("#interest-list").innerHTML = cntStr;
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
		
		var uri = owner.serverURI + "Bonus/get_frozen_detail.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					$.alert(_.data,"冻结详情");
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
}(mui, window.app = commonApp));