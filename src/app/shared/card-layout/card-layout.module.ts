import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardLayoutComponent } from './card-layout.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CardLayoutComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PortalModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CardLayoutComponent,
  ]
})
export class CardLayoutModule {
}
