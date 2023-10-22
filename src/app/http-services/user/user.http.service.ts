import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserRequestModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { TOKEN_NAME } from '../../constants/constants';

@Injectable()
export class UserHttpService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Promise<UserModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}user`;

    return this.http.get<UserModel[]>(url, { headers: theHeaders }).toPromise();
  }

  createUser(data: UserRequestModel): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    let theHeaders;

    if (token) {
      theHeaders = { authorization: `Bearer ${token}` };
    } else {
      theHeaders = {};
    }

    const url = `${environment.api}user`;

    return this.http.post<number>(url, data, { headers: theHeaders }).toPromise();
  }

  updateUser(data: UserRequestModel): Promise<void> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}user`;

    return this.http.put<void>(url, data, { headers: theHeaders }).toPromise();
  }

  resetPassword(userId: number): Promise<void> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}user/reset-password/${userId}`;

    return this.http.put<void>(url, {}, { headers: theHeaders }).toPromise();
  }

  deactivate(userId: number): Promise<void> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}user/delete/${userId}`;

    return this.http.put<void>(url, {}, { headers: theHeaders }).toPromise();
  }

}
