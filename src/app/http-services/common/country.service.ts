import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryModel } from '../../models/common';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountryService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Promise<CountryModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}country/all`;

    const response = this.httpClient.get<CountryModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

}
