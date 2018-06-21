$(function(){
  var nt_T = $(".news_title_fix").offset().top;
  $(".news_title li").each(function(index){
    var cleartime= null;
    $(this).on('click',function(){
        $(".news_title li").removeClass("now");
        $(".news_title li").eq(index).addClass("now");
        $(".news_list_change .top2_box").css("display","none");
        $(".news_list_change .top2_box").eq(index).css("display","block");
        if($(document).scrollTop()>nt_T){
            $('body,html').scrollTop(nt_T);
        }
    });
  });
});
