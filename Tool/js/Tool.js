 //获取浏览器参数
 function getParam() {
     var search = window.location.search.substring(1),
         arr = [],
         pos, argUrl = {};
     if (search) {
         arr = search.split("&");
         for (var i = 0, len = arr.length; i < len; i++) {
             pos = arr[i].indexOf("=");
             argUrl[arr[i].substring(0, pos)] = arr[i].substring(pos + 1) || "";
         }
     }
     return argUrl;
 }
