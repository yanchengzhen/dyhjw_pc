$(function() {
    data = feinong_data;
    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            rangeSelectorZoom: '',
            rangeSelectorFrom: '开始',
            rangeSelectorTo: '结束',
            shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            thousandsSep: ' '

        }

    });

    $('#etfcharts').highcharts('StockChart', {
        navigator: {
            //		       	enabled : $(window).width() >640,
            xAxis: {
                offset: 0,
                type: 'datetime',
                labels: {
                    format: xAxis_format
                }
            }
        },

        chart: {
            marginTop: 0,
            type: chart_type,
            events: {
                load: function() {
                    this.renderer.text('第一黄金网', this.plotLeft+20 , this.containerHeight - 150)
                        .attr({
                            id: 'website_text',
                            zIndex: 8
                        })
                        .css({
                            color: '#ccc',
                            fontSize: '16px'
                        })
                        .add();
                    this.renderer.text('dyhjw.com', this.plotLeft+20, this.containerHeight - 130)
                        .attr({
                            id: 'website',
                            zIndex: 8
                        })
                        .css({
                            color: '#ccc',
                            fontSize: '16px'
                        })
                        .add();
                }
            }
        },
        rangeSelector: {
            selected: 0,
            enabled: false,
            buttons: data_buttons

        },

        title: {
            text: ''
        },

        series: [{
            name: '公布值',//数据名字
            data: data,
            tooltip: {
                valueDecimals: 1
            },
            marker: {
                enabled: true,
                radius: 5
            }
        }],
        tooltip: {
            pointFormat: "净持仓: {point.y:,.2f}吨",
            xDateFormat: '%Y年%m月%d日',
            headerFormat: ' <span style="font-size: 12px">{point.key}</span><br/>',

            formatter: function() {

                var tip = "";
                tip += Highcharts.dateFormat(tooltip_format, this.points[0].point.x, false) + "<br/>";
                tip += "公布值:" + this.points[0].point.y.toFixed(2) + unit + "<br/>";
                return tip;

            }
        },



        yAxis: {
            opposite: false,
            offset: -10,
            // minRange: 0,
            gridLineColor: '#ccc',
            // min: data_min,
            // max: data_max,
            // tickPositions: yAxis_tickPositions,
            labels: {
                //overflow:'justify',
                formatter: function() {
                    return this.value + unit;
                }
            }
        },

        xAxis: {
            offset: 0,
            type: 'datetime',
            labels: {
                format: xAxis_format
                // rotation: 45,
            }
        },

        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }

    });

})