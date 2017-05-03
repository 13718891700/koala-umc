$(".phone_number").focus(function(){
    $("#p1").show();
})
$(".phone_number").blur(function(){
    $("#p1").hide();
})

$(".password").focus(function(){
    $("#p2").show();
})
$(".password").blur(function(){
    $("#p2").hide();
});
//对应的登录显示
var thr_Id=location.search.substr(1)[1];
$('.dlz img').eq(thr_Id).css({'display':'block'}).siblings('.dlz img').css({'display':'none'});


/*密码登录验证背景色修改-----*/
    clearInterval(passwdIterv);
    var passwdSele=function(){
        if($(document).find('#password-error').text()){
            $(document).find('#password-error').css({
                'background-image':'url(../images/dlbjst.png)'
            })
        }else{
            $(document).find('#password-error').css({
                'background-image':''
            })
        }
    }
   var passwdIterv=setInterval(function(){
        passwdSele()
    },10)

$(".password_go").on("focus",function(){
    alert();
    $(".mima").css("display","block");
})