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
    //编码传送主体
    function setData(data) {
        if (typeof data === "string") {
            return data.replace("%20", "+");
        } else if (typeof data === "object" && data) {
            var arr = [];
            for (var name in data) {
                var value = data[name].toString();
                name = encodeURIComponent(name.replace("%20", "+"));
                value = encodeURIComponent(value.replace("%20", "+"));
                arr.push(name + "=" + value);
            }
            return arr.join("&");
        } else {
            return null;
        }
    }
    var url = options.url || "", //请求的链接
        type = options.type.toLowerCase() || "get", //请求的方法,默认为get
        data = options.data || null, //请求的数据
        contentType = options.contentType || "", //请求头的设置
        async = options.async === undefined && true, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。 
        before = options.before, //发送之前执行的函数
        error = options.error, //错误执行的函数
        callback = options.callback || (function() {}); //请求成功的回调函数
    if (!url) {
        return;
    }
    //若是使用get方法,并且有传送数据，则手动添加到URL中
    if (type === "get" && data) {
        var string_data = setData(data);
        if (url.indexOf("?") > -1) {
            url += string_data;
        } else {
            url += ("?" + string_data);
        }
    }
    //发送之前执行的函数
    before && before();
    //创建对象。
    var xhr = createXHR();
    xhr.open(type, url, async);
    //设置请求头
    if (type === "post" && !contentType) {
        //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    }else if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }
    //设置请求超时
    var timeout_bool = false;
    var timeout_flag = null;
    //由于执行abort()方法后，有可能触发onreadystatechange事件，
    //所以设置一个timeout_flag标识，来忽略中止触发的事件。
    if (timeOut !== undefined) {
        timeout_flag = setTimeout(function() {
            timeout_bool = true;
            xhr.abort();
        }, timeOut);
    }

    //添加监听
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (timeOut !== undefined) {
                if (timeout_bool) {
                    return;
                }
                clearTimeout(timeout_flag);
            }
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                callback(xhr.responseText);
            } else {
                error && error(xhr.status, xhr.statusText);
            }
        }
    };
    //发送请求
   (type === "post") ? xhr.send(setData(data)): xhr.send(null);

}
ajax({
    url: "baidu.com", //请求的链接
    type: "get", //请求的方法
    contentType: "text/plain", //MINE类型设置
    async: true, //是否异步，
    timeOut: 1000, //超时时间，以毫秒计算,
    before: function() { //发送之前执行的函数
    },
    error: function() { //错误产生的函数
    },
    data: {
        a: 123,
        b: "123"
    }, //请求的数据，传入一个对象或者字符串
    callback: function(str) { //请求的回调函数
        console.log(str);
    }
});
