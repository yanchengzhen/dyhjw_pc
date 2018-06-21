$(function(){
  //$('.gmain0').html('<iframe src="http://hq.dyhjw.com/nhq/fenshi.php?code=XAU" border="0" id="hqt" style="height: 100%;width:100%;" frameborder="no"></iframe>').show();
  $('.gmain1').hide();
  $('.gmain2').hide();
  $('.gmain3').hide();
  $(".hg_chart_nav a").hover(function(){
    //console.log($(this).index());
    var nowNum = $(this).index();
    $(".gchart_nav a").removeClass('cur');
    $(this).addClass('cur');
    switch(nowNum){
      case 0:
        $('.gmain0').show();
        $('.gmain1').hide();
        $('.gmain2').hide();
        $('.gmain3').hide();
        break;
      case 1:
        $('.gmain0').hide();
        $('.gmain1').show();
        $('.gmain2').hide();
        $('.gmain3').hide();
        break;
      case 2:
        $('.gmain0').hide();
        $('.gmain1').hide();
        $('.gmain2').show();
        $('.gmain3').hide();
        break;
      case 3:
        $('.gmain0').hide();
        $('.gmain1').hide();
        $('.gmain2').hide();
        $('.gmain3').show();
        break;
    }
    var ele = $('.gmain' + nowNum);
    if(ele.find('iframe').length <= 0) {
      var code = $(this).attr('code');
      var url = 'http://hq.dyhjw.com/nhq/fenshi.php?code=' + code;
      var iframe = '<iframe src="' + url + '" border="0" id="hqt" style="height: 100%;width:100%;" frameborder="no"></iframe>';
      ele.html(iframe);
    }
  });


  $(".gul1").show();
  $(".gul2").hide();
  $(".gselect1").hover(function(){
    $(".gselect_title span").removeClass('cur');
    $(this).addClass('cur');
    $(".gul1").show();
    $(".gul2").hide();
  });

  $(".gselect2").hover(function(){
    $(".gselect_title span").removeClass('cur');
    $(this).addClass('cur');
    $(".gul1").hide();
    $(".gul2").show();
  });

  $('.bank_icbc').html('<iframe src="http://hq.dyhjw.com/nhq/fenshi.php?code=AUCNY" border="0" id="hqt" style="height: 100%;width:100%;" frameborder="no"></iframe>');

  $('.bank_change a').hover(function() {
    if($(this).hasClass('cur')) {
      return false;
    }
    $('.bank_change a').removeClass('cur');
    $(this).addClass('cur');
    var code = $(this).attr('code');
    //alert(code);
    var ele = $('.bank_' + code);
    $('.bank_chart').hide();
    ele.show();
    if(code == 'icbc') {
      if(ele.find('iframe').length <= 0) {
        ele.html('<iframe src="http://hq.dyhjw.com/nhq/fenshi.php?code=AUCNY" border="0" id="hqt" style="height: 400px;" frameborder="no"></iframe>');
      }
    } else if(code == 'ccb') {
      $.post("/?s=Papergold/ajax", {'chart': '019999'}, function (res) {
        if (res.chart) {
          init_chart(res.chart);
        }
        // setInterval(function() {
        //     $.post("/?s=Papergold/ajax",{'chart':'019999'},function(res) {
        //         changeChart(res.chart);
        //     });
        // },60*1000);
      });
    } else {
      if(ele.find('img').length <= 0) {
        var img_src = boc_url;
        ele.html('<img style="height:100%;position:absolute;left:28px;top:0;" src="' + img_src + '"/>');

      }
    }

  },function() {

  });

});