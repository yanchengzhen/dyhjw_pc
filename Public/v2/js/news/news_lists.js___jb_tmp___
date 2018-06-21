$(function(){
	// 选项卡标题吸顶效果
	fnFiexdTop();
	/*针对笔记本样式*/

	var spans=$(".pushtime");
	for(var i=0;i<spans.length;i++){
		var pt=$(spans[i]).attr("time");
		var ptwz=getGZTime(pt);
		$(spans[i]).text(ptwz);
	}
})

//获取gua
$.ajax({
 		url:'/api/getgua.html',
 		data:{id:'88,126'},
 		type: 'POST',
 		success:function(req){
 			for(var i=0;i<req.length;i++)
 			{
 				$("#gua"+req[i].id).html(req[i].c);
 			}
 		}
});


/*针对笔记本样式*/
function fnLapTop(){
	var window_Width = $(window).width();
	if(window_Width <= 1360){
		$('.nn_right').show().addClass('laptop');
		$('.nn_left').show().addClass('laptop');
	}
}
/*针对笔记本样式*/


function fnFiexdTop(){
	var Box_Top = $('.main').offset().top;
	var Box = $('.lt .rank');
	//console.log(Box_Top)
	$(window).scroll(function(){
		if($(this).scrollTop() >= Box_Top){
			Box.addClass('fixed');
		}else{
			Box.removeClass('fixed');
		}	
	})
}

var nt_T = $(".news_title_fix").offset().top;
$(".news_title li").each(function(index){
  var cleartime= null;
  $(this).hover(function(){
    $(this).css({"background":"url('Public/v2/images/index/icon_news_bg.png') no-repeat","color":"#FFF"});
    cleartime=setTimeout(function(){
      $(".news_title li").removeClass("now");
      $(".news_title li").eq(index).addClass("now");
      $(".news_list_change .top2_box").css("display","none");
      $(".news_list_change .top2_box").eq(index).css("display","block");
      if($(document).scrollTop()>nt_T){
        $('body,html').scrollTop(nt_T);
      }
    },50);

  },function(){
    $(this).removeAttr("style");
    clearTimeout(cleartime);
  });
});
