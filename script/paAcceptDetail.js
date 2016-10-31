(function($, owner) {
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
		
		var uri = owner.serverURI + "Deal/get_pa_detail.html";
		
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					owner.restartLogin(_);
					return callback(_.msg);
				} else {
					var v = _.data;
					var tmpl = '';
					tmpl += '<li class="mui-table-view-cell">';
					tmpl += '	<div class="record-info">';
					tmpl += '		<p class="info-title">对方联系方式：</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;打款人姓名：'+v.truename+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-success">></span> &nbsp;打款人电话：'+v.telephone+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-danger">></span> &nbsp;领导人姓名：'+v.parenttruename+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;领导人电话：'+v.parenttelephone+'</p>';
					tmpl += '	</div>';
					tmpl += '</li>';
					if(v.dealstatus == 1) {
						document.querySelector("#deal-title").innerHTML = "请等待对方给您打款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkred";
						if(parseInt(v.splitSeconds) > 0) {
							document.querySelector("#clock-div").style.display="block";
							alertSet(v.splitSeconds,v.maxSeconds);
						}
					}
					if(v.dealstatus == 2) {
						document.querySelector("#detail_list").parentNode.style.paddingBottom = "0";
						document.querySelector("#deal-title").innerHTML = "请确认对方打款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkorange";
						document.querySelector("#check-deal-info").innerHTML = '<img src="'+owner.serverWeb+v.dealimage+'" data-preview-src="" data-preview-group="1" style="width:100px; height:100px">';
						document.querySelector("#check-deal-btn").innerHTML = "<button type='button' id='accept-submit' class='mui-btn mui-btn-primary mui-btn-block' data-id='"+param.id+"'>确认收款</button><button type='button' id='accept-error' class='mui-btn mui-btn-danger mui-btn-block' data-id='"+param.id+"'>虚假记录</button>";
						mui.previewImage();
						if(v.splitSeconds > 0) {
							document.querySelector("#clock-div").style.display="block";
							alertSet(v.splitSeconds);
						}
					}
					if(v.dealstatus == 3) {
						document.querySelector("#deal-title").innerHTML = "您已收到对方打款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkgreen";
					}
					document.querySelector("#detail_list").innerHTML = tmpl;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.checkScrip = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.ddid  = param.ddid || 0;
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.ddid == 0) {
			return callback("参数错误！");
		}
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Deal/check_scrip.html";
		
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
	
	owner.setBogus = function(param, callback) {
		callback = callback || $.noop;
		param = param || {};
		param.ddid  = param.ddid || 0;
		param.username = param.username || '';
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.ddid == 0) {
			return callback("参数错误！");
		}
		if (param.username == "") {
			return callback('账户错误！');
		}
		var uri = owner.serverURI + "Deal/set_bogus.html";
		
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