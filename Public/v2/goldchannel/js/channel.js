
$(function(){

    //实时快讯财经日历切换
    $('.fright_pic').show();
    $('.fright_pic1').hide();
    $(".llg_sskx").hover(function(){
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.fright_pic1').hide();
        $('.fright_pic').show();
    });
    $(".llg_cjrl").hover(function(){
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.fright_pic1').show();
        $('.fright_pic').hide();
    });

    //左侧列表价格和走势图切换
    $(".gclistl_title a").hover(function(){
        var now = $(this).index();
        $(this).parent().children(".gclistl_title a").removeClass('cur');
        $(this).addClass('cur');

        $(this).parent().parent().children(".gclistl_show").children(".gclistl_main").hide();
        $(this).parent().parent().children(".gclistl_show").children(".gclistl_main").eq(now).show();
    });

    $("#gcpic_ul1 li").hover(function(){
        var code = $(this).attr('data-code');
        $(this).parent().children(".gcpic_ul li").children("a").removeClass('cur');
        $(this).children("a").addClass('cur');

        $("#hqt1")[0].src="http://hq.dyhjw.com/small/fenshi.php?code="+code;

    });

    $("#gcpic_ul2 li").hover(function(){
        var code = $(this).attr('data-code');
        $(this).parent().children(".gcpic_ul li").children("a").removeClass('cur');
        $(this).children("a").addClass('cur');

        $("#hqt2")[0].src="http://hq.dyhjw.com/small/fenshi.php?code="+code;

    });

    $("#gcpic_ul3 li").hover(function(){
        var code = $(this).attr('data-code');
        $(this).parent().children(".gcpic_ul li").children("a").removeClass('cur');
        $(this).children("a").addClass('cur');

        $("#hqt3")[0].src="http://hq.dyhjw.com/small/fenshi.php?code="+code;

    });

    $("#gcpic_ul4 li").hover(function(){
        var code = $(this).attr('data-code');
        $(this).parent().children(".gcpic_ul li").children("a").removeClass('cur');
        $(this).children("a").addClass('cur');

        $("#hqt4")[0].src="http://hq.dyhjw.com/small/fenshi.php?code="+code;

    });


    //实物黄金切换
    var _ul = $(".gswhj_main ul");
    var _li = _ul.find("li");
    var listWidth = _li.width();
    var listNum = _li.length;
    var totalW = listWidth * listNum;
    var nowAnimate = false;
    _ul.width(totalW);
    var nextPic = function(){

        nowAnimate = true;
        var nowW = $(".gswhj_main ul").position().left;
        if(-nowW == totalW-641){

            $(".gswhj_main ul").animate({left:0},function(){nowAnimate = false;});
            return false;
        }else if(-nowW < totalW-641){
            var moveW = nowW -641;
            $(".gswhj_main ul").animate({left:moveW},function(){nowAnimate = false;});
        }else {
            nowAnimate = false;
        }
    };
    var prevPic = function(){
        nowAnimate = true;

        var nowW = $(".gswhj_main ul").position().left;
        console.log(nowW,totalW-641);
        if(-nowW == 0){
            var maxW = -totalW+641;
            $(".gswhj_main ul").animate({left:maxW},function(){nowAnimate = false;});
            return false;
        }else if(-nowW <= totalW-641){
            var moveW = nowW +641;
            $(".gswhj_main ul").animate({left:moveW},"slow",function(){nowAnimate = false;});
        }else {
            nowAnimate = false;
        }
    };
    $(".gswhj_next").click(function(){
        if(!nowAnimate){
            nextPic();
        }
    });

    $(".gswhj_prev").click(function(){
        if(!nowAnimate){
            prevPic();
        }

    });
    //新闻列表切换
    $(".news_title ul li").hover(function(){
        var thisNum = $(this).index();
        $(".news_title ul li").removeClass('now');
        $(this).addClass('now');
        $(".top2_box").hide();
        $(".top2_box").eq(thisNum).show();
    });

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

    if($('.gch_rd').length>0){
        var rdTop = $(".gch_rd").offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() > rdTop) {
                $(".gch_rd").addClass("gch_rdfixed");
            } else {
                $(".gch_rd").removeClass("gch_rdfixed");
            }
        })
    }
    //实时快讯
    $(".kx_scroll_box li").each(function(){
        var nH = $(this).find(".text");
        if (nH.height()>58){
            nH.css("height","58px");
            $(this).find(".time").addClass("select");
        }
    });
    $(document).on("click",".kx_scroll_box li .select",function(){
        if($(this).parent().find(".text").height() == 58){
            $(this).parent().find(".text").removeAttr("style");
            $(this).addClass("close");
        }
        else{
            $(this).parent().find(".text").css("height","58px");
            $(this).removeClass("close");
        }
    })
});
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

        $(".gchart_qh a").hover(function(){
            var nowNum = $(this).index();
            $(this).parent().parent().parent().children('.gchan_list').children('.gclist_s').children('.gcl_right').hide();
            $(this).parent().parent().parent().children('.gchan_list').children('.gclist_s').children('.gcl_right').eq(nowNum).show();
        });

        //$(".gchart_qh a").each(function(index){
        //    $(this).hover(function(){
        //        $(".gcl_right").css("display","none");
        //        $(".gcl_right").eq(index).css("display","block");
        //    })
        //})
    }
);

