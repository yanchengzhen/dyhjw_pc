/**
 **		公用滚动方法
 **     支持定时自动轮播、前后轮播、单独点击轮播
 **/
(function($){

    $("div[data-scro='controler'] span,div[data-scro='controler2'] a").click(function(){
        var T = $(this);
        if(T.attr("class")=="down") return false;
        J2ROLLING_ANIMATION.st({
            findObject : T,	//当前点击对象 默认写
            main : T.parent().parent().find("div[data-scro='list']"),	//滚动目标容器窗口对象
            pagSource : T.parent().parent().find("div[data-scro='controler'] span"),	//切换按钮对象
            className : "down",		//选中的样式
            duration : 250,		//滚动速度 和jquery速度一致
            on : $(this)[0].tagName=="A" ? true : false		//用于判断是否开启无限滚动 or 来回切换
        });
        return false;
    });
    var allpg = $(".section-focus-pic ul li").length;
    $(".now_page_box .all_page").text(allpg);//总的图片新闻数量
    var J2SETTIME="", J2Time=true,J2ROLLING_ANIMATION = {
        init : function(){
            this.start();
            this.time();
        },
        st : function(o){
            if(J2Time){
                this.animate(o.findObject,o.main,o.className,o.duration,o.pagSource,o.on);
                J2Time = false;
            }
        },
        animate : function(T,M,C,S,P,O){
            var _prevDown = O ? P.parent().find("*[class='"+C+"']") : T.parent().find(T[0].tagName+"[class='"+C+"']"),
                _prevIndex = _prevDown.index(),
                _thisIndex = O ? (T.attr("class")=="next" ? _prevIndex+1 : _prevIndex-1) : T.index(),
                _list = M.find(".item"),
                p2n = 1;
            _prevDown.removeClass(C);
            if(O){
                if(_thisIndex==-1) _thisIndex=_list.size()-1;
                if(_thisIndex==_list.size()) _thisIndex=0;
                P.eq(_thisIndex).addClass(C);
            }else{
                T.addClass(C);
            }
            if(T.attr("class")=="prev" || _thisIndex<_prevIndex) p2n = false;
            if((T.attr("class")=="next" || _thisIndex>_prevIndex)&&T.attr("class")!="prev") p2n = true;

            !p2n ? _list.eq(_thisIndex).css("left",-M.width()) : '';
            _list.eq(_prevIndex).animate({left:p2n ? -M.width() : M.width()},S,function(){
                $(this).removeAttr("style");
                J2Time = true;
            });
            _list.eq(_thisIndex).animate({left:"0px"},S);
            $(".now_page_box .now_page").text(_thisIndex+1);//当前显示的图片新闻序号
        },
        start : function(){
            $(".pages,.section-focus-pic .controler2 a i").mouseover(function(){
                window.clearInterval(J2SETTIME);
            }).mouseout(function(){
                J2ROLLING_ANIMATION.time();
            });
        },
        time : function(){
            J2SETTIME = window.setInterval(function(){
                var num = $("#section-focus-pic div[data-scro='controler'] span[class='down']").index(),
                    _list = $("#section-focus-pic div[data-scro='list'] li");
                _list.eq(num).animate({"left":-$("#section-focus-pic div[data-scro='list']").width()},"slow",function(){
                    $(this).removeAttr("style");
                    $("#section-focus-pic div[data-scro='controler'] span").removeClass("down").eq(num).addClass("down");
                    $(".now_page_box .now_page").text(num+1);//当前显示的图片新闻序号
                });
                num++;
                if(num==_list.size()){
                    num=0;
                }
                _list.eq(num).animate({"left":"0px"},"slow");
            },4000);
        }
    };
    $("a").click(function(){
        $(this).blur();
    });

    J2ROLLING_ANIMATION.init();	//是否开启自动轮播
})(this.jQuery || this.baidu);




