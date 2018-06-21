$(function() {
    $(".gchart_nav a").click(function() {
        $(".gchart_nav a").removeClass('cur');
        $(this).addClass('cur');
    });

    //伦敦金行情资讯、伦敦金问答切换
    $('.gul').show();
    $('.gul1').hide();
    $(".g_hqzx").hover(function() {
        $(".gselect_title span").removeClass('cur');
        $(this).addClass('cur');
        $('.gul').show();
        $('.gul1').hide();
    });
    $(".g_wd").hover(function() {
        $(".gselect_title span").removeClass('cur');
        $(this).addClass('cur');
        $('.gul').hide();
        $('.gul1').show();
    });

    //点击伦敦金价格行情表格下拉

    // $(".table_select").mouseover(function(){
    //     $(".table_select").children('a').removeClass('table_upa');
    //     $(this).parent().parent().parent('.gchart_table').find(".tr_gchart").hide();
    //     $(this).parent().next().show();
    //     $(this).children('a').addClass('table_upa');
    // });
});

function ldj_jg() {
    $.post('/index/ldj_jg_ajax', function(data) {

        $('#quote1').tmpl(data.quote1_data).appendTo('#div_quote1');
        $('#quote2').tmpl(data.quote2_data).appendTo('#div_quote2');
        $('#quote3').tmpl(data).appendTo('#div_quote3');
        //点击伦敦金价格行情表格下拉
        if ($(".gchart_table").find(".tr_gchart")) {
            if (window.attachEvent) {
                setTimeout(function() {
                    var iframe = $(".gchart_table").find(".tr_gchart").eq(0).find('iframe');
                    iframe.attr('src',iframe.attr('src'));
                    iframe = $(".gchart_table").find(".tr_gchart").eq(2).find('iframe');
                    iframe.attr('src',iframe.attr('src'));
                    $(".gchart_table").find(".tr_gchart").eq(0).show();
                    $(".gchart_table").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
                    $(".gchart_table").find(".tr_gchart").eq(2).show();
                    $(".gchart_table").find(".tr_gchart").eq(2).prev().children().children('a').addClass('table_upa');
                }, 500);
            } else {
                $(".gchart_table").find(".tr_gchart").eq(0).show();
                $(".gchart_table").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
                $(".gchart_table").find(".tr_gchart").eq(2).show();
                $(".gchart_table").find(".tr_gchart").eq(2).prev().children().children('a').addClass('table_upa');
            }
        }
        if ($(".ctable").find(".tr_gchart")) {
            if (window.attachEvent) {
                setTimeout(function() {
                    $(".ctable").find(".tr_gchart").eq(0).show();
                    $(".ctable").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
                }, 500);
            }
        }
        if ($(".ctable1").find(".tr_gchart")) {
            if (window.attachEvent) {
                setTimeout(function() {
                    $(".ctable1").find(".tr_gchart").eq(0).show();
                    $(".ctable1").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
                }, 500);
            }
        }
        $(".table_select").mouseover(function() {
            if($(this).children('a').hasClass('table_upa')) {
                return false;
            }
            $(this).parents('table').find('.table_select').children('a').removeClass('table_upa');
            $(this).parent().parent().parent('.gchart_table').find(".tr_gchart").hide();
            var code = $(this).parent().attr('code');
            $(this).parent().next().find('.llg_gchart').html('<iframe height="400" width="678" src="http://hq.dyhjw.com/nhq/fenshi.php?code='+code+'" frameborder="0"></iframe>');
            $(this).parent().next().show();
            $(this).children('a').addClass('table_upa');
            // 行情连接
            connHQ();
        });
    }, 'json');
}