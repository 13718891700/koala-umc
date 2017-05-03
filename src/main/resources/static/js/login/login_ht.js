/**
 * Created by xe on 2016/12/14.
 */

/**
 * liqd
 * @type {Map}
 */
function Map()
{
    this.container = {};
}

//将key-value放入map中
Map.prototype.put = function(key,value){
    try{

        if(key!=null && key != "")
            this.container[key] = value;

    }catch(e){
        return e;
    }
};

//根据key从map中取出对应的value
Map.prototype.get = function(key){
    try{

        return this.container[key];

    }catch(e){
        return e;
    }
};

//判断map中是否包含指定的key
Map.prototype.containsKey=function(key){

    try{
        for(var p in this.container)
        {
            if(this.p==key)
                return true;
        }

        return false;

    }catch(e){
        return e;
    }

}

//判断map中是否包含指定的value
Map.prototype.containsValue = function(value){
    try{

        for(var p in this.container)
        {
            if(this.container[p] === value)
                return true;
        }

        return false;

    }catch(e){
        return e;
    }
};
//删除map中指定的key
Map.prototype.remove = function(key){
    try{

        delete this.container[key];

    }catch(e){
        return e;
    }
};

//清空map
Map.prototype.clear = function(){
    try{
        delete this.container;
        this.container = {};

    }catch(e){
        return e;
    }
};

//判断map是否为空
Map.prototype.isEmpty = function(){

    if(this.keyArray().length==0)
        return true;
    else
        return false;
};

//获取map的大小
Map.prototype.size=function(){

    return this.keyArray().length;
}

//返回map中的key值数组
Map.prototype.keyArray=function(){

    var keys=new Array();
    for(var p in this.container)
    {
        keys.push(p);
    }

    return keys;
}

//返回map中的value值数组
Map.prototype.valueArray=function(){

    var values=new Array();
    var keys=this.keyArray();
    for(var i=0;i<keys.length;i++)
    {
        values.push(this.container[keys[i]]);
    }

    return values;
}


var code_map = new Map();
code_map.put("10101", '未绑定组织');
code_map.put('10102', '所属组织已被禁用');
code_map.put('10103', '未绑定角色');
code_map.put('10104', '所属的角色已被禁用');
code_map.put('10105', '未绑定伙伴');
code_map.put('10106', '未绑定客户');
code_map.put('10107', 'token生成失败');
code_map.put('10108', '手机号不能为空');
code_map.put('10109', '验证码不能为空');
code_map.put('10110', '参数错误');
code_map.put('10111', '登录名不能为空');
code_map.put('10112', '原始密码不能为空');
code_map.put('10113', '新密码不能为空');
code_map.put('10114', '确认密码不能为空');
code_map.put('10115', '两次密码不一致');
code_map.put('10116', '用户不存在');
code_map.put('10117', '原始密码错误');
code_map.put('10118', '新密码和原始密码不能相同');
code_map.put('10119', '新密码和原始密码不能相同');
code_map.put('10120', '未通过短信验证流程');
code_map.put('10121', '手机号不能为空');
code_map.put('10122', '登录名已存在');
code_map.put('10123', '手机号已存在');
code_map.put('10124', '验证码错误');
code_map.put('10125', '密码不能为空');
code_map.put('10126', '确认密码不能为空');
code_map.put('10127', '验码发送失败');
code_map.put('10128', '短信可发送数量已达上限');
code_map.put('10129', '短信模板不能为空');
code_map.put('10130', '短信模板暂未维护');
code_map.put('10131', '发送短信频率过高，稍后再发');
code_map.put('10132', '用户已被禁止使用');
code_map.put('10133', '页面已过期，请刷新页面重试');
code_map.put("10134", "请选择对应的系统登录");
code_map.put("10135", "用户名或密码错误");
code_map.put("10136", "您的操作权限已被禁用");


