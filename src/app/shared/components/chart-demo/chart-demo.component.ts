import { AfterViewInit, Component } from '@angular/core';
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
Gantt_chart(Highcharts)

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss'
})
export class ChartDemoComponent implements AfterViewInit {

  Highcharts: typeof Highcharts = Highcharts;

  // chartOptions: Highcharts.Options = {};

  // chartOptions: any = {
  //   chart: {
  //     type: 'gantt',
  //     plotBackgroundColor: '#F9F9F9',
  //   },
  //   title: {
  //     text: 'Gantt Chart Example',
  //   },
  //   xAxis: {
  //     currentDateIndicator: true,
  //   },
  //   yAxis: {
  //     grid: true,
  //     categories: ['Task 1', 'Task 2', 'Task 3'],
  //   },
  //   series: [
  //     {
  //       name: 'Project 1',
  //       data: [
  //         {
  //           name: 'Task 1',
  //           start: Date.UTC(2023, 0, 1),
  //           end: Date.UTC(2023, 0, 5),
  //         },
  //         {
  //           name: 'Task 2',
  //           start: Date.UTC(2023, 0, 6),
  //           end: Date.UTC(2023, 0, 10),
  //         },
  //         {
  //           name: 'Task 3',
  //           start: Date.UTC(2023, 0, 11),
  //           end: Date.UTC(2023, 0, 15),
  //         },
  //       ],
  //     },
  //   ],
  // };

  constructor() {
    
  }

  ngAfterViewInit() {
    Highcharts.ganttChart('container', this.chartOptions)
  }

  chartOptions: any = {
    title: {
      text: 'Simple Gantt Chart'
  },

  xAxis: [{
      dateTimeLabelFormats: {
        week: {
            list: ['%e %B']
        }
    }
  }],

  series: [{
      name: 'Project 1',
      data: [{
          name: 'Start prototype',
          start: Date.UTC(2014, 10, 18),
          end: Date.UTC(2014, 10, 25)
      }, {
          name: 'Develop',
          start: Date.UTC(2014, 10, 20),
          end: Date.UTC(2014, 10, 25)
      }, {
          name: 'Run acceptance tests',
          start: Date.UTC(2014, 10, 23),
          end: Date.UTC(2014, 10, 26)
      }, {
          name: 'Test prototype',
          start: Date.UTC(2014, 10, 27),
          end: Date.UTC(2014, 10, 29)
      }]
  }]
  }
  
}
