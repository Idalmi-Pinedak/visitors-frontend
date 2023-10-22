import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReportsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getVisitorGroupReport(visitorGroupId: number): Promise<any> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {
      authorization: `Bearer ${token}`
    };

    const url = `${environment.api}reports/visitor-group/${visitorGroupId}`;

    const response = this.httpClient.get<any>(url, {headers: theHeaders, responseType: 'blob' as 'json'});

    return lastValueFrom(response);
  }

}
