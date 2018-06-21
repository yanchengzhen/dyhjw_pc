$(function(){
  //表格切换
  $(".ntd_tnav li").click(function(){
    var nowNum = $(this).index();
    $(".ntd_tnav li").removeClass('cur');
    $(this).addClass('cur');
    // $(".llg_gchart").hide();
    // $(".llg_gchart").eq(nowNum).show();
    if(nowNum==0){
      var type='fenshi';
      document.getElementById("hqt").src = "http://hq.dyhjw.com/nhq/fenshi.php?code=AUTD";
    } else {
      var type='candle';
      var interval=$(this).attr('data-interval');
      document.getElementById("hqt").src = "http://hq.dyhjw.com/nhq/candle.php?code=AUTD&interval="+interval;
    }
  });

  //切换
  $(".ntd_qh_title a").mouseover(function(){
    var nowNum = $(this).index();
    $(".ntd_qh_title a").removeClass('cur');
    $(this).addClass('cur');
    $(".ntd_qh_main ul").hide();
    $(".ntd_qh_main ul").eq(nowNum).show();
  });
});