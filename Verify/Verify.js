/*
调用格式如下：
  Verify.inIt({
    username: { 
        label:"用户名",
        null: false,
        max:10
    },
    password: {
        label:"密码",
        null: false,
        number:true
    },
});
主要说明：
   1 username,password:为验证元素的ID。
   2 label为提示信息的主语，且必须放在第一位，不然提示信息的主语会为空。
   3. null必须放在第二位，用来判断是否为选填或者必填。
   4 .兼容IE6,IE7，但是IE6,7不支持消失动画。
   5 .此文件必须放入在底部。
其它参数：
   null：false 不能为空,
   max: 2 最大的长度为2,
   min：1 最小的长度为1,
   number: true 只能为数字,
   int:  true 只能为整数,
   numberor_letter: true 只能为数字，下划线，字母,
   numberorletter : true 只能为数字，字线,
   chinaornumborletter : true 只能为中文，数字，字母,
   username : true 只能中英文，数字，下划线，减号，常用于用户名,
   password : true 以字母开头，长度在6-18之间，只能包含字符、数字和下划线,常用于密码,
   chinese : true 只能为中文,
   letter : true 只能为字母,
   longdate :true 验证长日期格式,"YYYY-MM-DD HH:MM:SS" || "YYYY/MM/DD HH:MM:SS",
   shortdate : true 验证短日期格式,YYYY-MM-DD || YYYY/MM/DD,
   email : true 验证电子邮件格式,
   postcode : true 验证中国邮证编码格式,
   phone : true 验证电话格式，包括固定电话，移动电话,
   tell : true 验证固定电话,
   mobile : true 验证移动电话,
   url : true 验证网页链接,
   QQ : true 验证QQ,
   idcard ：true 验证身份证。
 */
