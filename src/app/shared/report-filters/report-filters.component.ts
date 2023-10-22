import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportFiltersModel } from '../../models/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit {

  private readonly datePipe = new DatePipe('en-US');

  loading = false;
  expanded = true;

  filterForm = new FormGroup(
    {
      startDate: new FormControl(new Date(), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required]),
    },
  );

  @Output()
  public searchOutput = new EventEmitter<ReportFiltersModel>();

  constructor() {
  }

  onSearch(): void {
    const formStartDate = this.datePipe.transform(this.filterForm.controls.startDate.value, 'yyyy-MM-dd');
    const formEndDate = this.datePipe.transform(this.filterForm.controls.endDate.value, 'yyyy-MM-dd');

    const startDate = `${formStartDate}T00:00:00`;
    const endDate = `${formEndDate}T23:59:59`;

    const filters: ReportFiltersModel = {
      startDate: startDate,
      endDate: endDate
    }

    this.expanded = false;
    this.searchOutput.emit(filters)
  }

  ngOnInit(): void {
  }

}
