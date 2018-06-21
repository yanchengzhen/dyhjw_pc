$(function() {
    // ajax获取首页数据中心
    setInterval(function() {
        $('.cjrl_mn_ul .cjrl_mn_li').each(function(i, e) {
            var timestamp = $(this).find('[timestamp]').attr('timestamp');
            var reality = $(this).find('.reality').text();
            if (isNaN(parseFloat(reality))) {
                d = new Date(parseInt(timestamp) * 1000);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var date = d.getDate();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var second = d.getSeconds();
                timer(year, month, date, hour, minute, second, 'timer', 'indexData')
                return false;
            } else {
                // indexData();
            }
        })
    }, 1000);

    //实时快讯财经日历切换
    $('.data_center').hide();
    $('.gselect_ul').show();
    $('.gselect_div').show();
    $('.sslx_more').hide();
    $(".llg_sskx").hover(function() {
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.data_center').hide();
        $('.gselect_ul').show();
        $('.gselect_div').show();
        $('.sslx_more').show();
    });
    $(".llg_cjrl").hover(function() {
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.data_center').show();
        $('.gselect_ul').hide();
        $('.gselect_div').hide();
        $('.sslx_more').hide();
    });
  // 快讯滚动
  $(".kx_scroll_box").niceScroll({
    cursorcolor: "#999",
    cursorwidth: "4px",
    hidecursordelay: 1000,
    mousescrollstep: 50,
    scrollspeed: 70,
    smoothscroll: true
  });
  $(".sskx_wrap li").each(function(){
    var nH = $(this).find(".text");
    if (nH.height()>58){
      nH.css("height","58px");
      $(this).find(".time").addClass("select");
    }
  });
    $(document).on("click", ".kx_scroll_box li .select", function() {
        if ($(this).parent().find(".text").height() == 58) {
            $(this).parent().find(".text").removeAttr("style");
            $(this).addClass("close");
        } else {
            $(this).parent().find(".text").css("height", "58px");
            $(this).removeClass("close");
        }
    })
});

// 伦敦金ajax
function ldj() {
    $.post('/index/ldj_ajax', function(data) {
        $('#quote_main').tmpl(data.quote_main_data).appendTo('#div_quote_main');
        $('#quote_side').tmpl(data).appendTo('#div_quote_side');
        $('#kx_list').tmpl(data.kx_list).appendTo('#div_kx_list');
        $('#cjrlUnPublished').tmpl(data.cjrlUnPublished).appendTo('#div_cjrlUnPublished');
        $('#cjrlPublished').tmpl(data.cjrlPublished).appendTo('#div_cjrlPublished');
        $(".gselect_ul li").each(function() {
            var nH = $(this).find(".text");

            if (nH.height() > 50) {
                nH.css("height", "50px");
                $(this).find(".time").addClass("select");
            }
        })

        //点击伦敦金价格行情表格下拉
        if ($(".gchart_table").find(".tr_gchart")) {
            if (window.attachEvent) {
                setTimeout(function() {
                    var iframe = $(".gchart_table").find(".tr_gchart").eq(0).find('iframe');
                    iframe.attr('src',iframe.attr('src'));
                    $(".gchart_table").find(".tr_gchart").eq(0).show();
                    $(".gchart_table").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
                }, 500);
            } else {
                $(".gchart_table").find(".tr_gchart").eq(0).show();
                $(".gchart_table").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
            }

        }
        $(".table_select").mouseover(function() {
            if($(this).children('a').hasClass('table_upa')) {
                return false;
            }
            $(".table_select").children('a').removeClass('table_upa');
            $(".tr_gchart").hide();
            var code = $(this).parent().attr('code');
            $(this).parent().next().find('.llg_gchart').html('<iframe height="400" width="678" src="http://hq.dyhjw.com/nhq/fenshi.php?code='+code+'" frameborder="0"></iframe>');
            $(this).parent().next().show();
            $(this).children('a').addClass('table_upa');
        });

        // 连接行情
        connHQ();
        // 快讯连接
        //kx = new wsCjReconnect('ws://114.215.194.79:8189/', 'kx_Token');
        kx = new wsCjReconnect('ws://ws.kx.dyhjw.com/', 'kx_Token');
        kx.callback = function(data) {
            if (data.type == 1) {
                $('.gselect_ul').prepend('<li class=" " id="" datatime=""> <i class="kx_conf_bg"> <i class="kx_conf"> </i> </i> <span class="time"> ' + data.time.substring(11, 16) + ' </span> <a target="_blank" href="/kuaixun/"> <span class="text" style="max-height:64px;"> ' + data.title + ' </span> </a> </li>');
            }
        }
        //setTimeout(function() {
            kx.connect("kx");
        //},4000);
        // 日历连接  接收4条 1条未公布 3条已公布
        //rili = new wsCjReconnect('ws://121.41.40.186:8201/', 'calendar_Token');
        rili = new wsCjReconnect('ws://ws.rl.dyhjw.com/', 'calendar_Token');
        rili.callback = function(data) {

            for (i in data) {
                data[i] = rili.other(data[i]);
            }

            $('#div_cjrlUnPublished').empty();
            $('#cjrlUnPublished').tmpl(data[0]).appendTo('#div_cjrlUnPublished');

            $('#div_cjrlPublished').empty();
            $('#cjrlPublished').tmpl([data[1], data[2], data[2]]).appendTo('#div_cjrlPublished');

        }
        rili.connect("kx");
    }, 'json');

}

