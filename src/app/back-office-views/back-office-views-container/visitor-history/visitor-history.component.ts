import { Component, OnInit } from '@angular/core';
import { VisitorModel } from '../../../models/visitor';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReportFiltersModel } from '../../../models/common';
import { VisitorService } from '../../../http-services/visitor/visitor.service';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';
import { DATE_TIME_DD_MM_YYYY_HH_MM_FORMAT } from '../../../constants/constants';
import { PdfPayload, PdfViewerDialogComponent } from '../../../shared/pdf-viewer-dialog/pdf-viewer-dialog.component';
import { ReportsService } from '../../../http-services/visitor/reports.service';
import { MatDialog } from '@angular/material/dialog';
import {
  AgGridIconButtonComponent
} from '../../../shared/ag-grid-components/ag-grid-icon-button/ag-grid-icon-button.component';

@Component({
  selector: 'app-visitor-history',
  templateUrl: './visitor-history.component.html',
  styleUrls: ['./visitor-history.component.scss']
})
export class VisitorHistoryComponent implements OnInit {

  private readonly decimalPipe = new DecimalPipe('en-US');
  private readonly datePipe = new DatePipe('en-US');

  loading = false;
  showGrid = false;
  visitors: VisitorModel[] = [];
  columnDefs: ColDef[] = [
    {
      headerName: 'No. de boleta',
      field: 'visitorGroupId',
      width: 110,
      cellRenderer: params => `${params.value?.toString()?.padStart(5, '0')}`
    },
    {
      headerName: 'Visitante',
      field: 'visitorName',
      width: 250
    },
    {
      headerName: 'Edad',
      field: 'age',
      width: 90
    },
    {
      headerName: 'Genero',
      field: 'genderDescription',
      width: 160
    },
    {
      headerName: 'Fecha de ingreso',
      field: 'checkInDate',
      width: 150,
      cellRenderer: params => this.datePipe.transform(params.value, DATE_TIME_DD_MM_YYYY_HH_MM_FORMAT)
    },
    {
      headerName: 'Fecha de salida',
      field: 'checkOutDate',
      width: 150,
      cellRenderer: params => !!params.value ? this.datePipe.transform(params.value, DATE_TIME_DD_MM_YYYY_HH_MM_FORMAT) : ''
    },
    {
      headerName: 'Tarifa de ingreso',
      field: 'entranceFee',
      width: 140,
      cellRenderer: params => `Q ${this.decimalPipe.transform(params.value, '1.2-2')}`
    },
    {
      headerName: 'Departamento',
      field: 'stateName',
      width: 180
    },
    {
      headerName: 'Pais',
      field: 'countryName',
      width: 180
    },
    {
      headerName: 'Ver boleta',
      field: 'pdf',
      width: 110,
      cellRendererFramework: AgGridIconButtonComponent,
      cellRendererParams: {
        iconName: 'receipt',
        buttonTitle: 'Generar PDF',
        onAction: (data: VisitorModel) => this.viewPdf(data)
      },
      pinned: 'right'
    }
  ];

  gridOptions: GridOptions = {
    rowHeight: 30
  };

  defaultColDef = {
    resizable: true
  };

  gridApi: GridApi;
  columnApi: ColumnApi;
  cacheOverflowSize = 2;
  cacheBlockSize = 200;
  maxBlocksInCache = 10;
  infiniteInitialRowCount = 1;
  overlayNoRowsTemplate = '';
  overlayLoadingTemplate = '';
  pageSize = 200;
  pageNumber = 1;

  constructor(
    private readonly visitorService: VisitorService,
    private readonly toolbarService: ToolbarService,
    private readonly reportsService: ReportsService,
    private readonly dialog: MatDialog
  ) {
    this.overlayLoadingTemplate = `<span style="font-size: 18px;">Cargando datos...</span>`;
    this.overlayNoRowsTemplate = `<span style="font-size: 18px;">No existen datos para mostrar</span>`;
  }

  private viewPdf(data: VisitorModel): void {
    this.toolbarService.showProgressBar(true);

    this.reportsService
      .getVisitorGroupReport(data.visitorGroupId)
      .then(blob => {
        const visitorGroupIdString = `${data.visitorGroupId}`.padStart(5, '0');
        const reportName = `registro_visitantes_${visitorGroupIdString}.pdf`;

        console.log(blob);

        let url = window.URL.createObjectURL(blob);

        console.log(url);

        this.showPdfDialog(url, reportName);
      })
      .catch(err => console.error(err))
      .finally(() => this.toolbarService.showProgressBar(false));
  }

  private showPdfDialog(url: string, fileName: string): void {
    this.dialog.open<PdfViewerDialogComponent, PdfPayload, void>(PdfViewerDialogComponent, {
        data: {
          pdfUrl: url,
          fileName
        }
      },
    );
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.resetRowHeights();
  }

  onPaginationChanged(ev: any): void {
    this.gridApi = ev.api;
  }

  search(filters: ReportFiltersModel): void {
    this.showGrid = true;
    this.loading = true;

    setTimeout(() => this.createNewDataSource(filters), 50);
  }

  private createNewDataSource(filters: ReportFiltersModel): void {
    this.pageNumber = 1;

    this.gridApi.setDatasource({
      rowCount: this.pageSize,
      getRows: params => {
        this.pageNumber = params.endRow / this.pageSize;
        filters.pageNumber = this.pageNumber - 1;
        filters.pageSize = this.pageSize;

        this.gridApi.showLoadingOverlay();
        this.toolbarService.showProgressBar(true);

        this.visitorService
          .findVisitorsByFilters(filters)
          .then(response => {
            if (response.content.length === 0) {
              this.gridApi.setPinnedBottomRowData([]);
              params.successCallback([], 0);
              this.gridApi.showNoRowsOverlay();
              return;
            }

            params.successCallback(response.content, response.totalElements);
            this.gridApi.redrawRows();
            this.gridApi.hideOverlay();
          })
          .catch(err => {
            console.error(err);
            params.successCallback([], 0);
            this.gridApi.showNoRowsOverlay();
          })
          .finally(() => {
            this.toolbarService.showProgressBar(false);
            this.loading = false;
          });
      }
    });
  }

  ngOnInit(): void {
  }

}
