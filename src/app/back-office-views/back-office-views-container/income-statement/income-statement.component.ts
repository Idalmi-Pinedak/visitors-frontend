import { Component, OnInit } from '@angular/core';
import { ReportFiltersModel } from '../../../models/common';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';
import { VisitorService } from '../../../http-services/visitor/visitor.service';
import { IncomeStatementModel } from '../../../models/visitor';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DATE_DD_MM_YYYY_FORMAT } from '../../../constants/constants';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.scss']
})
export class IncomeStatementComponent implements OnInit {

  private readonly datePipe = new DatePipe('en-US');
  private readonly decimalPipe = new DecimalPipe('en-US');

  showGrid = false;
  loading = false;
  data: IncomeStatementModel[] = [];

  gridOptions: GridOptions = {
    rowHeight: 30
  };

  defaultColDef = {
    resizable: true
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'Fecha',
      field: 'date',
      width: 130,
      cellRenderer: params => {
        if (params.node.rowPinned) {
          return params.value;
        } else {
          return this.datePipe.transform(params.value, DATE_DD_MM_YYYY_FORMAT);
        }
      }
    },
    {
      headerName: 'Monto',
      field: 'amount',
      width: 140,
      cellRenderer: params => this.decimalPipe.transform(params.value, '1.2-2'),
      type: 'rightAligned'
    },
    {
      headerName: 'Moneda',
      field: 'currency',
      width: 120,
      cellRenderer: params => {
        if (params.node.rowPinned) {
          return undefined;
        } else {
          return 'QTZ';
        }
      }
    }
  ];

  footerData = [{date: 'Total', amount: '0.00'}];

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly visitorService: VisitorService
  ) {
  }

  search(filters: ReportFiltersModel): void {
    this.showGrid = true;
    this.loading = true;
    this.toolbarService.showProgressBar(true);

    setTimeout(() => this.createNewDataSource(filters), 50);
  }

  private createNewDataSource(filters: ReportFiltersModel): void {

    this.visitorService
      .findIncomeStatement(filters)
      .then(response => {
        this.data = [...response];
        const amountTotal = this.data.reduce((a, b) => a + b.amount, 0);
        this.footerData = [{date: 'Total', amount: this.decimalPipe.transform(amountTotal, '1.2-2')}];
      })
      .finally(() => {
        this.toolbarService.showProgressBar(false);
        this.loading = false;
      });
  }

  ngOnInit(): void {
  }

}
