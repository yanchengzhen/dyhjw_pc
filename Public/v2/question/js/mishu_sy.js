
var wsMsReconnect = function () {
    this.ws = null;
    this.timeInterval;
    var local = this;
    this.dataHqLoginString = 'ws://114.215.194.241:8080/ws?type=2';   //socket接口地址
    this.listenEvent = function () {
        //连接建立时触发
        local.ws.onopen = function (e) {
            //连接成功
            // console.log("socket connect success!");
        };
        //有消息到来时触发
        local.ws.onmessage = function (e) {
            var data = JSON.parse(e.data);

            if(data.cid!=0){
                return;
            }

            var lis=$("[li-id="+data.id+"]");

            if(lis.length==0){
                var li='<li><div class="f"><a href="/gold/askagain/'+data.id+'.html" target="_blank"><span>'+data.username
                    +'：</span>'+data.content+'</a></div><div class="s"><a href="/gold/askagain/'+data.id+'.html" target="_blank">'
                    +'<span>小秘书：</span>'+data.recontent+'</a></div></li>';

                $(".mishu_rank").prepend(li);

                $(".mishu_rank li:last-child").remove();
            }
        };
        //连接关闭事件
        local.ws.onclose = function (e) {
            setTimeout(function () {
                location.reload();
            }, 1000 * 60 * 10);
        };
        //异常事件
        local.ws.onerror = function (e) {
            // console.log("error");
        };
    }

    /*
     * 链接socket
     *@param  {string} type 需要获取的内容type
     */
    this.connect = function () {
        //typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3
        if (window.WebSocket || window.MozWebSocket) {
            local.ws = new WebSocket(local.dataHqLoginString);
            local.listenEvent();

        }else if(1){

            WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
            $.getScript("/Public/Home/js/live/swfobject.js", function () {
                $.getScript("/Public/Home/js/live/web_socket.js", function () {
                    local.ws = new WebSocket(local.dataHqLoginString);
                    local.listenEvent();
                });
            });

        }
    }
}


//连接秘书websocket
var wsrms = new wsMsReconnect();
wsrms.connect();