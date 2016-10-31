(function($, owner) {
	/**
	 * 获取订单列表
	 **/
	owner.getList = function(param, type, container, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Deal/get_provide_all_list.html";
		if(type == 1) {
			uri = owner.serverURI + "Deal/get_provide_all_list.html";
		}
		if(type == 2) {
			uri = owner.serverURI + "Deal/get_accept_all_list.html";
		}
		if(type == 3) {
			uri = owner.serverURI + "Deal/get_frozen_all_list.html";
		}
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var colorClass = "";
						colorClass = (v.d_process == 0 ? 'danger' : ( v.d_process == 1 ? 'warning':'success'));
						
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell">';
						tmpl += '	<div class="record-number">'; 
						tmpl += '		<span class="record-badge mui-badge-'+colorClass+'">'+(k+1)+'</span>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>订单编号：'+v.d_number+'</p>';
						tmpl += '		<p>'+(v.d_type == 3 ? '得到':'提供')+'金额：'+parseInt(v.d_money)+'</p>';
						tmpl += '		<p>申请时间：'+(formatLongDate(v.d_inputtime))+'</p>';
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '		<div class="mui-btn mui-btn-'+colorClass+'">'+(v.d_process == 0 ? '正在调度' : ( v.d_process == 1 ? '部分匹配':'全部匹配'))+'</div>';
						if(v.d_process != 0) {
							tmpl += '		<input type="hidden" class="dealid" value="'+v.d_id+'" />';
							tmpl += '		<input type="hidden" class="dealtype" value="'+v.d_type+'" />';
							tmpl += '		<button class="mui-btn mui-btn-blue showDetail" style="margin-top: 5px;">匹配详情</button>';
						}
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
	
	/***
	 * 获得订单匹配详情
	 */
	owner.getDetail = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.id  = param.id || 0;
		param.type = param.type || 0;
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.id == 0 || param.type == 0) {
			return callback("参数错误！");
		}
		if (param.username == "") {
			return callback('账户错误！');
		}
		
		var uri = owner.serverURI + "Deal/get_deal_detail.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var colorClass = "";
						colorClass = (v.dd_process == 1 ? 'danger' : ( v.dd_process == 2 ? 'warning':'success'));
						
						var tmpl = '';
						tmpl += '<li class="mui-table-view-cell" data-id="'+v.dd_id+'" data-type="'+(param.type == 3 ? '1' : '2')+'">';
						tmpl += '	<div class="record-info">';
						tmpl += '		<p>匹配单号：'+v.dd_number+'</p>';
						tmpl += '		<p>'+(param.type == 3 ? '供单单号' : '受单单号')+'：'+(param.type == 3 ? v.dd_providedealid : v.dd_acceptdealid)+'</p>';
						tmpl += '		<p>'+(param.type == 3 ? '供单会员' : '受单会员')+'：'+(param.type == 3 ? v.dd_providename : v.dd_providename)+'</p>';
						tmpl += '		<p>匹配金额：'+v.dd_money+'</p>';
						if(param.type != 3) {
						tmpl += '		<p>预计收益：<font color="red">'+(v.dd_money * _.precent)+'</font></p>';
						}
						tmpl += '		<p>匹配时间：'+(formatLongDate(v.dd_patime))+'</p>';
						if(v.dd_process == 3) {
						tmpl += '		<p>解冻时间：'+(formatLongDate(v.dd_frozenend))+'</p>';
						}
						tmpl += '	</div>';
						tmpl += '	<div class="record-btn">';
						tmpl += '		<div class="mui-btn mui-btn-'+colorClass+'">'+(v.dd_process == 1 ? '等待打款' : ( v.dd_process == 2 ? '等待确认':'已完成'))+'</div>';
						tmpl += '	</div>';
						tmpl += '</li>';
						
						cntStr += tmpl;
					});
					document.querySelector("#detail_list").innerHTML = cntStr;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
}(mui, window.app = commonApp));