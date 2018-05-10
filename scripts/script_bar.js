var myConfig = {
      type: "hbar",
//      title: {
//        align: "left",
//        text: "Expenditures in Tech",
//        fontColor: "#555",
//        fontSize: 30,
//        fontFamily: "Roboto",
//        fontWeight: 'normal',
//        offsetX: 10
//      },
//      subtitle: {
//        offsetY: 15,
//        text: "R&D costs from 2013-2015",
//        fontFamily: "Roboto",
//        fontSize: 16,
//        align: 'left',
//        fontColor: "#777",
//        offsetX: 10
//      },
      tooltip: {
        padding: 10,
        fontSize: 14,
        text: "%v % <br>in %t",
        backgroundColor: "#fff",
        fontColor: "#444",
        borderRadius: "5px",
        borderColor: "#333",
        borderWidth: 1
      },

      legend: {
        offsetY: 80,
        offsetX: 0,
        padding: 10,
        backgroundColor: "transparent",
        borderWidth: "0px",
        highlightPlot: true,
        item: {
          fontSize: 18,
          fontColor: "#666",
          fontFamily: "Roboto",

        },
        marker: {
          borderRadius: 10,
          borderWidth: "0px",
        },
        cursor: "hand"
      },
      plotarea: {
        margin: "100 130 70 100"
      },
      plot: {
        borderRadius: "0 5 5 0",
        hightlightMarker: {
          backgroundColor: "red"
        },
        highlightState: {
          backgroundColor: "red"
        },
        animation: {
          effect: 4,
          method: 0,
          sequence: 1
        }
      },
//      source: {
//        text: "Source: sec.gov",
//        fontColor: "#666",
//        fontFamily: 'Roboto'
//      },
      scaleX: {
        labels: ["Uganda", "United Republic of Tanzania", "Sudan", "Senegal", "Nigeria", "Mauritania", "Mali", "Kenya", "Guinea-Bissau", "Guinea", "Ghana", "Gambia", "Ethiopia", 'Eritrea', 'Egypt', "Cote d'Ivoire", 'Chad', 'Central African Republic', 'Burkina Faso', 'Benin'],
        item: {
          fontFamily: "Roboto",
          fontSize: 14
        },
        lineColor: "#DDD",
        tick: {
          visible: false
        }
      },
      scaleY: {
        label: {
          offsetY: 5,
          text: "FGM/C prevalence among girls aged 0 to 14 years, by residence(%)",
          fontColor: "#777",
          fontSize: 14,
          fontFamily: "Roboto",
        },
        item: {
          // fontColor: "#fff",
          fontFamily: "Roboto",
          fontSize: 14
        },
        lineWidth: 0,
        tick: {
          visible: false
        },
        guide: {
          lineStyle: "solid",
          lineColor: "#DDD"
        },
//        values: "0:14:1.5"
      },
      series: [{
          text: "urban",
          // values: [4820, 8067, 12000, 12100, 12282, 12540],
          values: [1, 0.1, 28, 8, 21, 35, 80, 2, 21, 40, 0.3, 51, 7, 25, 10, 8, 9, 1, 7, 0],
          backgroundColor: "#d6d6d6",
//          rules: [{
//            rule: '%i==0',
//            backgroundColor: '#f98377'
//          }, {
//            rule: '%i==1',
//            backgroundColor: '#fbd972'
//          }, {
//            rule: '%i==2',
//            backgroundColor: '#78e5d2'
//          }, {
//            rule: '%i==3',
//            backgroundColor: '#7ad8e5'
//          }, {
//            rule: '%i==4',
//            backgroundColor: '#d2f27c'
//          }, {
//            rule: '%i==5',
//            backgroundColor: '#e572ec'
//          }, ]
        },

        {
          text: "rural",
          // values: [2670, 6041, 11400, 11500,9832, 9275],
          values: [1, 0.4, 33, 18, 29, 68, 76, 3, 35, 48, 1, 60, 17, 37, 16, 13, 10, 2, 15, 0],
          backgroundColor: "#8e8e8e",
//          rules: [{
//            rule: '%i==0',
//            backgroundColor: '#F55443'
//          }, {
//            rule: '%i==1',
//            backgroundColor: '#FFCC33'
//          }, {
//            rule: '%i==2',
//            backgroundColor: '#44b6a2'
//          }, {
//            rule: '%i==3',
//            backgroundColor: '#10A5BA'
//          }, {
//            rule: '%i==4',
//            backgroundColor: '#96BD2C'
//          }, {
//            rule: '%i==5',
//            backgroundColor: '#b42cbd'
//          }, ]
        }, 

      ]
    };

    zingchart.render({
      id: 'myChart',
      data: myConfig,
      height: 1000,
      width: 725
    });