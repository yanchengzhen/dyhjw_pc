$(document).ready(
    function() {
        $(".kx_scroll_box").niceScroll({
            cursorcolor:"#999",
            cursorwidth:"4px",
            hidecursordelay:1000,
            mousescrollstep:50,
            scrollspeed:70,
            smoothscroll: true
        });
    }
);
$(function(){
    // 首页列表加载效果
    $('[index_list]').each(function(){
        var tmp=$(this).attr('index_list');
        if (tmp=='yaowen') {
            var cateid='7,72,74';
        }else{
            var cateid=$(this).attr('index_list_cateid');
        }
        $('body').data(tmp,1);

        $(this).find('.more_news').click(function(){
            var jumppage=$(this).find('a').attr('data_href');
            var that=this;
            // 分页
            var p=$('body').data(tmp);

            if (p<3) {
                layer.msg('加载中……');
                $.post('/index/loadMore',{p:p+1,cateid:cateid},function(d){
                    var html='';
                    // <li> <div class="news_list_pic"> <a href="http://www.dyhjw.com/gold/20161129-25008.html" target="_blank"> <img src="http://img.dyhjw.com/ueditor/php/upload/image/20161129/1480417161543257.jpg@0o_0l_100sh_200w_90q.src" alt="美元指数喜获支撑 美企2.5万亿海外利润回流"> <h2>美元指数喜获支撑 美企2.5万亿海外利润回流</h2> </a> </div> <div class="news_list_word"> <p>特朗普胜选之后，市场乐观地认为，其刺激计划将带动美国经济增长</p> <span class="time"><span>文/余辉利</span><span class="time_icon">23小时前</span> <span class="dz">74</span> </span> </div> </li>
                    for(i in d){
                        //html+='<li> <div class="news_list_pic"> <a href="'+d[i]['url']+'" target="_blank"> <img src="'+d[i]['image']+'" alt="'+d[i]['title']+'"> <h2>'+d[i]['title']+'</h2> </a> </div> <div class="news_list_word"> <p>'+d[i]['synopsis']+'</p> <span class="time"><span>文/'+d[i]['author']+'</span><span class="time_icon">'+d[i]['pushtime']+'</span> <a href="'+d[i]['categoryurl']+'" target="_blank" class="tag">'+d[i]['categoryname']+'</a> </span> </div> </li>';
                        html+='<li><div class="news_list_pic"><a href="'+d[i]['url']+'" target="_blank"><img src="'+d[i]['image']+'" alt="'+d[i]['title']+'">';
                        html+='<h2>'+d[i]['title']+'</h2></a></div><div class="news_list_word"><span class="tag_box">';
                        html+='<a target="_blank" class="f" href="'+d[i]['categoryurl']+'">'+d[i]['categoryname']+'</a></span><p>'+d[i]['synopsis']+'</p>';
                        html+='<span class="time"><span class="time_l">'+d[i]['pushtime']+'</span><span class="dz">点赞('+d[i]['zambia']+')</span></span></div></li>';
                    }
                    $(that).parent().find('.news_list').append(html);
                    $('body').data(tmp,$('body').data(tmp)+1);
                    layer.closeAll();
                    // $(".jycl_box").addClass("fixed2");
                },'json');
            }else{
                window.open(jumppage);
            }

        });
    });

    $(".jrjj_leftcg_title i").each(function(index){
        $(this).mouseenter(function(){
            $(".jrjj_leftcg_title i").removeClass("cur");
            $(this).addClass("cur");
            $(".jrjj_price_content").css("display","none");
            $(".jrjj_price_content").eq(index).css("display","block");
        })
    })

    /**
     * kcl
     * 行情tab切换
     */
    $(".hq_title i").hover(function () {
        // 获取点击的是第几个按钮
        var i = $(this).index();
        $(".hq_change_box").eq(i).show();
        $(".hq_change_box").eq(i).siblings().hide();
        $(this).addClass("cur");
        $(this).siblings().removeClass();
    });

    $(".etf_change_btn i").each(function(index){
        var cleartime1=null;
        $(this).hover(function(){
            cleartime1=setTimeout(function(){
                $(".etf_change_btn i").removeClass("cur");
                $(".etf_change_btn i").eq(index).addClass("cur");
                $(".etf_box .etf_change_box").css("display","none");
                $(".etf_box .etf_change_box").eq(index).css("display","block");
            },280);
        },function(){
            clearTimeout(cleartime1);
        });
    });
    $(".gold_change_btn i").each(function(index){
        var cleartime2 = null;
        $(this).hover(function(){
            cleartime2=setTimeout(function(){
                $(".gold_change_btn i").removeClass("cur");
                $(".gold_change_btn i").eq(index).addClass("cur");
                $(".gold_price_cgchange").css("display","none");
                $(".gold_price_cgchange").eq(index).css("display","block");
            },280);
        },function(){
            clearTimeout(cleartime2);
        });
    });
    $(".mark_us_title i").each(function(index){
        $(this).click(function(){
            $(".mark_us_title i").removeClass("cur");
            $(this).addClass("cur");
            $(".mark_box .about_change_box").css("display","none");
            $(".mark_box .about_change_box").eq(index).css("display","block");
        })
    })
    //新闻导航浮动
    if($('.news_title_fix').length>0){
        var ntTop = $(".news_title_fix").offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() > ntTop) {
                $(".news_title_fix .news_title").addClass("fixed");
            } else {
                $(".news_title_fix .news_title").removeClass("fixed");
            }
        })
    }
    //当天日期时间
    function getform(n) {
        var m = ((n < 10) ? ('0' + n) : n).toString();
        return m;
    }
    function getTimeQuYu() {
        var today = new Date((new Date()).getTime());
        var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
        var bjDate = new Date(utc + (3600000 * (8)));	// 中国北京时间
        var arrDate = {
            bj: {
                Y: bjDate.getFullYear(),
                M: bjDate.getMonth() + 1,
                D: bjDate.getDate(),
                h: bjDate.getHours(),
                m: bjDate.getMinutes(),
                s: bjDate.getSeconds(),
                d: bjDate.getDay()
            }
        }
        //获取北京的时间时间
        var bjtim = getform(arrDate.bj.Y) + '年' + getform(arrDate.bj.M) + '月' +
            getform(arrDate.bj.D)+'日';
        $('.tady_time .ndata').html(bjtim);
        var xingqi = [
            '星期天',
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
        ];
        var bjday = xingqi[arrDate.bj.d];
        $('.tady_time .week').html(bjday);
        // 获取纽约的时间，把 bj 换成
    }
    setInterval(function () {
        getTimeQuYu();
    }, 1000);
    //友情链接点击展开
    //$(".frd_link .right_title_demo1 span").click(function(){
