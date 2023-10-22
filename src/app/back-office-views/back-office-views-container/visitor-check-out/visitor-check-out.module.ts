import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorCheckOutComponent } from './visitor-check-out.component';
import { RouterModule, Routes } from '@angular/router';
import { CardLayoutModule } from '../../../shared/card-layout/card-layout.module';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarModule } from '../../../shared/search-bar/search-bar.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: VisitorCheckOutComponent
  }
];

@NgModule({
  declarations: [
    VisitorCheckOutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardLayoutModule,
    FlexModule,
    MatButtonModule,
    SearchBarModule,
    AgGridModule,
    MatDialogModule
  ]
})
export class VisitorCheckOutModule { }
