(function($, owner) {
	
	owner.getQuestionList = function(callback){
		callback = callback || $.noop;
		var uri = owner.serverURI + "Article/get_list.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, {}, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					var cntStr = "";
					$.each(_.data, function(k,v) {
						var tmpl = "";
						tmpl += '<div class="mui-card">';
						tmpl += '	<div class="mui-card-header mui-card-media">';
						tmpl += '		<img src="images/what.jpg" />';
						tmpl += '		<div class="mui-media-body">'+v.a_title+'<p>发表于 '+(formatLongDate(v.a_inputtime))+'</p></div>';
						tmpl += '	</div>';
						tmpl += '	<div class="mui-card-content">';
						tmpl += '		<div class="mui-card-content-inner">'+v.a_description+'</div>';
						tmpl += '	</div>';
						tmpl += '	<div class="mui-card-footer">';
						tmpl += '		<a class="mui-card-link artcle-link" id="'+v.a_id+'">查看详情</a>';
						tmpl += '	</div>';
						tmpl += '</div>';
						cntStr += tmpl;
					});
					cntStr += '<div class="mui-content-padded">'+_.page+'</div>'
					document.querySelector("#question-list").innerHTML = cntStr;
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	owner.getQuestionDetail = function(param, callback){
		callback = callback || $.noop;
		param = param || {};
		param.articleid = param.articleid || 0;
		
		if(param.articleid == 0) {
			return callback("参数错误！");
		}
		
		var uri = owner.serverURI + "Article/get_detail.html";
		if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE){
			$.post(uri, param, function(_){
				if(_.error) {
					return callback(_.msg);
				} else {
					document.querySelector("#article-title").innerHTML = _.data.a_title;
					document.querySelector("#article-content").innerHTML = _.data.a_content;
					return callback();
				}
			}, "json");
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
	
}(mui, window.app = commonApp));