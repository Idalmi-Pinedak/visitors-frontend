import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CardLayoutModule} from '../../../shared/card-layout/card-layout.module';
import {AgGridModule} from 'ag-grid-angular';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AgGridComponentsModule} from '../../../shared/ag-grid-components/ag-grid-components.module';
import {ConfirmationDialogModule} from '../../../shared/confirmation-dialog/confirmation-dialog.module';
import {MatDialogModule} from '@angular/material/dialog';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SearchBarModule } from '../../../shared/search-bar/search-bar.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent, UserDialogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatNativeDateModule,
        MatButtonModule,
        FlexLayoutModule,
        CardLayoutModule,
        AgGridModule,
        AgGridComponentsModule,
        MatDialogModule,
        ConfirmationDialogModule,
        MatSlideToggleModule,
        MatSelectModule,
        SearchBarModule,
    ]
})
export class UsersModule {
}
