var Cjws = function () {
    var idate = {};
    this.debug = false;
    local = this;
    this.log = function (msg) {
        if (local.debug) {
            console.log(msg);
        }
    }
    this.initDate = function (data) {
        for (var k in data) {
            idate[k] = data[k];
        }
    }
    this.getStrToTime = function(){
        var strtime = idate.time;
        idate.rtime = strtime.split(' ')[1];
        idate.strtime = (Date.parse(new Date(strtime)))/1000;
    }
    //获取财经日历消息的国家图片地址
    this.getGuojiaimg = function () {
        var imgpath = "/Public/Home/";
        var gjarr = {'zg': '中国', 'rb': '日本', 'mg': '美国', 'dg': '德国', 'fg': '法国', 'yg': '英国', 'hg': '韩国', 'xjp': '新加坡', 'ydnxy': '印度尼西亚', 'xxl': '新西兰', 'yd': '印度', 'xg': '香港', 'bx': '巴西', 'nf': '南非', 'cx': '朝鲜', 'els': '俄罗斯', 'odly': '澳大利亚', 'oyq': '欧元区', 'ydl': '意大利', 'xby': '西班牙', 'tw': '台湾', 'rs': '瑞士', 'jnd': '加拿大', 'xl': '希腊'};
        var gji = 'other';
        for (var val in gjarr) {
            if (gjarr[val] == idate.state) {
                gji = val;
                break;
            }
        }
        idate.gji = gji;
    }
    this.getImportanceClass = function () {
        idate.importanceAlt = (idate.importance == '高') ? 'zy' : ((idate.importance == '中') ? 'zd' : 'pt');
    }
    this.getCodeId = function () {
        if(typeof(idate.codeid)=="undefined"){
            idate.codeid = 0;
        }
    }
    //财经日历消息的解析-未发布
    this.cjrlfirst = function () {
        var html = '';
        local.getCodeId();
        html += '<div class="cjrl_mn_li" autoid="' + idate.autoid + '">';
        html += '<div class="time_box">';
        html += '<span timestamp=' + idate.strtime + ' class="time">' + idate.rtime + '</span>';
        html += '<span class="gj"><img src="/Public/Home/images/guo/' + idate.gji + '.png" alt=""></span>';
        html += ' <span class="zyx"><img src="/Public/v1/images/' + idate.importanceAlt + '.png" alt=""></span>';
        html += '<div class="dgb reality">待公布</div></div>';
        html += '<p><a href="http://www.dyhjw.com/rili/jiedu_' + idate.codeid + '.html" target="_blank">' + idate.state + idate.title + '</a></p>';
        html += '<div class="gbz">';
        html += '<div class="gbz_demo td1">前值：<span class="before blue">' + idate.before + '</span></div>';
        html += '<div class="gbz_demo td2">预测值：<span class="forecast blue">' + idate.forecast + '</span></div></div></div>';
        return html;
    }
    //财经日历消息的解析-已发布
    this.cjrlother = function () {
        var html = '';
        var classstr = '';
        var effectstr = '';
        local.getCodeId();
        if(idate.effect != undefined || idate.effect != "" || idate.effect!= null){
            if(idate.effecttype == 0){
                classstr='green';
                effectstr='利空金银';
            }else if(idate.effecttype == 1){
                classstr='red';
                effectstr='利多金银';
            }else if(idate.effecttype == 2){
                classstr='yellow';
                effectstr='影响较小';
            }
        }
        html += '<li><div class="time_box">';
        html += '<span class="time">' + idate.rtime + '</span>';
        html += '<span class="gj"><img src="/Public/Home/images/guo/' + idate.gji + '.png" alt=""></span>';
        html += ' <span class="zyx"><img src="/Public/v1/images/' + idate.importanceAlt + '.png" alt=""></span>';
        html += '<div class="dgb">公布值：<span class="red">' + idate.reality + '</span></div></div>';
        html += '<p><a href="http://www.dyhjw.com/rili/jiedu_' + idate.codeid + '.html" target="_blank">' + idate.state + idate.title + '</a></p>';
        html += '<div class="gbz ' + classstr + '">';
        html += '<div class="gbz_demo td1">前值：<span class="before blue">' + idate.before + '</span></div>';
        html += '<div class="gbz_demo td2">预测值：<span class="blue">' + idate.forecast + '</span></div>';
        html += '<div class="gbz_demo td3 fr"><span>' + effectstr + '</span></div></div></li>';
        return html;
    }
}
var wsCjReconnect = function () {
    this.ws = null;
    this.timeInterval;
    var local = this;
    // this.debug = true;
    this.debug = false;
    //this.dataHqLoginString = 'ws://121.41.40.186:8201/';
    this.dataHqLoginString = 'ws://ws.rl.dyhjw.com/';
    this.log = function (msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
    this.sendHeartbeat = function () {
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
    this.listenEvent = function () {
        local.ws.onopen = function (e) {
            //连接成功
            local.log("connect webim server success.");
        };
        local.ws.onmessage = function (e) {
            local.log(e.data);
            if(e){
                data=eval("("+e.data+")");
                var cjws = new Cjws();
                $('.cjrl_mn_ul').empty();
                $('.data_ct_box').empty();
                $.each(data, function (n, value) {
                    cjws.initDate(value);
                    cjws.getImportanceClass();
                    cjws.getStrToTime();
                    cjws.getGuojiaimg();
                    if(n == 0){
                        //未发布
                        var html = cjws.cjrlfirst();
                        if (html) {
                            $('.cjrl_mn_ul').append(html);
                        }
                    }else{
                        //已发布
                        var html = cjws.cjrlother();
                        if (html) {
                            $('.data_ct_box').append(html);
                        }
                    }
                    local.log(html);
                });
            }
        };
        local.ws.onclose = function (e) {
            local.log("onclose:" + e);
            setTimeout(function () {
                location.reload();
            }, 1000 * 60 * 10);
        };
        local.ws.onerror = function (e) {
            local.log("onerror" + e.data);
        };
    }
    this.connect = function (type) {
        if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
            if (window.WebSocket || window.MozWebSocket){
                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("kx_dyhjw_calendar_Token"));
                local.listenEvent();
            }else if (1){
                WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
                $.getScript("/Public/Home/js/live/swfobject.js", function () {
                    $.getScript("/Public/Home/js/live/web_socket.js", function () {
                        local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("kx_dyhjw_calendar_Token"));
                        local.listenEvent();
                    });
                });
            }
        }
        setInterval(function() {
            local.ws.send('');
        }, 1000 * 3);
    }
}
$(function(){

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
                timer(year,month,date,hour,minute,second,'timer','indexData')
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

function getCookie(c_name) {
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}