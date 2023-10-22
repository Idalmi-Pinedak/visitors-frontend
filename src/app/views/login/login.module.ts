import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {AuthContentGuard} from '../../auth/guards/auth-content.guard';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MainLayoutModule} from '../../shared/main-layout/main-layout.module';
import { MatProgressBarModule } from "@angular/material/progress-bar";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthContentGuard]
  }
];

@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MainLayoutModule,
        MatProgressBarModule
    ]
})
export class LoginModule {
}
