/**
 * 时间处理工具类
 *
 * @author suihonghua
 *
 * @returns {DateUtil}
 */
function DateUtil() {
}

DateUtil.prototype = new Object();
/**
 * 时间格式化 e.g. var testDate = new Date( 1320336000000 );//这里必须是整数，毫秒
 *
 * var testStr1 = DateUtil.format(testDate, "yyyy年MM月dd日HH小时mm分ss秒"); var
 * testStr2 = DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss.S"); var testStr3 =
 * DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss"); alert(testStr1);
 * alert(testStr2); alert(testStr3);
 *
 * @param date
 * @param format
 * @returns
 *
 * @author suihonghua
 */
DateUtil.format = function(date, format) {
    try {
        // yyyy年MM月dd日 HH小时mm分ss秒
        var o = {
            "M+" : date.getMonth() + 1, // month
            "d+" : date.getDate(), // day
            "H+" : date.getHours(), // hour
            "m+" : date.getMinutes(), // minute
            "s+" : date.getSeconds(), // second
            "q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
            "S" : date.getMilliseconds()
            // millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        for ( var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    } catch (e) {
        return "";
    }
};


/**
 * 转换日期对象为日期字符串
 *
 * @param l
 *            long值
 * @param pattern
 *            格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
DateUtil.getFormatDate=function(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return this.format(date, pattern);
}

/**
 * 格式化日期时间
 *
 * @param d
 *            Date实例
 * @returns string 格式如：2001-01-01 01:01:01
 *
 * @author suihonghua
 */
DateUtil.formatDateTime = function(date) {
    return this.format(date, "yyyy-MM-dd HH:mm:ss");
};

/**
 * 格式化日期
 *
 * @param d
 *            Date实例
 * @returns string 格式如：2001-01-01
 *
 * @author suihonghua
 */
DateUtil.formatDate = function(date) {
    return this.format(date, "yyyy-MM-dd");
};

/**
 * 格式化时间
 *
 * @param d
 *            Date实例
 * @returns string 格式如：01:01:01
 *
 * @author suihonghua
 */
DateUtil.formatTime = function(date) {
    return this.format(date, "HH:mm:ss");
};

 /**
 * 时间的大小比较
 *
 * @format yyyy-MM-dd HH:mm:ss
 *
 * @returns {boolean}
 *
 */
DateUtil.dateCompare=function(startdate,enddate){
    var beginTimes = startdate.substring(0, 10).split('-');
    var endTimes = enddate.substring(0, 10).split('-');
    var  beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + startdate.substring(10, 19);
    var endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + enddate.substring(10, 19);
    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return false;
    } else if (a >= 0) {
        return true;
    }
}

/**
 * 转换日期对象为日期字符串
 *
 * @param date
 *            日期对象
 * @param isFull
 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
 *            "2000-03-05"
 * @return 符合要求的日期字符串
 */
DateUtil.getSmpFormatDate=function(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else {
        pattern = "yyyy-MM-dd";
    }
    return getFormatDate(date, pattern);
}
/**
 * 转换当前日期对象为日期字符串
 *
 * @param date
 *            日期对象
 * @param isFull
 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
 *            "2000-03-05"
 * @return 符合要求的日期字符串
 */
DateUtil.getSmpFormatNowDate=function(isFull) {
    return this.getSmpFormatDate(new Date(), isFull);
}
/**
 * 转换long值为日期字符串
 *
 * @param l
 *            long值
 * @param isFull
 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
 *            "2000-03-05"
 * @return 符合要求的日期字符串
 */
DateUtil.getSmpFormatDateByLong=function(l, isFull) {
    return this.getSmpFormatDate(new Date(l), isFull);
}
/**
 * 转换long值为日期字符串
 *
 * @param l
 *            long值
 * @param pattern
 *            格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
DateUtil.getFormatDateByLong=function(l, pattern) {
    return this.getFormatDate(new Date(l), pattern);
}


DateUtil.getFormatDateByJsonStr=function(jsonStr, pattern) {
    if (jsonStr == undefined || jsonStr == "") {
        return ""
    }
    var data = eval(jsonStr);
    var time=data.time;
    return this.getSmpFormatDateByLong(time,pattern);
}
/**
 * 计算天数差的函数，通用
 * @return {string}
 * @return {string}
 */
DateUtil.GetDateDiff=function(startDate,endDate)
{
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  dates;
}
/**
 * 日期加上天数后的新日期.
 * @return {string}
 * @return {string}
 */
DateUtil.AddDays=function(date,days){
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    var y = nd.getFullYear();
    var m = nd.getMonth()+1;
    var d = nd.getDate();
    if(m <= 9) m = "0"+m;
    if(d <= 9) d = "0"+d;

    return y + "-" + m + "-" + d;
}

