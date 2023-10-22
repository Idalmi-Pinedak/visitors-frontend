import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/services/authentication.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserRoleService } from "./auth/services/user-role.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribeAll = new Subject<boolean>();

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userRoleService: UserRoleService
  ) {
    this.authenticationService.verifyToken();
  }

  ngOnInit(): void {
    this.authenticationService
      .userInfo
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.userRoleService.loadRoles(data.userId);
        } else {
          this.userRoleService.resetCurrentRoles();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
