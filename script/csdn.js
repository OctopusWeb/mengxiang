function postImages(callback) {  
    var petimage = $("#changeAvatar > img").attr("src");
	var uri = app.serverURI + "Main/uploadImage.html";
	$("#spinner").show();
	$("#spinner").find(".want-text").html("正在上传图片...");
	var rs = {};
	mui.post(uri, {pic:petimage},function(e){
		if(!e.error) {
			$("#changeAvatar > img").attr("isupload",1);
		}
		rs.error = e.error;
		rs.msg = e.msg;
		rs.path = e.path;
		if(typeof callback == "function") {
			callback(rs);
		}
	},"json")
}

function rar(url) {
	var img = new Image();
	img.src = url;
	img.onload = function() {
		var that = img;
		var w = that.width;
		var h = that.height;
		var scale =  w / h;
		
		w = 320 || w;
		h = w / scale;
		
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		$(canvas).attr({
			width:w,
			height: h
		});
		ctx.drawImage(that,0,0,w,h);
		var base64 = canvas.toDataURL("image/jpeg", 0.5);
		
		$("#changeAvatar > img").attr("src", base64);
		$("#changeAvatar > img").attr("isupload", 0);
	}
}
//拍照
function getImage() {  
    var cmr = plus.camera.getCamera();
    cmr.captureImage(function(p) {
        plus.io.resolveLocalFileSystemURL(p, function(entry) {
        	var localurl = entry.toLocalURL();
            rar(localurl);
        }, function(err) {
        	mui.alert(err.message,"错误");
        });
    },function(e){},{index:1,filename:"_doc/camera/"});
}
//相册选取  
function galleryImgs() {
    plus.gallery.pick(function(e) {
	    rar(e);
    }, function(e) {  
    }, {  
        filter: "image"  
    });
}  

function showActionSheet() {  
    var bts = [{  
        title: "拍照"  
    }, {  
        title: "从相册选择"  
    }];
    plus.nativeUI.actionSheet({  
            cancel: "取消",  
            buttons: bts  
        },  
        function(e) {  
            if (e.index == 1) {  
                getImage();
            } else if (e.index == 2) {  
                galleryImgs();
            }  
        }  
    );
}  