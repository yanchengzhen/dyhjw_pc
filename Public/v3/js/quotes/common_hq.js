
$(function() {
    //var timer = setInterval(function(){
    fnZYBJ();
    //},1000)
})
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

                    if(typeof(rate) != 'undefined'){
                        // var datax = {last:0,lastClose:0,swing:0,swingRange:0};
                        if(data.C=='XAU'||data.C=="XPT"||data.C=="XPD")
                        {
                            data.last=(data.P*rate/31.1035).toFixed(3);
                            data.lastClose=(data.LC*rate/31.1035).toFixed(3);
                            data.swing = (data.last-data.lastClose).toFixed(3);
                        }else if(data.C=="XAG"){
                            data.last=(data.P*rate*1000/31.1035).toFixed(0);
                            data.lastClose=(data.LC*rate*1000/31.1035).toFixed(0);
                            data.swing = (data.last-data.lastClose).toFixed(0);
                        }

                        data.swingRange = data.ZDF+"%";

                        data.code=data.code+"R";

                        $('[code=' + data.code + ']').find('.lasths').text(data.last);
                        $('[code=' + data.code + ']').find('.swinghs').text(t + data.swing);

                    }
                    var swing=data.swing;
                    var price = parseFloat($($('[code=' + data.code + ']').find('.last')[0]).text());
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
                if (window.WebSocket || window.MozWebSocket) {
                    local.ws = new WebSocket(local.dataHqLoginString+"?token="+ $.cookie("hq_Token"));
                    local.listenEvent();
                } else if (1) {
                    WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.random();
                    $.getScript("/Public/Home/js/live/swfobject.js?v="+Math.random(), function() {
                        $.getScript("/Public/Home/js/live/web_socket.js?v="+Math.random(), function() {
                            local.ws = new WebSocket(local.dataHqLoginString+"?token="+ $.cookie("hq_Token"));
                            local.listenEvent();
                        });
                    });
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

//主要报价
function fnZYBJ(){
    $('.hq_change_box').find('tr').each(function(){
        //console.log($(this).index())
        if($(this).index()%2){
            $(this).addClass('gry_bg');
        }else{
            $(this).removeClass('gry_bg');
        }
    })
}



