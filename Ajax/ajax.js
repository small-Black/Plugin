function ajax(options) {
    //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
    //所以创建XHR对象，需要在这里做兼容处理。
    function createXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            //遍历IE中不同版本的ActiveX对象
            var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
            for (var i = 0; i < versions.length; i++) {
                try {
                    var version = versions[i] + ".XMLHTTP";
                    return new ActiveXObject(version);
                } catch (e) {}
            }
        }
    }
    // 创建JSONP
    function createJsonp() {
        var script = document.createElement("script"),
            timeName = new Date().getTime() + Math.round(Math.random() * 1000),
            callback = "SUCCESS_" + timeName,
            callbackFail = "FAIL_" + timeName;
        
        window[callback] = function(data) {
            clearTimeout(timeout_flag);
            document.body.removeChild(script);
            success(data);
        }
        window[callbackFail] = function(data) {
            clearTimeout(timeout_flag);
            document.body.removeChild(script);
            error(data);
        }
        script.src = url + "&callback=" + callback + "&callbackFail=" + callbackFail;
        script.type = "text/javascript";
        document.body.appendChild(script);
        setTime(callback,script);
    }

    //设置请求超时
    function setTime(callback,script) {
        if (timeOut !== undefined) {
            timeout_flag = setTimeout(function() {
                if (dataType === "jsonp") {
                    delete window[callback];
                    document.body.removeChild(script);
                } else {
                    timeout_bool = true;
                    xhr && xhr.abort();
                }

            }, timeOut);
        }
    }

    function setUrl() {
        //若是使用get方法,并且有传送数据，则手动添加到URL中
        if (data && type === "get" || dataType === "jsonp") {
            url += url.indexOf("?") > -1 ? send_data : "?" + send_data;
            if (xhr) {
                send_data = null;
            }
        }
    }
    //编码传送主体
    function setData(data) {
        var name, value;
        if (typeof data === "string") {
            data = data.split("&");
            for (var i = 0, len = data.length; i < len; i++) {
                name = data[i].split("=")[0];
                value = data[i].split("=")[1];
                data[i] = name + "=" + encodeURIComponent(value);
            }
            return data.replace("/%20/g", "+");
        } else if (typeof data === "object" && data) {
            var arr = [];
            for (var name in data) {
                var value = data[name].toString();
                name = encodeURIComponent(name);
                value = encodeURIComponent(value);
                arr.push(name + "=" + value);
            }
            return arr.join("&").replace("/%20/g", "+");
        } else {
            return null;
        }
    }
    var url = options.url || "", //请求的链接
        type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
        data = options.data || null, //请求的数据
        contentType = options.contentType || "", //请求头的设置
        dataType = options.dataType || "",
        async = options.async === undefined && true, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。 
        before = options.before, //发送之前执行的函数
        error = options.error, //错误执行的函数
        success = options.success || (function() {}); //请求成功的回调函数
    var timeout_bool = false, //是否请求超时
        timeout_flag = null, //超时标识
        send_data = setData(data), // 编码数据主体。
        xhr = null;

    before && before(); //发送之前执行的函数

    setUrl(); //设置Url

    if (dataType === "jsonp") {
        createJsonp();
    } else {
        //创建对象。
        xhr = createXHR();
        xhr.open(type, url, async);
        //设置请求头
        if (type === "post" && !contentType) {
            //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        } else if (contentType) {
            xhr.setRequestHeader("Content-Type", contentType);
        }
        //添加监听
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (timeOut !== undefined) {
                    //由于执行abort()方法后，有可能触发onreadystatechange事件，
                    //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                    if (timeout_bool) {
                        return;
                    }
                    clearTimeout(timeout_flag);
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                    success(xhr.responseText);
                } else {
                    error && error(xhr.status, xhr.statusText);
                }
            }
        };
        //发送请求
        xhr.send(send_data);
        setTime(); //请求超时
    }
}
ajax({
    url: "http://api.65.com/65api/hero_list.php", //请求的链接
    data: {
      id:"",
      limit:1000,
      direction:""
    }, 
    success: function(str) { //请求的回调函数
        console.log(str);
    }
});
