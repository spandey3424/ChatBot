import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
import HC_zooming from 'highcharts/modules/mouse-wheel-zoom';
HC_zooming(Highcharts);
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);
import HC_ExportingOffline from 'highcharts/modules/offline-exporting';
HC_ExportingOffline(Highcharts);
import * as _ from 'lodash';
import { ChatResponseService } from '../../service/chat-response.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoTableComponent } from '../../info-table/info-table.component';

@Component({
  selector: 'app-highchart-demo',
  templateUrl: './highchart-demo.component.html',
  styleUrl: './highchart-demo.component.scss',
})
export class HighchartDemoComponent implements OnChanges,OnInit {
   Highcharts: typeof Highcharts = Highcharts;
   chartRef: any;
   chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
    
  };
  @Input() infoDetails:any = {} as any;

  //   chartOptions: Highcharts.Options = {

  //     // chart: {
  //     //     renderTo:'container',
  //     //     marginLeft: 100,
  //     //     //  plotAreaWidth: 50,
  //     //     //   plotAreaHeight: 450,
  //     // },

  //     // title: {
  //     //     text: 'Bar series - data sorting'
  //     // },

  //     // yAxis: {
  //     //     title: {
  //     //         text: ''
  //     //     }
  //     // },

  //     // xAxis: {
  //     //     type: 'category',
  //     //     min: 0,
  //     //     labels: {
  //     //         // animate: false
  //     //     }
  //     // },

  //     // legend: {
  //     //     enabled: false
  //     // },

  //     series: [{
  //         type: 'bar',
  //         zoneAxis: 'x',
  //         zones: [{
  //             value: 2,
  //             color: 'red'
  //         }],
  //         dataLabels: {
  //             enabled: true,
  //             format: '{y:,.2f}'
  //         },
  //         dataSorting: {
  //             enabled: true,
  //             sortKey: 'y'
  //         },
  //         data: [["hello",1],["hello",1],["hello",1],["hello",1],]
  //     }]

  // }

  //   chartOptions:Highcharts.Options = {
  //     chart: {
  //       type: 'column',
  // zooming: {
  //   mouseWheel: true,
  //   type:'xy',
  // },

  //   },
  //   // mapNavigation: {
  //   //   enableMouseWheelZoom: true,
  //   //   enableDoubleClickZoom: true,
  //   // },

  //   title: {
  //       text: 'Olympic Games all-time medal table, grouped by continent',
  //       align: 'left'
  //   },

  //   xAxis: {
  //       categories: ['Gold', 'Silver', 'Bronze']
  //   },

  //   yAxis: {
  //       allowDecimals: false,
  //       min: 0,
  //       title: {
  //           text: 'Count medals'
  //       }
  //   },

  //   tooltip: {
  //       format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
  //           'Total: {point.stackTotal}'
  //   },

  //   plotOptions: {
  //       column: {
  //           stacking: 'normal'
  //       }
  //   },

  //    credits: {
  //       enabled: false,
  //     },

  //     exporting: {
  //       buttons: {
  //         contextButton: {
  //           menuItems: ['viewFullscreen', 'printChart','downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
  //         },
  //       },
  //     },

  //   series: [{
  //       name: 'Norway',
  //       data: [148, 133, 124],
  //       stack: 'Europe',
  //       type: 'column'
  //   }, {
  //       name: 'Germany',
  //       data: [102, 98, 65],
  //       stack: 'Europe',
  //       type: 'column'
  //   }, {
  //       name: 'United States',
  //       data: [113, 122, 95],
  //       stack: 'North America',
  //       type: 'column'
  //   },
  // ]
  //   }

  chartOptions: Highcharts.Options = {};
  updateFlag: any ;
  showFlag: any ;
  showTable: boolean = false;
  ref: DynamicDialogRef | undefined;
  constructor(private chatService: ChatResponseService , private dialogService: DialogService){}
  ngOnInit(){
   
  }
  ngOnChanges() {
    this.chartCallback;
    this.showFlag = false;
    this.showTable = false;
    
    this.chartOptions  = {
      chart: {
        type: 'column',
        // events: {
        //   render() {
        //     justifyColumns(this);
        //   }
        // },
        zooming: {
          // mouseWheel: false,
          type: 'xy',
        },
      },
      title: {
        text: _.cloneDeep(this.infoDetails.chartTitle),
        align: 'center',
      },
      xAxis: {
        categories: [],
        title: {
          text: _.cloneDeep(this.infoDetails.xAxisTitle),
        },
        gridLineWidth: 1,
      },
      yAxis: {
        min: 0,
        title: {
          text: _.cloneDeep(this.infoDetails.yAxisTitle),
        },
        labels: {
          overflow: 'justify',
        },
        gridLineWidth: 1,
        tickInterval: 4,
      },
      exporting: {
        menuItemDefinitions: {
          label: {
            onclick:  () => {
              this.chatService.downloadFile(this.infoDetails.chartTitle,'xls');
            },
            text: 'Download XLS',
          },
          label1: {
            onclick:  () => {
              this.chatService.downloadFile(this.infoDetails.chartTitle,'csv');
            },
            text: 'Download CSV',
          },
          label2: {
            onclick: () => {
              this.showTable = true
            },
            text: 'Show Table',
          }
        },
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'printChart',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'label',
              'label1',
              'label2'
            ],
          },
        },
      },
      // tooltip: {
      //   format: '<b>{series.data}</b>',
      // },
      plotOptions: {
       
        series: {
          // color:'#00243a',
          connectNulls: false,
          dataLabels: {
              enabled: true,
              // color: '#000',
              // style: {fontWeight: 'bolder'},
              // formatter: function() {return this.x + ': ' + this.y},
              inside: true,
              // rotation: 270
          }
      },
        // bar: {  
         
        //   borderRadius: '50%',
        //   centerInCategory: true,
          
        //   groupPadding: 0.1,
        // },
        column: {
         centerInCategory:true,
         maxPointWidth:200,
         dataLabels:{
          enabled:true
         }
            // borderRadius: '50%',
        //   centerInCategory: true,
          // maxPointWidth:100,
          // groupPadding: 0.1,
        },
      },
      legend: {
        enabled: true
      },
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   verticalAlign: 'top',
      //   x: -40,
      //   y: 80,
      //   floating: true,
      //   borderWidth: 1,
      //   shadow: true,
      // },
      credits: {
        enabled: false,
      },
      // series: [],
      // series: [
      //   {
      //     name: 'Count of Asset',
      //     data: [16,null],
      //     type: 'column',
      //   },
        
      //   {
      //     name: 'Immediate',
      //     data: [null,25],
      //     type: 'column',
      //   },
      // ],
    };
   setTimeout(() => {
    this.chartOptions.series = this.infoDetails.series;
    this.showFlag = true;
   }, 0);
   
    let x: any = this.chartOptions.xAxis;
    x.categories = this.infoDetails.categories;
    
    console.log('chart',this.chartOptions)
    //var chart = Highcharts.chart("container", this.chartOptions );
  
  //   let as: any = this.chartOptions?.series as any;
  // as.push(JSON.parse(JSON.stringify(this.infoDetails.series)));
}
show() {
  this.ref = this.dialogService.open(InfoTableComponent, {
      data : {
        tableDetails: this.infoDetails,
      },
      header: this.infoDetails.chartTitle,
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
  });
}

}
function justifyColumns(chart: any) {
  let categoriesWidth =
      chart.plotSizeX / (1 + chart.xAxis[0].max - chart.xAxis[0].min),
    distanceBetweenColumns = 0,
    each = Highcharts.each,
    sum: any,
    categories = chart.xAxis[0].categories,
    number: any;

  for (var i = 0; i < categories.length; i++) {
    sum = 0;
    each(chart.series, function(p: any, k: any) {
      if (p.visible) {
        each(p.data, function(ob: any, j: any) {
          if (ob.category == categories[i] && ob.y !== null) {
            sum++;
          }
        });
      }
    });

    distanceBetweenColumns = categoriesWidth / (sum + 1);
    number = 1;

    each(chart.series, function(p: any, k: any) {
      if (p.visible) {
        each(p.data, function(ob: any, j: any) {
          if (ob.category == categories[i] && ob.y !== null) {
            if (sum !== chart.series.length) {
              ob.graphic.element.point.x =
                i * categoriesWidth +
                distanceBetweenColumns * number -
                ob.pointWidth / 2;
            }

            number++;
          }
        });
      }
    });
  }
  
}