//		if($(this).text()=="收起"){
//			$(this).text("展开");
//			$(".frd_link .right_title_demo1 span").removeClass("open");
//			$(".frd_link .frd_link_box").css("height","96px");
//		}
//		else{
//			$(this).text("收起");
//			$(".frd_link .right_title_demo1 span").addClass("open");
//			$(".frd_link .frd_link_box").css("height","auto");
//		}
//	})
    //左侧策略浮动
//	if($('.jycl_box').length>0){
//		var a = $(".jycl_box").offset().top-80;
//		var clh = $(".jycl_box").height()+15;
//		var b = $(".more_news").offset().top-clh;
//		$(window).scroll(function(){
//			if ($(this).scrollTop() > a) {
//				$(".jycl_box").addClass("fixed");
//			}else{
//				$(".jycl_box").removeClass("fixed");
//		    }
//			if ($(this).scrollTop() > a && $(this).scrollTop() > b) {
//				$(".jycl_box").removeClass("fixed");
//				$(".jycl_box").addClass("fixed1");
//			}else{
//				$(".jycl_box").removeClass("fixed1");
//		    }
//		})
//	}
    $(".sskx_wrap li").each(function(){
        var nH = $(this).find(".text");
        if (nH.height()>58){
            nH.css("height","58px");
            $(this).find(".time").addClass("select");
        }
    })
    $(document).on("click",".sskx_wrap li .select",function(){
        if($(this).parent().find(".text").height() == 58){
            $(this).parent().find(".text").removeAttr("style");
            $(this).addClass("close");
        }
        else{
            $(this).parent().find(".text").css("height","58px");
            $(this).removeClass("close");
        }
    })
    $(window).scroll(function(){
        var pmH = document.documentElement.clientHeight;
        var tH = pmH - $(".nn_left").outerHeight();
        var bT = ($(".fri_bg").offset().top-pmH) - tH;
        if($(this).scrollTop()>bT){
            $(".nn_link").css("display","none");
        }
        else{
            $(".nn_link").css("display","block");
        }
    })
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

    if($('.mark_us').length>0){
        var a1 = $(".mark_us").offset().top-100;
        $(window).scroll(function(){
            if ($(this).scrollTop() > a1) {
                $(".mark_us").addClass("fixed");
            }else{
                $(".mark_us").removeClass("fixed");
            }
        })
    }

    // ajax获取首页数据中心
    setInterval(function() {
        $('.cjrl_mn_ul .cjrl_mn_li').each(function(i,e){
            var timestamp=$(this).find('[timestamp]').attr('timestamp');
            var reality=$(this).find('.reality').text();

            if (isNaN(parseFloat(reality))) {
                d=new   Date(parseInt(timestamp)*1000);
                var   year=d.getFullYear();
                var   month=d.getMonth()+1;
                var   date=d.getDate();
                var   hour=d.getHours();
                var   minute=d.getMinutes();
                var   second=d.getSeconds();

                //timer(year,month,date,hour,minute,second,'timer','indexData')
                timer(year,month,date,hour,minute,second,'timer')

                return false;
            }else{
                // indexData();
            }
        })
    }, 1000);
});
/**
 * 倒计时
 * @param  {[type]} y       [description]
 * @param  {[type]} m       [description]
 * @param  {[type]} d       [description]
 * @param  {[type]} h       [description]
 * @param  {[type]} i       [description]
 * @param  {[type]} s       [description]
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
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
        // eval(fun+'()');
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
function indexData(){
    $.get('/cjrl/getPublished/num/3',function(d){
        var html='';
        var classstr='';
        var effectstr='';
        // <li> <p><a href="#" target="_blank">美国10月季调后非农就业人口(非农数据)</a></p> <div class="gbz2 red"> <div class="gbz_demo1 td1">最新值：<span>236</span></div> <div class="gbz_demo1 td2">公布值：<span>236</span></div> <div class="gbz_demo1 td3"><span>利好美元</span></div> </div> </li>
        for(i in d){

            if (d[i].importance=='高') {
                var dzg='zy';
            }else if(d[i].importance=='中'){
                var dzg='zd';
            }else{
                var dzg='pt';
            }

            if (d[i].effect) {
                if (d[i].effect['金银']=='利多') {
                    classstr='red';
                    effectstr='利多金银';
                }else if(d[i].effect['金银']=='利空'){
                    classstr='green';
                    effectstr='利空金银';
                }else{

                }
            }else{
                classstr='yellow';
                effectstr='影响较小';
            }
            html+='<li><div class="time_box"> <span class="time">'+d[i].time+'</span>';
            html+='<span class="gj"><img src="/Public/Home/images/guo/'+d[i].icon+'.png" alt=""></span>';
            html+=' <span class="zyx"><img src="/Public/v1/images/'+dzg+'.png" alt="'+d[i].state+'"></span>';
            html+='<div class="dgb">公布值：<span class="red">'+d[i].reality+'</span></div></div>';

            html+='<p><a href="'+d[i].url+'" target="_blank">'+d[i].state+d[i].title+'</a></p>';
            html+='<div class="gbz '+classstr+'">';
            html+='<div class="gbz_demo td1">前值：<span class="before blue">'+d[i].before+'</span></div>';
            html+=' <div class="gbz_demo td2">预测值：<span class="forecast blue">'+d[i].forecast+'</span></div>';
            html+='<div class="gbz_demo td3 fr"><span>'+effectstr+'</span></div> </div> </li>';
        }
        $('.data_ct_box').html(html);
    },'json');

    $.get('/index.php?s=/cjrl/getUnPublished/num/2',function(d){
        // <div class="cjrl_mn_li" autoid="262754"> <div class="time_box"> <span timestamp="1479973500" class="time">15:45</span> <span class="zyx"><img src="/Public/v1/images/zd.png" alt="中等"></span> <span class="gj"><img src="/Public/Home/images/guo/fg.png" alt="瑞士"></span> </div> <p><a href="#" target="_blank">法国11月商业信心指数</a></p> <div class="gbz"> <div class="gbz_demo td1">公布值：<span class="blue reality">待公布</span></div> <div class="gbz_demo td2">前值：<span class="before">101</span></div> <div class="gbz_demo td2">预测值：<span class="forecast">101</span></div> </div> </div>
        var html='';
        var now = Date.parse(new Date());
        for(i in d){
            var datetime = d[i].date + ' ' + d[i].time;
            var date = new Date(datetime.replace(/-/g, '/'));
            var time1 = date.getTime();
            if(time1+15*60 < now){

            }else{
                if (d[i].importance=='高') {
                    var dzg='zy';
                }else if(d[i].importance=='中'){
                    var dzg='zd';
                }else{
                    var dzg='pt';
                }
                html+='<div class="cjrl_mn_li" autoid="'+d[i].autoid+'">';
                html+='<div class="time_box">';
                html+='<span timestamp="'+d[i].times+'" class="time">'+d[i].time+'</span>';
                html+='<span class="gj"><img src="/Public/Home/images/guo/'+d[i].icon+'.png" alt="'+d[i].state+'"></span>';
                html+=' <span class="zyx"><img src="/Public/v1/images/'+dzg+'.png" ></span>';
                html+='<div class="dgb">待公布</div></div>';

                html+='<p><a href="'+d[i].url+'" target="_blank">'+d[i].state+d[i].title+'</a></p>';
                html+='<div class="gbz">';
                html+='<div class="gbz_demo td1">前值：<span class="before blue">'+d[i].before+'</span></div>';
                html+=' <div class="gbz_demo td2">预测值：<span class="forecast blue">'+d[i].forecast+'</span></div></div> </div>';
                break;
            }
        }
        $('.cjrl_mn_ul').html(html);
    },'json');


}


