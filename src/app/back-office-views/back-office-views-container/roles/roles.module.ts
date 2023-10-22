import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardLayoutModule } from '../../../shared/card-layout/card-layout.module';
import { AgGridModule } from 'ag-grid-angular';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSimpleTabsModule } from '../../../shared/mat-simple-tabs/mat-simple-tabs.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchBarModule } from '../../../shared/search-bar/search-bar.module';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent
  }
];

@NgModule({
  declarations: [
    RoleListComponent,
    RoleDialogComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardLayoutModule,
        AgGridModule,
        MatDialogModule,
        ReactiveFormsModule,
        FlexModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatInputModule,
        MatSimpleTabsModule,
        MatCheckboxModule,
        FormsModule,
        MatProgressBarModule,
        MatSnackBarModule,
        SearchBarModule
    ]
})
export class RolesModule {
}
