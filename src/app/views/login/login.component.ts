import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { Router } from '@angular/router';
import { STORE_REDIRECT_LOCAL_STORAGE_KEY } from '../../constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  ocultarPassword = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loading = true;

    this.authenticationService
      .login(data)
      .then(result => {
        if (result === 'OK') {
          const redirectUrl = localStorage.getItem(STORE_REDIRECT_LOCAL_STORAGE_KEY);

          if (redirectUrl) {
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['back-office/']);
          }
        } else {

          this.matSnackBar.open(result, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      })
      .finally(() => this.loading = false);
  }

  ngOnInit(): void {
  }

}
