import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  AgGridIconCheckComponent
} from '../../../shared/ag-grid-components/ag-grid-icon-check/ag-grid-icon-check.component';
import {
  AgGridIconButtonComponent
} from '../../../shared/ag-grid-components/ag-grid-icon-button/ag-grid-icon-button.component';
import { RoleModel } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogData } from '../../../models/common';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';
import { RoleHttpService } from '../../../http-services/user/role.http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { searchByLowerCaseText } from '../../../constants/constants';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  allRoles: RoleModel[] = [];
  roles: RoleModel[] = [];

  gridOptions: GridOptions = {
    rowHeight: 30
  };

  defaultColDef = {
    resizable: true
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      width: 50
    },
    {
      headerName: 'Nombre',
      field: 'name',
      width: 250
    },
    {
      headerName: 'Codigo',
      field: 'code',
      width: 150
    },
    {
      headerName: 'Activo',
      field: 'active',
      cellRendererFramework: AgGridIconCheckComponent,
      width: 90
    },
    {
      headerName: 'Editar',
      field: 'edit',
      width: 90,
      cellRendererFramework: AgGridIconButtonComponent,
      cellRendererParams: {
        iconName: 'edit',
        buttonTitle: 'Editar',
        onAction: (data: RoleModel) => this.edit(data)
      },
    },
  ];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly toolbarService: ToolbarService,
    private readonly roleHttpService: RoleHttpService,
    private readonly matSnackBar: MatSnackBar
  ) {

  }

  private edit(data: RoleModel): void {
    const dialogRef = this.matDialog
      .open<RoleDialogComponent, GenericDialogData, RoleModel>(RoleDialogComponent, {
        panelClass: 'mat-dialog-without-padding',
        width: '500px',
        height: '70%',
        data: {
          operationType: 'EDIT',
          id: data.id,
          payload: data
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackBar('Rol actualizado exitosamente!', 'OK', 'snackbar-success');

        this.roles.forEach(role => {
          if (role.id === result.id) {
            role.name = result.name;
            role.code = result.code;
            role.active = result.active;
          }
        });

        this.roles = [...this.roles];
      }
    });
  }

  public onAdd(): void {
    const dialogRef = this.matDialog
      .open<RoleDialogComponent, GenericDialogData, RoleModel>(RoleDialogComponent, {
        panelClass: 'mat-dialog-without-padding',
        width: '500px',
        height: '70%',
        data: {
          operationType: 'ADD',
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackBar('Rol creado exitosamente!', 'OK', 'snackbar-success');

        this.roles.push(result);

        this.roles = [...this.roles];
      }
    });
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  search(filterValue: string): void {
    if (filterValue) {
      const result = this.allRoles.filter(it => searchByLowerCaseText(it.name, filterValue));
      this.roles = [...result];
    } else {
      this.roles = [...this.allRoles];
    }
  }

  ngOnInit(): void {
    this.toolbarService.showProgressBar(true);

    this.roleHttpService
      .getAll()
      .then(data => {
        this.allRoles = [...data];
        this.roles = [...data];
      })
      .catch(err => console.error(err))
      .finally(() => this.toolbarService.showProgressBar(false))
  }

}
