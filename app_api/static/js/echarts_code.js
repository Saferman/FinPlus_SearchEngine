// 词云 显示领域研究机构top100词云
function area_org_wordcloud_chart(area_org_wordcloud_chart_data) {
    var area_org_wordcloud_chart = echarts.init(document.getElementById('area_org_wordcloud_chart'));
    var data = [];

    for (var index in area_org_wordcloud_chart_data) {
        //alert(keywordss[index][1]);
        data.push ({
            name: area_org_wordcloud_chart_data[index][0],
            value: Math.sqrt(area_org_wordcloud_chart_data[index][1])
        })
    }


    var maskImage = new Image();
    var option = {
        title: {
            //text: '搜索指数',
            x: 'center',
            textStyle: {
                fontSize: 23
            }
        },
        backgroundColor: '#F7F7F7',
        series: [{
            //name: '搜索指数',
            type: 'wordCloud',
            //size: ['9%', '99%'],
            sizeRange: [11, 50],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            shape: 'circle',
            //maskImage: maskImage,
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data
        }]
    };

    area_org_wordcloud_chart.setOption(option);
    area_org_wordcloud_chart.resize();


}


// 柱状图  显示专家论文发表量
function show_area_hot_bar_chart(area_hot_bar_chart_data) {

    // https://gallery.echartsjs.com/editor.html?c=xAPXRSchSv

    var area_hot_bar_chart = echarts.init(document.getElementById('area_hot_bar_chart'));

    var totalcost = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var colors = ["#48466d", "#46cdcf"];

    var area_hot_bar_chart_option = {
        backgroundColor: '#fff',
        grid: {
            height: '400',
            top: '5%',
            left: '30',
            right: '20',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            inverse: true,
            type: 'category',
            axisLabel: {
                show: true,
                color: '#666',
                fontSize: 12,
                padding: [0, 20, 0, 0]
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: area_hot_bar_chart_data[0],
        },
        series: [{
            type: 'bar',
            barGap: '-100%',
            barWidth: '7',
            z: 1,
            data: totalcost,
            itemStyle: {
                emphasis: {
                    color: 'eee'
                },
                normal: {
                    color: '#eee',
                }
            },
        }, {
            type: 'bar',
            name: "up",
            barWidth: '7',
            z: 2,
            data: area_hot_bar_chart_data[1],
            itemStyle: {
                normal: {
                    barBorderRadius: 16,
                    color: colors[0],
                },
            },
            max: 1
        }]
    }
    area_hot_bar_chart.setOption(area_hot_bar_chart_option);
}


// 柱状图  显示专家论文发表量变化趋势
function show_area_hot_trend_bar_chart(area_hot_trend_bar_chart_data) {

    // https://gallery.echartsjs.com/editor.html?c=xAPXRSchSv
    var area_hot_trend_bar_chart = echarts.init(document.getElementById('area_hot_trend_bar_chart'));
    var totalcost = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var colors = ["#48466d", "#46cdcf"]
    var up_bar = [], down_bar = [];
    area_hot_trend_bar_chart_data[1].forEach(function (item, index) {
        if (area_hot_trend_bar_chart_data[2][index] == -1){
            up_bar.push(0);
            down_bar.push(item);
        }
        else {
            up_bar.push(item);
            down_bar.push(0);
        }
    })
    var area_hot_trend_bar_chart_option = {
        backgroundColor: '#fff',
        grid: {
            height: '400',
            top: '5%',
            left: '30',
            right: '20',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            inverse: true,
            type: 'category',
            axisLabel: {
                show: true,
                color: '#666',
                fontSize: 12,
                padding: [0, 20, 0, 0]
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: area_hot_trend_bar_chart_data[0],
        },
        legend: {
            left: "right",
            data: [{
                name: "up",
                // 强制设置图形为圆。
                icon: 'circle',
                // 设置文本为红色
                textStyle: {
                    color: colors[0],
                }
            },{
                name: "down",
                // 强制设置图形为圆。
                icon: 'circle',
                // 设置文本为红色
                textStyle: {
                    color: colors[1],
                }
            }]
        },
        series: [{
            type: 'bar',
            barGap: '-100%',
            barWidth: '7',
            z: 1,
            data: totalcost,
            itemStyle: {
                emphasis: {
                    color: 'eee'
                },
                normal: {
                    color: '#eee',
                }
            },
        }, {
            type: 'bar',
            name: "up",
            barWidth: '7',
            z: 2,
            data: up_bar,
            itemStyle: {
                normal: {
                    barBorderRadius: 16,
                    color: colors[0],
                },
            },
            max: 1
        }, {
            type: 'bar',
            name: "down",
            barWidth: '7',
            z: 2,
            data: down_bar,
            itemStyle: {
                normal: {
                    barBorderRadius: 16,
                    color: colors[1],
                },
            },
            max: 1
        }]
    }

    area_hot_trend_bar_chart.setOption(area_hot_trend_bar_chart_option);
}

function show_expert_co_chart(expert_name, expert_co_chart_data) {
    var expert_co_chart = echarts.init(document.getElementById('expert_co_chart'));
    var colors = ["#3d84a8", "#46cdcf"];
    var nodeArr = [], linkArr = [];
    nodeArr.push (
        {
            name: expert_name,
            x: 500,
            y: 500,
            fixed: true,
            category: 'self',
            draggable: false,
        }
    );
    expert_co_chart_data.forEach ( function(item, index) {
        nodeArr.push (
            {
                name: item[0],
                category: 'coauthor',
                draggable: true,
                symbolSize: item[1],
                value: item[1],
            }
        );

        linkArr.push (
            {
                source: expert_name,
                target: item[0],
                value: item[1],
            }
        )
    });
    var expert_co_chart_data_option = {
        title: {
            text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 45,
                focusNodeAdjacency: false,
                roam: true,
                //draggable : false,
                categories: [{
                    name: 'self',
                    itemStyle: {
                        normal: {
                            color: colors[0],
                        }
                    }
                }, {
                    name: 'coauthor',
                    itemStyle: {
                        normal: {
                            color: colors[1],
                        }
                    }
                }],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                force: {
                    repulsion: 10000,
                    gravity: 1
                },
                edgeSymbolSize: [4, 50],
                edgeLabel: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: "{c}"
                    }
                },
                edgeLength: [1, 5000],
                data: nodeArr,
                links: linkArr,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0
                    }
                }
            }
        ]
    };

    expert_co_chart.setOption(expert_co_chart_data_option, true);
}


