import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorCheckInComponent } from './visitor-check-in.component';
import { RouterModule, Routes } from '@angular/router';
import { CardLayoutModule } from '../../../shared/card-layout/card-layout.module';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarModule } from '../../../shared/search-bar/search-bar.module';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { SurveyModule } from '../../../shared/survey/survey.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectSearchModule } from '../../../shared/mat-select-search/mat-select-search.module';

const routes: Routes = [
  {
    path: '',
    component: VisitorCheckInComponent
  }
];

@NgModule({
  declarations: [
    VisitorCheckInComponent,
    VisitorFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardLayoutModule,
    FlexModule,
    MatButtonModule,
    SearchBarModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    SurveyModule,
    MatSnackBarModule,
    MatSelectSearchModule
  ]
})
export class VisitorCheckInModule { }
