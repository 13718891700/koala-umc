    // 主页浏览器判断start---------------------
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
        {
         document.getElementsByTagName("body")[0].innerHTML="您的浏览器版本过低，请下载IE9以上版本";
        }
    // 主页浏览器判断end---------------------
    
    //点击事件
    $("#miaodian li").on("click",function(index){
       var inde=(($(this).index())+2)*580;
       $('body,html').animate({scrollTop:inde},500);  
            
   });
    $(".tmzz_ul").on("click","li",function(){
        $(this).addClass("onbg").siblings("li").removeClass("onbg");
        $(this).find("a").addClass("onbg").end().siblings("li").find("a").removeClass("onbg");
    })
    
    //返回顶部
    $(document).ready(function(){  
        $("#go_top").hide();  
        $(function () {  
            //检测屏幕高度  
            var heigS=$(window).height();  

            //scroll() 方法为滚动事件  
            $(window).scroll(function(){  
                if($(window).scrollTop()<=heigS){  
                    $("#go_top").fadeOut(500);  

                }else if(($('.section7').offset().top-300)<($(window).scrollTop())){
                    $("#go_top").fadeOut(500);  
                }else{
                    $("#go_top").fadeIn(500);  
                }
            });  
            $("#go_top").click(function(){  
                $('body,html').animate({scrollTop:0},100);  
                return false;  
            });  
        });  
    });

    
   /* $("#s6_ul1").on("mouseover","li",function(){
        $("#s6_st1").css("display","none");
        var idX=$(this).index()*33;
        $("#s6_st1").animate({top:idX},70);
        $(this).addClass("ztbg").siblings("li").removeClass("ztbg");
    }).on("mouseout",function(){
        $("#s6_st1").css("display","none");
        $(this).removeClass("ztbg")
    })
    $("#s6_ul2").on("mouseover","li",function(){
        $("#s6_st2").css("display","block");
        var idX=$(this).index()*33;
        $("#s6_st2").animate({top:idX},70);
        $(this).find("a").addClass("ztbg").end().siblings("li").find("a").removeClass("ztbg");
    }).on("mouseout",function(){
        $("#s6_st2").css("display","none");
        $(this).find("a").removeClass("ztbg")
    })
    $("#s6_ul3").on("mouseover","li",function(){
        $("#s6_st3").css("display","block");
        var idX=$(this).index()*33;
        $("#s6_st3").animate({top:idX},70);
        $(this).find("a").addClass("ztbg").end().siblings("li").find("a").removeClass("ztbg");
    }).on("mouseout",function(){
        $("#s6_st3").css("display","none");
        $(this).find("a").removeClass("ztbg")
    })*/
    
    /*$(".s3_dl dt").on("mouseover",function(){
        $(this).find(".s3_st").css("display","none");
    }).on("mouseout",function(){
        $(this).find(".s3_st").css("display","block");
    })*/
    
    // --------banner控制区域start--------
    var toggle=0;
       setInterval(function(){
         if(toggle==0){
           $(".header div:nth-child(3)").removeClass("ld").addClass("light");toggle++;
         }else if(toggle==1){
           $(".header div:nth-child(3)").removeClass("light").addClass("dark");toggle++;
         }else if(toggle==2){
           $(".header div:nth-child(3)").removeClass("dark").addClass("dl");toggle++;
         }else if(toggle==3){
           $(".header div:nth-child(3)").removeClass("dl").addClass("ld");toggle=0;}},3000
       );

       setTimeout(function(){
         setInterval(function(){
           $(".bgp4").fadeToggle();
             setTimeout(function(){
                $(".bgp4").fadeToggle(); 
             },30);
         },2000);
       },100);
       setTimeout(function(){
         setInterval(function(){
           $(".bgp5").fadeToggle();
             setTimeout(function(){
                $(".bgp5").fadeToggle(); 
             },20);
         },3000);
       },250);
       setTimeout(function(){
         setInterval(function(){
           $(".bgp6").fadeToggle();
             setTimeout(function(){
                $(".bgp6").fadeToggle(); 
             },20);
         },4000);
       },200);
       setTimeout(function(){
         setInterval(function(){
           $(".bgp7").fadeToggle();
             setTimeout(function(){
                $(".bgp7").fadeToggle(); 
             },20);
         },5000);
       },150);

    // --------banner控制区域end--------
    
    
 

