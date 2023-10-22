import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SurveyQuestionModel } from '../survey.component';
import { SurveyComponentService } from '../survey-component.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})
export class SurveyQuestionComponent implements OnInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<boolean>();

  @Input()
  question: SurveyQuestionModel;

  @Input()
  parentForm: FormGroup;

  formControl = new FormControl(null, [Validators.required])

  get responses(): FormArray {
    return this.parentForm.controls.responses as FormArray;
  }

  constructor(private readonly surveyComponentService: SurveyComponentService) {
  }

  exists(value: number): boolean {
    return this.question.responses.indexOf(value) > -1
  }

  onCheckValue(event: MatCheckboxChange, value: number): void {
    if (event.checked) {
      if (!this.exists(value)) {
        this.question.responses.push(value);
      }
    } else {
      if (this.exists(value)) {
        const index = this.question.responses.indexOf(value);
        this.question.responses.splice(index, 1);
      }
    }

    this.formControl.setValue(this.question.responses);
  }

  ngOnInit(): void {
    this.surveyComponentService
      .onResetResposes
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        if (value) {
          this.question.responses = [];
          this.formControl.setValue(null);
          this.question.values.forEach(it => it.checked = false);
        }
      });

    setTimeout(() => {
      this.responses.push(this.formControl);
    }, 20)
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
