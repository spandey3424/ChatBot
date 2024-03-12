import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})
export class InfoPanelComponent implements OnInit, OnChanges {
  _infoDetails: any;
  chartDetails: any = {} as any;
  stacked: boolean = false;
  loader: boolean = false;
  @Input() set infoDetails(details: any) {
    this._infoDetails = details;
  }
  @Input() loading: boolean = false;
  @Input() type: string = '';
  @Input() distinctLegendValues: String[] = [];
  @Input() distinctXaxisDataValues: String[] = [];
  constructor() {}

  ngOnInit() {
    console.log(this._infoDetails);
  }
  ngOnChanges() {
    console.log(this._infoDetails);
    if (this.type === 'chart' && Object.keys(this._infoDetails).length !== 0) {
      let series = [];
      let scatteredSeriesData = [] as any;
      let indexPlot = [0];
      if (this._infoDetails.chartType === 'Scatter Plot') {
        const distinctStatuses = _.uniq(
          _.map(this._infoDetails.tableDetails, this._infoDetails.yAxisColumn)
        );

        // Create the final array
        let scatteredObjIndexPoint: any = {};
        _.reduce(
          distinctStatuses,
          (acc: any, status: any, index) => {
            indexPlot.push(indexPlot[index] + 2);
            scatteredObjIndexPoint[status] = indexPlot[index] + 2;
          },
          {}
        );
        let plottedLabelFormatter: any = {};
        _.reduce(
          distinctStatuses,
          (acc: any, status: any, index) => {
            plottedLabelFormatter[indexPlot[index] + 2] = status;
          },
          {}
        );
        series = this.scateredChartDetails(scatteredObjIndexPoint);

        series.map((res: any) => {
          res.data.map((dt: any) => {
            dt.x = new Date(dt[this._infoDetails.xAxisData]).getTime();
            dt.y = scatteredObjIndexPoint[dt[this._infoDetails.yAxisColumn]];
            dt.status = dt[this._infoDetails.yAxisColumn];
          });
        });
        this._infoDetails.indexPlot = indexPlot;
        this._infoDetails.plottedLabelFormatter = plottedLabelFormatter;
        console.log(scatteredObjIndexPoint);
      }
      if (this._infoDetails.chartType !== 'Scatter Plot') {
        series = this.createSeriesChartDetails();
      }
      this._infoDetails.categories = this.distinctXaxisDataValues;
      this._infoDetails.series = series;
    }
  }

  scateredChartDetails(scatteredObjIndexPoint: any) {
    return this.groupByAndMap(
      this._infoDetails.tableDetails,
      this._infoDetails.legend,
      scatteredObjIndexPoint
    );
  }
  groupByAndMap(data: any[], key: string, scatteredObjIndexPoint: any): any[] {
    return _.map(_.groupBy(data, key), (details: any, name) => ({
      name: name,
      type: 'scatter',
      data: details.map((d: any) => ({ ...d, name: name })),
    }));
  }

  createSeriesChartDetails() {
    let series: any = [];
    if (this.distinctLegendValues.length > 0) {
      this.distinctLegendValues.map((legend, index) => {
        series.push({ name: legend, type: 'column', data: [] });
        this.distinctXaxisDataValues.map((xAxis) => {
          let found = this._infoDetails.tableDetails.filter((tb: any) => {
            return (
              tb[this._infoDetails.xAxisData] === xAxis &&
              tb[this._infoDetails.legend] === legend
            );
          });
          let count = found.length > 0 ? found.length : null;
          series[index].data.push(count);
        });
      });
      return series;
    } else {
      series.push({
        name: this._infoDetails.yAxisTitle,
        type: 'column',
        data: [],
      });
      this.distinctXaxisDataValues.map((xAxis) => {
        let found = this._infoDetails.tableDetails.filter((tb: any) => {
          return tb[this._infoDetails.xAxisData] === xAxis;
        });
        let count = found.length > 0 ? found.length : null;
        series[0].data.push(count);
      });
      return series;
    }
  }
}
