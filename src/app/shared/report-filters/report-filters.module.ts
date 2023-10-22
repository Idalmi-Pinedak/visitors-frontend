import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFiltersComponent } from './report-filters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ReportFiltersComponent
  ],
  exports: [
    ReportFiltersComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FlexModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReportFiltersModule { }
