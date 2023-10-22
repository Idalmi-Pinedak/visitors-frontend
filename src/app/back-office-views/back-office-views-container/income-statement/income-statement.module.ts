import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeStatementComponent } from './income-statement.component';
import { CardLayoutModule } from '../../../shared/card-layout/card-layout.module';
import { ReportFiltersModule } from '../../../shared/report-filters/report-filters.module';
import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: '',
    component: IncomeStatementComponent
  }
];

@NgModule({
  declarations: [
    IncomeStatementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardLayoutModule,
    ReportFiltersModule,
    FlexModule,
    MatToolbarModule,
    AgGridModule
  ]
})
export class IncomeStatementModule { }
