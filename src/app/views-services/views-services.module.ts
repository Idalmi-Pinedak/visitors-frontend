import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarViewService } from './mat-snack-bar.view.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    MatSnackBarViewService
  ]
})
export class ViewsServicesModule {
}
