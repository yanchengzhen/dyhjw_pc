function getCookie(c_name) {
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
function windowsNotify(sicon, stitle, sbody) {

    if (!("Notification" in window) && !window.webkitNotifications && window.webkitNotifications.checkPermission() != 0)
        return;

    if (Notification.permission == null || Notification.permission == undefined)
        windowsNotify360(sicon, stitle, sbody);
    else if (Notification.permission === "granted")
        windowsNotifyFFAndGE(sicon, stitle, sbody);
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (!('permission' in Notification))
                Notification.permission = permission;
            if (permission === "granted")
                windowsNotifyFFAndGE(sicon, sbody, stitle);
        });
    }
}
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "");
}
function windowsNotify360(sicon, stitle, sbody) {
    if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
        var notify = window.webkitNotifications.createNotification(sicon, stitle, delHtmlTag(sbody));
        notify.ondisplay = function (event) {
            setTimeout(function () {
                event.currentTarget.cancel();
            }, 11000);
        };
        notify.onclick = function () {
            window.focus();
//            this.cancel();
        };
        notify.show();
    } else if (window.webkitNotifications) {
        window.webkitNotifications.requestPermission(windowsNotify360);
    }
}

function windowsNotifyFFAndGE(sicon, stitle, sbody) {
    var notification = new Notification(stitle, {body: delHtmlTag(sbody), icon: sicon});

    setTimeout(function () {
        notification.close();
    }, 11000);

    notification.onclick = function () {
        window.focus();
//        this.cancel();
    };
}
var Live = function () {
    var idate = {};
//    this.debug = true;
    this.debug = false;
    local = this;
    this.log = function (msg) {
        if (local.debug) {
            console.log(msg);
        }
    }
    this.initDate = function (data) {
        data = eval('(' + data + ')');
        for (var k in data) {
            idate[k] = data[k];
        }
//        local.log(idate);
    }
    this.liveEffectType = function (str) {
        obj = {
            '金银': 'GoldSilver',
            '石油': 'oil'
        };
        var arr = str.split(" ");
        var res = {};
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i];
            if (obj[key]) {
                res[obj[key]] = arr[i];
            } else {
                res.exchange = arr[i];
            }
        }
        return res;
    }
    this.getEffectData = function (str) {
        var keyName = ['利多', '利空', '影响较小'];
        var arr = str.split("|");
        var obj = {};
        var isBool = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length) {
                var row = this.liveEffectType(arr[i]);
                var key = keyName[i];
                obj[key] = row;
                if (!isBool) {
                    isBool = 1;
                }
            }
        }
        if (isBool) {
            return obj;
        } else {
            return;
        }
    }
    this.getEffectStyle = function (zh) {
        style = {
            '利多': 'ld',
            '利空': 'lk',
            '影响较小': 'xiao'
        };
        //如果是中等数据，且不为影响较小，要在style前加上z
        res = style[zh];
        return res;
    }
    this.getEffect = function (effecttype, gji) {
        var state = JSON.parse(STATETYPE);
        if (!state[gji]) {
            type = effecttype;
        } else {
            type = state[gji] + effecttype;
        }
        return type;
    }
    this.getLdlkstring = function () {
        var box = "";
//        type = local.getEffect(idate.effecttype,idate.gji);
        if (idate.effecttype == "0") {
            box += '<p id="eff" class="lk"><span class="dq">利空</span><span class="pz" alt="GoldSilver">金银</span><span class="pz" alt="Oil">石油</span></p>';
            box += '<p id="eff" class="ld"><span class="dq">利多</span><span class="pz" alt="Exchange">美元</span></p>';
        } else if (idate.effecttype == "1") {
            box += '<p id="eff" class="ld"><span class="dq">利多</span><span class="pz" alt="GoldSilver">金银</span><span class="pz" alt="Oil">石油</span></p>';
            box += '<p id="eff" class="lk"><span class="dq">利空</span><span class="pz" alt="Exchange">美元</span></p>';
        } else {
            box = '<span class="xiao">影响较小</span>';
        }
        idate.ldlkstring = box;
    }
    this.getImportanceClass = function () {
        idate.importanceClass = (idate.importance == '高') ? 'hot' : '';
        idate.importanceAlt = (idate.importance == '高') ? 'zy' : ((idate.importance == '中') ? 'zd' : 'pt');
        idate.importanceL = (idate.importance == '高') ? 'gao' : ((idate.importance == '中') ? 'zhong' : 'di');
    }
