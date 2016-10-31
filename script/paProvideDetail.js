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
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;收款人姓名：'+v.truename+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-success">></span> &nbsp;收款人电话：'+v.telephone+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-danger">></span> &nbsp;收款人银行：'+v.bankstr+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;收款人银行户主：'+v.bankname+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-success">></span> &nbsp;收款人卡号：'+v.banknumber+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;收款人支付宝：'+v.alipay+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-danger">></span> &nbsp;领导人姓名：'+v.parenttruename+'</p>';
					tmpl += '		<p><span class="mui-badge mui-badge-warning">></span> &nbsp;领导人电话：'+v.parenttelephone+'</p>';
					tmpl += '	</div>';
					tmpl += '</li>';
					if(v.dealstatus == 1) {
						document.querySelector("#deal-title").innerHTML = "请给对方打款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkred";
						document.querySelector("#detail_list").parentNode.style.paddingBottom = "0";
						document.querySelector("#check-deal-btn").innerHTML = "<button type='button' id='provide-submit' class='mui-btn mui-btn-primary mui-btn-block' data-id='"+param.id+"'>确认打款</button>";
						var uploadTmpl = "";
						uploadTmpl += '<div class="upload-container">';
						uploadTmpl += '	<div class="mui-content-padded" style="margin: 0;">';
						uploadTmpl += '		<label>上传打款凭证：</label>';
						uploadTmpl += '		<div id="changeAvatar" class="touxiang" onclick="showActionSheet()">';
						uploadTmpl += '		    <img src="./images/iconfont-tianjia.png">';
						uploadTmpl += '		</div>  ';
						uploadTmpl += '		<div id="spinner">';
						uploadTmpl += '		    <div class="waint-container">';
						uploadTmpl += '		        <div class="waint-coin">';
						uploadTmpl += '		            <span class="mui-spinner"></span>';
						uploadTmpl += '		        </div>';
						uploadTmpl += '		        <div class="want-text">请稍等...</div>';
						uploadTmpl += '		        <div class="clear"></div>';
						uploadTmpl += '		    </div>';
						uploadTmpl += '		</div>';
						uploadTmpl += '	</div>';
						uploadTmpl += '</div>';
						document.querySelector("#check-deal-info").innerHTML = uploadTmpl;
						if(parseInt(v.splitSeconds) > 0) {
							document.querySelector("#clock-div").style.display="block";
							alertSet(v.splitSeconds,v.maxSeconds);
						}
					}
					if(v.dealstatus == 2) {
						document.querySelector("#deal-title").innerHTML = "请等待对方确认收款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkorange";
						if(parseInt(v.splitSeconds) > 0) {
							document.querySelector("#clock-div").style.display="block";
							document.querySelector("#js-alert-box").style.marginTop = "-100px";
							alertSet(v.splitSeconds,v.maxSeconds);
						}
					}
					if(v.dealstatus == 3) {
						document.querySelector("#deal-title").innerHTML = "对方已确认收款："+v.dealmoney;
						document.querySelector("#deal-title").style.color = "darkgreen";
					}
					document.querySelector("#detail_list").innerHTML = tmpl;
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	owner.uploadScrip = function(param, callback){
		
		callback = callback || $.noop;
		param = param || {};
		param.ddid = param.ddid || 0;
		param.username = param.username || '';
		param.isupload = param.isupload || 1;
		
		var tokenState = owner.getState();
		param.token = tokenState.token;
		
		if(param.username == "") {
			return callback('账户错误！');
		}
		
		if(param.ddid == 0) {
			return callback("参数错误！");
		}
		
		var uri = owner.serverURI + "Deal/uploadScrip.html";
		if(param.isupload == 0) {
			postImages(function(rs){
				if(rs.error) {
					return callback(rs.msg);
				} else {
					param.scrippath = rs.path;
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
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
}(mui, window.app = commonApp));