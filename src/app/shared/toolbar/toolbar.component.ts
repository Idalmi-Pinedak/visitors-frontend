import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { Router } from '@angular/router';
import { ToolbarService } from './toolbar.service';

const DEFAULT_PHOTO_URL = 'assets/images/avatars/profile.jpg';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private unsubscribeAll = new Subject<boolean>();

  userName = 'Admin';
  userEmail = 'admin@email.com';
  photoURL = DEFAULT_PHOTO_URL;

  loading = false;

  @Output()
  toggleMenuEventOutput = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toolbarService: ToolbarService
  ) {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onToggleMenu(): void {
    this.toggleMenuEventOutput.emit();
  }

  goToMyProfile(): void {
    this.router.navigate(['back-office/account/profile'])
  }

  ngOnInit(): void {
    this.authenticationService
      .userInfo
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(userInfo => {
        if (userInfo) {
          setTimeout(() => {

            this.userName = userInfo.name;
            this.userEmail = userInfo.sub;

          }, 10);
        }
      });


    this.toolbarService
      .isLoading
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        setTimeout(() => {
          this.loading = value;
        }, 10);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
