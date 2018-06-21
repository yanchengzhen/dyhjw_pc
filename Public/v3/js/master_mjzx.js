$(function(){
    var nt_T = $(".news_title_fix").offset().top;
    $(".news_title li").each(function(index){
        var cleartime= null;
        $(this).hover(function(){
            $(this).css({"background":"url('Public/v2/images/index/icon_news_bg.png') no-repeat","color":"#FFF"});
            cleartime=setTimeout(function(){
                $(".news_title li").removeClass("now");
                $(".news_title li").eq(index).addClass("now");
                $(".news_list_change .top2_box").css("display","none");
                $(".news_list_change .top2_box").eq(index).css("display","block");
                if($(document).scrollTop()>nt_T){
                    $('body,html').scrollTop(nt_T);
                }
            },50);

        },function(){
            $(this).removeAttr("style");
            clearTimeout(cleartime);
        });
    });
});