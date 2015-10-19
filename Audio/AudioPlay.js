(function() {
    function AudioPlay(options) {
        //输入
        this.audio = document.querySelector(options.dom) || null; //audio元素
        this.data = options.data || []; //音频数据
        this.autoplay = options.autoplay || false; //自动播放

        // 获取DOM节点
        this.music_name = document.querySelector(".audioplay-name") || null;
        this.control = document.querySelector(".audioplay-control") || null;
        this.control_status = document.querySelector("#audioplay-status") || null;
        this.total_time_dom = document.querySelector(".audioplay-total-time") || null;
        this.cur_time_dom = document.querySelector(".audioplay-cur-time") || null;
        this.list = document.querySelector(".audioplay-list ul") || null;
        this.progress_status = document.querySelector(".audioplay-progress-status") || null;
        this.progress = document.querySelector(".audioplay-progress");
        this.volume = document.querySelector(".audioplay-volume");
        this.volume_status = document.querySelector(".audioplay-volume-status");
        this.progress_buffered = document.querySelector(".audioplay-progress-buffered") || null;

        this.init();


    }
    //初始化
    AudioPlay.prototype.init = function() {

        var data = this.data;
        if (data.length > 0) {
            //初始化播放列表
            for (var i = 0, len = data.length; i < len; i++) {
                this.list.innerHTML += "<li data-url=" + data[i].url + " class=" + (i === 0 && "on") + " >" + data[i].name + "</li>";
            }
            this.music_name.innerHTML = data[0].name;
            this.audio.src = data[0].url;
        }

        this.listener();
    };
    //添加监听事件
    AudioPlay.prototype.listener = function() {
        var list_li = document.querySelectorAll(".audioplay-list ul li") || null,
            self = this,
            audio = self.audio, //
            total_width = self.progress.clientWidth, //进度条的总宽度
            volume_width = self.volume.clientWidth; //音量条总宽度。
        //加载完成，设置歌曲总时长
        audio.addEventListener("loadedmetadata", function() {
            self.total_time_dom.innerHTML = parseInt(audio.duration / 60) + ":" + parseInt(audio.duration % 60);
        });
        //播放暂停控制
        self.control.addEventListener("click", function() {
            self.playOrPause();
        });
        //播放完毕
        audio.addEventListener("ended", function() {
            self.reset();
        });
        //时间改变，当前时间与进度条更新
        audio.addEventListener("timeupdate", function() {
            if (!isNaN(audio.duration)) {
                self.cur_time_dom.innerHTML = parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60);
                self.progress_status.style.width = parseInt(audio.currentTime / audio.duration * total_width) + "px";
            }
        });
        //歌典加载过程中，更新缓冲进度条。
        audio.addEventListener("progress", function() {
            var buffered = audio.buffered.length;
            if (buffered > 0) {
                self.progress_buffered.style.width = audio.buffered.end(buffered - 1) / audio.duration * total_width + "px";
            }
        });
        //音量控制
        self.volume.addEventListener("click", function(e) {

            audio.volume = (e.offsetX / volume_width) > 1 ? 1 : (e.offsetX / volume_width);
            self.volume_status.style.width = e.offsetX + "px";

        });
        //进度条控制
        self.progress.addEventListener("click", function(e) {
            audio.currentTime  = parseInt((e.offsetX / total_width) * audio.duration);
            self.progress_status.style.width = e.offsetX + "px";
        });
        //播放列表点击
        Array.prototype.map.call(list_li, function(dom, index) {
            dom.addEventListener("click", function() {
                //设置选中状态
                Array.prototype.map.call(list_li, function(dom) {
                    dom.className = "";
                });
                dom.className = "on";
                var dataset = dom.dataset;
                //重新加载歌曲
                self.music_name.innerHTML = dom.innerText;
                audio.src = dataset.url;
                audio.load();
                self.reset();
                self.playOrPause();
            });
        });
    };
    //重置歌曲状态。
    AudioPlay.prototype.reset = function() {
        this.progress_status.style.width = 0;
        this.control_status.className = "audioplay-playing";
    };
    //播放或者暂停
    AudioPlay.prototype.playOrPause = function() {
        if (this.audio.paused) {
            this.audio.play();
            console.log(this.audio.duration);
            this.control_status.className = "audioplay-pauseing";
        } else {
            this.audio.pause();
            this.control_status.className = "audioplay-playing";
        }
    };

    new AudioPlay({
        dom: "audio",
        autoplay: true,
        data: [{
            name: "春秋配",
            url: "春秋配.mp3"
        }, {
            name: "富士山下",
            url: "富士山下.mp3"
        }]
    });
})();