function show_expert_net_chart(dalao_data, xiaolao_data, link_data, expert_net_chart_color) {

    var expert_co_chart = echarts.init(document.getElementById('expert_net_chart'));
    var colors = expert_net_chart_color;
    var nodeArr = [], linkArr = [];
    nodeArr.push(
        {
            name: "eeee",
            category: 1,
            draggable: false,
            symbolSize: 100,
            value: 100,
        }
    );
    dalao_data.forEach ( function(item, index) {
        nodeArr.push(
            {
                name: item[0],
                category: 1,
                draggable: true,
                symbolSize: item[1],
                value: item[1],
            }
        );
        linkArr.push (
            {
                source: "eeee",
                target: item[0],
                value: 1,
            }
        )
    });
    xiaolao_data.forEach ( function(item, index) {
        nodeArr.push(
            {
                name: item[0],
                category: 0,
                draggable: true,
                symbolSize: item[1],
                value: item[1]/100,
            }
        );
    });
    link_data.forEach ( function(item, index) {
        linkArr.push (
            {
                source: item[0],
                target: item[1],
                value: 1,
            }
        )
    });
    var expert_co_chart_data_option = {
        title: {
            text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 45,
                focusNodeAdjacency: false,
                roam: true,
                //draggable : false,
                categories: [{
                    name: 0,
                    itemStyle: {
                        normal: {
                            color: colors[0],
                        }
                    }
                }, {
                    name: 1,
                    itemStyle: {
                        normal: {
                            color: colors[1],
                        }
                    }
                }],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                force: {
                    repulsion: 10000,
                    gravity: 1
                },
                edgeSymbolSize: [4, 50],
                edgeLabel: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: "{c}"
                    }
                },
                edgeLength: [1, 5000],
                data: nodeArr,
                links: linkArr,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0
                    }
                }
            }
        ]
    };

    expert_co_chart.setOption(expert_co_chart_data_option, true);
}

