import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeViewsContainerComponent } from './back-office-views-container.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContentGuard } from '../../auth/guards/private-content.guard';
import { MainLayoutModule } from '../../shared/main-layout/main-layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarModule } from '../../shared/toolbar/toolbar.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeViewsContainerComponent,
    canActivate: [PrivateContentGuard],
    children: [
      {
        path: 'account/profile',
        loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'visitor-check-in',
        loadChildren: () => import('./visitor-check-in/visitor-check-in.module').then(m => m.VisitorCheckInModule)
      },
      {
        path: 'visitor-check-out',
        loadChildren: () => import('./visitor-check-out/visitor-check-out.module').then(m => m.VisitorCheckOutModule)
      },
      {
        path: 'visitor-history',
        loadChildren: () => import('./visitor-history/visitor-history.module').then(m => m.VisitorHistoryModule)
      },
      {
        path: 'income-statement',
        loadChildren: () => import('./income-statement/income-statement.module').then(m => m.IncomeStatementModule)
      },
      {
        path: 'revenue',
        loadChildren: () => import('./revenue-dashboard/revenue-dashboard.module').then(m => m.RevenueDashboardModule)
      }
    ]
  }
];

@NgModule({
  declarations: [BackOfficeViewsContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ToolbarModule,
    FlexLayoutModule
  ]
})
export class BackOfficeViewsContainerModule {
}
