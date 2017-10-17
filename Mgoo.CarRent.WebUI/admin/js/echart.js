/*
 * @Author: Paco
 * @Date:   2017-02-08
 * +----------------------------------------------------------------------
 * | jqadmin [ jq酷打造的一款懒人后台模板 ]
 * | Copyright (c) 2017 http://jqadmin.jqcool.net All rights reserved.
 * | Licensed ( http://jqadmin.jqcool.net/licenses/ )
 * | Author: Paco <admin@jqcool.net>
 * +----------------------------------------------------------------------
 */

layui.define('echarts', function (exports) {
    var echarts = layui.echarts,
        $ = layui.jquery;
    var legendData = [];
    var seriesData = [];
    var len = 10;
    for (var i = 1; i <= len; i++) {
        var name = "Business-" + i;
        legendData.push(name);
        var r = Math.random(1000) * 1000
        seriesData.push({ value: parseInt(r), name: name })
    } 
    var month_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var option = {
            title: {
                text: 'Business consumption top ' + len,
                subtext: month_en[new Date().getMonth()] +' data',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legendData
            },
            series: [{
                name: 'Consumption',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
    var myecharts = echarts.init(document.getElementById('echarts'));
    myecharts.setOption(option);

    var actived = echarts.init(document.getElementById('actived'));
    var curDate = new Date();
    var xAxisData = [],
    seriesData = [];
    len = 7;
    for (var i = len; i > 0; i--) {
        var d = new Date(curDate.getTime() - i*86400000);
        xAxisData.push((d.getMonth()+1) + "-" + d.getDate());
        var r = Math.random(1000)*1000
        seriesData.push(parseInt(r));
    }
    
    option = {
        title: {
            text: 'Consumption',
            subtext: 'Past ' + len + ' days data',
            x: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: xAxisData,//['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'on Saturday', 'Sunday']
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: 'Consumption',
            type: 'bar',
            barWidth: '60%',
            data: seriesData
        }]
    };

    actived.setOption(option);


    exports('echart', {});
});