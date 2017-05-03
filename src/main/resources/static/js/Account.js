/**
 * Created by admin on 2016/12/7.
 */
// 主页浏览器判断start---------------------
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
{
    document.getElementsByTagName("body")[0].innerHTML="您的浏览器版本过低，请下载IE9以上版本";
}
// 主页浏览器判断end---------------------





// --------------登陆控制-----  ///
$(".login").on("mouseover",function(){
    $(".hgzt").css("display","block");
}).on("mouseout",function(){
    $(".hgzt").css("display","none");
});
$(".hyn").on("mouseover",function(){
    $(".hghyn").css("display","block");
});
$(".hghyn").on("mouseover",function(){
    $(this).css("display","block");
});
$(".hghyn").on("mouseout",function(){
    $(this).css("display","none");
});
$(".login").on("click",function(){
    $(".djdl").css("display","block");
});
$(".djdl").on("click","span",function(){
    $(".djdl").css("display","none");
});
$(".login").on("mouseover",function () {
    $('.djdl').css("display","block");
});
$(".login").on("mouseout",function () {
    $('.djdl').css("display","none");
});
$(".djdl").on("mouseover",function () {
    $(this).css("display","block");
});
$(".djdl").on("mouseout",function () {
    $(this).css("display","none");
});
$(".gb").on("click",function(){
    $(".djdl").css("display","none");
});





function previewImage(file, id, imgid)
{
    if(file.files.length <= 0){
        $("#"+imgid).attr("src","");
    }
    $("#"+id).show();
    var MAXWIDTH  = 260;
    var MAXHEIGHT = 180;
    var div = document.getElementById(id);
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id='+imgid+'>';
        var img = document.getElementById(imgid);
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, 600, 400);
            img.width  =  rect.width;
            img.height =  rect.height;
//         img.style.marginLeft = rect.left+'px';
            //img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id='+imgid+'>';
        var img = document.getElementById(imgid);
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, 600, 400);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

//上传结束


//点击切换
$(".ullist").on("mouseover","li",function () {
    $(this).addClass("ullisthgbg").siblings().removeClass("ullisthgbg");
});

$(".ullist li").on("click",function (el,index) {
    var IdNum=$(this).index();
    $('.Idx').eq(IdNum).css({'display':'block'}).siblings('.Idx').css({'display':'none'});
    $(this).addClass("ullistbg").siblings().removeClass("ullistbg");
    $(this).css("width","249px").siblings().css("width","248px");
});
//手机绑定
$("#gbsy").on("click",function () {
    $(".zhszzz").hide();
    $("#bdsj").css("display","none");
});
$("#sjbd").on("click",function () {
    $(".zhszzz").show();
    $("#bdsj").css("display","block");
});
$(".ztgb").on("click",function () {
    $(".zhszzz").hide();
    $("#xgsjhm1").css("display","none");
    $("#bgxy1").css("display","none");
    $("#bdxycg1").css("display","none");
    $("#xgyxcg1").css("display","none");
});
$("#sjych1").on("click",function () {
    $(".zhszzz").hide();
    $("#xgsjhm1").css("display","none");
    $(".zhright1").css("display","none");
    $(".zhright3").css("display","block");
});
//邮箱绑定
$("#xybd").on("click",function () {
    $(".zhszzz").show();
    $("#bgxy1").css("display","block");
    $("#bdxycg1").css("display","block");
    $("#bdxycg2").css("display","none");
    $("#bdxycg3").css("display","none");
    $("#bdxyq1").css({"border":"1px solid #008bca"});
    $("#bdxyw1").css({"background":"#008bca"});



});
$("#xybzn").on("click",function () {
    $(".zhszzz").show();
    $("#bdxycg1").css("display","none");
    $("#bdxycg2").css("display","none");
    $("#bdxycg3").css("display","block");
    $("#xylanse2").css("display","block");
    $("#bdxyq3").css({"border":"1px solid #008bca"});
    $("#bdxyw3").css({"background":"#008bca"});

    $("#xylanse2").animate({
        "width":"100%"
    },500);


});
$("#wc1").on("click",function () {
    $(".zhszzz").hide();
    $("#bgxy1").css("display","none");
    $(".zhright1").css("display","none");
    $(".zhright3").css("display","block");
    $("#xyxg").css("visibility","visible");
    $("#xybd").css({
        "background":"#fafafa",
        "cursor":"default",
        "color":"#ccc"
    });
    $("#xybd").text("已绑定");
    $("#xybd").off("click");
});
$("#xyxg").on("click",function () {
    $(".zhszzz").show();
    $("#xgyxcg1").css("display","block");
    $("#xgcgd1b").css("display","block");
    $("#xgcgd2b").css("display","none");
    $("#xgcgd3b").css("display","none");

    $("#xgxyw1").css({"border":"1px solid #008bca"});
    $("#xgxyq1").css({"background":"#008bca"});
    $("#xgcgd1b input").val("");
    $("#xgcgd2b input").val("");
    $("#xgcgd3b input").val("");

    $("#xgxylanse1").animate({
        "width":"0"
    });
    $("#xgxylanse2").animate({
        "width":"0"
    });
    $("#xgxyw2").css({"border":"1px solid #ccc"});
    $("#xgxyq2").css({"background":"#ccc"});
    $("#xgxyw3").css({"border":"1px solid #ccc"});
    $("#xgxyq3").css({"background":"#ccc"});

});
//点击手机修改
$("#sjxg").on("click",function () {
    $("#xgsjd1b").css("display","block");
    $("#xgsjd2b").css("display","none");
    $("#xgsjd3b").css("display","none");
    $(".zhszzz").show();
    $("#xgsjhm1").show();
    $("#phone_number2").val("");
    $("#sjlanse1").animate({
        "width":"0"
    });
    $("#phone_number3").val("");
    $("#sjlanse2").animate({
        "width":"0"
    });
    $("#sjbsw3").css({"border":"1px solid #ccc"});
    $("#sjbsq3").css({"background":"#ccc"});
    $("#sjbsw2").css({"border":"1px solid #ccc"});
    $("#sjbsq2").css({"background":"#ccc"});
    $("#sjbsw1").css({"border":"1px solid #008bca"});
    $("#sjbsq1").css({"background":"#008bca"});


});
$("#wgl").on("click",function () {

    $(".zhszzz").hide();
    $("#xgyxcg1").css("display","none");
    $("#bdxycg2").css("display","none");
    $("#bdxycg3").css("display","block");
    $("#xgcgd3b").css("display","none");

});
//划过事件
$("#password_go").on("focus",function(){
    $(".mima").css("display","block");
    if($(this).val()==""){
        $(".mima").css("display","block");
    }else{
        $(".mima").css("display","none");
    }
});
$("#password_go").on("blur",function(){
    $(".mima").css("display","none");
});



