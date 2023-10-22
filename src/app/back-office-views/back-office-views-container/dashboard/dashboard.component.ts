import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../http-services/visitor/dashboard.service';
import { SurveyQuestionModel, SurveyQuestionValueModel } from '../../../shared/survey/survey.component';
import { SurveyService } from '../../../http-services/visitor/survey.service';
import { SurveyTemplateDetailValueModel } from '../../../models/visitor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  surveyQuestions: SurveyQuestionModel[] = [];

  loadingVisitorsRegisteredToday = true;
  loadingVisitorsRegisteredInTheMonth = true;
  loadingVisitorsRegisteredInTheLastMonth = true;

  quantityVisitorsRegisteredToday = 0;
  quantityVisitorsRegisteredInTheMonth = 0;
  quantityVisitorsRegisteredInTheLastMonth = 0;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly surveyService: SurveyService
  ) {
  }

  transformSurveyQuestionValues(value: SurveyTemplateDetailValueModel): SurveyQuestionValueModel {
    return {
      id: value.id,
      descriptionEn: value.descriptionEn,
      descriptionEs: value.descriptionEs
    };
  }

  ngOnInit(): void {
    this.dashboardService
      .visitorsToday()
      .then(quantity => this.quantityVisitorsRegisteredToday = quantity)
      .catch(err => console.error(err))
      .finally(() => this.loadingVisitorsRegisteredToday = false);

    this.dashboardService
      .visitorsInTheMonth()
      .then(quantity => this.quantityVisitorsRegisteredInTheMonth = quantity)
      .catch(err => console.error(err))
      .finally(() => this.loadingVisitorsRegisteredInTheMonth = false);

    this.dashboardService
      .visitorsInTheLastMonth()
      .then(quantity => this.quantityVisitorsRegisteredInTheLastMonth = quantity)
      .catch(err => console.error(err))
      .finally(() => this.loadingVisitorsRegisteredInTheLastMonth = false);

    this.surveyService
      .findSurveyTemplate()
      .then(response => {
        this.surveyQuestions = response.map(it => {
          const values = it.values.map(value => this.transformSurveyQuestionValues(value));

          const question: SurveyQuestionModel = {
            id: it.id,
            fieldDescriptionEs: it.fieldDescriptionEs,
            values,
          }

          return question;
        });
      })
      .catch(err => console.error(err));
  }

}
