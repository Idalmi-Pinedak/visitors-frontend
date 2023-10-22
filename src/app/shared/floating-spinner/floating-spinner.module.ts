import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingSpinnerComponent } from './floating-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FloatingSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [FloatingSpinnerComponent]
})
export class FloatingSpinnerModule {
}
