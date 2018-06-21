$(function () {
    $(".sx_box .sx").click(function () {
        $(".sx_list_box").toggle();
    })
    $(".dq_sx li").click(function () {
        $(this).toggleClass("moren");
    })
    $(".pz_box li").click(function () {
        $(this).toggleClass("moren");
    })

    /*针对笔记本样式*/
//    var idx_wid=$(window).width();
//    if (idx_wid<=1360){
//		$(".nn_link img").css("width","80px");
//    }else{
//        $(".nn_link img").css("width","121px");
//    }
    /*针对笔记本样式*/

    fnRlKxSwitch();

    //fnKxTextScroll();

    fnVideoTurn(2,120000);

    //获取gua
    $.ajax({
        url:'/api/getgua.html',
        data:{id:'87'},
        type: 'POST',
        success:function(req){
            for(var i=0;i<req.length;i++)
            {
                $("#gua"+req[i].id).html(req[i].c);
            }
        }
    });

})
//更新数据闪亮一下
function flashColor(ele, color) {
    ele.addClass(color);
    setTimeout(function () {
        ele.removeClass(color);
    }, 500);
}
//减
function floatSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}
//除
function floatDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace(".", ""));

    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
function hq_connect_index(codes) {
    $.post('/newapi/token', {
        type: 'hq',
        codes: codes
    }, function (d) {
        var wsrkx = new wsKxReconnect();
        wsrkx.connect("kx");
        var wsrcj = new wsCjReconnect();
        wsrcj.connect("kx");
        // 实时行情
        //var wsServer = "ws://114.215.194.241:8188/hq?token=" + getCookie('hq_Token');
        var wsServer = "ws://ws.hq.dyhjw.com/hq?token=" + getCookie('hq_Token');
        var websocket = new WebSocket(wsServer);
        websocket.onopen = function (evt) {
            // 定时发送空字符 防止中断
            setInterval(function () {
                websocket.send('');
            }, 1000 * 3);
        };
        //var deforedata;
        websocket.onmessage = function (evt) {
            var data1 = JSON.parse(evt.data);
            var data = null;
            for (var i = 0; i < data1.length; i++) {
                data = data1[i];
                data.code = data.C;
                data.last = parseFloat(data.P);
                data.ZD = parseFloat(data.ZD);
                if (typeof(jsonQuote) != "undefined") {
                    for (var i in jsonQuote) {
                        if (jsonQuote[i].Code == data.code) {
                            //deforedata = jsonQuote[i];
                            var defore_Last = $('[code=' + data.code + ']').find('.last').text();
                            break;
                        }
                    }
                    $('[code=' + data.code + '] .last').text(data.P);
                    if (data.ZD > 0) {
                        $('[code=' + data.code + '] .last').addClass('red').removeClass('green');
                        $('[code=' + data.code + '] .swing').text("+" + data.ZD);
                        $('[code=' + data.code + '] .swingRange').text("+" + data.ZDF + "%");

                        $('[code=' + data.code + '] .swing').addClass('red').removeClass('green');
                        $('[code=' + data.code + '] .swingRange').addClass('red').removeClass('green');
                    }
                    else {
                        if (data.ZD < 0) {
                            $('[code=' + data.code + '] .last').addClass('green');
                            $('[code=' + data.code + '] .swing').addClass('green').removeClass('red');
                            $('[code=' + data.code + '] .swingRange').addClass('green').removeClass('red');
                        }else if(data.ZD == 0){;
                            $('[code=' + data.code + '] .last').removeClass('red');
                            $('[code=' + data.code + '] .last').removeClass('green');
                            $('[code=' + data.code + '] .swing').removeClass('red');
                            $('[code=' + data.code + '] .swing').removeClass('green');
                            $('[code=' + data.code + '] .swingRange').removeClass('red');
                            $('[code=' + data.code + '] .swingRange').removeClass('green');
                        }
                        else {
                            $('[code=' + data.code + '] .last').removeClass('green');
                            $('[code=' + data.code + '] .swing').removeClass('green').removeClass('red');
                            $('[code=' + data.code + '] .swingRange').removeClass('green').removeClass('red');
                        }
                        $('[code=' + data.code + '] .last').removeClass('red');

                        $('[code=' + data.code + '] .swing').text(data.ZD);
                        $('[code=' + data.code + '] .swingRange').text(data.ZDF + "%");
                    }


                    //根据上一笔跳动
                    if (floatSub(data.last, defore_Last) > 0) {
                        flashColor($('[code=' + data.code + '] .last'), 'change_up');
                        flashColor($('[code=' + data.code + '] .swing'), 'change_up');
                        flashColor($('[code=' + data.code + '] .swingRange'), 'change_up');
                    } else {
                        flashColor($('[code=' + data.code + '] .last'), 'change_down');
                        flashColor($('[code=' + data.code + '] .swing'), 'change_down');
                        flashColor($('[code=' + data.code + '] .swingRange'), 'change_down');
                    }
                }
            }
            if (typeof(jsonQuote) != "undefined") {
                for (var i in jsonQuote) {
                    if (jsonQuote[i].Code == data1[0].C) {
                        jsonQuote[i].Code = data1[0].C;
                        jsonQuote[i].Last = data1[0].P;
                        break;
                    }
                }
            }

        };
        websocket.onclose = function (evt) {
        };
        websocket.onerror = function (evt, e) {
        };
    }, 'json');
}

