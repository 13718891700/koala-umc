var href='.'+window.location.hash.substring(1);
if(href.length>=2){
    onclick(href);
}
$(".content1 div ul>li").on("click",function(a){
    var index=$(this).index();
    onclick(this,index);
})
function onclick(a,b){
    if(b==0){
      return false;
    }else{
      var classes=$(a).attr("class");
      var texts=$(a).html();
      var textss=$(a).parent().html();
      $(".content1 .a_title ul>li").attr("id","");
      $(a).attr("id","highlight");
      $(".content1 .a_theme").children("p:nth-child(3)").html(texts);
      $(".content1 .a_theme").children("p:nth-child(2)").html(textss);
      $(".content1 div[class~='public']").css({"display":"none"});
      $(".content1 div[class~="+classes+"]").css({"display":"block"});
    }
}
$(window).on("scroll",function(){
    if($(window).scrollTop()>10){
        $(".filex_top").css("display","block");
    }
    if($(window).scrollTop()<=0){
        $(".filex_top").css("display","none");
        
    }
})