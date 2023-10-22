import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthContentGuard} from '../../auth/guards/auth-content.guard';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MainLayoutModule} from '../../shared/main-layout/main-layout.module';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [AuthContentGuard]
  }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MainLayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class RegisterModule {
}
