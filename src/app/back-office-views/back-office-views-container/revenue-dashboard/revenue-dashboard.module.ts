import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueDashboardComponent } from './revenue-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCardModule } from '../../../shared/dashboard-card/dashboard-card.module';
import { FloatingSpinnerModule } from '../../../shared/floating-spinner/floating-spinner.module';
import { RevenueByYearChartComponent } from './revenue-by-year-chart/revenue-by-year-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
    path: '',
    component: RevenueDashboardComponent
  }
];

@NgModule({
  declarations: [
    RevenueDashboardComponent,
    RevenueByYearChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardCardModule,
    FloatingSpinnerModule,
    NgApexchartsModule
  ]
})
export class RevenueDashboardModule {
}
