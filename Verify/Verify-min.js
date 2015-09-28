var Verify=(function(b){function c(){this.inputs=null;}c.prototype.trim=function(d){return d.replace(/(^\s*)|(\s*$)/g,"");};c.prototype.isnull=function(f,e,d){if(!d){return f===""?(function(){a(e+"不能为空");
return false;})():true;}else{return true;}};c.prototype.ismax=function(f,e,d){return f.length>d?(function(){a(e+"不能大于"+d);return false;})():true;};c.prototype.ismin=function(f,d,e){return f.length<e?(function(){a(d+"不能小于"+e);
return false;})():true;};c.prototype.isnumber=function(f,e,d){if(d){return f.match(/^[-\+]?\d+(\.\d+)?$/)?true:(function(){a(e+"必须为数字");return false;})();
}else{return true;}};c.prototype.isint=function(f,e,d){if(d){return f.match(/^(-|\+)?\d+$/)?true:(function(){a(e+"必须为整数！");return false;})();}else{return true;
}};c.prototype.isnumberor_letter=function(f,e,d){if(d){return f.match(/^[0-9a-zA-Z\_]+$/)?true:(function(){a(e+"必须为字母或者数字或者下划线！");return false;})();}else{return true;
}};c.prototype.isnumberorletter=function(f,e,d){if(d){return f.match(/^[0-9a-zA-Z]+$/)?true:(function(){a(e+"必须为字母或者数字！");return false;})();}else{return true;
}};c.prototype.ischinaornumborletter=function(f,e,d){if(d){return f.match(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/)?true:(function(){a(e+"必须为汉字,字母,数字！");return false;
})();}else{return true;}};c.prototype.isusername=function(f,e,d){if(d){return f.match(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)?true:(function(){a(e+"必须为中英文，数字，下划线，减号");
return false;})();}else{return true;}};c.prototype.ispassword=function(f,e,d){if(d){return f.match(/^[a-zA-Z]\w{5,17}$/)?true:(function(){a(e+"以字母开头，长度在6-18之间，只能包含字符、数字和下划线");
return false;})();}else{return true;}};c.prototype.ischinese=function(f,e,d){if(d){return f.match(/^[\u0391-\uFFE5]+$/)?true:(function(){a(e+"必须为中文！");
return false;})();}else{return true;}};c.prototype.isletter=function(f,e,d){if(d){return f.match(/^[a-zA-Z]+$/)?true:(function(){a(e+"必须为英文字母！");return false;
})();}else{return true;}};c.prototype.islongdate=function(h,g,f){var e=h.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);if(!e){a(g+"格式不正确");
return false;}var i=new Date(e[1],e[3]-1,e[4],e[5],e[6],e[7]);if(i.getFullYear()==e[1]&&(i.getMonth()+1)==e[3]&&i.getDate()==e[4]&&i.getHours()==e[5]&&i.getMinutes()==e[6]&&i.getSeconds()==e[7]){return true;
}else{a(g+"格式不正确");return false;}};c.prototype.isshortdate=function(h,g,f){var e=h.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);if(!e){a(g+"格式不正确");return false;
}var i=new Date(e[1],e[3]-1,e[4]);if(i.getFullYear()==e[1]&&i.getMonth()+1==e[3]&&i.getDate()==e[4]){return true;}else{a(g+"格式不正确");return false;}};c.prototype.isemail=function(f,e,d){if(d){return f.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)?true:(function(){a(e+"格式不正确！");
return false;})();}else{return true;}};c.prototype.ispostcode=function(f,e,d){if(d){return f.match(/[1-9]\d{5}(?!\d)/)?true:(function(){a(e+"格式不正确！");return false;
})();}else{return true;}};c.prototype.isphone=function(h,g,e){var f=/^([0-9]{3,4}-)?[0-9]{7,8}$/;var d=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
if(e){if(h.match(f)||h.match(d)){return true;}else{a(g+"格式不正确！");return false;}}else{return true;}};c.prototype.istell=function(f,e,d){if(d){return f.match(/^([0-9]{3,4}-)?[0-9]{7,8}$/)?true:(function(){a(e+"格式不正确！");
return false;})();}else{return true;}};c.prototype.ismobile=function(f,e,d){if(d){return f.match(/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/)?true:(function(){a(e+"格式不正确！");
return false;})();}else{return true;}};c.prototype.isurl=function(f,e,d){if(d){return f.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/)?true:(function(){a(e+"格式不正确！");
return false;})();}else{return true;}};c.prototype.isQQ=function(f,e,d){if(d){return f.match(/[1-9][0-9]{4,}/)?true:(function(){a(e+"格式不正确！");return false;
})();}else{return true;}};c.prototype.isidcard=function(l,k,i){var f=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1];var e=[1,0,10,9,8,7,6,5,4,3,2];function h(m){if(m.length==15){return j(m);
}else{if(m.length==18){var n=m.split("");if(d(m)&&g(n)){return true;}else{return false;}}else{return false;}}}function d(n){var p=n.substring(6,10);var q=n.substring(10,12);
var m=n.substring(12,14);var o=new Date(p,parseFloat(q)-1,parseFloat(m));if(o.getFullYear()!=parseFloat(p)||o.getMonth()!=parseFloat(q)-1||o.getDate()!=parseFloat(m)){return false;
}else{return true;}}function j(p){var o=p.substring(6,8);var q=p.substring(8,10);var m=p.substring(10,12);var n=new Date(o,parseFloat(q)-1,parseFloat(m));
if(n.getYear()!=parseFloat(o)||n.getMonth()!=parseFloat(q)-1||n.getDate()!=parseFloat(m)){return false;}else{return true;}}function g(m){var o=0;if(m[17].toLowerCase()=="x"){m[17]=10;
}for(var n=0;n<17;n++){o+=f[n]*m[n];}valCodePosition=o%11;if(m[17]==e[valCodePosition]){return true;}else{return false;}}if(i){if(h(l)){return true;}else{a(k+"格式不正确！");
return false;}}else{return true;}};c.prototype.inIt=function(e){var d=e||null,g=this;g.inputs=d;for(var f in d){(function(j){function h(){var n=g.trim(this.value),l="";
for(var o in d[j]){var m=o.toLowerCase(),k=d[j][o];if(m==="label"){l=k;continue;}if(!g["is"+m](n,l,k)){return;}}}var i=document.getElementById(j);if(i.addEventListener){i.addEventListener("blur",h,false);
}else{if(i.attachEvent){i.attachEvent("onblur",h);}else{i.onblur=h;}}})(f);}};c.prototype.Verifybool=function(){var f=this.inputs;for(var k in f){var j=document.getElementById(k);
var h=this.trim(j.value),e="";for(var i in f[k]){var g=i.toLowerCase(),d=f[k][i];if(g==="label"){e=d;continue;}if(!this["is"+g](h,e,d)){return false;}}}return true;
};function a(l){var e=0,d=0;if(b.innerWidth){d=b.innerWidth;}else{if((document.body)&&(document.body.clientWidth)){d=document.body.clientWidth;}}if(b.innerHeight){e=b.innerHeight;
}else{if((document.body)&&(document.body.clientHeight)){e=document.body.clientHeight;}}if(document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientWidth){e=document.documentElement.clientHeight;
d=document.documentElement.clientWidth;}var k=document.createElement("div");k.innerHTML=l;var h={position:"absolute",top:((e/2)-50)+"px",left:((d/2)-100)+"px","z-index":1000,display:"inline-block",padding:"10px","text-align":"left",background:"#fff",color:"#990033",border:"2px solid #666","border-radius":"10px","font-weight":500};
for(var g in h){k.style[g]=h[g];}document.body.appendChild(k);var j=10;var f=setInterval(function(){j=j-1;k.style.opacity=j/10;},200);setTimeout(function(){document.body.removeChild(k);
clearInterval(f);},2000);}return new c();})(window);