/**
 * 连接SW
 * @return {[type]} [description]
 */
function connHQ() {
    var wsReconnect = function(){

        this.ws = null;
        this.timeInterval;

        var local = this;

        // this.debug = true;
        this.debug = false;

        //this.dataHqLoginString = 'ws://114.215.194.241:8188/hq';
        this.dataHqLoginString = 'ws://ws.hq.dyhjw.com:10018/hq';
        this.log    = function(msg){
            if(this.debug){
                console.log(msg);
            }
        }

        this.sendHeartbeat = function() {
            msg = new Object();
            msg.cmd = 'heartbeat';
            msg.data = ""
            //local.log(local.ws)
            try{
                local.connect();
                local.ws.send(JSON.stringify(msg));
            }catch (e) {
                local.log(e.name + ": " + e.message);
            }

        }

        this.listenEvent  = function() {
            /**
             * 连接建立时触发
             */
            local.ws.onopen = function (e) {
                //连接成功
                local.log("connect webim server success.");
            };

            //有消息到来时触发
            local.ws.onmessage = function (evt) {

                var data1 = JSON.parse(evt.data);
                var data = null;
                // console.log(data1);
                var j = {};
                for(var i=0;i<data1.length;i++){
                    eval('j.'+data1[i].C+' = 0')
                }

                for(var i=0;i<data1.length;i++){


                    data = data1[i];
                    data.code = data.C;
                    data.last = data.P;
                    data.open = data.O;
                    data.lastClose = data.LC;
                    data.high = data.H;
                    data.low = data.L;

                    data.swing = data.ZD;
                    data.swingRange = data.ZDF;

                    if(data.swing!=0 && data.swingRange==0){
                        data.swingRange = (parseFloat((data.P-data.LC)/data.LC)*100).toFixed(4)+'%';
                    }else{
                        data.swingRange = data.swingRange+'%';
                    }

                    data.volume = data.V;
                    var d= new Date();
                    d.setTime(parseInt(data.T)*1000);

                    var mmm = function(k){
                        if(parseInt(k)<10)return '0'+k;
                        return k;
                    }
                    data.quoteTime = d.getFullYear()+"-"+mmm(d.getMonth())+"-"+mmm(d.getDate())+" "+mmm(d.getHours())+":"+mmm(d.getMinutes())+":"+mmm(d.getSeconds());


                    var t = data.swing>0?'+':'';
                    var swing=data.swing;
                    var price = parseFloat($($('[code=' + data.code + ']').find('.last')[0]).text());
                    $('[code=' + data.code + ']').find('h3').text(data.last);
                    $('[code=' + data.code + ']').find('.last').text(data.last);
                    $('[code=' + data.code + ']').find('.swing').text(t + swing);
                    $('[code=' + data.code + ']').find('.swingRange').text(t + data.swingRange);






                    //去掉重复的code
                    eval('var mm = j.'+data.code)
                    if(parseInt(mm)>0){
                        continue;
                    }else{
                        eval('j.'+data.code+'++')
                    }


                    if (data.ZD >0)
                    {

                        $('[code=' + data.code + '] .nom').addClass('red');
                        $('[code=' + data.code + '] .nom').removeClass('green');
                        $('[code=' + data.code + '] .price_bd').addClass('red');
                        $('[code=' + data.code + '] .price_bd').removeClass('green');
                    }else if (data.ZD <0){
                        $('[code=' + data.code + '] .nom').addClass('green');
                        $('[code=' + data.code + '] .nom').removeClass('red');
                        $('[code=' + data.code + '] .price_bd').addClass('green');
                        $('[code=' + data.code + '] .price_bd').removeClass('red');
                    }
                    else
                    {
                        $('[code=' + data.code + '] .nom').removeClass('green');
                        $('[code=' + data.code + '] .nom').removeClass('red');
                        $('[code=' + data.code + '] .price_bd').removeClass('green');
                        $('[code=' + data.code + '] .price_bd').removeClass('red');
                    }





                    if (parseFloat(data.last)-price > 0) { //red
                        $('[code=' + data.code + ']').find('.updown').text('↑');
                        $('[code=' + data.code + ']').addClass('red_bg');
                        $('[code=' + data.code + ']').find('.updown').addClass('red');
                        $('[code=' + data.code + ']').find('.updown').removeClass('green');
                        if(data.swing>0){
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']').addClass('red');

                        }else if(data.swing<0){
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').addClass('green');
                        }else{
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('red');
                        }

                    }else if (parseFloat(data.last)-price < 0) { //green
                        if(data.swing>0){
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']').addClass('red');

                        }else if(data.swing<0){
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').addClass('green');
                        }else{
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('red');
                        }

                        $('[code=' + data.code + ']').find('.updown').text('↓');
                        $('[code=' + data.code + ']').addClass('green_bg');
                        $('[code=' + data.code + ']').find('.updown').addClass('green');
                        $('[code=' + data.code + ']').find('.updown').removeClass('red');
                    } else { ////no red  no green


                        if(data.swing>0){
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']').addClass('red');

                        }else if(data.swing<0){
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').addClass('green');
                        }else{
                            $('[code=' + data.code + ']').removeClass('red');
                            $('[code=' + data.code + ']').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('green');
                            $('[code=' + data.code + ']>span').removeClass('red');
                        }


                    }



                }//for
                setTimeout(function() {
                    $('[code=' + data.code + ']').removeClass('green_bg');
                    $('[code=' + data.code + ']').removeClass('red_bg');
                    $('.table_box tr').removeClass('red_bg');
                    $('.table_box tr').removeClass('green_bg');
                    $('.updown').empty();
                }, 800);

            }; //onmessage

            /**
             * 连接关闭事件
             */
            local.ws.onclose = function (e) {};

            /**
             * 异常事件
             */
            local.ws.onerror = function (e) {};
        }//listenEvent

        this.connect = function(){
            if(typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3){
                if (window.WebSocket || window.MozWebSocket)
                {
                    local.ws = new WebSocket(local.dataHqLoginString+"?token="+ getCookie("hq_Token"));
                    local.listenEvent();
                }
                else if (1)
                {
                    local.ws = new WebSocket(local.dataHqLoginString+"?token="+ getCookie("hq_Token"));
                    local.listenEvent();
                }
            }
            setInterval(function() {
                local.ws.send('');
            }, 1000 * 3);
        }
    }//wsReconnect


    var wsr = new wsReconnect();
    wsr.connect("");

}


//更新数据闪亮一下
function flashColor(ele, color) {
    if (color == 'red') {
        ele.addClass('rbcolor');
        ele.addClass('w_');
        setTimeout(function() {
            ele.removeClass('rbcolor');
            ele.removeClass('w_');
        }, 500);
    } else if (color == 'green') {
        ele.addClass('gbcolor');
        ele.addClass('w_');
        setTimeout(function() {
            ele.removeClass('gbcolor');
            ele.removeClass('w_');
        }, 500);
    }
}