$(function(){
    $('.inxl_five_l a').mouseover(function(){
        var num = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.inxl_five_cp').eq(num).show().siblings('.inxl_five_cp').hide();
    })
    $('.inxl_five_l1 a').mouseover(function(){
        var num = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.inxl_five_cp1').eq(num).show().siblings('.inxl_five_cp1').hide();
    })

    //list tap切换
    $('.hj_lnav ul li').mouseenter(function(){
        var num = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.hj_l_list').eq(num).show().siblings().hide();
    })

    // 金店比价查询
    $('.inxr_jc_p span').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur')
    })
    //实物黄金价格走势
    /*  $(".main_tab li:first").addClass('cur');
      $(".main_tab li").hover(function(){
          $(".main_tab li").removeClass('cur');
          $(this).addClass('cur');
           var bid = $(this).find('a').attr('bid');
          var url = $(this).find('a').attr('data-url');
          $.post(url, {
              'jindian_getBrandPriceScope': {
                  'bid': bid
              }
          }, function(data) {
              option = {};
              option.series = data.jindian_getBrandPriceScope.series;
              option.title = {
                  text: '',
                  x: -20
              }
              option.xAxis = {}
              option.xAxis.categories = data.jindian_getBrandPriceScope.categories;

              option.yAxis = {
                  title: {
                      text: ''
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              };
              option.credits = {
                  text: '',
                  href: 'http://www.dyhjw.com'
              }

              var chart = new Highcharts.Chart('zst_svg', option);

          })
          $(".main_tab li").removeClass('cur');
          $(this).addClass('cur');
      },function(){})*/
    //背景色
    // $(".main_bname dd:nth-child(even)").css("background-color","#f7f7f7");
    // 还原
    /*$('.huanyuan').click(function() {
        var url = $('.main_tab .cur a').attr('data-url');
        var bid = $('.main_tab .cur a').attr('bid');
        $.post(url, {
            'jindian_getBrandPriceScope': {
                'bid': bid
            }
        }, function(data) {
            option = {};
            option.series = data.jindian_getBrandPriceScope.series;
            option.title = {
                text: '',
                x: -20
            }
            option.xAxis = {}
            option.xAxis.categories = data.jindian_getBrandPriceScope.categories;

            option.yAxis = {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            };
            option.credits = {
                text: '',
                href: 'http://www.dyhjw.com'
            }
            var chart = new Highcharts.Chart('zst_svg', option);
        })
    })*/

})
//左侧悬浮
$(function(){
    if($('.rt_xf').length>0){
        var b_h = $(".rt_xf").height();
        var b_top= $(".rt_xf").offset().top;
        var main_h=$(".main").height();
        var s_h = document.documentElement.clientHeight;

        var nav_h=$(".ii_nav").height();
        var nav_mb=parseInt($(".ii_nav").css("margin-bottom"));
        var main_mb=parseInt($(".main").css("margin-bottom"));
        //大于时，最大高度为b_top+b_h-s_h
        var cch_btm=b_top+b_h-s_h-(nav_h+main_mb);
        var cch_top=b_top+main_h-s_h-(nav_h+main_mb);
        //小于时，最大高度为b_top+main_h-s_h
        var nocch_top=b_top-(nav_mb+1);//悬浮边框1像素
        var nocch_btm=b_top+main_h-b_h-(nav_h+main_mb);

        // console.log("浮动高度 "+b_h);
        // console.log("浮动距顶 "+b_top);
        // console.log("主体高度 "+main_h);
        // console.log("可视区域 "+s_h);

        // console.log("超出居底 "+cch_btm);
        // console.log("超出居顶 "+cch_top);
        // console.log("不超出居顶 "+nocch_top);
        // console.log("不超出居顶 "+nocch_btm);

        is_xf();
        $(window).scroll(function(){
            // console.log($(this).scrollTop());
            is_xf();
        });
        function is_xf(){
            //点击更多时与main_h有关数据重新获取一次
            var main_h=$(".main").height();
            var cch_top=b_top+main_h-s_h-(nav_h+main_mb);
            var nocch_btm=b_top+main_h-b_h-(nav_h+main_mb);

            if(b_h>s_h){//浮动高度大于可视区域
                if ($(this).scrollTop() > cch_btm) {
                    $(".rt_xf").removeClass("abs_btm").addClass("fixed_btm");
                    if ($(this).scrollTop() > cch_top) {
                        $(".rt_xf").removeClass("fixed_btm").addClass("abs_btm");
                    }
                }
                else{
                    $(".rt_xf").removeClass("fixed_btm");
                }
            }
            if(b_h<s_h){//浮动高度小于可视区域
                if ($(this).scrollTop() > nocch_top) {
                    $(".rt_xf").removeClass("abs_btm").addClass("fixed_top");
                    if ($(this).scrollTop() > nocch_btm) {
                        $(".rt_xf").removeClass("fixed_top").addClass("abs_btm");
                    }
                }
                else{
                    $(".rt_xf").removeClass("fixed_top");
                }
            }

        };
    }
})

