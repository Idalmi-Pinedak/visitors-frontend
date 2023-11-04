import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PricingModel } from '../../models/visitor';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../../constants/constants';

@Injectable()
export class PricingService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Promise<PricingModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const headers = {
      authorization: `Bearer ${token}`
    };

    const url = `${environment.api}pricing`;

    const response = this.httpClient.get<PricingModel[]>(url, {headers: headers});

    return lastValueFrom(response);
  }


}