function timer(y, m, d, h, i, s, element, fun) {
    m = m - 1;
    var ts = (new Date(y, m, d, h, i, s)) - (new Date()); //计算剩余的毫秒数
    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
    var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
    var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
    var _s = ss;
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    var str = '';
    if (dd != '00') {
        str += dd + "天";
    }
    if (hh != '00') {
        str += hh + "时";
    }
    if (mm != '00') {
        str += mm + "分";
    }
    str += ss + "秒";
    if (parseFloat(ts) < 0) {
        document.getElementById(element).innerHTML = '公布中';
    } else {
        document.getElementById(element).innerHTML = str;
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function indexData() {
    $.get('/cjrl/getPublished/num/3', function(d) {
        var html = '';
        var classstr = '';
        var effectstr = '';
        // <li> <p><a href="#" target="_blank">美国10月季调后非农就业人口(非农数据)</a></p> <div class="gbz2 red"> <div class="gbz_demo1 td1">最新值：<span>236</span></div> <div class="gbz_demo1 td2">公布值：<span>236</span></div> <div class="gbz_demo1 td3"><span>利好美元</span></div> </div> </li>
        for (i in d) {

            if (d[i].importance == '高') {
                var dzg = 'zy';
            } else if (d[i].importance == '中') {
                var dzg = 'zd';
            } else {
                var dzg = 'pt';
            }

            if (d[i].effect) {
                if (d[i].effect['金银'] == '利多') {
                    classstr = 'red';
                    effectstr = '利多金银';
                } else if (d[i].effect['金银'] == '利空') {
                    classstr = 'green';
                    effectstr = '利空金银';
                } else {

                }
            } else {
                classstr = 'yellow';
                effectstr = '影响较小';
            }

            html += '<li><div class="time_box"><span class="time">' + d[i].time + '</span><span class="gj"><img src="/Public/Home/images/guo/' + d[i].icon + '.png" alt=""></span><span class="zyx"><img src="/Public/v1/images/zd.png" alt=""></span><div class="dgb">公布值：<span class="red">106.4</span></div></div><p><a href="' + d[i].url + '" target="_blank">' + d[i].state + d[i].title + '</a></p><div class="gbz  ' + classstr + '"><div class="gbz_demo td1">前值：<span class="before blue">' + d[i].before + '</span></div><div class="gbz_demo">预测值：<span class="blue">' + d[i].forecast + '</span></div><div class="gbz_demo td3 fr"><span>' + effectstr + '</span></div></div> </li>';
        }
        $('.data_ct_box').html(html);
    }, 'json');

    $.get('/index.php?s=/cjrl/getUnPublished/num/1', function(d) {

        var html = '';
        for (i in d) {
            if (d[i].importance == '高') {
                var dzg = 'zy';
            } else if (d[i].importance == '中') {
                var dzg = 'zd';
            } else {
                var dzg = 'pt';
            }
            html += ' <div class="cjrl_mn_li" autoid="' + d[i].autoid + '"> <div class="time_box"><span timestamp="' + d[i].times + '" class="time">' + d[i].time + '</span><span class="gj"><img src="/Public/Home/images/guo/' + d[i].icon + '.png" alt="' + d[i].state + '"></span><span class="zyx"><img src="/Public/v1/images/' + dzg + '.png" alt=""></span><div class="dgb reality">待公布</div></div><p><a href="' + d[i].url + '" target="_blank">' + d[i].state + d[i].title + '</a></p><div class="gbz"><div class="gbz_demo td1">前值：<span class="before blue">' + d[i].before + '</span></div><div class="gbz_demo td2">预测值：<span class="forecast blue">--</span></div></div></div>';
        }
        $('.cjrl_mn_ul').html(html);
    }, 'json');

}