import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [DashboardCardComponent]
})
export class DashboardCardModule { }
