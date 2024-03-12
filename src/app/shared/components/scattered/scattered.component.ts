import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
import HC_zooming from 'highcharts/modules/mouse-wheel-zoom';
HC_zooming(Highcharts);
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);
import HC_ExportingOffline from 'highcharts/modules/offline-exporting';
HC_ExportingOffline(Highcharts);
import Gantt_chart from 'highcharts/modules/gantt';
import { ChatResponseService } from '../../service/chat-response.service';
Gantt_chart(Highcharts)

@Component({
  selector: 'app-scattered',
  templateUrl: './scattered.component.html',
  styleUrl: './scattered.component.scss',
})
export class ScatteredComponent implements OnChanges  {
  @Input() infoDetails:any = {} as any;
  chartOptions: Highcharts.Options = {};
  Highcharts: typeof Highcharts = Highcharts;
  showTable: boolean = false;
  constructor(private chatService: ChatResponseService ) {
  }
  ngOnChanges(): void {
    // this.data1.forEach((el: any, i: any) => {
    //   this.data1[i].x = new Date(el.x).getTime();
    // });
    // this.data2.forEach((el: any, i: any) => {
    //   this.data2[i].x = new Date(el.x).getTime();
    // });
    this.showTable = false;
    const _self: any = this;
    this.chartOptions = {
      chart: {
        type: 'scatter',
      },
      title: {
        text: this.infoDetails.chartTitle,
        align: 'center',
      },
      yAxis: {
        tickPositions: this.infoDetails.indexPlot,
        title: {
          text: this.infoDetails.yAxisTitle,
        },
        labels: {
         
          formatter: function() {
            return _self.infoDetails.plottedLabelFormatter[this.value];
          },
        },
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
      credits: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          let status:any  = this.point;
          let date : any =  this.x;
          let msg =
           
            '<b>'+this.point.name+'</b><br/>'+
            '<b>Date: </b>' +
            new Date(date).toLocaleDateString('en-GB') +
            ' <br/><b>Inspection Type:</b> ' +
            this.point.name +
            ' <br/><b>Status:</b> ' +
            status.status;
          return msg;
        },
      },
      xAxis: {
        type: 'datetime',
      },
      series: this.infoDetails.series
    };
    Highcharts.chart('container', this.chartOptions);

  }
  obj = {
    100: 'Approved',
    200: 'In progress',
  };
  data1: any = [
    {
      x: '12/29/2014',
      y: 100,
      status: 'Approved',
      name: 'India',
    },
    {
      x: '01/05/2015',
      y: 200,
      status: 'In progress',
      name: 'India',
    },
    {
      x: '01/26/2015',
      y: 200,
      status: 'In progress',
      name: 'India',
    },
  ];
  data2: any = [
    {
      x: '12/29/2014', //X-axis_column
      y: 200, // Y-axis_column numeric value
      status: 'In progress', // Y-axis_column
      name: 'Pakisthan', // done
    },
    {
      x: '01/05/2014',
      y: 100,
      status: 'Approved',
      name: 'Pakisthan',
    },
    {
      x: '01/26/2013',
      y: 200,
      status: 'In progress',
      name: 'Pakisthan',
    },
  ];
  }
  

