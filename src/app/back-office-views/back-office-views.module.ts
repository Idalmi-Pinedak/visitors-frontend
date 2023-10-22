import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const lazyRoutes: Routes = [
  {
    path: 'back-office',
    loadChildren: () => import('./back-office-views-container/back-office-views-container.module')
      .then(m => m.BackOfficeViewsContainerModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(lazyRoutes)
  ]
})
export class BackOfficeViewsModule {
}
