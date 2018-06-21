$(function () {
    $(window).scroll(function () {
        //.dateClass
        $("li.dateClass").removeClass("topfixed");
        var row = [];
        $("li.dateClass").each(function () {
            row.push($(this).offset().top-34);//底部已有'7X24实时快讯'悬浮
        })

        var d = $("html").scrollTop() || $("body").scrollTop();
        var sort = new Array();
        for (var i = 0; i < row.length; i++) {
            sort.push(row[i]);
        }
        sort.push(d);
        sort.sort(function (a, b) {
//            return a > b ? 1 : -1
            return a - b;
        })
        var j = -1;
        for (var i = 0; i < sort.length; i++) {
            if (d == sort[i]) {
                j = i;
            }
        }
        j--;

        if (j >= 0) {
            $("li.dateClass").eq(j).addClass("topfixed");
        }
//        console.log(d);
    })



    $(function() {
        var elm = $('.top_check_box');
        var startPos = $(elm).offset().top;
        $.event.add(window, "scroll", function() {
            var p = $(window).scrollTop();
            $(elm).css('position',((p) > startPos) ? 'fixed' : 'static');
            $(elm).css('top',((p) > startPos) ? '0px' : '');
        });
    });
});



