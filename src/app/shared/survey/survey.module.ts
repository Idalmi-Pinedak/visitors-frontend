import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SurveyComponentService } from './survey-component.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyQuestionComponent
  ],
  exports: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    SurveyComponentService
  ]
})
export class SurveyModule { }
