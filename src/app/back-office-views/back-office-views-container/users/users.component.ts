import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../../http-services/user/user.http.service';
import { UserModel } from '../../../models/user';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  AgGridIconButtonComponent
} from '../../../shared/ag-grid-components/ag-grid-icon-button/ag-grid-icon-button.component';
import {
  AgGridIconCheckComponent
} from '../../../shared/ag-grid-components/ag-grid-icon-check/ag-grid-icon-check.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { GenericDialogData } from '../../../models/common';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { DATE_TIME_DD_MM_YYYY_HH_MM_SS_FORMAT, searchByLowerCaseText } from '../../../constants/constants';
import { ToolbarService } from '../../../shared/toolbar/toolbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private readonly datePipe = new DatePipe('en-US');

  allUsers: UserModel[] = [];
  users: UserModel[] = [];

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
      headerName: 'Nombres',
      field: 'name',
      width: 150
    },
    {
      headerName: 'Correo',
      field: 'email',
      width: 250
    },
    {
      headerName: 'Activo',
      field: 'active',
      cellRendererFramework: AgGridIconCheckComponent,
      width: 90
    },
    {
      headerName: 'Fecha de creación',
      field: 'createdAt',
      width: 150,
      cellRenderer: params => this.datePipe.transform(params.value, DATE_TIME_DD_MM_YYYY_HH_MM_SS_FORMAT)
    },
    {
      headerName: 'Creado por',
      field: 'createdBy',
      width: 225
    },
    {
      headerName: 'Fecha de modificación',
      field: 'modifiedAt',
      width: 150,
      cellRenderer: params => this.datePipe.transform(params.value, DATE_TIME_DD_MM_YYYY_HH_MM_SS_FORMAT)
    },
    {
      headerName: 'Modificado por',
      field: 'modifiedBy',
      width: 225
    },
    {
      headerName: 'Editar',
      field: 'edit',
      width: 90,
      cellRendererFramework: AgGridIconButtonComponent,
      cellRendererParams: {
        iconName: 'edit',
        buttonTitle: 'Editar',
        onAction: (data: UserModel) => this.edit(data)
      },
      pinned: 'right'
    },
    {
      headerName: 'Resetear password',
      field: 'resetPassword',
      width: 125,
      cellRendererFramework: AgGridIconButtonComponent,
      cellRendererParams: {
        iconName: 'vpn_key',
        buttonTitle: 'Resetear password',
        onAction: (data: UserModel) => this.resetPassword(data)
      },
      pinned: 'right'
    },
    {
      headerName: 'Desactivar',
      field: 'deleteUser',
      width: 125,
      cellRendererFramework: AgGridIconButtonComponent,
      cellRendererParams: {
        iconName: 'cancel',
        buttonTitle: 'Desactivar usuario',
        onAction: (data: UserModel) => this.deleteUser(data),
        onShowButton: (data: UserModel) => data.active
      },
      pinned: 'right'
    }
  ];

  constructor(
    private userHttpService: UserHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readonly toolbarService: ToolbarService
  ) {
  }

  private edit(data: UserModel): void {
    const dialogRef = this.dialog
      .open<UserDialogComponent, GenericDialogData, boolean>(UserDialogComponent, {
        width: '500px',
        data: {
          operationType: 'EDIT',
          id: data.id,
          payload: data
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackBar('Usuario actualizado exitosamente!', 'OK', 'snackbar-success');
        this.loadUsers();
      }
    });
  }

  private resetPassword(data: UserModel): void {
    const dialogRef = this.dialog
      .open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Resetear password',
          question: `Confirma que quiere resetear la clave del usuario ${data.email}? El nuevo password será 12345678`
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userHttpService
          .resetPassword(data.id)
          .then(() => {
            this.showSnackBar('Password reseteado exitosamente!', 'OK', 'snackbar-success');
          })
          .catch(() => {
            this.showSnackBar('No es posible realizar esta accion, intente mas tarde', 'OK', 'snackbar-error');
          });
      }
    });

  }

  private deleteUser(data: UserModel): void {
    const dialogRef = this.dialog
      .open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Desactivar usuario',
          question: `Confirma que quiere desactivar el usuario ${data.email}?`
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userHttpService
          .deactivate(data.id)
          .then(() => {
            this.showSnackBar('Usuario desactivado exitosamente!', 'OK', 'snackbar-success');
            this.loadUsers();
          })
          .catch(() => {
            this.showSnackBar('No es posible realizar esta accion, intente mas tarde', 'OK', 'snackbar-error');
          });
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog
      .open<UserDialogComponent, GenericDialogData, boolean>(UserDialogComponent, {
        width: '500px',
        data: {
          operationType: 'ADD',
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackBar('Usuario creado exitosamente!', 'OK', 'snackbar-success');
        this.loadUsers();
      }
    });
  }

  private loadUsers(): void {
    this.toolbarService.showProgressBar(true);
    this.userHttpService
      .getAllUsers()
      .then(users => {
        this.users = [...users];
        this.allUsers = [...users];
      })
      .catch(err => console.error(err))
      .finally(() => this.toolbarService.showProgressBar(false));
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  search(filterValue: string): void {
    if (filterValue) {
      const result = this.allUsers.filter(doctor => this.searchUserByNameAndEmail(doctor, filterValue));
      this.users = [...result];
    } else {
      this.users = [...this.allUsers];
    }
  }

  private searchUserByNameAndEmail(user: UserModel, filterValue: string): boolean {
    return searchByLowerCaseText(user.name, filterValue) ||
      searchByLowerCaseText(user.email, filterValue);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

}
