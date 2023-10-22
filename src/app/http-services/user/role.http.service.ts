import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { TOKEN_NAME } from '../../constants/constants';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RoleHttpService {

  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene la lista de roles que existe en la base de datos
   */
  getAll(): Promise<RoleModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}role/all`;

    const response = this.http.get<RoleModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  create(role: RoleModel): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}role`;

    const response = this.http.post<number>(url, role, { headers: theHeaders });

    return lastValueFrom(response);
  }

  update(role: RoleModel): Promise<void> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}role`;

    const response = this.http.put<void>(url, role, { headers: theHeaders });

    return lastValueFrom(response);
  }

  getRolesByUserId(userId: number): Promise<RoleModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}user/${userId}/roles`;

    const response = this.http.get<RoleModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

}
