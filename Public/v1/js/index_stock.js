

var gold_data = [];
var silver_data=[];
var positions_g=[];
var positions_s=[];


var min_g=100000;

var min_s=100000;
for (var i = 0; i < etfGold.length; i++)
{
    var time= moment(etfGold[i]['Date']).unix()*1000;
    time=time+24*3600*1000;
    min_g=parseFloat(etfGold[i].TotalTonne)<min_g?parseFloat(etfGold[i].TotalTonne):min_g;
    gold_data.push([time,parseFloat(etfGold[i]['TotalTonne'])]);
    if(i%5==0||i==(etfGold.length-1))
        positions_g.push(time);

}
gold_data.sort();


for (var i = 0; i < etfSilver.length; i++)
{
    var time= moment(etfSilver[i]['Date']).unix()*1000;
    time=time+24*3600*1000;
    min_s=parseFloat(etfSilver[i].TotalTonne)<min_s?parseFloat(etfSilver[i].TotalTonne):min_s;
    silver_data.push([time,parseFloat(etfSilver[i]['TotalTonne'])]);

    if(i%5==0||i==(etfSilver.length-1))
        positions_s.push(time);

}
silver_data.sort();
min_g=min_g-10;
min_s=min_s-10;

var columnoptions={
    chart: {
        width:278,
        alignTicks: false
    },
    legend:{enabled:false},
    credits: {enabled:false},
    yAxis:{
        labels:{enabled:false},
        min:min_g,
        title:{text:''}
    },
    xAxis:[{
        tickPositioner:function(){
            return positions_g ;
        },

        labels:{

            formatter:function(){

                var tt=Highcharts.dateFormat("%m-%d", this.value);
                return  tt;
            }
        }
    }],
    tooltip:{
        formatter:function(e){

            var html='<span>'+Highcharts.dateFormat("%Y年%m月%d日", this.x)+'</span><br/> ETF:'+this.y+'<br/>';

            return  html;
        }
    },


    title: {
        text: 'etf'
    },

    series: [{

        name: 'ETF',
        data: gold_data
    }]
};

var colgoldopt=columnoptions;
var colsilveropt=columnoptions;
// create the chart
$('#eftgold').highcharts( columnoptions);

colgoldopt['series']=[{

    name: 'ETF',
    data: gold_data
}];
$('#eftgold').highcharts( colgoldopt);



colsilveropt['yAxis']['min']=min_s-10;
colsilveropt['xAxis']['tickPositioner']=function()
{return positions_s ;};
colsilveropt['series']=[{

    name: 'ETF',
    data: silver_data
}];
$('#eftsilver').highcharts( colsilveropt);
