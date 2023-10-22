import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface SurveyQuestionModel {
  id: number;
  fieldDescriptionEs: string;
  fieldDescriptionEn?: string;
  values: SurveyQuestionValueModel[];
  responses?: number[];
}

export interface SurveyQuestionValueModel {
  id: number;
  descriptionEs: string;
  descriptionEn: string;
  checked?: boolean;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  surveyQuestions: SurveyQuestionModel[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

}