$(function(){

    //表格切换
    $(document).on('click','.ntd_tnav li',function(){

        var nowNum = $(this).index();
        $(".ntd_tnav li").removeClass('cur');
        $(this).addClass('cur');
         var code =$(this).attr("code");

        if(nowNum>0){
           
            var interval=$(this).attr("interval");

            //console.log($(".iframet"));

            // for(var i=0;i<$(".iframet").length;i++){
            //    var tr= $($(".iframet")[i]).parents('.tr_gchart');
            //
            //    if(tr[0].hidden==false){
            //
            //     $(".iframet")[i].src="http://hq.dyhjw.com/nhq/candle.php?code="+code+"&interval="+interval;
            //    }
            // }

            $(this).parent().siblings('div.llg_gchart').html('<iframe class="iframet" height="400" width="100%" src="http://hq.dyhjw.com/nhq/candle.php?code='+code+'&interval='+interval+'" frameborder="0"></iframe>')

            
            

            
        }else{

            // for(var i=0;i<$(".iframet").length;i++){
            //    var tr= $($(".iframet")[i]).parents('.tr_gchart');
            //
            //     if(tr[0].hidden==false){
            //     $(".iframet")[i].src="http://hq.dyhjw.com/nhq/fenshi.php?code="+code;
            //    }
            // }

            $(this).parent().siblings('div.llg_gchart').html('<iframe class="iframet" height="400" width="100%" src="http://hq.dyhjw.com/nhq/fenshi.php?code='+code+'" frameborder="0"></iframe>')

        }
        
       // $(".llg_gchart").hide();
       // $(".llg_gchart").eq(nowNum).show();
    });

    //点击伦敦金价格行情表格下拉
    if($(".gchart_table").find(".tr_gchart")){
        $(".gchart_table").find(".tr_gchart").eq(0).show();
        $(".gchart_table").find(".tr_gchart").eq(0).prev().children().children('a').addClass('table_upa');
    }
    $(".table_select").mouseover(function(){
        $(".table_select").children('a').removeClass('table_upa');
        $(".tr_gchart").hide();
        $(this).parent().next().show();
        $(this).children('a').addClass('table_upa');
    });

    //实时快讯财经日历切换
    $('.data_center').show();
    $('.gselect_ul').hide();
    $(".llg_sskx").hover(function(){
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.data_center').hide();
        $('.gselect_ul').show();
    });
    $(".llg_cjrl").hover(function(){
        $('.gselect_title span').removeClass('cur');
        $(this).addClass('cur');
        $('.data_center').show();
        $('.gselect_ul').hide();
    });

    //银价汇率,汇率换算
    // $(".rate_yj").show();
    // $(".rate_hl").hide();
    // $(".list_hide").hide();
    $(".rate_title .fl").click(function(){
        $(".rate_main").hide();
        $(".rate_title div").removeClass("now");
        $(this).addClass("now");
        $(".rate_yj").show();
    });
    $(".rate_title .fr").click(function(){
        $(".rate_main").hide();
        $(".rate_title div").removeClass("now");
        $(this).addClass("now");
        $(".rate_hl").show();
    });
    // $(".list_select").mouseenter(function(){
    //     $(".list_hide").hide();
    //     $(this).children(".list_hide").show();
    // });
    // $(".list_select").mouseleave(function(){
    //     $(".list_hide").hide();
    // });
    // $(".list_hide span").click(function(){
    //     var newC = $(this).html();
    //     console.log(newC);
    //     $(".list_hide").hide();
    //     $(this).parent().parent().children(".list_show").html(newC);
    // });
    //点击内容底部实物黄金切换
    var _ul = $(".smb_ul"),
        _li = _ul.find('li'),
        totalNum = _li.length,
        interval,
        hasStarted = false //是否已经开始轮播;
    var width = _li.width() + 35;
    var totalWidth = totalNum * width;
    $(".smb_ul").width(totalWidth);
    //上一张
    $(".smb_prev").click(function(){
        var nowLeft = _ul.position().left,
            maxLeft = -(totalNum - 3)* width;
        if(nowLeft == 0){
            _ul.css({left:maxLeft});
            return false;
        }
        var move = nowLeft + width;
        //console.log(nowLeft,move,maxLeft);
        _ul.css({left:move});

    });

    //下一张
    function showNext(){
        var nowLeft = _ul.position().left,
            maxLeft = -(totalNum - 3)* width;
        if(nowLeft == maxLeft){
            _ul.css({left:0});
            return false;
        }
        var move = nowLeft - width;
        _ul.css({left:move});
    }

    $(".smb_next").click(function(){
        //var nowLeft = _ul.position().left,
        //    maxLeft = -(totalNum - 3)* width;
        //if(nowLeft == maxLeft){
        //    _ul.css({left:0});
        //    return false;
        //}
        //var move = nowLeft - width;
        //_ul.css({left:move});
        showNext();
    });

    //自动轮播
    function start() {
        if(!hasStarted) {
            hasStarted = true;
            interval = setInterval(showNext, 3000);
        }
    }
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }
    start();

    //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
    $('.smb_prev, .smb_next, .smb_li').hover(function() {
        stop();
    }, function() {
        start();
    });

});



