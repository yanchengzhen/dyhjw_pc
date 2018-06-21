$(function() {
    //现货黄金问答行情切换
    $(".slist").show();
    $(".slist1").hide();
    $(".slist_hd").click(function() {
        $(".hq_nav span").removeClass('cur');
        $(this).addClass("cur");
        $(".slist").show();
        $(".slist1").hide();
    });
    // $(".slist_hq").click(function(){
    //     $(".hq_nav span").removeClass('cur');
    //     $(this).addClass("cur");
    //     $(".slist").hide();
    //     $(".slist1").show();
    // });
});