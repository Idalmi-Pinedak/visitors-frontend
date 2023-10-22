import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridIconButtonComponent } from './ag-grid-icon-button/ag-grid-icon-button.component';
import {MatIconModule} from '@angular/material/icon';
import { AgGridIconCheckComponent } from './ag-grid-icon-check/ag-grid-icon-check.component';

@NgModule({
  declarations: [AgGridIconButtonComponent, AgGridIconCheckComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [AgGridIconButtonComponent, AgGridIconCheckComponent]
})
export class AgGridComponentsModule { }