// --------------登陆控制-----  ///
$(".login").on("mouseover",function(){
    $(".hgzt").css("display","block");
}).on("mouseout",function(){
    $(".hgzt").css("display","none");
})
/*$(".dl_right").on("mouseover",function(){
    $(".hgzc").css("display","block");
}).on("mouseout",function(){
    $(".hgzc").css("display","none");
}) */
$(".hyn").on("mouseover",function(){
    $(".hghyn").css("display","block");
})
$(".hghyn").on("mouseover",function(){
    $(this).css("display","block");
}) 
$(".hghyn").on("mouseout",function(){
    $(this).css("display","none");
})   

$(".login").on("click",function(){
    $(".djdl").css("display","block");
})
$(".djdl").on("click","span",function(){
    $(".djdl").css("display","none");
})
    $(".login").on("mouseover",function () {
        $('.djdl').css("display","block");
    })
    $(".login").on("mouseout",function () {
        $('.djdl').css("display","none");
    })
    $(".djdl").on("mouseover",function () {
        $(this).css("display","block");
    })
$(".djdl").on("mouseout",function () {
    $(this).css("display","none");
})
$(".gb").on("click",function(){
  $(".djdl").css("display","none");
})


   /* $('.hynulli a').each(function(index, el){
        $(this).on('click',function(){
            var locaHost=$(el).attr('href');
            if(locaHost.split('?=')){
                $(el).attr('href',locaHost.split('?')[0]+'?='+index);
            }else{
                $(el).attr('href',locaHost+'?='+index);
            }
        })
    });

    //对应的登录显示
    var thr_Id=location.search.substr(1)[1];
    $('.dlz img').eq(thr_Id).css({'display':'block'}).siblings('.dlz img').css({'display':'none'});
    //对应的显示登录
    (function(){
        var loginlis;
        switch (thr_Id){
             case '0':
                 loginlis='客户登录';
              break;
             case '1':
                 loginlis='运营登录';
              break;
             case '2':
                 loginlis='伙伴登录';
               break;
        }
        $('.denglu3').text(loginlis)
    })();*/
    
    /*$('.mapTipList').each(function(){
        $(this).on('mouseover',function(){
            alert()
            var u_allCout=Number($(this).find('.u-allCout').text()),u_Num=Number($(this).find('.u_Num').text()),selWid=$(this).width();
            $(this).find('.jdtwz_1').animate({
                'width': u_Num/u_allCout*selWid
            },5000)
        })
    })*/
   
    /*$('.jdt_1').each(function () {
                var u_allCout=Number($(this).find('.u-allCout').text()),u_Num=Number($(this).find('.u_Num').text()),selWid=$(this).width();
                $(this).find('.jdtwz_1').css({
                    'width': u_Num/u_allCout*selWid
                },5000)
            })*/
    
//验证倒计时
        var wait=60;
        function time(o){
            if (wait==0) {
                o.removeAttribute("disabled");
                o.innerHTML="重新获取验证码";
                o.style.backgroundColor="#fafbfc";
                o.style.color="#666";


                wait=60;
            }else{
                o.setAttribute("disabled", true);
                o.innerHTML=wait+"秒后重新获取";
                o.style.backgroundColor="#f2f2f2";
                o.style.color="#ccc";

                wait--;
                setTimeout(function(){
                    time(o)
                },1000)
            }
        }

        $(".YZmlis1").click(function(){
            time(this);
        });



//冷链卡班轮播图
var curIndex = 0, //当前index
     imgLen = $(".s3_div").length; //总长度数
// 定时器自动变换2.5秒每次



//右箭头点击处理
 $(".s3_rt").click(function(){ 
   curIndex = (curIndex < imgLen-6 ) ? ( ++curIndex) :imgLen-6;
   changeTo(curIndex);
     console.log('right',curIndex)
 });
//左箭头点击处理
$(".s3_lf").click(function(){ 
  //根据curIndex进行上一个图片处理
  curIndex = (curIndex >= 2) ? (--curIndex) :0;
  changeTo(curIndex);
    console.log('left',curIndex)
});

 


//清除定时器时候的重置定时器--封装
  
function changeTo(num){ 
    var goLeft = num * 160;
    $(".lhzul").animate({left: "-" + goLeft + "px"},500);
}

$(".password_go").on("focus",function(){
    $(".mima").css("display","block");
    if($(this).val()==""){
        $(".mima").css("display","block");
    }else{
        $(".mima").css("display","none");
    }
})
$(".password_go").on("blur",function(){
    $(".mima").css("display","none");
})
//----主页调用地图方法start-------
$('#ChinaMap').SVGMap({
    mapWidth: 470,
    mapHeight: 400
});
  // var flage=false;
