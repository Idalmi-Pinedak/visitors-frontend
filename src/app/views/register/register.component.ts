import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserHttpService} from '../../http-services/user/user.http.service';
import {UserRequestModel} from '../../models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserHttpService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const data: UserRequestModel = {
      ...this.registerForm.getRawValue(),
      haveAccessToBackOffice: false
    };

    this.userService
      .createUser(data)
      .then(id => {
        if (id) {
          this.showSnackBar('Cuenta creada exitosamente', 'OK', 'snackbar-success');
          this.router.navigate(['/login']);
        }
      })
      .catch(err => {
        console.error(err);
        const errorResponse = err as HttpErrorResponse;

        if (errorResponse.error.mensaje) {
          this.showSnackBar(errorResponse.error.mensaje, 'OK', 'snackbar-error');
        } else {
          this.showSnackBar('Error al crear cuenta', 'OK', 'snackbar-error');
        }
      });
  }

  private showSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    });

  }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return {passwordsNotMatching: true};
};