//    this.getImportanceClass = function () {
//        idate.importanceClass = (idate.importance == '高') ? 'zy' : ((idate.importance == '中') ? 'zd' : 'pt');
//    }
    this.getRtime = function () {
        var time = idate.time;
        var tarr = time.split(" ")[1].split(":");
        idate.rtime = tarr[0] + ':' + tarr[1];
    }
    //获取 财经日历消息 的 国家图片地址
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
        idate.guojiaimg = imgpath + 'c_guo/' + gji + '.png';
    }
    //判断字段是否存在或为空
    this.is_null = function (val) {
        if (!val || typeof (val) == "undefined" || val == "" || val == null) {
            return true;
        } else {
            return false;
        }
    }
    //财经日历消息的解析
    this.cjrl = function () {
        if (idate.reality == '' || idate.reality == '--') {
            return "";
        }
        var gTitle = idate.state + idate.title;
//        if (hInArray(gTitle, caiJinCache)) {
//            return false;
//        }
//        caiJinCache.push(gTitle);
        idate.gTitle = gTitle + '  前值：' + idate.before + '  预期值：' + idate.forecast + '  实际值：' + idate.reality;
        local.getImportanceClass();
        local.getRtime();
        local.getGuojiaimg();
        local.getLdlkstring();
        //idate.ldlk_string\idate.importanceClass\idate.importance\idate.guojiaimg
        /*var html = '<li id="' + idate.id + '" class="cjrl ' + idate.importanceClass + ' " alt="' + idate.importanceAlt + '"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">' + idate.rtime + '</td>' +
                '<td align="center" valign="middle" width="60px"><img src="' + idate.guojiaimg + '" alt="' + idate.state + '" height="42" width="42"></td>' +
                '<td align="left" valign="middle" width="614px"><div class="qz_yqz"><p class="word">' + gTitle + '</p>' +
                '<div class="gbsj"><span>前值：' + idate.before + '</span><span>预期：' + idate.forecast + '</span>' +
                '<img src="/Public/v2/images/kuaixun/' + idate.importanceL + '.png" alt="' + idate.importance + '" height="13" width="50">' +
                '<span class="sjgbz ' + idate.importanceClass + '">实际：' + idate.reality + '</span></div></div>' +
                '<div class="dk_box">' + idate.ldlkstring + '</div></td>' +
                '</tr></tbody></table></li>';*/
        var html = '<li id="' + idate.id + '" >' +
            '<span class="time">' + idate.rtime + '</span>' +
            '<a href="http://www.dyhjw.com/kuaixun/" title="' + gTitle + '" target="_blank">' +
            '<img src="' + idate.guojiaimg + '" alt="' + idate.state + '" /><span>' + gTitle + '</span>' +
            '<em>前值:' + idate.before + '</em><em>预期:' + idate.forecast + '</em><em>实际:' + idate.reality + '</em>' +
            '</a>' +
            '</li>';
        return html;
    }
    //平台验证
    this.check = function (dst) {
        var dstt = "!" + dst;
        if (dst == '*' || dstt.indexOf('#*') != '-1') {
            return true;
        }
        var host = "www.kxt.com";
        host_a = host.split('.');
        //当 当前站点的一级域名 或 当前指定域名 存在时，返回 推送
        if (dstt.indexOf('#' + host_a[1] + '.' + host_a[2]) != '-1' || dstt.indexOf('http://' + host) != '-1') {
            return true;
        }
        return false;
    }
    //获取 重要性的class
    this.getColorclass = function () {
        if (idate.importance == '高') {
            var _colorClass = ' hot ';
        } else {
            var _colorClass = '';
        }
//        local.log(idate.importance);
        idate.colorClass = _colorClass;
    }
    //获取 替换后的标题
    this.getNewtitle = function (title, con) {
//        local.log(con);
        if (con.length > 0) {
            for (var i = 0; i < con.length; i++) {
                title = local.titleReplace(title, con[i]);
            }
        }
        return title;
    }
    //获取 弹窗 中的标题 需要删除中间替换为图片的文字
    this.getNtitle = function (title, con) {
//        local.log(con);
        if (con.length > 0) {
            for (var i = 0; i < con.length; i++) {
                //title = local.titleReplace(title, con[i]);
                if (con[i].op == "img" || con[i].op == "imga")
                {
                    title = title.replace(con[i].src, "");
                }
            }
        }
        return title;
    }
    //获取 替换后的副标题
    this.getNewftitle = function (extra, num) {
        idate.ftitle = '';
        for (var i = 0; i < num - 1; i++) {
            idate.ftitle = local.getNewtitle(extra[i].title, extra[i].console);
            //未考虑有第三条标题的情况
        }
//        local.log(idate.ftitle);
    }
    //用控制字段中的指定字符串进行替换标题
    this.titleReplace = function (title, op) {
//        if (op.hasOwnProperty("isBlank") && op.isBlank == "1") {
        target = ' target="_blank" ';
//        } else {
//            target = '';
//        }
        switch (op.op) {
            case 'a':
                var a_class = '';
                if (op.src == '点击查看' || op.src == '查看更多' || op.src == '查看详情') {
                    a_class = 'class="btn_cardlink"';
                }
                value = '<a ' + a_class + ' href="' + op.a + '" ' + target + ' >' + op.src + '</a>';
                new_title = title.replace(op.src, value);
                break;
            case 'img':
                value = '<img src="' + op.img + '" />';
                new_title = title.replace(op.src, value);
                break;
            case 'imga':
                value = '<a href="' + op.a + '" ' + target + ' ><img src="' + op.img + '" /></a>';
                new_title = title.replace(op.src, value);
                break;
            case 'b':
                value = '<b>' + op.src + '</b>';
                new_title = title.replace(op.src, value);
                break;
            case 'i':
                value = '<i>' + op.src + '</i>';
                new_title = title.replace(op.src, value);
                break;
            default :
//            value = '<'+op.op+'>'+op.src+'</'+op.op+'>';
//            $new_title = str_replace(op.src,value, $title);
                new_title = title;
                break;
        }
        return new_title;
    }
    //获取该条消息的html
    this.makehtml = function () {
        var html = '';
        if (idate.type == 1) {
            //     $(".reality").html(idate.reality);
            //     $("#spanId").click();
            //     //html = local.cjrl();
            // } else {
            var _content = idate.content;
            local.getRtime();
            local.getColorclass();
            var title = idate.title;
            title = title.replace("<br />", "");
            idate.ntitle = title.substring(0,140);

            switch (idate.type) {
                case '1':
                    html = local.news();
                    break;
                default :
                    html = local.news();
                    break;
            }
        }
        return html;

    }
    this.news = function () {
        /*var html = '<li id="'+idate.id+'" >'+
            '<table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">'+idate.rtime+
            '</td><td align="left" valign="middle"><p class="kx_title">'+idate.ntitle+'</p></td></tr></tbody></table>'+
            '</li>';*/
        var html = '<li class="'+idate.colorClass+'" id="'+idate.id+'" datatime="'+(Date.parse(new Date(idate.time)))/1000+'">' +
            '<i class="kx_conf_bg"><i class="kx_conf"></i></i>'+
            '<span class="time">'+idate.rtime+ '</span>'+
            '<a href="http://www.dyhjw.com/kuaixun/" title="'+idate.ntitle+'" target="_blank">' +
            '<span class="text" style="max-height:64px;">'+idate.ntitle+'</span></a>'+
            '</li>';
        return html;
    }
    this.cjst = function () {
        var html = '<li class=" '+idate.colorClass+'" id="'+idate.id+'" time="'+idate.timestamp+'" type='+idate.type+'>'+
            '<table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="time" width="55px" valign="middle" align="left">'+idate.rtime+
            '</td><td valign="middle" align="left"><p>'+idate.ntitle+'</p>'+
            '<a href="'+idate.content.extra[0].a+'" target="_blank" class="link_pic_box"><img src="'+idate.content.extra[0].img+'" alt="" class="link_pic"></a>'+
            '</td></tr></tbody></table>'+
            '</li>';
        return html;
    }
    this.kbzx = function () {
        var html = '<li class="video_re '+idate.colorClass+'" id="'+idate.id+'" time="'+idate.timestamp+'" type='+idate.type+'>'+
            '<table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="time" width="55px" valign="middle" align="left">'+idate.rtime+
            '</td><td valign="middle" align="left"><p class="ftitle">'+
            '<a href="'+idate.content.extra[0].a+'" target="_blank">'+'<img src="'+idate.content.extra[0].img+'" alt="">'+'</a>'+
            '</p><p class="title">'+idate.ntitle+'</p>'+
            '</td></tr></tbody></table>'+
            '</li>';
        return html;
    }
    this.tplj = function () {
        var html = '<li class="'+idate.colorClass+'" id="'+idate.id+'" time="'+idate.timestamp+'" type='+idate.type+'>'+
            '<table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">'+idate.rtime+
            '</td><td align="left" valign="middle"><p class="kx_title">'+idate.ntitle+'</p></td></tr></tbody></table>'+
            '</li>';
        return html;
    }
    this.idIsExists = function () {
        var idStr = '#' + idate.id;
        if ($(idStr).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    this.removeNode = function (id) {
        var idStr = '#' + id;
        $(idStr).remove();
    }
    this.insertNode = function (html) {
        try {
            if (html) {

                var objE = document.createElement("div");
                objE.innerHTML = html;
                var oold = $('.sskx_wrap').find('ul').find('li').first().attr('datatime');
                var old = $(objE).find('li').first().attr('datatime');
                var n = parseInt(old) - parseInt(oold);
                if(n > 0){
                    $('.sskx_wrap').find('ul').prepend(html);
                }
                if($(".sskx_wrap > ul > li").length > 10){
                    $('.sskx_wrap > ul > li:last').remove();
                }
            }
        } catch (e) {

        }
    }
    this.replaceNode = function (id, html) {
        var idStr = '#' + id;
        var next = $(idStr).next();
        local.removeNode(id);
        next.before(html);
    }
    this.process = function (html) {
        if (!local.idIsExists() && idate.title != "") {
            local.insertNode(html);
        } else {
            if (idate.title != "") {
                local.replaceNode(idate.id, html);
            } else {
                local.removeNode(idate.id);
            }
        }
    }
    /**
     * 桌面通知
     */
    this.notic = function (sicon, stitle, sbody) {

        if (!("Notification" in window) && !window.webkitNotifications && window.webkitNotifications.checkPermission() != 0)
            return;

        if (Notification.permission == null || Notification.permission == undefined)
            windowsNotify360(sicon, stitle, sbody);
        else if (Notification.permission === "granted")
            windowsNotifyFFAndGE(sicon, stitle, sbody);
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (!('permission' in Notification))
                    Notification.permission = permission;
                if (permission === "granted")
                    windowsNotifyFFAndGE(sicon, sbody, stitle);
            });
        }

    }

    /**
     * 声音播放
     */
    this.sound = function () {
        var audio = $("#tishi")[0];
        try {
            audio.play();
        } catch (e) {

        }
    }
}
var wsKxReconnect = function () {

    this.ws = null;
    this.timeInterval;

    var local = this;

    // this.debug = true;
    this.debug = false;

    //this.dataHqLoginString = 'ws://114.215.194.79:8189/';
    this.dataHqLoginString = 'ws://ws.kx.dyhjw.com/';
//        this.dataHqLoginString = 'ws://192.168.0.51:8182/';
    //this.loginS = codeStr
    this.log = function (msg) {
        if (this.debug) {
            console.log(msg);
        }
    }

    this.sendHeartbeat = function () {
        msg = new Object();
        msg.cmd = 'heartbeat';
        msg.data = ""
        //local.log(local.ws)
        try {
            local.connect();
            local.ws.send(JSON.stringify(msg));
        } catch (e) {
            local.log(e.name + ": " + e.message);
        }

        //local.log("sendHeartbeat");

    }

    this.listenEvent = function () {
        /**
         * 连接建立时触发
         */
        local.ws.onopen = function (e) {
            //连接成功
            local.log("connect webim server success.");
            //发送登录信息
            //local.reLogin();
        };

        //有消息到来时触发
        local.ws.onmessage = function (e) {
            local.log(e.data);
            var live = new Live();
            live.initDate(e.data);
            var html = live.makehtml();
            local.log(html);
            if (html) {
                live.process(html);
            }
            overhidd();
        };

        overhidd =  function(){
            $(".sskx_wrap li").each(function(){
                var nH = $(this).find(".text");
                if(nH.height()>60){
                    nH.css("height","60px");
                    $(this).find(".time").addClass("select");
                }
            })
        }

        /**
         * 连接关闭事件
         */
        local.ws.onclose = function (e) {
            local.log("onclose:" + e);
            //local.log("clearInterval:" + local.timeInterval);
            //clearInterval(timeInterval);
//                closenum = closenum+1;
//                if (closenum > 3) {
//
//                } else {

            setTimeout(function () {
                location.reload();
            }, 1000 * 60 * 10);
//                }
        };

        /**
         * 异常事件
         */
        local.ws.onerror = function (e) {
            local.log("onerror" + e.data);
            //alert("异常:" + e.data);
            //local.log("onerror"+ e.data);
//                    local.timeInterval = setTimeout(function(){
//                        local.sendHeartbeat();
//                    },1000*60);
        };
    }

    this.connect = function (type) {
        //setTimeout(function() {
        if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
            if (window.WebSocket || window.MozWebSocket)
            {
                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("kx_dyhjw_calendar_Token"));
                local.listenEvent();
            }
            else if (1)
            {
                WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
                $.getScript("/Public/Home/js/live/swfobject.js", function () {
                    $.getScript("/Public/Home/js/live/web_socket.js", function () {
                        local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("kx_dyhjw_calendar_Token"));
                        local.listenEvent();
                    });
                });
            }
        }
        //},4000);
        setInterval(function() {
            local.ws.send('');
        }, 1000 * 3);
    }
}