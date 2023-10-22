import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RoleModel } from "../../models/user";
import { RoleHttpService } from "../../http-services/user/role.http.service";
import { ApplicationMenuHttpService } from "../../http-services/application/application-menu.http.service";
import { ApplicationMenu } from "../../models/application";
import { buildMenuTree } from "../../utils/shared-functions";

@Injectable()
export class UserRoleService {
  private readonly rolesSubject = new BehaviorSubject<RoleModel[]>([]);
  private readonly parentMenusSubject = new BehaviorSubject<ApplicationMenu[]>([]);


  private permissions: string[] = [];

  readonly roles = this.rolesSubject.asObservable();
  readonly parentMenus = this.parentMenusSubject.asObservable();

  constructor(
    private readonly applicationMenuHttpService: ApplicationMenuHttpService,
    private readonly roleHttpService: RoleHttpService
  ) {
  }

  hasPermission(permission: string): boolean {
    return this.permissions.indexOf(permission) > -1;
  }

  loadRoles(userId: number): void {
    this.roleHttpService
      .getRolesByUserId(userId)
      .then(roles => {

        if (roles.length > 0) {
          this.loadMenus(roles[0].id);
        }

        this.rolesSubject.next([...roles]);
      })
      .catch(err => {
        this.rolesSubject.next([]);
        console.error(err);
      });
  }

  private loadMenus(roleId: number): void {
    this.applicationMenuHttpService
      .getMenusByRoleId(roleId)
      .then(menus => {

        menus.forEach(it => {
          if (it.permissions && it.permissions.length > 0) {
            this.permissions = [...this.permissions, ...it.permissions.map(permission => permission.code)];
          }
        });

        console.log(this.permissions);

        this.parentMenusSubject.next(buildMenuTree(menus));
      })
      .catch(err => {
        this.parentMenusSubject.next([]);
        console.error(err);
      });
  }

  resetCurrentRoles(): void {
    this.rolesSubject.next([]);
    this.parentMenusSubject.next([]);
    this.permissions = [];
  }

}
