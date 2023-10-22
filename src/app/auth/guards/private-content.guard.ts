import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {take} from 'rxjs/operators';
import {STORE_REDIRECT_LOCAL_STORAGE_KEY} from '../../constants/constants';

@Injectable()
export class PrivateContentGuard implements CanActivate {

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

    if (!isLogged) {
      localStorage.setItem(STORE_REDIRECT_LOCAL_STORAGE_KEY, state.url);
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
