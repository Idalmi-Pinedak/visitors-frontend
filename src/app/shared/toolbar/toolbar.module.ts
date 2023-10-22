import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToolbarService } from './toolbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [ToolbarService]
})
export class ToolbarModule {
}
