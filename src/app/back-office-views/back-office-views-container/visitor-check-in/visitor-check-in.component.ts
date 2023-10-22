import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryModel, GenderModel } from '../../../models/common';
import { CountryService } from '../../../http-services/common/country.service';
import { GenderService } from '../../../http-services/common/gender.service';
import { SurveyService } from '../../../http-services/visitor/survey.service';
import { SurveyQuestionModel, SurveyQuestionValueModel } from '../../../shared/survey/survey.component';
import { SurveyTemplateDetailValueModel, VisitorGroupModel, VisitorSurveyModel } from '../../../models/visitor';
import { MatStepper } from '@angular/material/stepper';
import { VisitorService } from '../../../http-services/visitor/visitor.service';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyComponentService } from '../../../shared/survey/survey-component.service';
import { ReportsService } from '../../../http-services/visitor/reports.service';

@Component({
  selector: 'app-visitor-check-in',
  templateUrl: './visitor-check-in.component.html',
  styleUrls: ['./visitor-check-in.component.scss']
})
export class VisitorCheckInComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper')
  stepper: MatStepper;

  totalVisitorsUnder12YearsOld = 0;
  totalVisitors = 0;
  surveyQuestions: SurveyQuestionModel[] = [];
  allGenders: GenderModel[] = [];
  allCountries: CountryModel[] = [];
  loading = false;

  visitorsForm = this.formBuilder.group({
    visitors: this.formBuilder.array([]),
  });
  surveyForm: FormGroup = this.formBuilder.group({
    responses: this.formBuilder.array([])
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly countryService: CountryService,
    private readonly genderService: GenderService,
    private readonly surveyService: SurveyService,
    private readonly visitorService: VisitorService,
    private readonly toolbarService: ToolbarService,
    private readonly matSnackBar: MatSnackBar,
    private readonly surveyComponentService: SurveyComponentService,
    private readonly reportsService: ReportsService
  ) {
  }

  get visitors(): FormArray {
    return this.visitorsForm.controls.visitors as FormArray;
  }

  addVisitor(): void {
    const form = this.formBuilder.group({
      visitorName: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(1)]],
      genderId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      stateId: [null]
    });

    this.visitors.push(form);
  }

  goToAdditionalInfoStep(): void {
    console.log(this.visitorsForm.invalid);
    console.log(this.visitorsForm.getRawValue());

    if (this.visitorsForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  removeVisitor(index: number): void {
    if(index == 0) {
      this.showSnackBar('Debe agregar por lo menos un visitante', 'OK', 'snackbar-error');
      return;
    }
    this.visitors.removeAt(index);
  }

  transformSurveyQuestionValues(value: SurveyTemplateDetailValueModel): SurveyQuestionValueModel {
    return {
      id: value.id,
      descriptionEn: value.descriptionEn,
      descriptionEs: value.descriptionEs
    };
  }

  createVisitors(): void {
    const visitorsFormData = this.visitorsForm.getRawValue();
    const survey: VisitorSurveyModel[] = this.surveyQuestions.map(it => {
      return {
        surveyTemplateDetailId: it.id,
        responses: it.responses
      }
    });

    const visitorGroup: VisitorGroupModel = {
      visitors: [...visitorsFormData.visitors],
      survey: survey
    }

    this.toolbarService.showProgressBar(true);

    this.visitorService
      .create(visitorGroup)
      .then(visitorGroupId => {
        this.downloadReport(visitorGroupId);
        this.showSnackBar('Visitante registrado exitosamente!', 'OK', 'snackbar-success');

        this.visitors.clear();
        this.addVisitor();

        this.stepper.reset();
        this.surveyComponentService.resetResponses();
      })
      .catch(err => {
        console.error(err);
        this.showSnackBar('Error al registrar visitante', 'OK', 'snackbar-error');
      })
      .finally(() => this.toolbarService.showProgressBar(false))
  }

  private downloadReport(visitorGroupId: number): void {
    this.reportsService
      .getVisitorGroupReport(visitorGroupId)
      .then(blob => {
        const visitorGroupIdString = `${visitorGroupId}`.padStart(5, '0');

        let url = window.URL.createObjectURL(blob);

        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = `registro_visitantes_${visitorGroupIdString}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(err => console.error(err));
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  onStepChange(event: any): void {
    if (event.selectedIndex === 2) {
      this.totalVisitorsUnder12YearsOld = 0;

      const visitorsFormData = this.visitorsForm.getRawValue();

      visitorsFormData.visitors.forEach((it: any) => {
        if (it.age < 12) {
          this.totalVisitorsUnder12YearsOld += 1;
        }
      });

      this.totalVisitors = visitorsFormData.visitors.length;
    }
  }

  ngOnInit(): void {
    this.countryService
      .findAll()
      .then(response => {
        this.allCountries = [...response];
      })
      .catch(err => console.error(err));

    this.genderService
      .findAll()
      .then(response => this.allGenders = [...response])
      .catch(err => console.error(err));

    this.addVisitor();
  }

  ngAfterViewInit(): void {
    this.surveyService
      .findSurveyTemplate()
      .then(response => {
        this.surveyQuestions = response.map(it => {
          const values = it.values.map(value => this.transformSurveyQuestionValues(value));

          const question: SurveyQuestionModel = {
            id: it.id,
            fieldDescriptionEn: it.fieldDescriptionEn,
            fieldDescriptionEs: it.fieldDescriptionEs,
            values,
            responses: [],
          }

          return question;
        });
      })
      .catch(err => console.error(err));
  }
}
