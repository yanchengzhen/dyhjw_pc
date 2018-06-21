/*汇率换算部分*/
$(function() {
    //金价换算
    $("#goldChange select").change(function() {
        var fromVal = $("#amount").val();
        if (fromVal <= 0) {
            return false;
        }
        getGoldChange();
    })
    $("#amount").keyup(function() {
        getGoldChange();
    })

    //汇率换算
    $("#rateForm select").change(function() {
        getRateFormData();
    })

    $("#rateForm input[name='up']").keyup(function() {
        getRateFormData();
    })
})

//当加载完成后
getRateFormData();

function getRateFormData() {
    var upS = $("#rateForm select[name='up']").val();
    var upI = $("#rateForm input[name='up']").val();

    var downS = $("#rateForm select[name='down']").val();
    //var downI = $("#rateForm input[name='down']").val();

    var obj = {
        from: upS,
        to: downS,
        fromVal: upI
    };

    $.ajax({
        type: "GET", //请求方式
        url: "/index.php?s=/tools/rate", //请求路径
        data: {
            'from': obj.from,
            'to': obj.to,
            'fromVal': obj.fromVal
        },
        dataType: "json",
        success: function(data) { //成功处理函数

            if (data.status) {
                $("#rateForm input[name='down']").val(data.info);
            } else {

            }
        }
    });
}
//初始化金价
initGold();
//金价换算
//getGoldChange();

function initGold() {
    var fromVal = $("#amount").val();
    $.ajax({

        type: "GET", //请求方式
        url: "/index.php?s=/tools/goldprice", //请求路径
        data: {
            'from': 'USD',
            'to': 'CNY',
            'fromVal': fromVal,
            'init': '1'
        },
        dataType: "json",
        success: function(data) { //成功处理函数

            if (data.status) {
                $("#amount").val(data.price);
                $("#keytoamount").val(data.info);
            } else {

            }
        }
    });

}

function getGoldChange() {
    var fromVal = $("#amount").val();
    var from = $("#keyfrom").val();
    var to = $("#keyto").val();

    $.ajax({
        type: "GET", //请求方式
        url: "/index.php?s=/tools/goldprice", //请求路径
        data: {
            'from': from,
            'to': to,
            'fromVal': fromVal
        },
        dataType: "json",
        success: function(data) { //成功处理函数

            if (data.status) {
                $("#keytoamount").val(data.info);
            } else {

            }
        }
    });

}