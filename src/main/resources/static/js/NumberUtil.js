//将数字格式化为货币格式，默认前缀为空
function formatMoney(number, places, symbol, thousand, decimal) {
	number = number || 0;
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(
			+number || 0).toFixed(places), 10)
			+ "", j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol
			+ negative
			+ (j ? i.substr(0, j) + thousand : "")
			+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand)
			+ (places ? decimal + Math.abs(number - i).toFixed(places).slice(2)
					: "");
}
// 除法函数，用来得到精确的除法结果
// 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
// 调用：accDiv(arg1,arg2)
// 返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var  r1 = 0,  r2 = 0, t1, t2, n, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    //m = (r1 >= r2) ? r1-r2 : r2-r1;
    with (Math) {
        t1 = Number(arg1.toString().replace(".", ""));
        t2 = Number(arg2.toString().replace(".", ""));
        return ((t1 / t2) * pow(10, r2-r1)).toFixed(n<2?2:n);
    }
}

// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function(arg) {
    return accDiv(this, arg);
};


//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2)
{
    var r1, r2, m, n;
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
        r1=s1.split(".")[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2=s2.split(".")[1].length;
    }catch(e){
        r2 = 0;
    }
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    m = r1 + r2;
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10, m)).toFixed(n);

}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
    return accMul(arg, this);
};

function accMulThree(arg1,arg2,arg3)
{
    var r1, r2, r3, m;
    var m=0,s1=arg1.toString(),s2=arg2.toString(),s3=arg3.toString();
    try{
        r1=s1.split(".")[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2=s2.split(".")[1].length;
    }catch(e){
        r2 = 0;
    }
    try{
        r3=s3.split(".")[1].length;
    }catch(e){
        r3 = 0;
    }
    // 精度固定2位
    m = r1 + r2 + r3;
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))*Number(s3.replace(".",""))/Math.pow(10, m)).toFixed(2);

}

// 加法函数，用来得到精确的加法结果
// 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
// 调用：accAdd(arg1,arg2)
// 返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
    return accAdd(arg, this);
};
// 减法函数
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // last modify by deeka
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
}
// /给number类增加一个sub方法，调用起来更加方便
Number.prototype.sub = function(arg) {
    return accSub(arg, this);
};