/*财经日历&实时快讯切换*/
function fnRlKxSwitch(){
    $('.rlkx_switch_wrap').show().css({
        top:$('.data_change_btn').offset().top + 77 + 'px'
    });

    // 选项卡按钮显示
    $('.rlkx_switch_wrap').hover(function(){
        $(this).find('.cur').hide().siblings().show();
    },function(){
        $(this).children().hide();
    })

    // 选项卡切换
    $('.rlkx_switch_btn').click(function(){
        $('.rlkx_wrap').children().eq($(this).index()).css({
            'visibility':'visible'
        }).show().siblings().hide();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).hide().siblings().show();
    })

    $('#ascrail2000').css({
        cursor: 'pointer'
    })
}
/*快讯简报文字滚动*/
function fnKxTextAjax(){
    $.ajax({
        url:'',
        type:'GET',
        success:function(){

        },
        error:function(){

        }
    })
}
function fnKxTextScroll(){
    var index = 0;
    var oUl = $('.scroll_box').find('ul');
    var text = $('.scroll_box').find('li').eq(0).html();
    oUl.append('<li>'+text+'</li>')
    //var length = $('.scroll_box').find('li').size();
    var height = $('.scroll_box').find('li').height();
    var timer = null;
    timer = setInterval(function(){
        var length = $('.scroll_box').find('li').size();
        var text = $('.scroll_box').find('li').eq(0).html();
        oUl.find('li').eq(length-1).html(text);
        if(index < length-1){
            index++;
        }else{
            oUl.css({
                top:0
            })
            index = 1;
        }
        oUl.stop().animate({
            top:-height*index + 'px'
        },700)
    },5000)
    $('.scroll_box').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            var length = $('.scroll_box').find('li').size();
            var text = $('.scroll_box').find('li').eq(0).html();
            oUl.find('li').eq(length-1).html(text);
            if(index < length-1){
                index++;
            }else{
                oUl.css({
                    top:0
                })
                index = 1;
            }
            oUl.stop().animate({
                top:-height*index + 'px'
            },800)
        },5000)
    })
}
/*快讯简报文字滚动*/


//学堂视频幻灯切换
function fnVideoTurn(n,time){
    var now = 0;
    var num = n;
    var str = $('.pic_school').html();
    for(var i = 1;i < n;i++){
        str += $('.pic_school').html();
    }
    $('.pic_school').html(str);
    var length = $('.pic_school').find('li').length;

    var timer = setInterval(function(){
        if(now*num < length-n){
            now++;
        }else{
            now = 0;
        }
        //console.log(now)
        if(n == 2){
            $('.pic_school').find('li').fadeOut().eq(now*num).fadeIn().next().fadeIn();
        }else if(n == 4){
            $('.pic_school').find('li').fadeOut().eq(now*num).fadeIn().next().fadeIn().next().fadeIn().next().fadeIn();
        }
    },time)
}


