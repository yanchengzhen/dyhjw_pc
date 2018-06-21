/**
 * Created by Administrator on 2017/6/30.
 */

var chart,date_max = 0,new_pri = 0;
function init_chart(chart_data) {
    if(chart_data.data == undefined || chart_data.lastclo_quo == undefined) return false;
    var data = chart_data.data;
    var lastclo_quo = chart_data.lastclo_quo;
    if(data.length <= 0) return false;
    //console.log(data);
    Highcharts.setOptions({ global : { useUTC : false } });
    //return false;
    var price = [];
    var categories = [];
    var date_min = 0;
    var date = new Date();
    date.setHours(0,0,0,0);
    var point_start = date.getTime();
    $.each(data,function(index,value) {

        var time = value['time'].split(',');
        date.setFullYear(time[0],time[1]-1,Number(time[2]));
        date.setHours(Number(time[3]),Number(time[4]),Number(time[5]));
        var timestamp = date.getTime();
        if(index == 0) {
            date_min = timestamp;
            //如果第一个数据不是整点的数据，则将第一个整点数据自动填充为null
            if(Number(time[4]) != 0) {
                //var hour = Number(time[3]);
                date.setHours(Number(time[3]),0,0);
                //console.log(date.getTime());
                categories.push([date.getTime(),null]);
                price.push([date.getTime(),null]);
            }
        }
        if(index == data.length - 1) date_max = timestamp;new_pri = value.new_pri;
        categories.push([timestamp,parseFloat(value.price_chg)]);
        price.push([timestamp,parseFloat(value.new_pri)]);
    });
    //console.log(categories);
    //console.log(price);
    var xAis_index = Math.ceil((date_max- date_min)/3600000);
    //console.log(xAis_index);
    var high_option = {
        chart:{

        },
        plotOptions: {
            series: {
                pointStart: point_start, // 开始值
                pointInterval: 6 * 3600 * 1000 // 间隔3个小时
            }
        },
        title:{
            text:null
        },
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        },
        legend:{
            enabled:false
        },
        tooltip: {
            formatter: function () {
                var s = Highcharts.dateFormat("%H:%M", this.x);
                $.each(this.points, function () {
                    s += '<br/>现价: ' +
                        this.y;
                });
                return s;
            },
            shared: true
        },
        xAxis:[{
            //categories:categories,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%Y-%m-%d'
            },
            labels:{
                formatter:function() {
                    return Highcharts.dateFormat("%H:%M", this.value);
                }
            },
            tickPositioner: function () {
                var min = this.dataMin;
                var positions = [min];
                var gap = 3600000;
                if(xAis_index > 18) {
                    gap = 14400000;
                } else if(xAis_index > 12) {
                    gap = 10800000;
                } else if(xAis_index > 6) {
                    gap = 7200000;
                }
                for(var i = 0;i < xAis_index;i ++) {
                    min += gap;
                    positions.push(min);
                }
                //console.log(positions);
                return positions;
            }
        }],
        yAxis:[{
            title:{
                text:null
            },
            id:'swing_y',
            gridLineColor:'#fff',
            tickPositioner: function () {
                var max = this.dataMax,min = this.dataMin;
                max *= 10000;
                min *= 10000;

                var positions = [], increment = Math.ceil(((max - min) / 6));
                min -= increment;
                max += increment;
                //console.log(min+'---'+max);
                for(var tmp = min,i=0;i < 9;tmp+=increment,i++) {
                    positions.push((tmp/10000).toFixed(3));
                }
                return positions;
            }
            //visible: false
        },{
            title:{
                text:null
            },
            id:'price_y',
            plotLines: [{ // summer months - treat from/to as numbers
                color: '#000',
                width: 1,
                value: new_pri,
                id: 'plotline-2',
                label:{
                    align:'right',
                    x:48,
                    y:13,
                    text:'<span style="color:#fff;padding:3px 5px;background:rgba(0,0,0,0.8);">'+new_pri+'</span>',
                    useHTML:true
                },
                zIndex:12
            }],
            opposite: true,
            tickPositioner: function () {
                var max = this.dataMax,min = this.dataMin;
                if(this.dataMax < 100 || this.dataMin) {
                    max *= 1000;
                    min *= 1000;
                }
                var positions = [], increment = Math.ceil(((max - min) / 6));
                min -= increment;
                max += increment;
                //console.log(min+'---'+max);
                for(var tmp = min,i=0;i < 9;tmp+=increment,i++) {
                    positions.push((tmp/1000).toFixed(2));
                }
                return positions;
            }
        }],
        series:[{
            id:'series_swing',
            color:'#fff',
            data:categories,
            //visible:false,
            marker:{
                enabled:false
            },
            enableMouseTracking:false,
            dataLabels:{
                enabled:false
            },
            yAxis:0,
            zIndex:1
        },{
            id:'series_price',
            type:'spline',
            data:price,
            name:null,
            yAxis:1,
            zIndex:10
        }]
    };

    chart = new Highcharts.Chart('container', high_option);
}

function changeChart(new_data) {
    if(new_data.data == undefined) return false;
    var data = new_data.data;
    var date = new Date();
    var latest_pri = 0;
    var series = chart.get('series_price');
    var yxias = chart.get('price_y');
    if(data.length > 0) {
        $.each(data,function(index,value) {
            var time = value['time'].split(',');
            date.setFullYear(time[0],time[1]-1,Number(time[2]));
            date.setHours(Number(time[3]),Number(time[4]),Number(time[5]));
            var timestamp = date.getTime();
            if(timestamp > date_max) {
                //console.log([timestamp,value.new_pri]);
                series.addPoint([timestamp,value.new_pri]);
            }
            if(index == data.length - 1) latest_pri = value.new_pri;
        });
        if(latest_pri != new_pri) {
            new_pri = latest_pri;
            yxias.removePlotLine('plotline-2');
            yxias.addPlotLine({
                color: '#000',
                width: 1,
                value: new_pri,
                id: 'plotline-2',
                label:{
                    align:'right',
                    x:48,
                    y:13,
                    text:'<span style="color:#fff;padding:3px 5px;background:rgba(0,0,0,0.8);">'+new_pri+'</span>',
                    useHTML:true
                },
                zIndex:12
            });
        }
    }
}

