
$(function(){

    //点击内容底部实物黄金切换
    //上一张
    var _ul = $(".fgscroll_ul"),
        _li = _ul.find('li'),
        totalNum = _li.length;
    var width = _li.width() + 10;
    var totalWidth = totalNum * width;
    $(".fgscroll_ul").width(totalWidth);
    $(".fgscroll_prev").click(function(){
        var nowLeft = _ul.position().left,
            maxLeft = -(totalNum - 3)* width;
        if(nowLeft == 0){
            _ul.css({left:maxLeft});
            return false;
        }
        var move = nowLeft + width;
        console.log(nowLeft,move,maxLeft);
        _ul.css({left:move});

    });
    $(".fgscroll_next").click(function(){
        var nowLeft = _ul.position().left,
            maxLeft = -(totalNum - 3)* width;
        if(nowLeft == maxLeft){
            _ul.css({left:0});
            return false;
        }
        var move = nowLeft - width;
        _ul.css({left:move});
    });
    $(".fgscroll_li a").mouseover(function(){
        $(".fgscroll_li a").children('.fscroll_img').removeClass('fire_hover');
        $(this).children('.fscroll_img').addClass('fire_hover');
    });
    $(".fgscroll_li a").mouseout(function(){
        $(".fgscroll_li a").children('.fscroll_img').removeClass('fire_hover');
    });
});



