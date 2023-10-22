import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectSearchComponent} from './mat-select-search.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MatSelectSearchComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSelectSearchComponent
  ]
})
export class MatSelectSearchModule {
}
