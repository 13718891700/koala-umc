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
})



/*手机号登录验证背景色修改-----*/
    clearInterval(phOneItev);
    var phOneSele=function(){
        if($(document).find('#phone_number-error').text()){
            $(document).find('#phone_number-error').css({
                'background-image':''
            })
        }else{
            $(document).find('#phone_number-error').css({
                'background-image':''
            })
        }
    }
    var phOneItev=setInterval(function(){
        phOneSele()
    },10)
/*密码登录验证背景色修改-----*/
    clearInterval(passwdIterv);
    var passwdSele=function(){
        if($(document).find('#password-error').text()){
            $(document).find('#password-error').css({
                'background-image':''
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