//验证倒计时1
var wait=60;
function time(o) {
    if (wait == 0) {
        // o.setAttribute("disabled", true);
        o.style.cursor = "pointer";
        o.innerHTML = "重新获取验证码";
        o.style.backgroundColor = "#fafbfc";
        o.style.color = "#666";
        wait = 60;
    } else {
        // o.removeAttribute("default");
        o.style.cursor = "no-drop";
        o.innerHTML = wait + "秒后重新获取";
        o.style.backgroundColor = "#f2f2f2";
        o.style.color = "#ccc";
        wait--;
        setTimeout(function () {
            time(o)
        }, 1000)
    }
}

            $("#hqyzm11").on('click',function(){
                if(wait==60){
                    time(this);
                }
            });



//验证倒计时2
var wait1=60;
function time1(o1) {
    if (wait1 == 0) {
        // o.setAttribute("disabled", true);
        o1.style.cursor = "pointer";
        o1.innerHTML = "重新获取验证码";
        o1.style.backgroundColor = "#fafbfc";
        o1.style.color = "#666";
        wait1 = 60;
    } else {
        // o.removeAttribute("default");
        o1.style.cursor = "no-drop";
        o1.innerHTML = wait1 + "秒后重新获取";
        o1.style.backgroundColor = "#f2f2f2";
        o1.style.color = "#ccc";
        wait1--;
        setTimeout(function () {
            time1(o1)
        }, 1000)
    }
}
$("#hqyzm12").on('click',function(){
    if(wait1==60){
        time1(this);
    }
});


//验证倒计时3
var wait2=60;
function time2(o2) {
    if (wait2 == 0) {
        // o.setAttribute("disabled", true);
        o2.style.cursor = "pointer";
        o3.innerHTML = "重新获取验证码";
        o2.style.backgroundColor = "#fafbfc";
        o2.style.color = "#666";
        wait2 = 60;
    } else {
        // o.removeAttribute("default");
        o2.style.cursor = "no-drop";
        o2.innerHTML = wait2 + "秒后重新获取";
        o2.style.backgroundColor = "#f2f2f2";
        o2.style.color = "#ccc";
        wait2--;
        setTimeout(function () {
            time2(o2)
        }, 1000)
    }
}
$("#hqyzm13").on('click',function(){
    if(wait2==60){
        time2(this);
    }
});
