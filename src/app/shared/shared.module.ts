import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDemoComponent } from './components/chart-demo/chart-demo.component';
import { HighchartDemoComponent } from './components/highchart-demo/highchart-demo.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { InfoTableComponent } from './info-table/info-table.component';
import { EchartsxModule } from 'echarts-for-angular';
import { LoaderComponent } from './components/loader/loader.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ScatteredComponent } from './components/scattered/scattered.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  imports: [
    CommonModule,
    PlotlyModule,
    FormsModule,
    EchartsxModule,
    HighchartsChartModule,
    DynamicDialogModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    NgxEchartsModule.forChild(),
  ],
  declarations: [
    ChartDemoComponent,
    HighchartDemoComponent,
    LoaderComponent,
    InfoTableComponent,
    PieChartComponent,
    ScatteredComponent,
  ],
  exports: [
    ChartDemoComponent,
    HighchartDemoComponent,
    LoaderComponent,
    InfoTableComponent,
    PieChartComponent,
    ScatteredComponent,
  ],
  providers: [DialogService],
})
export class SharedModule {}
