//打开提示模态框
var selectIds = new Array();
var ids = new Array();
function openModal(msg) {
    $('#msgText').html(msg);
    $('#msgModal').modal({
        keyboard: false,
        backdrop: false,
        show: true
    });
}
function openModalLoad(msg, url) {
    $('#msgText').html(msg);
    $('#msgModal').modal({
        keyboard: false,
        backdrop: false,
        show: true
    });
    $('#msgModal').on('hidden.bs.modal', function () {
        loadJsp(url);
    });
}
function getSelectIds() {
    //不能用=号直接赋值，那样会导致set ids的时候改变selectIds的值//引用。
    for (var i = 0; i < ids.length; i++) {
        selectIds[i] = ids[i];
    }
}
//阻止事件冒泡
function stopPropagation(e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

/**序列化表单数据
 * @param	formId  form表单的Id值
 */
function serializeForm(formId) {
    var jsonData = {};
    var serializeArray = $("#" + formId).serializeArray();
    $.each(serializeArray, function(index, field){
        var name = field.name;
        var value = StringUtil.trim(field.value);
        if(value){
            jsonData[name] = value;
        }
    });
    return jsonData;
}



var g_require={};
/**
 * load javascript file
 * @param u:javascript url
 * @param c :callback function
 * example:  loadScript("a.js",function(){})
 * 非阻塞模式加载js文件
 */
function loadScript(u, c) {
    if (typeof g_require[u] != "undefined") {
        if (c) {
            c.call();
        }
        return;
    }
    g_require[u] = true;
    var s = document.createElement("script");
    s.ansyc = 'async';
    s.type = "text/javascript";
    s.src = getRootPath() + u + "?v=g_version";

    var f = document.getElementsByTagName("script")[0];
    f ? f.parentNode.insertBefore(s, f) : document.body.appendChild(s);
    if (!!window.ActiveXObject) {
        s.onreadystatechange = function() {
            if (this.readyState === "loaded" || this.readyState === "complete") {
                // Handle memory leak in IE
                s.onreadystatechange = null;
                if (c) {
                    c.call();
                }
            }
        };
    } else {
        s.onload = function() {
            s.onload = null;
            if (c) {
                c.call();
            }
        };

    }
    return undefined;

};

/**
 * 获取根路径
 * @returns {String}
 */
function getRootPath(){
    //return window.location.protocol + '//' + window.location.host + '/'+ webName;
    var pathName = location.pathname.split("/");
    var webName="";
    if(pathName[1]){
        webName = "/"+pathName[1];
    }
    webName = webName == "/wms" ? '': webName;
    return location.protocol + '//' + location.host + webName;
}

/**
 * @param 返回固定格式的日期：yyyy-MM-dd HH:mm:ss
 * @returns
 */
function formatDateToClass(timeStr){
    var returnTime = (timeStr != null && ""!= timeStr) ? DateUtil.format(new Date(timeStr), "yyyy-MM-dd HH:mm:ss") : "";
    return returnTime;
}

/**
 * 序列化form并去掉空字符串
 * @param formid
 * @returns {Array}
 */
function serializeArrayExcludeBlank(formid) {
    var form = $("#"+formid);
    if (form.length==0){
        return [];
    }
    var paramArray = form.serializeArray();
    var result = [];
    var l = paramArray.length;
    for (var i = 0; i<l; i++){
        if (paramArray[i].value != "" && paramArray[i].value=="all"){
            result.push(paramArray[i]);
        }
    }
    return result;
}

/**
 * 序列化form并转成json
 * @param formid
 * @returns {___anonymous11968_11969}
 */
function serializeExcludeBlank(formid){
    var paramArray = serializeArrayExcludeBlank(formid);
    var serializeObj={};
    $.each(paramArray, function(){
        serializeObj[this.name]=this.value;
    });
    return serializeObj;
}

/**
 * @param value：原值
 * @param num:保留位数
 */
function disposeNumber(value,num){
    num = num == null ? 4 : num;
    var returnValue = (value != null && typeof (value) == "number") ? parseFloat(value).toFixed(num) : "";
    return returnValue;
}

/**
 * 替换RestFul中特殊字符为浏览器可识别的字符
 * 解决URL参数中有+, 空格, =, %, &, #等特殊符号问题的解决
 */
function replaceSpecialChar(param) {
    var replace = param.replace("%","%25").replace("+","%2B").replace(" ","%20")
        .replace("&","%3D");
    return replace;
}
function UrlUtil() {
}
/**
 *解决浏览器缓存
 */

UrlUtil.addTimestamp = function(url) {
    var getTimestamp=new Date().getTime();
    if(url.indexOf("?") >- 1){
        url = url + "&timestamp=" + getTimestamp
    }else{
        url = url + "?timestamp=" + getTimestamp
    }
    return url;
};


function checkResult(data, msgId) {
    var res = true;
    //无返回
    if(data==null || data=='' || data == undefined){
        if(msgId){
            layer.tips('错误-HTTP请求无数据返回!', '#'+msgId);
        }else{
            alert('错误-HTTP请求无数据返回!');
        }
        res = false;
    }
    //返回json
    if(data && data.code != "200"){
        if(data.code === 'ES000006'){// 会话超时
            gotoLogon();
        } else if(data.code === 'ES000007'){// 无权限访问
            alert('您无权操作，请联系系统管理员！');
        } else if(data.code == "EB00008"){// 登录页面过期
            alert(data.message, function () {
                gotoLogon();
            });
        } else {// 登录页面过期
            alert(data.message);
        }
        res = false;
    }
    return res;
}

function gotoLogon(){
    if (window != top){
        top.location.href = "/";
    } else {
        location.href = "/";
    }
}

function alert(msg, callback) {
    layer.alert(msg, {
        title: '提示',
        skin : 'layui-layer-molv',
        icon : 5,
        time : 0,
        scrollbar:  false
    }, function (index) {
        if(callback){
            callback();
        }
        layer.close(index);
    });
    return;
}

var TOKEN_KEY = "jwtToken"

function getJwtToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setJwtToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function removeJwtToken() {
    localStorage.removeItem(TOKEN_KEY);
}


		
	
		 
 
