import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';

@Injectable()
export class AuthContentGuard implements CanActivate {

  constructor(public router: Router, private authenticationService: AuthenticationService) {
  }

  /**
   * Esta funcion verifica si puede acceder o no, a una URL dentro de la aplicacion
   * @param next objeto ActivatedRouteSnapshot
   * @param state objeto RouterStateSnapshot
   */
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLogged = await this.authenticationService
      .isLogged
      .pipe(take(1))
      .toPromise();

    if (isLogged) {
      this.router.navigate(['/back-office']);
      return false;
    }

    return true;
  }

}