$('#stateTip').hover(function(){
  $(this).find('.u_Num').each(function(index, el){
    if(!$(el).hasClass('timer')){
      $(el).addClass('timer');
      $('.timer').each(count);
    }
  });

  $(this).find('.jdt_1:even .jdtwz_1').animate({
    'width':'60%'
  },1000);
  $(this).find('.jdt_1:odd .jdtwz_2').animate({
    'width':'80%'
  },1000);
})

$('#d_tab29').DB_rotateRollingBanner({
  key:"c37080",            
  moveSpeed:400,           
  autoRollingTime:3000     
});
$('#d_tab29').css({
  'width':parseInt($(window).width()) >=1920 ? '1920px' : $(window).width()+'px'
});
// 冷链卡班动态蒙层----
$('.d_img li').hover(function(){
  if($(this).css('left')=='320px'){
    $(this).find('.cont_cov').show();
    var _this=this,sca_Tim;
    clearTimeout(sca_Tim);
    $(this).find('img').removeClass('scal_backs');
    sca_Tim=setTimeout(function(){
      $(_this).find('img').addClass('scal_kbs');
    },200)
    $(this).find('.cont_cov').show().animate({
        'opacity':'.8',
        'filter':'alpha(opacity=80)',
    });
    $(this).find('.con_pre').hide();
    $(this).find('.cont_box .top_con').show().animate({
        'opacity':'1',
        'filter':'alpha(opacity=100)',
        'padding':'26px 0 14px'
    });
    $(this).find('.cont_box .bot_con').show().animate({
        'opacity':'1',
        'filter':'alpha(opacity=100)'
    });
  }
},function(){
    // $(this).find('.cont_cov').hide();
    $(this).find('.con_pre').show();
    $(this).find('.con_pre').show();
    $(this).find('img').removeClass('scal_kbs').addClass('scal_backs');
    $(this).find('.cont_cov').animate({
        'opacity':'0',
        'filter':'alpha(opacity=0)',
    });
    $(this).find('.cont_box .top_con').animate({
        'opacity':'0',
        'filter':'alpha(opacity=0)',
        'padding':'9px 0 46px'
    })
    $(this).find('.cont_box .bot_con').animate({
        'opacity':'0',
        'filter':'alpha(opacity=0)'
    });
});
function cov_anim(){
  $('.d_img li').each(function(){
    if($(this).css('left')=='100px' || $(this).css('left')=='590px'){
      
    }else if($(this).css('left')=='-70px' || $(this).css('left')=='850px'){
        
    }else if($(this).css('left')=='320px'){
      $(this).find('.cont_cov_opa').hide();
    };
  })
};
setInterval(function(){
    cov_anim();
},10)

/*
主页整体动态效果设置start---
 */
// 仓运配&金融一体化服务model
    $(window).scroll(function(){
        var _sesTop=$('.section1').offset().top;
        /*console.log(_sesTop+$('.section1').height()/2)
        console.log('---',$(window).scrollTop())*/
        if($(window).scrollTop()>=(_sesTop-($(window).height()-$('.section1').height()/2))){
            $('.section1 h1').animate({
              'line-height':'90px',
              'opacity': 1,
              'filter': 'alpha(opacity=1)'
            })
        }
        if($(window).scrollTop()>=(_sesTop+$('.section1').height()/2)){
            $('.s2_right').animate({
              'margin-right':'0',
              'opacity': 1,
              'filter': 'alpha(opacity=1)'
            })
        }
        if($(window).scrollTop()>=($('.section2').offset().top+$('.section2').height()/2)){
            $('.section3 h3').animate({
                'line-height':'114px',
                'opacity': 1,
                'filter': 'alpha(opacity=1)'
            })
        }
        if($(window).scrollTop()>=($('.section3').offset().top+$('.section3').height()/2)){
            $('.section4 .s4_left').animate({
              'margin-left': '-40px',
              'opacity': 1,
              'filter': 'alpha(opacity=1)'
            })
        }
        if($(window).scrollTop()>=($('.section4').offset().top+$('.section4').height()/2)){
            $('.section5 h3').animate({
                'line-height':'136px',
                'opacity': 1,
                'filter': 'alpha(opacity=1)'
            })
        }
        if($(window).scrollTop()>=($('.section5').offset().top+$('.section5').height()/2)){
            $('.section6 h3').animate({
                'line-height':'127px',
                'opacity': 1,
                'filter': 'alpha(opacity=1)'
            });
            setTimeout(function(){
              $('.section7 .animated').show();
            $('.section7 .animated').addClass('bounceInUp');
            },800)
        }
    })

/*
主页整体动态效果设置end
 */
