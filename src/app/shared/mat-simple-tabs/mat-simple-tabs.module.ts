import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSimpleTabsComponent } from './mat-simple-tabs.component';
import { MatSimpleTabComponent } from './mat-simple-tab/mat-simple-tab.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatSimpleTabContentDirective } from './mat-simple-tab/mat-simple-tab-content.directive';

@NgModule({
  declarations: [
    MatSimpleTabsComponent,
    MatSimpleTabComponent,
    MatSimpleTabContentDirective
  ],
  exports: [
    MatSimpleTabsComponent,
    MatSimpleTabComponent,
    MatSimpleTabContentDirective
  ],
  imports: [
    CommonModule,
    PortalModule
  ]
})
export class MatSimpleTabsModule {
}
