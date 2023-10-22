import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogData } from '../../../../models/common';
import { RoleMenuModel, RoleModel } from '../../../../models/user';
import { ApplicationMenuHttpService } from '../../../../http-services/application/application-menu.http.service';
import { ApplicationMenu } from '../../../../models/application';
import { RoleHttpService } from '../../../../http-services/user/role.http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { buildMenuTree } from '../../../../utils/shared-functions';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {

  loading = false;
  dialogTitle = 'Agregar rol';
  okButton = 'Crear';
  roleForm: FormGroup;
  parentMenus: ApplicationMenu[] = [];
  showActiveCheck = false;

  constructor(
    public readonly dialogRef: MatDialogRef<GenericDialogData, RoleModel>,
    @Inject(MAT_DIALOG_DATA) public readonly data: GenericDialogData,
    private readonly formBuilder: FormBuilder,
    private readonly applicationMenuHttpService: ApplicationMenuHttpService,
    private readonly roleHttpService: RoleHttpService,
    private readonly matSnackBar: MatSnackBar
  ) {
    if (this.data.operationType === 'EDIT') {
      this.okButton = 'Actualizar';
      this.dialogTitle = 'Actualizar Rol';
      this.showActiveCheck = true;

      this.roleForm = this.formBuilder.group({
        id: [this.data.payload.id, Validators.required],
        name: [this.data.payload.name, Validators.required],
        code: [this.data.payload.code, Validators.required],
        active: [this.data.payload.active]
      });
    } else {
      this.roleForm = this.formBuilder.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
        active: [true]
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

  aceptar(): void {
    if (this.roleForm.invalid) {
      return;
    }

    const data: RoleModel = this.roleForm.getRawValue();

    data.menuList = this.getMenuSelected();

    if (data.menuList.length === 0) {
      this.showSnackBar('Debe seleccionar por lo menos un menú', 'OK', 'snackbar-error');
      return;
    }

    if (this.data.operationType === 'EDIT') {
      this.updateRole(data);
    } else {
      this.createRole(data);
    }

  }

  updateAllSelectedChildren(parent: ApplicationMenu): void {
    parent.allSelectedChildren = parent.children !== null && parent.children.every(t => t.selected);
  }

  someSelected(parent: ApplicationMenu): boolean {
    if (parent.children === null || parent.children === undefined) {
      return false;
    }
    return parent.children.filter(t => t.selected).length > 0 && !parent.allSelectedChildren;
  }

  setAll(selectedAll: boolean, parent: ApplicationMenu): void {
    parent.allSelectedChildren = selectedAll;
    if (parent.children === null) {
      return;
    }
    parent.children.forEach(t => (t.selected = selectedAll));
  }

  private updateRole(role: RoleModel): void {
    this.loading = true;

    this.roleHttpService
      .update(role)
      .then(() => {
        this.dialogRef.close(role);
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false);
  }

  private createRole(role: RoleModel): void {
    this.loading = true;

    this.roleHttpService
      .create(role)
      .then(id => {
        role.id = id;
        this.dialogRef.close(role);
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false);
  }

  private getMenuSelected(): RoleMenuModel[] {
    const result: RoleMenuModel[] = [];

    this.parentMenus.forEach(menu => {

      if (menu.allSelectedChildren || this.someSelected(menu)) {

        result.push({
          menuId: menu.id,
          permissions: []
        });

        menu.children.forEach(child => {

          if (child.selected) {
            result.push({
              menuId: child.id,
              permissions: child.permissions.filter(it => it.selected).map(it => it.code)
            })
          }

        });

      }

    });

    return result;
  }

  /**
   * Carga los menus que tiene asociado el ROL
   * @private
   */
  private loadRoleApplicationMenu(): void {
    // 1. Valida si esta en la opcion de editar rol, de lo contrario no obtiene los roles asociados porque es un nuevo rol
    if (this.data.operationType !== 'EDIT') {
      this.loadApplicationMenus([]);
      return;
    }

    this.applicationMenuHttpService
      .getMenusByRoleId(this.data.id)
      .then(response => {
        // const associatedMenusIdList = response.map(it => it.id);
        this.loadApplicationMenus(response);
      })
      .catch(err => console.error(err));
  }

  /**
   * Carga la lista de menus que se pueden asociar al ROL
   * @private
   */
  private loadApplicationMenus(associatedMenus: ApplicationMenu[]): void {
    this.applicationMenuHttpService
      .getAll()
      .then(menus => {
        this.parentMenus = buildMenuTree(menus);

        this.parentMenus.forEach(parentMenu => {
          parentMenu.children.forEach(child => {
            const associatedMenu = associatedMenus.find(it => it.id === child.id);
            child.selected = !!associatedMenu

            child.permissions.forEach(permission => {
              const associatedPermission = associatedMenu.permissions.find(it => it.code === permission.code);
              permission.selected = !!associatedPermission;
            });

          })
          this.updateAllSelectedChildren(parentMenu);
        });
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false);
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.matSnackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadRoleApplicationMenu();
  }

}
