import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationMenu } from '../../models/application';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApplicationMenuHttpService {

  constructor(private readonly httpClient: HttpClient) {
  }

  public getAll(): Promise<ApplicationMenu[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}application-menu/all`;
    const response = this.httpClient.get<ApplicationMenu[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  /**
   * Obtiene los ID de los menus que tiene asociado un rol en especifico
   * @param roleId ID del rol del que se quiere obtener los menus asociados
   */
  getMenusByRoleId(roleId: number): Promise<ApplicationMenu[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}role/${roleId}/menus`;

    const response = this.httpClient.get<ApplicationMenu[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

}