var Verify = (function(window) {

    function Verify() {
            this.inputs = null;
        }
        // 去除字符串的首尾的空格
    Verify.prototype.trim = function(value) {
        return value.replace(/(^\s*)|(\s*$)/g, "");
    };
    // 判断是否为空。
    Verify.prototype.isnull = function(value, label, limit) {
        if (!limit) {
            return value === "" ? (function() {
                salert(label + "不能为空");
                return false;
            })() : true;

        } else {
            return true;
        }

    };
    //判断是否大于max的长度。
    Verify.prototype.ismax = function(value, label, max) {
        return value.length > max ? (function() {
            salert(label + "不能大于" + max);
            return false;
        })() : true;
    };
    //判断是否小于min的长度。
    Verify.prototype.ismin = function(value, label, min) {
        return value.length < min ? (function() {
            salert(label + "不能小于" + min);
            return false;
        })() : true;
    };
    // 判断输入是否为数字
    Verify.prototype.isnumber = function(value, label, limit) {
        if (limit) {
            return value.match(/^[-\+]?\d+(\.\d+)?$/) ? true : (function() {
                salert(label + "必须为数字");
                return false;
            })();
        } else {
            return true;
        }

    };
    // 判断输入是否是一个整数
    Verify.prototype.isint = function(value, label, limit) {

        if (limit) {
            return value.match(/^(-|\+)?\d+$/) ? true : (function() {
                salert(label + "必须为整数！");
                return false;
            })();
        } else {
            return true;
        }
    };

    // 判断输入的字符是否只由英文字母和数字和下划线组成
    Verify.prototype.isnumberor_letter = function(value, label, limit) {

        if (limit) {
            return value.match(/^[0-9a-zA-Z\_]+$/) ? true : (function() {
                salert(label + "必须为字母或者数字或者下划线！");
                return false;
            })();
        } else {
            return true;
        }
    };
    // 判断输入的字符是否只由英文字母和数字组成
    Verify.prototype.isnumberorletter = function(value, label, limit) {

        if (limit) {
            return value.match(/^[0-9a-zA-Z]+$/) ? true : (function() {
                salert(label + "必须为字母或者数字！");
                return false;
            })();
        } else {
            return true;
        }
    };
    // 判断输入的字符是否是汉字、字母、数字组成
    Verify.prototype.ischinaornumborletter = function(value, label, limit) {

        if (limit) {
            return value.match(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/) ? true : (function() {
                salert(label + "必须为汉字,字母,数字！");
                return false;
            })();
        } else {
            return true;
        }
    };
    // 判断用户名，只能中英文，数字，下划线，减号
    Verify.prototype.isusername = function(value, label, limit) {

        if (limit) {
            return value.match(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/) ? true : (function() {
                salert(label + "必须为中英文，数字，下划线，减号");
                return false;
            })();
        } else {
            return true;
        }
    };
    // 判断密码，以字母开头，长度在6-18之间，只能包含字符、数字和下划线
    Verify.prototype.ispassword = function(value, label, limit) {

        if (limit) {
            return value.match(/^[a-zA-Z]\w{5,17}$/) ? true : (function() {
                salert(label + "以字母开头，长度在6-18之间，只能包含字符、数字和下划线");
                return false;
            })();
        } else {
            return true;
        }
    };
    // 判断输入的字符是否为中文    
    Verify.prototype.ischinese = function(value, label, limit) {

        if (limit) {
            return value.match(/^[\u0391-\uFFE5]+$/) ? true : (function() {
                salert(label + "必须为中文！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否为英文字母
    Verify.prototype.isletter = function(value, label, limit) {

        if (limit) {
            return value.match(/^[a-zA-Z]+$/) ? true : (function() {
                salert(label + "必须为英文字母！");
                return false;
            })();
        } else {
            return true;
        }
    };

    // 判断输入是否是有效的长日期格式 - "YYYY-MM-DD HH:MM:SS" || "YYYY/MM/DD HH:MM:SS"
    Verify.prototype.islongdate = function(value, label, limit) {
        var result = value.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (!result) {
            salert(label + "格式不正确");
            return false;
        }
        var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
        if (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]) {
            return true;
        } else {
            salert(label + "格式不正确");
            return false;
        }
    };
    // 判断是否为 YYYY-MM-DD || YYYY/MM/DD 的日期格式
    Verify.prototype.isshortdate = function(value, label, limit) {
        var result = value.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (!result) {
            salert(label + "格式不正确");
            return false;
        }
        var d = new Date(result[1], result[3] - 1, result[4]);
        if (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4]) {
            return true;
        } else {
            salert(label + "格式不正确");
            return false;
        }
    };

    // 判断输入是否是有效的电子邮件
    Verify.prototype.isemail = function(value, label, limit) {

        if (limit) {
            return value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否中国邮政编码(6位)
    Verify.prototype.ispostcode = function(value, label, limit) {

        if (limit) {
            return value.match(/[1-9]\d{5}(?!\d)/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否国内电话号码或者手机号码
    Verify.prototype.isphone = function(value, label, limit) {
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        if (limit) {
            if (value.match(isPhone) || value.match(isMob)) {
                return true;
            } else {
                salert(label + "格式不正确！");
                return false;
            }
        } else {
            return true;
        }


    };
    //判断是否国内电话号码(0511-4405222 或 021-87888822)
    Verify.prototype.istell = function(value, label, limit) {

        if (limit) {
            return value.match(/^([0-9]{3,4}-)?[0-9]{7,8}$/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否手机号码
    Verify.prototype.ismobile = function(value, label, limit) {

        if (limit) {
            return value.match(/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否为url
    Verify.prototype.isurl = function(value, label, limit) {

        if (limit) {
            return value.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };

    //判断是否腾讯QQ号
    Verify.prototype.isqq = function(value, label, limit) {

        if (limit) {
            return value.match(/[1-9][0-9]{4,14}/) ? true : (function() {
                salert(label + "格式不正确！");
                return false;
            })();
        } else {
            return true;
        }
    };
    //判断是否身份证
    Verify.prototype.isidcard = function(value, label, limit) {
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        function IdCardValidate(idCard) {
            if (idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard);
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split("");
                if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function isValidityBrithBy18IdCard(idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            } else {
                return true;
            }
        }

        function isValidityBrithBy15IdCard(idCard15) {
            var year = idCard15.substring(6, 8);
            var month = idCard15.substring(8, 10);
            var day = idCard15.substring(10, 12);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            } else {
                return true;
            }
        }

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0;
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10;
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i];
            }
            valCodePosition = sum % 11;
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            } else {
                return false;
            }
        }
        if (limit) {
            if (IdCardValidate(value)) {
                return true;
            } else {
                salert(label + "格式不正确！");
                return false;
            }
        } else {
            return true;
        }

    };
    Verify.prototype.init = function(str) {
        var option = str || null,
            _this = this;
        _this.inputs = option;

        for (var id in option) {
            (function(id) {
                function handler() {
                    var value = _this.trim(this.value),
                        label = "",
                        isnull = false;

                    for (var p in option[id]) {
                        var property = p.toLowerCase(),
                            limit = option[id][p];

                        if (property === "label") {
                            label = limit;
                            continue;
                        }
                        if (property === "null") {
                            isnull = limit;
                        }
                        if (isnull) {
                            if (value && !_this["is" + property](value, label, limit)) {

                                return;
                            }
                        } else {
                            if (!_this["is" + property](value, label, limit)) {

                                return;
                            }
                        }





                    }
                }
                var dom = document.getElementById(id);
                if (dom.addEventListener) {
                    dom.addEventListener("blur", handler, false);
                } else if (dom.attachEvent) {
                    dom.attachEvent("onblur", handler);
                } else {
                    dom.onblur = handler;
                }

            })(id);

        }
    };
    Verify.prototype.verifybool = function() {
        var option = this.inputs;
        for (var id in option) {
            var dom = document.getElementById(id);
            var value = this.trim(dom.value),
                label = "",
                isnull = false;


            for (var p in option[id]) {
                var property = p.toLowerCase(),
                    limit = option[id][p];
                if (property === "label") {
                    label = limit;
                    continue;
                }
                if (property === "null") {
                    isnull = limit;
                }
                if (isnull) {
                    if (value && !this["is" + property](value, label, limit)) {

                        return;
                    }
                } else {
                    if (!this["is" + property](value, label, limit)) {

                        return;
                    }
                }

            }



        }
        return true;
    };
    //提示框
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
    return new Verify();

})(window);
