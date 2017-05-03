    //1------------------------
    var line=function() {
        Highcharts.chart('line', {
                chart: {
                  type: 'pie',
                  options3d: {
                    enabled: true,
                    alpha: 20
                  }
                },
                title:{
                  text: ''
                },
                plotOptions: {
                  pie: {
                    innerSize: 100,
                    depth: 55
                  }
                },
                series: [{
                  name: '数量',
                  data: [
                    ['平堆库18', 18],
                    ['货架库76', 76],
                    ['自动仓1', 1]
                  ]
                }]
              });
    };
    $('#line_').on('mouseenter',function(){
        line();
        
    }).on('mouseout',function(){
    });

    // 2------------
    var area = function(){
            // Build the chart
            Highcharts.chart('area', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            // format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                            style: {
                                color: 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: '数量',
                    data: [
                        { name: '华北17', y: 17 },
                        {
                            name: '华中56',
                            y: 56,
                            sliced: true,
                            selected: true 
                        },
                        {
                          name: '华东14',
                          y: 14
                        },
                        { name: '华南8', y: 8 }
                    ]
                }]
            });
        }
    $('#area_').on('mouseenter',function(){
        area();
    })

    // 3---------------------
    
    var column = function() {
      Highcharts.chart('column', {
        chart: {
            type: 'scatter',
            plotBackgroundColor :'#ccc'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月'],
            tickmarkPlacement: 'on',
            title: {
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1;
                }
            }
        },
        plotOptions: {
            scatter: {
                stacking: 'normal',
                lineColor: '#fff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#fff'
                }
            }
        },
        series: [{
            name: '数量展示',
            data: [55131, 27985, 33072, 31739, 31881, 30236, 27698,25960,26685,28112],
            color:'#fff'
        }]
    }); 
    };
    $('#column_').on('mouseenter',function(){
        column();
    })
   

    // 4-----------------------------
    var bar = function() {
          Highcharts.chart('bar', {
          chart: {
              type: 'pie'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          plotOptions: {
              series: {
                  dataLabels: {
                      enabled: true,
                      // format: '{point.name}: {point.y:.1f}%'
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>'
          },
          series: [{
              name: '数量',
              colorByPoint: true,
              data: [{
                  name: '重型560',
                  y: 560,
                  drilldown: '重型'
              }, {
                  name: '中型2055',
                  y: 2055,
                  drilldown: '中型'
              }, {
                  name: '轻型2270',
                  y: 2270,
                  drilldown: '轻型'
              }, {
                  name: '微型1043',
                  y: 1043,
                  drilldown: '微型'
              }]
          }]
      }); 
    };  
    $('#bar_').on('mouseenter',function(){
        bar();
    });

    // 5----------------------
    
    var pie=function (){
          Highcharts.chart('pie', {
          chart: {
              type: 'pie'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          plotOptions: {
              series: {
                  dataLabels: {
                      enabled: true,
                      format: '{point.name}'
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>'
          },
          series: [{
              name: '数量',
              colorByPoint: true,
              data: [
                { name: '华北1028', y: 1028,drilldown:'华北' },
                {
                      name: '华中2586',
                      y: 2586,
                      drilldown:'华中'
                },
                {
                  name: '华东790',
                  y: 790,
                  drilldown:'华东'
                  
                },
                {
                  name: '华南259',
                  y: 259,
                  drilldown:'华南'
                  
                },
                {
                  name: '东北799',
                  y: 799,
                  drilldown:'东北'
                  
                },
                {
                  name: '西北222',
                  y: 222,
                  drilldown:'西北'
                  
                },
                {
                  name: '西南107',
                  y: 107,
                  drilldown:'西南'
                  
                }]
          }]
      }); 
           
    }
    $('#pie_').on('mouseenter',function(){
            pie(); 
    });

    // 6----------------------------
  var scatter = function() {
     Highcharts.chart('scatter', {
        chart: {
            type: 'scatter',
            plotBackgroundColor :'#ccc'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月'],
            tickmarkPlacement: 'on',
            title: {
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1;
                }
            }
        },
        plotOptions: {
            scatter: {
                stacking: 'normal',
                lineColor: '#fff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#fff'
                }
            }
        },
        series: [{
            name: '数量展示',
            data: [9126, 6071, 7031, 7258, 7610, 7619, 7107,6493,6289,6299],
            color:'#fff',
        }]
    }); 
  }
  $('#scatter_').on('mouseenter',function(){
    scatter();
  });
    Highcharts.theme = {
       colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
       chart: {
          backgroundColor: '#fff',
          style: {
             fontFamily: "serif,'微软雅黑'"
          }
       },
       title: {
          style: {
             color: '#fff',
             fontSize: '20px',
             fontWeight: 'bold'
          }
       }
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);




