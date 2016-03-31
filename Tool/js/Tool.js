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
 // 添加Class
 function addClass(elem, value) {
     var classNames, i, l,
         setClass, c, cl,
         space = /\s+/;
     if (value && typeof value === "string") {
         classNames = value.split(space);
         if (elem.nodeType === 1) {
             if (!elem.className && classNames.length === 1) {
                 elem.className = value;

             } else {
                 setClass = " " + elem.className + " ";

                 for (c = 0, cl = classNames.length; c < cl; c++) {
                     if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
                         setClass += classNames[c] + " ";
                     }
                 }
                 elem.className = setClass.replace(/(^\s*)|(\s*$)/g, "");
             }
         }
     }
 }
 // 移除Class
 function removeClass(elem, value) {
     var removes, className, c, cl, i, l, space = /\s+/,
         rclass = /[\t\r\n]/g;
     if ((value && typeof value === "string") || value === undefined) {
         removes = (value || "").split(space);
         if (elem.nodeType === 1 && elem.className) {

             className = (" " + elem.className + " ").replace(rclass, " ");
             for (c = 0, cl = removes.length; c < cl; c++) {
                 while (className.indexOf(" " + removes[c] + " ") >= 0) {
                     className = className.replace(" " + removes[c] + " ", " ");
                 }
             }
             elem.className = value ? className.replace(/(^\s*)|(\s*$)/g, "") : "";
         }
     }

 }
