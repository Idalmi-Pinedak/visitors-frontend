import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericDialogData } from '../../../../models/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleModel, UserModel, UserRequestModel } from '../../../../models/user';
import { UserHttpService } from '../../../../http-services/user/user.http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleHttpService } from '../../../../http-services/user/role.http.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, OnDestroy {

  private unsubscribeAll = new Subject<boolean>();

  isEditMode = false;
  userForm: FormGroup;
  dialogTitle = 'Agregar usuario';
  okButton = 'Crear';
  usuarioDesactivado = false;

  roles: RoleModel[] = [];

  haveAccessToBackOffice = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GenericDialogData, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: GenericDialogData,
    private snackBar: MatSnackBar,
    private userService: UserHttpService,
    private roleService: RoleHttpService
  ) {
    if (data.operationType === 'EDIT') {
      this.isEditMode = true;
      this.dialogTitle = 'Editar usuario';
      this.okButton = 'Guardar';

      const user = data.payload as UserModel;

      this.usuarioDesactivado = !user.active;

      this.userForm = this.formBuilder.group({
        id: [user.id],
        name: [user.name, Validators.required],
        email: [user.email, Validators.required],
        active: [user.active],
        roleId: [user.roleId]
      });

      this.userForm.get('email').disable();
    } else {
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        active: [true],
        roleId: [null, Validators.required]
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  aceptar(): void {
    if (this.userForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const user = this.data.payload as UserModel;

      const data: UserRequestModel = {
        ...this.userForm.getRawValue(),
        userId: user.id
      };

      this.userService
        .updateUser(data)
        .then(() => {
          this.dialogRef.close(true);
        })
        .catch(err => {
          console.error(err);
          const errorResponse = err as HttpErrorResponse;

          if (errorResponse.error.mensaje) {
            this.showSnackBar(errorResponse.error.mensaje, 'OK', 'snackbar-error');
          }
        });
    } else {
      const data: UserRequestModel = {
        ...this.userForm.getRawValue(),
        password: '12345678'
      };

      this.userService
        .createUser(data)
        .then(() => {
          this.dialogRef.close(true);
        })
        .catch(err => {
          console.error(err);
          const errorResponse = err as HttpErrorResponse;

          if (errorResponse.error.mensaje) {
            this.showSnackBar(errorResponse.error.mensaje, 'OK', 'snackbar-error');
          }
        });
    }
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  ngOnInit(): void {
    // 1. Obtenemos la lista de roles
    this.roleService
      .getAll()
      .then(roles => {
        this.roles = roles;
      })
      .catch(err => {
        console.error(err);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
