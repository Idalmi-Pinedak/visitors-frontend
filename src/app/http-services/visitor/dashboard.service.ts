import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { DashboardResponseModel } from '../../models/visitor';

@Injectable()
export class DashboardService {

  constructor(private readonly httpClient: HttpClient) {
  }

  visitorsToday(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}dashboard/visitors-today`;
    const response = this.httpClient.get<number>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  visitorsInTheMonth(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}dashboard/visitors-in-the-month`;
    const response = this.httpClient.get<number>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  visitorsInTheLastMonth(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}dashboard/visitors-in-the-last-month`;
    const response = this.httpClient.get<number>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  visitorsByYear(): Promise<DashboardResponseModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}dashboard/visitors-by-year`;
    const response = this.httpClient.get<DashboardResponseModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

  visitorsByState(): Promise<DashboardResponseModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = { authorization: `Bearer ${token}` };

    const url = `${environment.api}dashboard/visitors-by-state`;
    const response = this.httpClient.get<DashboardResponseModel[]>(url, { headers: theHeaders });

    return lastValueFrom(response);
  }

}
