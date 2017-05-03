    //1------------------------
    var line=function() {
        $('#line').highcharts({
            title: {
                text: '用户专注度分析',
                x: 0 //center
            },
            subtitle: {
                text: '',
                x: 0
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月',
                             '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '东京',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: '纽约',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: '柏林',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: '伦敦',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    };
    $('#line_').on('mouseenter',function(){
        line();
    });
    // 2------------
        var area = function(){
        $('#area').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: '运营数据时效性监测'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '美国',
                data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                       1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                       27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                       26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                       24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                       22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                       10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
            }, {
                name: '苏联/俄罗斯',
                data: [null, null, null, null, null, null, null, null, null, null,
                       5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                       4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                       15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                       33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                       35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                       21000, 20000, 19000, 18000, 18000, 17000, 16000]
            }]
        });
    }
    $('#area_').on('mouseenter',function(){
        area();
    })

    // 3---------------------
    
        var column = function() {
        $('#column').highcharts({
            chart: {
                polar: true,
                type: 'line'
            },
            title: {
                text: '云数据统计分析',
                x: 0
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: ['销售额', '营销', '发展', '客户 支持',
                             '咨询处 技术', '管理'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },
            series: [{
                name: '分配预算',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
                pointPlacement: 'on'
            }, {
                name: '实际支出',
                data: [50000, 39000, 42000, 31000, 26000, 14000],
                pointPlacement: 'on'
            }]
        });
        
    };
    $('#column_').on('mouseenter',function(){
        column();
    });

    // 4-----------------------------
        var bar = function() {
        $('#bar').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: '伙伴行为轨迹'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['非洲', '美国', '亚洲', '欧洲', '大洋洲'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '年 1800',
                data: [107, 31, 635, 203, 2]
            }, {
                name: '年 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: '年 2008',
                data: [973, 914, 4054, 732, 34]
            }]
        });
    };
    $('#bar_').on('mouseenter',function(){
        bar();
    });

    // 5----------------------
    
        var pie=function (){
        $('#pie').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true
            },
            title: {
                text: '卡班运输全程各阶段统计'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#fff'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['火狐',   45.0],
                    ['IE',       26.8],
                    {
                        name: '谷歌',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['苹果',    8.5],
                    ['欧朋',     6.2],
                    ['其它',   0.7]
                ]
            }]
        });
    }
    $('#pie_').on('mouseenter',function(){
            pie(); 
    });

    // 6----------------------------
      var scatter = function() {
      $('#scatter').highcharts({
          chart: {
              type: 'scatter',
              zoomType: 'xy'
          },
          title: {
              text: '客户服务跟踪'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              title: {
                  enabled: true,
                  text: ''
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              title: {
                  text: ''
              }
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 100,
              y: 70,
              floating: true,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#4CADD8',
              borderWidth: 1
          },
          plotOptions: {
              scatter: {
                  marker: {
                      radius: 5,
                      states: {
                          hover: {
                              enabled: true,
                              lineColor: 'rgb(100,100,100)'
                          }
                      }
                  },
                  states: {
                      hover: {
                          marker: {
                              enabled: false
                          }
                      }
                  },
                  tooltip: {
                      headerFormat: '<b>{series.name}</b><br>',
                      pointFormat: '{point.x} cm, {point.y} kg'
                  }
              }
          },
          series: [{
              name: '女性',
              color: 'rgba(223, 83, 83, .5)',
              data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                     [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                    
                     [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                     [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                     [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                     [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                     [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                     [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                     [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                     [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                 
                     [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                     [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]
          }, {
              name: '男性',
              color: 'rgba(119, 152, 191, 1)',
              data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                  
                     [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
                     [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
                     [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
                     [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
                     [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
                     [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
                     [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                     [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                     [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                     [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                     [180.3, 83.2], [180.3, 83.2]]
          }]
      });
  }
  $('#scatter_').on('mouseenter',function(){
    scatter();
  });





