import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApplicationMenu } from '../../models/application';
import { UserRoleService } from "../../auth/services/user-role.service";

@Component({
  selector: 'app-back-office-views-container',
  templateUrl: './back-office-views-container.component.html',
  styleUrls: ['./back-office-views-container.component.scss']
})
export class BackOfficeViewsContainerComponent implements OnInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<boolean>();

  parentMenus: ApplicationMenu[] = [];

  @ViewChild('backOfficeMatDrawer', {static: false})
  mainMatDrawer: MatDrawer;

  loading = true;

  constructor(
    private readonly router: Router,
    private readonly userRoleService: UserRoleService
  ) {
  }

  toggleMenu(): void {
    if (this.mainMatDrawer) {
      this.mainMatDrawer.toggle();
    }
  }

  goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  private selectDefaultMenu(): void {
    if (this.parentMenus.length == 0) {
      return;
    }

    if (this.router.url === '/back-office' || this.router.url === '/back-office/') {
      const firstParentMenu = this.parentMenus[0];

      if (firstParentMenu.children.length > 0) {
        const childMenu = firstParentMenu.children[0];
        this.goToMenu(childMenu.path);
      }
    }
  }

  ngOnInit(): void {
    this.userRoleService
      .parentMenus
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(menus => {
        this.parentMenus = menus;
        this.selectDefaultMenu();

        setTimeout(() => this.loading = false, 3000);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
