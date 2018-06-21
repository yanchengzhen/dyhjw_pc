var wsCjReconnect = function(ws_url, cookie_name) {
    this.callback = function() {}
    this.ws = null;
    this.timeInterval;
    var local = this;
    // this.debug = true;
    this.debug = false;
    this.dataHqLoginString = ws_url;
    this.log = function(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
    this.sendHeartbeat = function() {
        msg = new Object();
        msg.cmd = 'heartbeat';
        msg.data = ""
        try {
            local.connect();
            local.ws.send(JSON.stringify(msg));
        } catch (e) {
            local.log(e.name + ": " + e.message);
        }
    }
    this.listenEvent = function() {
        var _this = this;
        local.ws.onopen = function(e) {
            //连接成功
            local.log("connect webim server success.");
        };
        local.ws.onmessage = function(e) {
            data = JSON.parse(e.data);
            // console.log(JSON.stringify(data))
            // console.log(data)
            _this.callback(data);
            // type=1
            // {"importance":"高","autoid":"289841","time":"2017-06-29 08:51:07","id":"kxt6363432306304184923625","type":"1","title":"【两市融资余额增加29.55亿元】<br />截止6月28日，上交所融资余额报5133.78亿元，较前一交易日增加19.2亿元；深交所融资余额报3636.89亿元，较前一交易日增加10.35亿元；两市合计8770.67亿元，较前一交易日增加29.55亿元。","operation":"add","content":{"console":[],"noticeApp":1,"dst":"*","titleNumbers":1,"extra":[]}}
            // type=2
            // {"before":"0.8%","importance":"中","autoid":"284758","predicttime":"2017-06-29 09:00:00","forecast":"0.8%","type":"2","title":"5月HIA新屋销售月率","effect":"金银 澳元 石油||","reality":"1.1%","state":"澳大利亚","id":"ECO8AUBSIndex201706290900","time":"2017-06-29 09:00:04","operation":"add","effecttype":"1"}
            // 一下来4条 1条未公布 3条已公布
            // [{"type":"2","state":"德国","effect":"","time":"2017-06-29 14:00","reality":"--","forecast":"10.4","before":"10.4","id":"ECO1GFKCIndex201706291400","code":"ECO1GFKC Index","importance":"中","effecttype":2,"autoid":284643,"title":"7月Gfk消费者信心指数","codeid":127},{"type":"2","state":"韩国","effect":"美元|金银 石油|","time":"2017-06-29 10:00","reality":"-1.9%","forecast":"0.5%","before":"0.5%","id":"KODSDEPTIndex201706291000","code":"KODSDEPT Index","importance":"低","effecttype":0,"autoid":286604,"title":"5月零售销售","codeid":1006},{"type":"2","state":"澳大利亚","effect":"|金银 澳元 石油|","time":"2017-06-29 09:30","reality":"1.5%","forecast":"1.8%","before":"1.8%","id":"AUEMCHGEIndex201706290930","code":"AUEMCHGE Index","importance":"低","effecttype":0,"autoid":284642,"title":"5月职位空缺率","codeid":704},{"type":"2","state":"澳大利亚","effect":"金银 澳元 石油||","time":"2017-06-29 09:00","reality":"1.1%","forecast":"0.8%","before":"0.8%","id":"ECO8AUBSIndex201706290900","code":"ECO8AUBS Index","importance":"中","effecttype":1,"autoid":284641,"title":"5月HIA新屋销售月率","codeid":749}]
        };
        local.ws.onclose = function(e) {
            local.log("onclose:" + e);
            setTimeout(function() {
                location.reload();
            }, 1000 * 60 * 10);
        };
        local.ws.onerror = function(e) {
            local.log("onerror" + e.data);
        };
    }
    /**
     * type hq|kx
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    this.connect = function(type) {
        // 测试代码
        // var data = '[{"type":"2","state":"德国","effect":"","time":"2017-06-29 14:00","reality":"--","forecast":"10.4","before":"10.4","id":"ECO1GFKCIndex201706291400","code":"ECO1GFKC Index","importance":"中","effecttype":2,"autoid":284643,"title":"777月Gfk消费者信心指数","codeid":127},{"type":"2","state":"韩国","effect":"美元|金银 石油|","time":"2017-06-29 10:00","reality":"-1.9%","forecast":"0.5%","before":"0.5%","id":"KODSDEPTIndex201706291000","code":"KODSDEPT Index","importance":"低","effecttype":0,"autoid":286604,"title":"5月零售销售","codeid":1006},{"type":"2","state":"澳大利亚","effect":"|金银 澳元 石油|","time":"2017-06-29 09:30","reality":"1.5%","forecast":"1.8%","before":"1.8%","id":"AUEMCHGEIndex201706290930","code":"AUEMCHGE Index","importance":"低","effecttype":0,"autoid":284642,"title":"5月职位空缺率","codeid":704},{"type":"2","state":"澳大利亚","effect":"金银 澳元 石油||","time":"2017-06-29 09:00","reality":"1.1%","forecast":"0.8%","before":"0.8%","id":"ECO8AUBSIndex201706290900","code":"ECO8AUBS Index","importance":"中","effecttype":1,"autoid":284641,"title":"5月HIA新屋销售月率","codeid":749}]';
        // data = JSON.parse(data);
        // this.callback(data);
        // 测试代码
        if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
            if (typeof(WebSocket) != 'undefined') {
                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie(cookie_name));
                local.listenEvent();
            } else {
                WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
                $.getScript("/Public/Home/js/live/swfobject.js", function() {
                    $.getScript("/Public/Home/js/live/web_socket.js", function() {
                        local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie(cookie_name));
                        local.listenEvent();
                    });
                });
            }
        }

        // 保持不断连
        setInterval(function() {
            local.ws.send(cookie_name);
        }, 3000);
    }
    this.effect = function(data) {
        if (data.effect != undefined || data.effect != "" || data.effect != null) {
            if (data.effecttype == 0) {
                data.classstr = 'green';
                data.effectstr = '利空金银';
            } else if (data.effecttype == 1) {
                data.classstr = 'red';
                data.effectstr = '利多金银';
            } else if (data.effecttype == 2) {
                data.classstr = 'yellow';
                data.effectstr = '影响较小';
            }
        }
        return data;
    }
    this.dzg = function(data) {
        data.dzg = (data.importance == '高') ? 'zy' : ((data.importance == '中') ? 'zd' : 'pt');
        return data;
    }
    //获取财经日历消息的国家图片地址
    this.icon = function(data) {
        var gjarr = {
            'zg': '中国',
            'rb': '日本',
            'mg': '美国',
            'dg': '德国',
            'fg': '法国',
            'yg': '英国',
            'hg': '韩国',
            'xjp': '新加坡',
            'ydnxy': '印度尼西亚',
            'xxl': '新西兰',
            'yd': '印度',
            'xg': '香港',
            'bx': '巴西',
            'nf': '南非',
            'cx': '朝鲜',
            'els': '俄罗斯',
            'odly': '澳大利亚',
            'oyq': '欧元区',
            'ydl': '意大利',
            'xby': '西班牙',
            'tw': '台湾',
            'rs': '瑞士',
            'jnd': '加拿大',
            'xl': '希腊'
        };
        var icon = 'other';
        for (var val in gjarr) {
            if (gjarr[val] == data.state) {
                icon = val;
                break;
            }
        }
        data.icon = icon;
        return data;
    }
    this.url = function(data) {
        data.url = 'http://www.dyhjw.com/rili/jiedu_' + data.codeid + '.html';
        return data;
    }
    this.time = function(data) {
        var strtime = data.time;
        data.date = strtime.split(' ')[0];
        data.time = strtime.split(' ')[1];
        data.ctime = (Date.parse(new Date(strtime))) / 1000;
        data.times = data.ctime;
        return data;
    }
    this.other = function(data) {
        data = this.icon(data);
        data = this.effect(data);
        data = this.dzg(data);
        data = this.effect(data);
        data = this.url(data);
        data = this.time(data);
        return data;
    }
}