import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '../../../../http-services/common/state.service';
import { CountryModel, GenderModel, StateModel } from '../../../../models/common';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { searchByLowerCaseText } from '../../../../constants/constants';
import { PricingModel } from '../../../../models/visitor';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent implements OnInit, OnDestroy, OnChanges {

  private unsubscribeAll = new Subject<boolean>()

  @Input()
  parentForm: FormGroup = this.formBuilder.group({});

  @Input()
  formIndex: number = -1

  @Input()
  allGenders: GenderModel[] = [];

  @Input()
  allCountries: CountryModel[] = [];

  @Input()
  allPricing: PricingModel[] = [];

  @Output()
  removeVisitorOutput = new EventEmitter<number>();

  allStates: StateModel[] = [];
  filteredStates = new ReplaySubject<StateModel[]>(1);
  filteredCountries = new ReplaySubject<CountryModel[]>(1);

  showForm = false;

  lazyForm: FormGroup = null;

  get form(): FormGroup {
    if (!this.lazyForm) {
      const formArray = this.parentForm.controls.visitors as FormArray;
      this.lazyForm = formArray.controls[this.formIndex] as FormGroup;
    }

    return this.lazyForm;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stateService: StateService,
  ) {
  }

  removeVisitor(index: number): void {
    this.removeVisitorOutput.emit(index);
  }

  onFilterCountries(filterValue: string): void {
    const result = filterValue
      ? this.allCountries.filter(it => searchByLowerCaseText(it.countryName, filterValue))
      : [...this.allCountries];
    this.filteredCountries.next(result);
  }

  onFilterStates(filterValue: string): void {
    const result = filterValue
      ? this.allStates.filter(it => searchByLowerCaseText(it.stateName, filterValue))
      : [...this.allStates];
    this.filteredStates.next(result);
  }

  private loadStates(countryId: number): void {
    this.stateService
      .findAll(countryId)
      .then(response => {
        this.allStates = [...response];
        this.filteredStates.next([...this.allStates]);
      })
      .catch(err => console.error(err));
  }

  private initFormValidations(): void {
    this.showForm = true;

    this.form
      .controls
      .countryId
      .valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.loadStates(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allCountries && !changes.allCountries.firstChange) {
      this.filteredCountries.next(this.allCountries);
    }
  }

  ngOnInit(): void {
    this.filteredCountries.next(this.allCountries);
    setTimeout(() => this.initFormValidations());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