// 大佬信息图
function show_expert_net2_chart(dalao_data, xiaolao_data, link_data, expert_net2_chart_color) {

    var expert_net2_chart = echarts.init(document.getElementById('expert_net2_chart'));
    var colors = expert_net2_chart_color;
    var nodeArr = [], linkArr = [];
    /*
    nodeArr.push(
        {
            name: "eeee",
            category: 1,
            draggable: false,
            symbolSize: 100,
            value: 100,
        }
    );

     */
    dalao_data.forEach ( function(item, index) {
        nodeArr.push(
            {
                name: item[0],
                category: 1,
                draggable: true,
                symbolSize: item[1],
                value: item[1],
            }
        );
    });

    xiaolao_data.forEach ( function(item, index) {
        nodeArr.push(
            {
                name: item[0],
                category: 0,
                draggable: true,
                symbolSize: item[1],
                value: item[1],
            }
        );
    });

    link_data.forEach ( function(item, index) {
        linkArr.push (
            {
                source: item[0],
                target: item[1],
                value: 1,
            }
        )
    });
    var expert_net2_chart_data_option = {
        title: {
            text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 45,
                focusNodeAdjacency: false,
                roam: true,
                //draggable : false,
                categories: [{
                    name: 0,
                    itemStyle: {
                        normal: {
                            color: colors[0],
                        }
                    }
                }, {
                    name: 1,
                    itemStyle: {
                        normal: {
                            color: colors[1],
                        }
                    }
                }],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                force: {
                    repulsion: 10000,
                    gravity: 1
                },
                edgeSymbolSize: [4, 50],
                edgeLabel: {
                    normal: {
                        show: false,
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: "{c}"
                    }
                },
                edgeLength: [1, 5000],
                data: nodeArr,
                links: linkArr,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0
                    }
                }
            }
        ]
    };

    expert_net2_chart.setOption(expert_net2_chart_data_option, true);
}

// 折线图  显示专家论文发表量变化趋势
function show_expert_paper_line_chart(expert_paper_line_chart_data) {

	var expert_paper_line_chart = echarts.init(document.getElementById('expert_paper_line_chart'));
	expert_paper_line_chart_option = {
		title: {
            //text: '发表趋势图'
        },
			// legend: {
  		//   		data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			// },
	    xAxis: {
	        type: 'category',
	        data: expert_paper_line_chart_data[0]
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        type: 'line',
	        color: 'blue',
	        data: expert_paper_line_chart_data[1]

	    }]
	};

   	expert_paper_line_chart.setOption(expert_paper_line_chart_option);
}


