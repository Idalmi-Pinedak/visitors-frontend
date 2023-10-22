import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest, UserInfoModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { STORE_REDIRECT_LOCAL_STORAGE_KEY, TOKEN_NAME } from '../../constants/constants';

@Injectable()
export class AuthenticationService {

  private jwtHelper = new JwtHelperService();
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private userInfoSubject = new BehaviorSubject<UserInfoModel>(null);

  isLogged = this.isLoggedSubject.asObservable();
  userInfo = this.userInfoSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_NAME);

    if (token) {
      // verifica si el token es valido, retorna falso o verdadero
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  verifyToken(): void {
    if (!this.isAuthenticated) {
      this.isLoggedSubject.next(false);
    } else {
      this.isLoggedSubject.next(true);

      const token = localStorage.getItem(TOKEN_NAME);
      const info = this.jwtHelper.decodeToken(token);

      this.userInfoSubject.next(info as UserInfoModel);
    }
  }

  async login(body: LoginRequest): Promise<string> {
    try {
      const url = `${environment.api}user/login`;
      const response = await this.http.post<{ token: string }>(url, body).toPromise();

      localStorage.setItem(TOKEN_NAME, response.token);

      this.verifyToken();

      return 'OK';
    } catch (e) {
      const errorResponse = e as HttpErrorResponse;

      if (errorResponse.error.mensaje) {
        return errorResponse.error.mensaje;
      }
      console.error(e);
      return '';
    }
  }

  logout(): void {
    localStorage.removeItem(STORE_REDIRECT_LOCAL_STORAGE_KEY);
    localStorage.removeItem(TOKEN_NAME);
    this.verifyToken();
  }

}
