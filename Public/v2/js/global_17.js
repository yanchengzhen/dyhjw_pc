var user;
//检测是否是手机
function isMobile(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["ndroid",'Adr',"iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = true;
            break;
        }
    }
    return flag;
}

//获取URL参数
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return  unescape(r[2]);
    return null;
}

var type = getQueryString('type');

if (type == "pc") {
    setCookie("visitType", "pc");
} else if (type == "mobile") {
    setCookie("visitType", "mobile");
}
var visitType = getCookie("visitType");

if(isMobile() && visitType!='pc'){
    var lhref=window.location.href;
    lhref=lhref.replace(/www/,"m");
    window.location.href=lhref;
}


/*防止镜像网站开始*/
if(window.location.hostname.indexOf('dyhjw.com') < 0){
    // window.location.href = 'http://www.dyhjw.com';
}
/*防止镜像网站结束*/

$(function() {
    $.each($('.nav_list ul li'),function(index,value) {
        var text = $(this).find('a').text();
        if(text == '视听') {
            $(this).find('a').attr('href','http://www.kxt.com/videoInfo/').attr('rel','nofollow');
        }
    });
});



function setCookie(c_name, value,expiredays)
{
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays);
    if(expiredays==1)
    {
        exdate = new Date()
        exdate.setDate(exdate.getDate() + 1);
        exdate.setHours(4);
        exdate.setMinutes(0);
        exdate.setSeconds(0);
        exdate.setMilliseconds(0);
    }
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
function getCookie(c_name) {
    var arr,reg=new RegExp("(^| )"+c_name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
    {
        return unescape(arr[2]);
    }else{
        return null;
    }
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "y+": this.getFullYear(), //月份
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function(){
//    //导航更多
//    $(".more_nav .more_btn").mouseenter(function(){
//        $(".more_xl").slideDown(300);
//    })
//    //导航更多关闭
//    $(".more_xl").mouseout(function(){
//        $(this).slideUp(300);
//    })
//    $('.more_xl').find('a').click(function(){
//        $(".more_xl").slideUp(300);
//    })

    /*广告位点击增加点击量*/
    // $(document).on('click','.ad_click',function() {
    //     var aid = $(this).data('id');
    //     $.ajax({
    //         url:"?s=/api/adClick",
    //         type:'get',
    //         data:'aid='+aid,
    //         success:function(res) {

    //         }
    //     });
    // });


    //获取gua
    $.ajax({
        url:'/api/getgua.html',
        data:{id:'115,127,124'},
        type: 'POST',
        success:function(req){
            for(var i=0;i<req.length;i++)
            {
                $("#gua"+req[i].id).html(req[i].c);
            }
        }
    });

    //登录状态
    if(typeof(aid)!='undefined'){
        $.post('/newapi/checkLogin',{aid:aid},function(res){
            if(res.status == 1){
                user=res.userInfo;
                fnLogined(res.userInfo);
                if($(".edit_info").length>0){
                    edLofined(res.userInfo);
                }

            }else{
                fnUnLogin(res);
            }

            if(res.favor){
                $(".xt_cl").addClass('saved');
                $(".cxg_cl").addClass('saved');
            }
        },'JSON');
    }else{
        $.post('/newapi/checkLogin',function(res){
            if(res.status == 1){
                user=res.userInfo;
                fnLogined(res.userInfo);
                if($(".edit_info").length>0){
                    edLofined(res.userInfo);
                }

            }else{
                fnUnLogin(res);
            }
        },'JSON');
    }

    // 搜索事件
    $(".ss").on('click', function() {
        var search_text = $('.sr').val();
        search_text=encodeURI(search_text);
        if (search_text == '' || search_text == '我要搜索...') {
            layer.msg('请输搜索关键字');
            return;
        } else {
            // window.open('/News/search?word=' + search_text);
            //兼容uc模拟点击事件
            $(this).after("<a id='ss_a' style='visibility: hidden' target='_blank' href='http://www.dyhjw.com/News/search?word="+search_text+"'>搜索</a>");
            $('#ss_a')[0].click();
            $('#ss_a')[0].remove();
        }
    })
    //回车提交搜索
    $('.sr').keydown(function(e) {
        if (e.keyCode == 13) {
            var search_text = $('.sr').val();
            search_text=encodeURI(search_text);
            if (search_text == '' || search_text == '我要搜索...') {
                layer.msg('请输搜索关键字');
                return;
            } else {
                // window.open('/News/search?word=' + search_text);
                //兼容uc模拟点击事件
                $(this).after("<a id='ss_a' style='visibility: hidden' target='_blank' href='http://www.dyhjw.com/News/search?word="+search_text+"'>搜索</a>");
                $('#ss_a')[0].click();
                $('#ss_a')[0].remove();
            }
        }
    });
    /*主导航浮动*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 450) {
            $(".go_top_btn").css("display", "block");
        } else {
            $(".go_top_btn").css("display", "none");
        }
        //监听元素距顶部的高度 用于电梯使用
        if($(".top_news").length>0){
            listenDomScroll($(this).scrollTop(),$(".top_news"),{hide:".tel_float",show:"tel_float_active"});
        }
        if($(".dp_xt").length>0){
            listenDomScroll($(this).scrollTop(),$(".dp_xt"),{hide:".ewm_float",show:"ewm_float_active"});
        }
        if($(".news_box").length>0){
            listenDomScroll($(this).scrollTop(),$(".news_box"),{hide:".yhfk",show:"yhfk_active"});
        }
    });

    /** @闫承臻
     * 监听元素距顶部的高度 用于电梯使用 $(window).scroll调用
     * @param scroll   scroll值
     * @param dom     JQ Dom
     * @param changeDome    改变电梯显示颜色的dom
     */
    function listenDomScroll(scroll,dom,changeDome){
        var top = dom.offset().top;         //元素顶部距body距离
        var topHeight = dom.height()+top;   //元素底部距body距离
        var hideDom = $(changeDome.hide);   //电梯显示盒子
        if(scroll>=top && scroll<=topHeight){
            hideDom.addClass(changeDome.show);
        }else{
            hideDom.removeClass(changeDome.show);
        }
    }
    // 新闻头条楼层点击
    $(".tel_float").click(function(){
        $('html, body').animate({
            scrollTop: $(".top_news").offset().top
        }, 120);
    });
    // 实时快讯楼层点击
    $(".ewm_float").click(function(){
        $('html, body').animate({
            scrollTop: $(".dp_xt").offset().top
        }, 120);
    });
    // 财经头条楼层点击
    $(".yhfk").click(function(){
        $('html, body').animate({
            scrollTop: $(".news_box").offset().top
        }, 120);
    });
    //返回顶部
    $(".go_top_btn").click(function() {
        $('html,body').stop().animate({
            scrollTop: 0
        },120);
    });
    //对联广告关闭
    $( ".nn_link" ).on( "click", ".close", function() {
        $(this).parent("div").hide();
    });

    //对联显示判断
    //var sW = document.documentElement.clientWidth;
//    if(sW<1366){
//        $(".nn_link img").css("width","130px");
//    }
    //右侧块贴顶部效果
//     if($(".nn_link").length>0){
//         $(window).scroll(function(){
//             var tT = $(".nav_bg").offset().top+$(".nav_bg").outerHeight();
//             if($(this).scrollTop()>tT){
//                 $(".nn_link").removeClass("fixed2");
//                 $(".nn_link").addClass("fixed1");
//                 $(".nn_link").css("display","block");
//             }
//             else{
//                 $(".nn_link").removeClass("fixed2");
//                 $(".nn_link").removeClass("fixed1")
//             }
//         })
//     }


    setInterval(function() {
        $(".nowTime b").text(function() {
            var d = new Date();
            return d.Format("MM-dd ，hh:mm:ss");
        });
    }, 1000);
    /*针对笔记本样式*/
    function fnLapTop(){
        //console.log(1111111111)
        var window_Width = $(window).width();
        if(window_Width <= 1360){
            $('.nn_right').show().addClass('laptop');
            $('.nn_left').show().addClass('laptop');
            $(".go_top").css("bottom","-40px")
        }else{
            $('.nn_right').show();
            $('.nn_left').show();
        }
    }

    /*针对笔记本样式*/
    fnLapTop();

});

function getGZTime(pushtime){
    pushtime=pushtime*1000;
    var myDate=new Date();
    var nowunix=myDate.getTime();


    var cha=(nowunix-pushtime)/1000/3600;
    var result="";

    //1小时内
    if(cha<1){
        //1分钟内
        var ys=Math.floor((nowunix-pushtime)/1000);
        if(ys<60){
            result=ys+"秒前";
        }else{
            var yu=Math.floor(ys/60);
            result=yu+"分钟前"
        }


    }
    else if(cha <24){
        var yu=Math.floor(cha);
        result=yu+"小时前"
    }
    else{
        myDate.setTime(pushtime)
        result=myDate.Format("yyyy年MM月dd日 hh:mm");
    }

    return result;

}

//（登录状态）显示用户头像和昵称
function fnLogined(user){
    if (user.avatar!='') {
        $('.user_top_list').find('.avatar').attr('src',user.avatar);
        $('.comment-header-login .username-link img').attr('src',user.avatar);
    }else{
        $('.user_top_list').find('.avatar').attr('src','/Public/v2/images/user_tx.png');
        $('.comment-header-login .username-link img').attr('src','/Public/v2/images/user_tx.png');
    }
    $('.user_top_list').find('.username').text(user.username);
    $('.user_top_list').show();
    $('.comment-header-login .username-link').append(user.username);
    $('.comment-header-login').show();
}


//（未登录状态）显示登录
function fnUnLogin(user){
    $('.top_login_btn').show();
    $('.comment-header-nologin .username-link').append(user.area);
    $('.comment-header-nologin').show();
    $('.edit_login').show();
    $(".edit_send").text('匿名提问');
}


function edLofined(user){
    if (user.avatar!='') {
        $('.edit_info').find('.uimg').attr('src',user.avatar);
    }else{
        $('.edit_info').find('.uimg').attr('src','/Public/v2/images/user_tx.png');
    }
    $('#username').text(user.username);
    $('#uid').val(user.uid);
    $('#username').show();
    $('.edit_login').hide();
    $(".edit_send").text('发布提问');
}



