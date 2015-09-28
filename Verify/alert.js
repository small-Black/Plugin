
    function salert(str) {
        var winHeight = 0,
            winWidth = 0;
            // 获取窗口宽度
        if (window.innerWidth) {
            winWidth = window.innerWidth;
        } else if ((document.body) && (document.body.clientWidth)) {
            winWidth = document.body.clientWidth;
        }
        // 获取窗口高度
        if (window.innerHeight) {
            winHeight = window.innerHeight;
        } else if ((document.body) && (document.body.clientHeight)) {
            winHeight = document.body.clientHeight;
        }
        // 通过深入 Document 内部对 body 进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }
        //动态创建提示层
        var message = document.createElement("div");
        message.innerHTML = str;
        //设置样式
        var style = {

            position: "absolute",
            top: ((winHeight / 2) - 50) + "px",
            left: ((winWidth / 2) - 100) + "px",
            'z-index': 1000,
            display: 'inline-block',
            padding: '10px',
            'text-align': 'left',
            background: '#fff',
            color: '#990033',
            border: '2px solid #666',
            'border-radius': '10px',
            'font-weight': 500



        };
        for (var i in style) {
            message.style[i] = style[i];
        }

        document.body.appendChild(message);
        var number = 10;
        var stop = setInterval(function() {
            number = number - 1;
            message.style.opacity = number / 10;
        }, 200);
        setTimeout(function() {
            document.body.removeChild(message);
            clearInterval(stop);
        }, 2000);
    }


