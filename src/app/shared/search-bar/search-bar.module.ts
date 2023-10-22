import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    FlexModule,
    MatButtonModule
  ]
})
export class SearchBarModule { }
