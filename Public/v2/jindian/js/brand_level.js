$(function(){

    //空白处：收起下拉+调整箭头样式
    $(document).mouseup(function(e){
        var _con = $('.brand_more');
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            $('.brand_more .btn').removeClass('up');
            $('.brand_more ul.s').hide();
        }
    });

    // 更多
    $(document).on('click','.brand_more .btn',function(){
        $(this).toggleClass('up');
        $(this).siblings('ul.s').slideToggle();
    })
    $(document).on('click','.brand_more ul.s li',function(){
        $('.brand_more .btn').removeClass('up');
        $(this).parent().hide();
    });
    $(document).on('click','.brand_more ul.tab_change li',function() {
        var parent = $(this).parent();
        var this_code = $(this).attr('data-code');//当前点击的code
        var this_href = $(this).attr('data-href');//当前的链接地址
        $(this).parents(".main_tab").siblings('.level_col').find(".level_tab").css("display","none");
        $('div[code='+this_code+']').css("display","block");
        var cur_tt = $(this).find('a').text();//当前点击的文字
        $(this).parents('.brand_more').siblings('ul.f').find('.last a').text(cur_tt);
        /*切换code*/
        $(this).parents('.brand_more').siblings('ul.f').find('.last').attr('data-code',this_code).find('a').attr('href',this_href);;

        $(this).parents('.main_tab').children('ul.f').find('li').removeClass('cur');
        $(this).parents('.brand_more').siblings('ul.f').find('.last').addClass('cur');

        $(this).remove();
        parent.eq(0).removeClass('first');
        var li = '<li data-href="'+this_href+'" class="first" data-code="'+this_code+'"><a href="javascript:void(0);">'+cur_tt+'</a></li>';
        parent.prepend(li);
    });

    $('.brand_more ul.zoushi_change li').click(function() {
        var self = $(this);
        var parent = self.parent();
        var this_bid = self.find('a').attr('bid');//当前点击的bid
        var url = self.find('a').attr('data-url');//当前点击的url
        var href = self.find('a').attr('data-href');//当前点击的href
        var cur_tt = $(this).find('a').text();//当前点击的文字

        var first_obj = parent.find('.first');
        var first_bid = first_obj.find('a').attr('bid');//当前点击的bid
        var first_url = first_obj.find('a').attr('data-url');//当前点击的bid
        var first_href = first_obj.find('a').attr('data-href');//当前点击的bid
        var first_txt = first_obj.find('a').text();//当前点击的text


        /*主页面最后一个li的变化*/
        $(this).parents('.main_tab').children('ul.f').find('li').removeClass('cur');
        var obj = $(this).parents('.main_tab').children('ul.f').find('.last');
        obj.addClass('cur');
        obj.find('a').attr('bid',this_bid).attr('data-url',url).attr('href',href);
        //alert(cur_tt);
        $('.main_tab ul.f').find('.last').find('a').html(cur_tt);

        /*当前的变化*/
        self.find('a').attr('bid',first_bid).attr('data-url',first_url).attr('data-href',first_href).text(first_txt);
        //
        // /*第一个的变化和最后一个li的变化相同*/
        first_obj.find('a').attr('bid',this_bid).attr('data-url',url).attr('data-href',href).text(cur_tt);

    });



    //背景色
    // $(".main_bname dd:nth-child(even)").css("background-color","#f7f7f7");


})