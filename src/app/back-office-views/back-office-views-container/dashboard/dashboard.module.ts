import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCardModule } from '../../../shared/dashboard-card/dashboard-card.module';
import { FloatingSpinnerModule } from '../../../shared/floating-spinner/floating-spinner.module';
import { VisitorsByYearChartComponent } from './visitors-by-year-chart/visitors-by-year-chart.component';
import { FlexModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VisitorsByStateChartComponent } from './visitors-by-state-chart/visitors-by-state-chart.component';
import { SurveyResponseChartComponent } from './survey-response-chart/survey-response-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { VisitorsByCountryChartComponent } from './visitors-by-country-chart/visitors-by-country-chart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    VisitorsByYearChartComponent,
    VisitorsByStateChartComponent,
    SurveyResponseChartComponent,
    VisitorsByCountryChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardCardModule,
    FloatingSpinnerModule,
    FlexModule,
    NgApexchartsModule,
    MatTabsModule,
    AgGridModule,
  ]
})
export class DashboardModule {
}
