(function($, owner) {
	
	owner.isReadAnnounce = function(param, callback) {
		callback = callback || $.noop;
		param.readannounceid = param.readannounceid || 0;
		
		var uri = owner.serverURI + "Article/last_read_announce.html";
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
		var uri = owner.serverURI + "Deal/get_provide_list.html";
		if(type == 2) {
			uri = owner.serverURI + "Deal/get_accept_list.html";
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
						tmpl += '<div class="list-line"><div class="deal-block '+(v.d_type == 3 ? 'accept_block':'provide_block')+'" id="'+v.d_id+'" type="'+v.d_type+'">';
						tmpl += '	<div class="deal_x_left"><img src="images/nav'+(type == 1 ? '1' : '3')+'.jpg"/><div class="deal_head">'+'</div>';
						tmpl += '	<div class="deal_number">'+v.d_number+'</div></div>';
						tmpl += '	<div class="deal_x_right"><div class="deal_icon">';
						tmpl += '		<span class="'+(v.d_type == 3 ? 'accept_deal' : ( v.d_type == 1 ? 'static_deal':'dynamic_deal'))+'">'+(v.d_type == 3 ? '得到帮助': (v.d_type == 1 ? '静态帮助':'动态帮助'))+'</span>';
						tmpl += '	</div></div>'; 
						tmpl += '	<div class="deal_divider"></div>';
						tmpl += '	<div class="deal_line">';
						tmpl += '		<p>参与人：'+v.d_username+'</p>';
						tmpl += '		<p>金额：'+parseInt(v.d_money)+' <span class="state">'+(v.d_process == 0 ? '正在调度' : ( v.d_process == 1 ? '部分匹配':'全部匹配'))+'</span></p>';
						tmpl += '		<p>日期：'+(formatDate(v.d_inputtime))+'</p>';
						tmpl += '	</div>';
						tmpl += '</div></div>'
						cntStr += tmpl;
					});
					document.querySelector("#" + container).innerHTML = cntStr;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.getPaList = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Deal/get_detail_list.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var process  = "";
						var processT = v.dd_process;
						switch (processT){
							case "1":
								process = "等待打款";
								break;
							case "2":
								process = "等待确认";
								break;
							case "3":
								process = "已完成";
								break;
							default:
								process = "无效状态";
								break;
						}
						var tmpl = '';
						tmpl += '<li class="'+(processT == 3 ? 'faild': (v.dd_acceptname == param.username ? 'warning' : 'success'))+'" data-type="'+(v.dd_acceptname == param.username ? '1' : '2')+'" data-id="'+v.dd_id+'">';
						tmpl += '	<span class="iconfont icon-woshoux-copy"></span>';
						tmpl += '	<div class="content">';
						tmpl += '		<p>['+(v.dd_acceptname == param.username ? "得到帮助" : "提供帮助")+'] ['+(v.dd_acceptname == param.username ? v.dd_providedealnumber : v.dd_acceptdealnumber)+'] '+process+'</p>';
						tmpl += '		<p>与 '+(v.dd_acceptname == param.username ? v.dd_providename : v.dd_acceptname)+' 匹配成功 '+v.dd_money+'</p>';
						tmpl += '		<p>'+(formatLongDate(v.dd_patime))+'</p>';
						tmpl += '	</div>';
						tmpl += '</li>';
						cntStr += tmpl;
					});
//					$.each(_.providedata, function(k,v) {
//						var process  = "";
//						var processT = v.dd_process;
//						switch (processT){
//							case "1":
//								process = "等待打款";
//								break;
//							case "2":
//								process = "等待确认";
//								break;
//							case "3":
//								process = "已完成";
//								break;
//							default:
//								process = "无效状态";
//								break;
//						}
//						var tmpl = '';
//						tmpl += '<li class="'+(processT == 3 ? 'faild': 'success')+'" data-type="2" data-id="'+v.dd_id+'">';
//						tmpl += '	<span class="iconfont icon-woshoux-copy"></span>';
//						tmpl += '	<div class="content">';
//						tmpl += '		<p>[提供帮助] ['+v.dd_providedealnumber+'] '+process+'</p>';
//						tmpl += '		<p>与 '+v.dd_acceptname+' 匹配成功 '+v.dd_money+'</p>';
//						tmpl += '		<p>'+(formatLongDate(v.dd_patime))+'</p>';
//						tmpl += '	</div>';
//						tmpl += '</li>';
//						cntStr += tmpl;
//					}); 
//					console.log(cntStr)
					document.querySelector("#pa_list").innerHTML = cntStr;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.mainLoadAnnounce = function(callback) {
		callback = callback || $.noop;
		var param = {};
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		var uri = owner.serverURI + "Article/get_announce.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					tokenState.readannounceid = _.data.a_id;
					owner.setState(tokenState);
					document.querySelector("#title").innerHTML = "公告：("+formatDate(_.data.a_inputtime)+")" + _.data.a_title;
					
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
}(mui, window.app = commonApp));