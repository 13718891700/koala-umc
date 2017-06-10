/**
 * 正则验证工具类
 *
 * @author ligang
 *
 * @returns {RegexUtil}
 */
function RegexUtil() {
}
RegexUtil.prototype = new Object();

/**
 * 验证参数是否是有效URL
 *
 * @param url
 * @return
 */
RegexUtil.isUrl = function(url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)://)?([a-z0-9A-Z]{0,10}\.)?[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
	var re = new RegExp(strRegex);
	if (re.test(url)) {
		return true;
	} else {
		return false;
	}
};
/**
 * 根据名称判断是否是直辖市
 * @param name
 * @returns {boolean}
 */
RegexUtil.isMunicipality = function(name){
    var strRegex = /^(北京|上海|天津|重庆)/;
    if(strRegex.test(name)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 校验是否是数字或带小数点数字
 * @param name
 * @returns {boolean}
 */
RegexUtil.isNumber = function(name){
    var strRegex = /^(\d{1,8})(\.\d{1,4})?$/;
    if(strRegex.test(name)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 校验是否正整数
 * @param name
 * @returns {boolean}
 */
RegexUtil.isInteger = function(name){
	var strRegex = /^\d+$/;
	if(strRegex.test(name)) {
		return true;
	} else {
		return false;
	}
};
/**
 * 校验是否为SKU
 * @param name
 * @returns {boolean}
 */
RegexUtil.isSku = function(name){
	var strRegex = /^CU\d{5}$/;
	if(strRegex.test(name)) {
		return true;
	} else {
		return false;
	}
};
/**
 * 校验是否为合法货位
 * @param name
 * @returns {boolean}
 */
RegexUtil.isLocation = function(name){
	/*var strRegex = /^[A-C]{1}\d{2}-\d{3}-\d{4}$/;
	if(strRegex.test(name)) {
		return true;
	} else {
		return false;
	}*/
	return true;
};
