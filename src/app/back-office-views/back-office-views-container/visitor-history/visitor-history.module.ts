import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorHistoryComponent } from './visitor-history.component';
import { RouterModule, Routes } from '@angular/router';
import { CardLayoutModule } from '../../../shared/card-layout/card-layout.module';
import { ReportFiltersModule } from '../../../shared/report-filters/report-filters.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerDialogModule } from '../../../shared/pdf-viewer-dialog/pdf-viewer-dialog.module';

const routes: Routes = [
  {
    path: '',
    component: VisitorHistoryComponent
  }
];

@NgModule({
  declarations: [
    VisitorHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardLayoutModule,
    ReportFiltersModule,
    MatToolbarModule,
    FlexModule,
    AgGridModule,
    MatDialogModule,
    PdfViewerDialogModule
  ]
})
export class VisitorHistoryModule { }