// 仪表图 显示专家学术综合得分
    function show_expert_score_gauge_chart(expert_score_gauge_chart_data) {
        var expert_score_gauge_chart = echarts.init(document.getElementById('expert_score_gauge_chart'));

        var dataArr = [{
            value: expert_score_gauge_chart_data[0]
        }];

        var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#5CF9FE' // 0% 处的颜色
            },
            {
                offset: 0.17,
                color: '#468EFD' // 100% 处的颜色
            },
            {
                offset: 0.9,
                color: '#468EFD' // 100% 处的颜色
            },
            {
                offset: 1,
                color: '#468EFD' // 100% 处的颜色
            }
        ]);


        var colorSet = [
            [expert_score_gauge_chart_data[1], color],
            [1, '#959aac']
        ];

        var rich = {
            white: {
                fontSize: 25,
                color: '#fff',
                fontWeight: '500',
                padding: [-90, 0, 0, 0]
            },
            bule: {
                fontSize: 40,
                fontFamily: 'DINBold',
                color: '#fff',
                fontWeight: '700',
                padding: [-85, 0, 0, 0],
            },
            radius: {
                width: 350,
                height: 80,
                // lineHeight:80,
                borderWidth: 1,
                borderColor: '#0092F2',
                fontSize: 50,
                color: '#fff',
                backgroundColor: '#1B215B',
                borderRadius: 20,
                textAlign: 'center',
            },
            size: {
                height: 400,
                padding: [100, 0, 0, 0]
            }
        }


        expert_score_gauge_chart_option = {
            backgroundColor: '#FFFFFF',
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },

            series: [{ //内圆
                    type: 'pie',
                    radius: '85%',
                    center: ['50%', '50%'],
                    z: 0,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.RadialGradient(.5, .5, 1, [{
                                    offset: 0,
                                    color: 'rgba(17,24,43,0)'
                                },
                                {
                                    offset: .5,
                                    // color: '#1E2B57'
                                    color:'rgba(255,255,255,.6)'
                                },
                                {
                                    offset: 1,
                                    color: '#141C33',
                                    // color:'rgba(17,24,43,0)'
                                }
                            ], false),
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                    },
                    hoverAnimation: false,
                    label: {
                        show: false,
                    },
                    tooltip: {
                        show: false
                    },
                    data: [100],
                },
                {
                    type: 'gauge',
                    name: '外层辅助',
                    radius: '74%',
                    startAngle: '225',
                    endAngle: '-45',
                    splitNumber: '100',
                    pointer: {
                        show: false
                    },
                    detail: {
                        show: false,
                    },
                    data: [{
                        value: 1
                    }],
                    // data: [{value: 1, name: 90}],
                    title: {
                        show: true,
                        offsetCenter: [0, 30],
                        textStyle: {
                            color: '#fff',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 20,
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: [
                                [1, '#00FFFF']
                            ],
                            width: 2,
                            opacity: 1
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        length: 20,
                        lineStyle: {
                            color: '#051932',
                            width: 0,
                            type: 'solid',
                        },
                    },
                    axisLabel: {
                        show: false
                    }
                },
                {
                    type: 'gauge',
                    radius: '70%',
                    startAngle: '225',
                    endAngle: '-45',
                    pointer: {
                        show: false
                    },
                    detail: {
                        formatter: function(value) {
                            var num = Math.round(value);
                            return '{bule|' + num + '}{white|}' + '{size|' + '}\n{radius|综合学术评分}';
                        },
                        rich: rich,
                        "offsetCenter": ['0%', "0%"],
                    },
                    data: dataArr,
                    title: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colorSet,
                            width: 25,
                            // shadowBlur: 15,
                            // shadowColor: '#B0C4DE',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 1
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        length: 25,
                        lineStyle: {
                            color: '#00377a',
                            width: 2,
                            type: 'solid',
                        },
                    },
                    axisLabel: {
                        show: false
                    },
                },
                {
                    name: '灰色内圈', //刻度背景
                    type: 'gauge',
                    z: 2,
                    radius: '60%',
                    startAngle: '225',
                    endAngle: '-45',
                    //center: ["50%", "75%"], //整体的位置设置
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [1, '#018DFF']
                            ],
                            width: 2,
                            opacity: 1, //刻度背景宽度
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    // data: [{
                    //     show: false,
                    //     value: '80'
                    // }], //作用不清楚
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    detail: {
                        show: 0
                    }
                },
                {
                    name: "白色圈刻度",
                    type: "gauge",
                    radius: "60%",
                    startAngle: 225, //刻度起始
                    endAngle: -45, //刻度结束
                    z: 4,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 16, //刻度节点线长度
                        lineStyle: {
                            width: 2,
                            color: 'rgba(1,244,255, 0.9)'
                        } //刻度节点线
                    },
                    axisLabel: {
                        color: 'rgba(255,255,255,0)',
                        fontSize: 12,
                    }, //刻度节点文字颜色
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    detail: {
                        show: false
                    },
                    data: [{
                        value: 0,
                        name: ""
                    }]
                },
                { //内圆
                    type: 'pie',
                    radius: '56%',
                    center: ['50%', '50%'],
                    z: 1,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.RadialGradient(.5, .5, .8, [{
                                    offset: 0,
                                    color: '#4978EC'
                                },
                                {
                                    offset: .5,
                                    color: '#1E2B57'
                                },
                                {
                                    offset: 1,
                                    color: '#141F3D'
                                }
                            ], false),
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                    },
                    hoverAnimation: false,
                    label: {
                        show: false,
                    },
                    tooltip: {
                        show: false
                    },
                    data: [100],
                },
            ]
        };


        expert_score_gauge_chart.setOption(expert_score_gauge_chart_option);

    }



// 饼图 显示专家发表量前4个领域
function show_expert_area_pie_chart(expert_area_pie_chart_data) {

    var expert_area_pie_chart_color = ['#389af4', '#dfeaff'];
	var expert_area_pie_chart = echarts.init(document.getElementById('expert_area_pie_chart'));
	var colors = expert_area_pie_chart_color;
	var titleArr= [], seriesArr=[]

	expert_area_pie_chart_data.forEach ( function(item, index) {
        titleArr.push (									// 下标题，area_name
            {
                text:item[0],
                left: index * 20 + 10 +'%',
                top: '75%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '16',
                    textAlign: 'center',
                },
            }
        );
        seriesArr.push (
            {
                name: item[0],
                type: 'pie',
                clockWise: false,
                radius: [60, 70],
                itemStyle:  {
                    normal: {
                        color: colors[0],
                        shadowColor: colors[0],
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: [index * 20 + 10 +'%', '50%'],
                data: [{
                    value: item[1],
                    label: {
                        normal: {
                            formatter: function(params){
                                return params.value+'%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: colors[0]
                            }
                        }
                    },
                }, {
                    value: 100-item[1],
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: colors[1]
                        },
                        emphasis: {
                            color: colors[1]
                        }
                    }
                }]
            }
        )
	});

    var expert_area_pie_chart_data_option = {
	    backgroundColor: "#fff",
	    title:titleArr,
	    series: seriesArr
	}

 	expert_area_pie_chart.setOption(expert_area_pie_chart_data_option);
    expert_area_pie_chart.on('click', function (params) {
        alert(expert_area_pie_chart_data_option.title[params.seriesIndex].text);
    });
}














