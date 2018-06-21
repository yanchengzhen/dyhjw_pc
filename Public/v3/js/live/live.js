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
        Notification.requestPermission(function(permission) {
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
        notify.ondisplay = function(event) {
            setTimeout(function() {
                event.currentTarget.cancel();
            }, 11000);
        };
        notify.onclick = function() {
            window.focus();
            // this.cancel();
        };
        notify.show();
    } else if (window.webkitNotifications) {
        window.webkitNotifications.requestPermission(windowsNotify360);
    }
}

function windowsNotifyFFAndGE(sicon, stitle, sbody) {
    var notification = new Notification(stitle, {
        body: delHtmlTag(sbody),
        icon: sicon
    });

    setTimeout(function() {
        notification.close();
    }, 11000);

    notification.onclick = function() {
        window.focus();
        // this.cancel();
    };
}
var Live = function() {
    this.idate = {};
    this.debug = true;
    // this.debug = false;
    local = this;
    this.log = function(msg) {
        if (local.debug) {
            console.log(msg);
        }
    }
    this.initDate = function(data) {
        // data = eval('(' + data + ')');
        data = JSON.parse(data);
        if (typeof(data.content) == 'string') {
            data.content=JSON.parse(data.content);
        }
        this.idate = data;

        // for (var k in data) {
        //     this.idate[k] = data[k];
        // }
        // local.log(idate);
    }
    this.liveEffectType = function(str) {
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
    this.getEffectData = function(str) {
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
    this.getEffectStyle = function(zh) {
        style = {
            '利多': 'ld',
            '利空': 'lk',
            '影响较小': 'xiao'
        };
        //如果是中等数据，且不为影响较小，要在style前加上z
        res = style[zh];
        return res;
    }
    this.getEffect = function(effecttype, gji) {
        var state = JSON.parse(STATETYPE);
        if (!state[gji]) {
            type = effecttype;
        } else {
            type = state[gji] + effecttype;
        }
        return type;
    }
    this.getLdlkstring = function() {
        var box = "";
        // type = local.getEffect(idate.effecttype,idate.gji);
        if (this.idate.effecttype == "0") {
            box += '<p id="eff" class="lk"><span class="dq">利空</span><span class="pz" alt="GoldSilver">金银</span><span class="pz" alt="Oil">石油</span></p>';
            box += '<p id="eff" class="ld"><span class="dq">利多</span><span class="pz" alt="Exchange">美元</span></p>';
        } else if (this.idate.effecttype == "1") {
            box += '<p id="eff" class="ld"><span class="dq">利多</span><span class="pz" alt="GoldSilver">金银</span><span class="pz" alt="Oil">石油</span></p>';
            box += '<p id="eff" class="lk"><span class="dq">利空</span><span class="pz" alt="Exchange">美元</span></p>';
        } else {
            box = '<span class="xiao">影响较小</span>';
        }
        this.idate.ldlkstring = box;
    }
    this.getImportanceClass = function() {
        this.idate.importanceClass = (this.idate.importance == '高') ? 'red' : '';
        this.idate.importanceAlt = (this.idate.importance == '高') ? 'zy' : ((this.idate.importance == '中') ? 'zd' : 'pt');
        this.idate.importanceL = (this.idate.importance == '高') ? 'gao' : ((this.idate.importance == '中') ? 'zhong' : 'di');
    }
    // this.getImportanceClass = function () {
    //     idate.importanceClass = (idate.importance == '高') ? 'zy' : ((idate.importance == '中') ? 'zd' : 'pt');
    // }
    this.getRtime = function() {
        var time = this.idate.time;
        var tarr = time.split(" ")[1].split(":");
        this.idate.rtime = tarr[0] + ':' + tarr[1];
    }
    //获取 财经日历消息 的 国家图片地址
    this.getGuojiaimg = function() {
        var imgpath = "/Public/Home/";
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
        var gji = 'other';
        for (var val in gjarr) {
            if (gjarr[val] == this.idate.state) {
                gji = val;
                break;
            }
        }
        this.idate.gji = gji;
        this.idate.guojiaimg = imgpath + 'c_guo/' + gji + '.png';
    }
    //判断字段是否存在或为空
    this.is_null = function(val) {
        if (!val || typeof(val) == "undefined" || val == "" || val == null) {
            return true;
        } else {
            return false;
        }
    }
    //财经日历消息的解析
    this.cjrl = function() {
        if (this.idate.reality == '' || this.idate.reality == '--') {
            return "";
        }
        var gTitle = this.idate.state + this.idate.title;
        // if (hInArray(gTitle, caiJinCache)) {
        //     return false;
        // }
        // caiJinCache.push(gTitle);
        this.idate.gTitle = gTitle + '  前值：' + this.idate.before + '  预期值：' + this.idate.forecast + '  实际值：' + this.idate.reality;
        local.getImportanceClass();
        local.getRtime();
        local.getGuojiaimg();
        local.getLdlkstring();
        var html = '<li id="' + this.idate.id + '" class="cjrl ' + this.idate.importanceClass + ' " alt="' + this.idate.importanceAlt + '"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">' + this.idate.rtime + '</td>' +
            '<td align="center" valign="middle" width="60px"><img src="' + this.idate.guojiaimg + '" alt="' + this.idate.state + '" height="42" width="42"></td>' +
            '<td align="left" valign="middle" width="614px"><div class="qz_yqz"><p class="word">' + gTitle + '</p>' +
            '<div class="gbsj"><span>前值：' + this.idate.before + '</span><span>预期：' + this.idate.forecast + '</span>' +
            '<img src="/Public/v2/images/kuaixun/' + this.idate.importanceL + '.png" alt="' + this.idate.importance + '" height="13" width="50">' +
            '<span class="sjgbz ' + this.idate.importanceClass + '">实际：' + this.idate.reality + '</span></div></div>' +
            '<div class="dk_box">' + this.idate.ldlkstring + '</div></td>' +
            '</tr></tbody></table></li>';
        return html;
    }
    //平台验证
    this.check = function(dst) {
        var dstt = "!" + dst;
        if (dst == '*' || dstt.indexOf('#*') != '-1') {
            return true;
        }
        var host = "www.kxt.com";
        host_a = host.split('.');
        // 当 当前站点的一级域名 或 当前指定域名 存在时，返回 推送
        if (dstt.indexOf('#' + host_a[1] + '.' + host_a[2]) != '-1' || dstt.indexOf('http://' + host) != '-1') {
            return true;
        }
        return false;
    }
    // 获取 重要性的class
    this.getColorclass = function() {
        var _colorClass = '';
        if (this.idate.importance == '高') {
            var patt = new RegExp("(原油播报|外汇播报|股指播报|原油库存|EIA原库存|WTI原油|布伦特原油|API|股指期货|股市|EIA天然气)");
            if (patt.test(this.idate.ntitle)) {
                _colorClass = ' ';
            } else {
                _colorClass = ' red ';
            }

        } else {
            var patt = new RegExp("金银播报");
            if (patt.test(this.idate.ntitle)) {
                _colorClass = ' red ';
            }
        }

        // local.log(this.idate.importance);
        this.idate.colorClass = _colorClass;
    }
    // 获取 替换后的标题
    this.getNewtitle = function(title, con) {
        // local.log(con);
        if (con.length > 0) {
            for (var i = 0; i < con.length; i++) {
                title = local.titleReplace(title, con[i]);
            }
        }
        return title;
    }
    // 获取 弹窗 中的标题 需要删除中间替换为图片的文字
    this.getNtitle = function(title, con) {
        // local.log(con);
        if (con.length > 0) {
            for (var i = 0; i < con.length; i++) {
                // title = local.titleReplace(title, con[i]);
                if (con[i].op == "img" || con[i].op == "imga") {
                    title = title.replace(con[i].src, "");
                }
            }
        }
        return title;
    }
    // 获取 替换后的副标题
    this.getNewftitle = function(extra, num) {
        this.idate.ftitle = '';
        for (var i = 0; i < num - 1; i++) {
            this.idate.ftitle = local.getNewtitle(extra[i].title, extra[i].console);
            // 未考虑有第三条标题的情况
        }
        // local.log(idate.ftitle);
    }
    // 用控制字段中的指定字符串进行替换标题
    this.titleReplace = function(title, op) {
        // if (op.hasOwnProperty("isBlank") && op.isBlank == "1") {
        target = ' target="_blank" ';
        // } else {
        //     target = '';
        // }
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
            default:
                // value = '<'+op.op+'>'+op.src+'</'+op.op+'>';
                // $new_title = str_replace(op.src,value, $title);
                new_title = title;
                break;
        }
        return new_title;
    }
    // 获取该条消息的html
    this.makehtml = function() {
        var html = '';
        if (this.idate.type == 2) {
            this.idate.id = this.idate.autoid
            html = this.cjrl();
            // $("#spanId").click();
            if (html) {
                if ($("#sound").val() == 1) {
                    this.sound();
                }
                if ($("#notic").val() == 1) {
                    this.notic('/Public/Home/images/dyhjw.jpg', '第一黄金网 - www.dyhjw.com', this.idate.gTitle);
                    // this.notic('1', '', this.idate.gTitle);
                }
            }
        } else {
            var _content = this.idate.content;

            this.getRtime();
            this.idate.ntitle = this.getNewtitle(this.idate.title, _content.console);
            this.getColorclass();
            if (_content.titleNumbers > 1) {
                this.getNewftitle(_content.extra, _content.titleNumbers);
            }
            switch (this.idate.type) {
                case 1:
                    html = this.news();
                    break;
                case 3:
                    html = this.cjst();
                    break;
                case 4:
                    html = this.kbzx();
                    break;
                case 5:
                    html = this.tplj();
                    break;
                default:
                    break;
            }
            if ($("#sound").val() == 1 && $("#" + this.idate.id).length < 1) {
                // this.log("sound");
                this.sound();
            }
            // !this.idIsExists() && this.idate.title != ""
            if (this.idate.importance == '高' && $("#notic").val() == 1 && !this.idIsExists() && this.idate.title != "") {
                this.idate.ttitle = this.idate.title.replace(/<br \/>/g, "");
                this.idate.ttitle = this.getNtitle(this.idate.ttitle, _content.console);
                // this.log(this.idate.title);
                this.notic('/Public/Home/images/dyhjw.jpg', '第一黄金网 - www.dyhjw.com', this.idate.ttitle);
            }
        }
        return html;
    }
    this.news = function() {
        var html = '<li class="' + this.idate.colorClass + '" id="' + this.idate.id + '" time="' + this.idate.timestamp + '" type=' + this.idate.type + '>' +
            '<table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">' + this.idate.rtime +
            '</td><td align="left" valign="middle"><p class="kx_title">' + this.idate.ntitle + '</p></td></tr></tbody></table>' +
            '</li>';
        return html;
    }
    this.cjst = function() {
        var html = '<li class=" ' + this.idate.colorClass + '" id="' + this.idate.id + '" time="' + this.idate.timestamp + '" type=' + this.idate.type + '>' +
            '<table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="time" width="55px" valign="middle" align="left">' + this.idate.rtime +
            '</td><td valign="middle" align="left"><p>' + this.idate.ntitle + '</p>' +
            '<a href="' + this.idate.content.extra[0].a + '" target="_blank" class="link_pic_box"><img src="' + this.idate.content.extra[0].img + '" alt="" class="link_pic"></a>' +
            '</td></tr></tbody></table>' +
            '</li>';
        return html;
    }
    this.kbzx = function() {
        var html = '<li class="video_re ' + this.idate.colorClass + '" id="' + this.idate.id + '" time="' + this.idate.timestamp + '" type=' + this.idate.type + '>' +
            '<table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="time" width="55px" valign="middle" align="left">' + this.idate.rtime +
            '</td><td valign="middle" align="left"><p class="ftitle">' +
            '<a href="' + this.idate.content.extra[0].a + '" target="_blank">' + '<img src="' + this.idate.content.extra[0].img + '" alt="">' + '</a>' +
            '</p><p class="title">' + this.idate.ntitle + '</p>' +
            '</td></tr></tbody></table>' +
            '</li>';
        return html;
    }
    this.tplj = function() {
        var html = '<li class="' + this.idate.colorClass + '" id="' + this.idate.id + '" time="' + this.idate.timestamp + '" type=' + this.idate.type + '>' +
            '<table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="time" align="left" valign="middle" width="55px">' + this.idate.rtime +
            '</td><td align="left" valign="middle"><p class="kx_title">' + this.idate.ntitle + '</p></td></tr></tbody></table>' +
            '</li>';
        return html;
    }
    this.idIsExists = function() {
        var idStr = '#' + this.idate.id;
        if ($(idStr).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    this.removeNode = function(id) {
        var idStr = '#' + id;
        $(idStr).remove();
    }
    this.insertNode = function(html) {
        try {
            if (html) {
                $('.kx_left_box > ul').prepend(html);
            }
        } catch (e) {

        }
    }
    this.replaceNode = function(id, html) {
        var idStr = '#' + id;
        var next = $(idStr).next();
        local.removeNode(id);
        next.before(html);
    }
    this.process = function(html) {
        if (!local.idIsExists() && this.idate.title != "") {
            local.insertNode(html);
        } else {
            if (this.idate.title != "") {
                local.replaceNode(this.idate.id, html);
            } else {
                local.removeNode(this.idate.id);
            }
        }
    }
    /**
     * 桌面通知
     */
    this.notic = function(sicon, stitle, sbody) {
        if (!("Notification" in window) && !window.webkitNotifications && window.webkitNotifications.checkPermission() != 0)
            return;
        if (Notification.permission == null || Notification.permission == undefined)
            windowsNotify360(sicon, stitle, sbody);
        else if (Notification.permission === "granted")
            windowsNotifyFFAndGE(sicon, stitle, sbody);
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
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
    this.sound = function() {
        // try {
        //     $('#tishi').prepend('<embed src="/Public/v1/audio/kx.wav" autostart="true" hidden="true" loop="false"></embed>');
        //     setTimeout(function () {
        //         $('embed').remove();
        //     }, 10000)
        // } catch (e) {

        // }
        var audio = $("#tishi")[0];
        try {
            audio.play();
        } catch (e) {
            // $('#tishi').prepend('<embed src="/Public/v1/audio/kx.wav" autostart="true" hidden="true" loop="false"></embed>');
            // setTimeout(function () {
            //     $('embed').remove();
            // }, 10000)
        }
    }
}
var wsReconnect = function() {

    this.ws = null;
    this.timeInterval;

    var local = this;

    // this.debug = true;
    this.debug = false;

    //this.dataHqLoginString = 'ws://114.215.194.79:8189/';
    this.dataHqLoginString = 'ws://ws.kx.dyhjw.com/';
    // this.dataHqLoginString = 'ws://192.168.0.51:8182/';
    // this.loginS = codeStr
    this.log = function(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }

    this.sendHeartbeat = function() {
        msg = new Object();
        msg.cmd = 'heartbeat';
        msg.data = ""
        // local.log(local.ws)
        try {
            local.connect();
            local.ws.send(JSON.stringify(msg));
        } catch (e) {
            local.log(e.name + ": " + e.message);
        }
        // local.log("sendHeartbeat");
    }

    this.listenEvent = function() {
        /**
         * 连接建立时触发
         */
        local.ws.onopen = function(e) {
            // 连接成功
            local.log("connect webim server success.");
            // 发送登录信息
            // local.reLogin();
        };
        // 有消息到来时触发
        local.ws.onmessage = function(e) {
            local.log(e.data);
            var live = new Live();
            live.initDate(e.data);
            var html = live.makehtml();
            local.log(html)
            if (html) {
                live.process(html);
                toggleData();
            }
        };

        /**
         * 连接关闭事件
         */
        local.ws.onclose = function(e) {
            local.log("onclose:" + e);
            // local.log("clearInterval:" + local.timeInterval);
            // clearInterval(timeInterval);
            //    closenum = closenum+1;
            //    if (closenum > 3) {

            //    } else {

            setTimeout(function() {
                location.reload();
            }, 1000 * 60 * 10);
            // }
        };

        /**
         * 异常事件
         */
        local.ws.onerror = function(e) {
            local.log("onerror" + e.data);
            // alert("异常:" + e.data);
            // local.log("onerror"+ e.data);
            //        local.timeInterval = setTimeout(function(){
            //            local.sendHeartbeat();
            //        },1000*60);
        };
    }

    this.connect = function(type) {
        //setTimeout(function() {
        if (typeof local.ws == "undefined" || local.ws == null || local.ws.readyState == 2 || local.ws.readyState == 3) {
            if (window.WebSocket || window.MozWebSocket) {
                local.ws = new WebSocket(local.dataHqLoginString + type + "?token=" + getCookie("kx_dyhjw_calendar_Token"));
                local.listenEvent();
            } else if (1) {
                WEB_SOCKET_SWF_LOCATION = "/Public/Home/js/live/WebSocketMain.swf?v=" + Math.round(new Date().getTime() / 1000);
                $.getScript("/Public/Home/js/live/swfobject.js", function() {
                    $.getScript("/Public/Home/js/live/web_socket.js", function() {
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

        // 测试数据
        // var s = '{"autoid":380979,"title":"科威特油长拉什迪：油市逐步稳定，欧佩克与非欧佩克国家的减产协议将持续至今年年底，6月份的会议是审议减产协议的一个机会","content":{"console":[],"dst":"*","titleNumbers":1,"extra":[]},"time":"2018-04-16 15:01:24","type":1,"importance":"低","id":"kxt6365948765590991853576","source":"news","operation":"add"}';
        // var live2 = new Live();
        // live2.initDate(s);
        // var html = live2.makehtml();
    }
}

//获取直播页面cookie
function getLiveCookie() {
    var type = $.cookie('type');
    var obj = {
        type: type
    }
    return obj;
}

//筛选器初始化
function Filters() {
    var types = $.cookie("type");
    if (!types) {
        $.cookie('type', 'GoldSilver'); //oil
    } else {
        type = types.split(",");
        $(".dk_choice li").removeClass("moren");
        for (var i = 0; i < type.length; i++) {
            if (type[i]) {
                $(".dk_choice li[alt='" + type[i] + "']").addClass("moren");
            }
        }
    }
}

function toggleData() {
    var obj = getLiveCookie();

    if (!obj.type || !obj.type.length) {
        $.cookie('type', 'GoldSilver');
        var obj = getLiveCookie();
    }

    var type = obj.type.split(",");

    $(".dk_box .lk").hide();
    $(".dk_box .ld").hide();
    $(".dk_box .pz").hide();

    for (var i = 0; i < type.length; i++) {
        if (type[i]) {
            $(".dk_box span[alt='" + type[i] + "']").show();
            $(".dk_box span[alt='" + type[i] + "']").parent().show();
        }
    }

}

//页面加载完成之后
$(function() {
    Filters();
    // mm:也需要对第一笔数据的多空 及其 重要性 进行判断
    Lang.init(obj);
    var LoaderNumber = 0;
    $(".more_news a").click(function() {
        LoaderNumber = LoaderNumber + 1;
        if (LoaderNumber > 5) {
            return false;
        }
        $.getJSON(moreurl, {
            id: kxLastId
        }, function(data) {
            data.html = base64decode(data.html);
            data.html = decodeURIComponent(data.html.replace(/\+/g, '%20'))
            $('.kx_left_box  ul').append(data.html);
            kxLastId = data.lastkxid;

            toggleData();
        })
    })

    function changeType(alt) {
        var c = $.cookie("type");
        if (!c) {
            $.cookie("type", alt);
        } else {
            var g = c.indexOf(alt);
            if (g < 0) {
                // 当在cookie中，查找不到此值时，添加
                c += "," + alt;
            } else {
                // 删除
                if (g == 0) {
                    c = c.replace(alt, "");
                } else {
                    c = c.replace("," + alt, "");
                }
            }

            if (c.indexOf(",") == 0) {
                c = c.substring(1, c.length);
            }
            $.cookie("type", c);
        }
    }
    /*声音通知*/
    $(".voice_choice li").click(function() {
        type = $(this).attr("alt");
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('#' + type).val(0);
        } else {
            if (type == "notic") {
                if (!("Notification" in window)) {
                    layer.open({
                        title: '提示',
                        content: '您当前浏览器不支持该功能！\n建议使用猎豹、360等浏览器使用此功能',
                        scrollbar: false
                    });
                    // alert("您当前浏览器不支持该功能！\n建议使用猎豹、360等浏览器使用此功能");
                } else {
                    if (Notification.permission == null || Notification.permission == undefined)
                        window.webkitNotifications.requestPermission();
                    else if (Notification.permission !== 'denied') {
                        Notification.requestPermission(function(permission) {
                            if (!('permission' in Notification))
                                Notification.permission = permission;
                        });
                    }
                    $(this).addClass('on');
                    $('#' + type).val(1);
                }
            } else {
                $(this).addClass('on');
                $('#' + type).val(1);
            }

        }

    })

    $(".data_dk_choice .dk_choice li").click(function() {
        var xz = $(".data_dk_choice .dk_choice li.moren").length;
        if ($(this).hasClass('moren')) {
            if (xz > 1) {
                $(this).removeClass("moren");
                var alt = $(this).attr("alt");
                changeType(alt)
                toggleData()
            }
            if (xz < 2) {
                layer.open({
                    title: '提示',
                    content: '最少选一个',
                    scrollbar: false
                });
            }
        } else {
            if (xz > 1) {
                layer.open({
                    title: '提示',
                    content: '最多选择两个',
                    scrollbar: false
                });
            }
            if (xz < 2) {
                $(this).addClass("moren");
                var alt = $(this).attr("alt");
                changeType(alt)
                toggleData()
            }
        }
    })

    /*时间选择*/
    $(".now_time ul li").click(function() {
        var tindex = $(this).index();
        var tname = this.className;
        var tnameXq = tname + "_week";
        $("#now_time").removeClass();
        $("#now_time").addClass(tname);
        $("#now_week").removeClass();
        $("#now_week").addClass(tnameXq);
        $(".now_time .time_show img").attr("src", "Public/v3/images/kuaixun/" + tindex + ".png");
        $(".now_time ul").css("display", "none");
    })
    /*日期切换*/
    function getform(n) {
        var m = ((n < 10) ? ('0' + n) : n).toString();
        return m;
    }

    function getTimeQuYu() {
        _timestamp += 1000;
        var today = new Date(_timestamp);
        var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
        var bjDate = new Date(utc + (3600000 * (8))); // 中国北京时间
        var nyDate = new Date(utc + (3600000 * (-5))); // 美国纽约
        var ldDate = new Date(utc + (3600000 * (0))); // 英国伦敦
        var djDate = new Date(utc + (3600000 * (9))); // 日本东京
        var xnDate = new Date(utc + (3600000 * (11))); // 澳大利亚悉尼
        var xjpDate = new Date(utc + (3600000 * (8))); // 新加坡
        var xgDate = new Date(utc + (3600000 * (8))); // 香港时间
        var arrDate = {
            bj: {
                Y: bjDate.getFullYear(),
                M: bjDate.getMonth() + 1,
                D: bjDate.getDate(),
                h: bjDate.getHours(),
                m: bjDate.getMinutes(),
                s: bjDate.getSeconds(),
                d: bjDate.getDay()
            },
            ny: {
                Y: nyDate.getFullYear(),
                M: nyDate.getMonth() + 1,
                D: nyDate.getDate(),
                h: nyDate.getHours(),
                m: nyDate.getMinutes(),
                s: nyDate.getSeconds(),
                d: nyDate.getDay()
            },
            ld: {
                Y: ldDate.getFullYear(),
                M: ldDate.getMonth() + 1,
                D: ldDate.getDate(),
                h: ldDate.getHours(),
                m: ldDate.getMinutes(),
                s: ldDate.getSeconds(),
                d: ldDate.getDay()
            },
            dj: {
                Y: djDate.getFullYear(),
                M: djDate.getMonth() + 1,
                D: djDate.getDate(),
                h: djDate.getHours(),
                m: djDate.getMinutes(),
                s: djDate.getSeconds(),
                d: djDate.getDay()
            },
            xn: {
                Y: xnDate.getFullYear(),
                M: xnDate.getMonth() + 1,
                D: xnDate.getDate(),
                h: xnDate.getHours(),
                m: xnDate.getMinutes(),
                s: xnDate.getSeconds(),
                d: xnDate.getDay()
            }
        }
        // 获取北京的时间时间
        var bjtim = getform(arrDate.bj.Y) + '-' + getform(arrDate.bj.M) + '-' +
            getform(arrDate.bj.D) + '&nbsp;,&nbsp;' + getform(arrDate.bj.h) + ':' +
            getform(arrDate.bj.m) + ':' + getform(arrDate.bj.s);
        var nytim = getform(arrDate.ny.Y) + '-' + getform(arrDate.ny.M) + '-' +
            getform(arrDate.ny.D) + '&nbsp;,&nbsp;' + getform(arrDate.ny.h) + ':' +
            getform(arrDate.ny.m) + ':' + getform(arrDate.ny.s);
        var ldtim = getform(arrDate.ld.Y) + '-' + getform(arrDate.ld.M) + '-' +
            getform(arrDate.ld.D) + '&nbsp;,&nbsp;' + getform(arrDate.ld.h) + ':' +
            getform(arrDate.ld.m) + ':' + getform(arrDate.ld.s);
        var djtim = getform(arrDate.dj.Y) + '-' + getform(arrDate.dj.M) + '-' +
            getform(arrDate.dj.D) + '&nbsp;,&nbsp;' + getform(arrDate.dj.h) + ':' +
            getform(arrDate.dj.m) + ':' + getform(arrDate.dj.s);
        var xntim = getform(arrDate.xn.Y) + '-' + getform(arrDate.xn.M) + '-' +
            getform(arrDate.xn.D) + '&nbsp;,&nbsp;' + getform(arrDate.xn.h) + ':' +
            getform(arrDate.xn.m) + ':' + getform(arrDate.xn.s);

        $('.zhong .riqi').html(bjtim);
        $('.niu .riqi').html(nytim);
        $('.lun .riqi').html(ldtim);
        $('.dong .riqi').html(djtim);
        $('.xi .riqi').html(xntim);
        $('.xin .riqi').html(bjtim);
        $('.xiang .riqi').html(bjtim);

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
        var nyday = xingqi[arrDate.ny.d];
        var ldday = xingqi[arrDate.ld.d];
        var djday = xingqi[arrDate.dj.d];
        var xnday = xingqi[arrDate.xn.d];

        $('.zhong_week').html(bjday);
        $('.niu_week').html(nyday);
        $('.lun_week').html(ldday);
        $('.dong_week').html(djday);
        $('.xi_week').html(xnday);
        $('.xin_week').html(bjday);
        $('.xiang_week').html(bjday);
        // 获取纽约的时间，把 bj 换成

    }
    setInterval(function() {
        getTimeQuYu();
    }, 1000);

    $('.time_show').on('click', function() {
        $('.now_time ul').css('display', 'block');
        $(document).off('click');
        setTimeout(function() {
            $(document).one('click', function() {
                // console.log('click ...');
                $('.now_time ul').css('display', 'none');
            })
        }, 0);
    })

    var wsr = new wsReconnect();
    wsr.connect("kx");
    toggleData();
})