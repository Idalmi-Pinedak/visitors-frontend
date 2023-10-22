import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  exports: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    FlexLayoutModule
  ]
})
export class MainLayoutModule {
}
