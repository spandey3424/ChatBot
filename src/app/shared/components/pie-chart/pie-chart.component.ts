import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
import HC_zooming from 'highcharts/modules/mouse-wheel-zoom';
HC_zooming(Highcharts);
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);
import HC_ExportingOffline from 'highcharts/modules/offline-exporting';
HC_ExportingOffline(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartRef: any;
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  constructor() {}

  ngOnInit() {
    const series = [
      {
        name: 'Count',
        colorByPoint: true,
        data: [{
            name: 'On Time',
            y: 74.77,
            sliced: true,
            selected: true
        },  {
            name: 'Delayed',
            y: 12.82
        }]
      },
      
    ] as Highcharts.SeriesColumnOptions[];

    this.chartOptions = {
      chart: {
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        height: (9 / 16 * 100) + '%' // 16:9 ratio
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'Inspections',
        align: 'center',
      },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series,
    };
  }
}
