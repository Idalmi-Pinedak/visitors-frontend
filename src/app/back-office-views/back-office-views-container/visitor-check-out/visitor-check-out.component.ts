import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../../http-services/visitor/visitor.service';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';
import { VisitorGroupModel, VisitorModel } from '../../../models/visitor';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarViewService } from '../../../views-services/mat-snack-bar.view.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-visitor-check-out',
  templateUrl: './visitor-check-out.component.html',
  styleUrls: ['./visitor-check-out.component.scss']
})
export class VisitorCheckOutComponent implements OnInit {

  private readonly decimalPipe = new DecimalPipe('en-US');

  loading = false;
  visitorGroup: VisitorGroupModel = null;
  visitors: VisitorModel[] = [];
  columnDefs: ColDef[] = [
    {
      headerName: 'visitante',
      field: 'visitorName',
      width: 250
    },
    {
      headerName: 'Edad',
      field: 'age',
      width: 110
    },
    {
      headerName: 'Tarifa',
      field: 'entranceFee',
      width: 120,
      cellRenderer: params => `Q ${this.decimalPipe.transform(params.value, '1.2-2')}`
    },
  ];

  gridOptions: GridOptions = {
    rowHeight: 30
  };

  defaultColDef = {
    resizable: true
  };

  constructor(
    private readonly visitorService: VisitorService,
    private readonly toolbarService: ToolbarService,
    private readonly dialog: MatDialog,
    private readonly matSnackBarViewService: MatSnackBarViewService
  ) {
  }

  checkOut(): void {
    const dialogRef = this.dialog
      .open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Marcar salida de visitantes',
          question: `¿Confirmar que quiere marcar la salida de visitantes?`
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toolbarService.showProgressBar(true);
        this.loading = true;

        this.visitorService
          .visitorsCheckout(this.visitorGroup.id)
          .then(() => {
            this.matSnackBarViewService.showSnackBar('Salida registrada exitosamente!');
            this.visitorGroup = null;
          })
          .catch(err => console.error(err))
          .finally(() => {
            this.toolbarService.showProgressBar(false);
            this.loading = false;
          });
      }
    });
  }

  search(value: string): void {
    if (!value) {
      return;
    }

    this.visitorGroup = null;

    this.toolbarService.showProgressBar(true);
    this.visitorService
      .findVisitorGroup(parseInt(value, 10))
      .then(response => {
        this.visitorGroup = response;
        this.visitors = response.visitors;
      })
      .catch(err => {
        if (err.error && err.error.mensaje === 'Visitor group not exists') {
          this.matSnackBarViewService.showSnackBar('El numero de boleta ingresada no existe', 'OK', false);
        } else {
          this.matSnackBarViewService.showSnackBar('Ha ocurrido un error', 'OK', false);
        }
      })
      .finally(() => this.toolbarService.showProgressBar(false));
  }

  ngOnInit(): void {

  }

}
