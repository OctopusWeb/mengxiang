(function($, owner) {
	
	owner.loadAnnounce = function(callback) {
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
					console.log(JSON.stringify(_))
					var content = _.data.a_content
					content = content.replace(/\\n/g,"")
					tokenState.readannounceid = _.data.a_id;
					owner.setState(tokenState);
					document.querySelector("#announce-title").innerHTML = _.data.a_title;
					document.querySelector("#announce-title1").innerHTML = _.data.a_title;
					document.querySelector("#announce-content").innerHTML = content;
					return callback();
				}
			}, 'json');
		}else{
			callback("当前网络不给力，请稍后再试...");
		}
	}
	
}(mui, window.app = commonApp));