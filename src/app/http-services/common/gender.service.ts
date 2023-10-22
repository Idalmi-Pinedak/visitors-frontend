import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenderModel } from '../../models/common';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GenderService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Promise<GenderModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}gender/all`;

    const response = this.httpClient.get<GenderModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

}
