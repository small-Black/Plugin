// 1  传入URL
// 2  传入方法
// 3  传入数据
// 4  传入回调函数
// 5 是否异步
function ajax(options) {
    function createXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            var names = ["Microsoft", "msxm3", "msxml2", "msxml1"];
            for (var i = 0; i < names.length; i++) {
                try {
                    var name = names[i] + ".XMLHTTP";
                    return new ActiveXObject(name);
                } catch (e) {}
            }
        }
    }
    function dealXhrReponse(xhr,callback){
        if(xhr.readyState === 4 && xhr.status === 200){
        	callback(xhr.responseText);
        }
    }
    function setData(data){
    	if(typeof data ==="string"){
    		return data;
    	}else if(typeof data === "object" && data){
    		var arr = [];
    		for(var name in data){
    			var value = data[name].toString();
    			name = encodeURIComponent(name.replace("%20","+"));
    			value = encodeURIComponent(value.replace("%20","+"));
    			arr.push(name+"="+value);
    		}
    		return arr.join("&");
    	}else{
    		return null;
    	}
    }
    var url = options.url || "",
        method = options.type || "get",
        data = options.data || null,
        contentType = options.contentType || "",
        async = options.async || true,
        callback = options.callback || (function() {});
    if (!url) {
        return;
    }
    var xhr = createXHR();
    xhr.open(method, url, async);
    if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }
    if (async) {
        xhr.onreadystatechange = function() {
        	dealXhrReponse(xhr,callback);
        };
    }else{
    	dealXhrReponse(xhr,callback);
    }
    xhr.send(setData(data));
}
