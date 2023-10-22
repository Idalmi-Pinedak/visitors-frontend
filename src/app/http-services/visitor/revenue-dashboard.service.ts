import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { DashboardResponseModel } from '../../models/visitor';

@Injectable()
export class RevenueDashboardService {

  constructor(private readonly httpClient: HttpClient) {
  }

  revenueToday(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}revenue-dashboard/revenue-today`;
    const response = this.httpClient.get<number>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

  revenueInTheMonth(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}revenue-dashboard/revenue-in-the-month`;
    const response = this.httpClient.get<number>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

  revenueInTheLastMonth(): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}revenue-dashboard/revenue-in-the-last-month`;
    const response = this.httpClient.get<number>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

  revenueByYear(): Promise<DashboardResponseModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}revenue-dashboard/revenue-by-year`;
    const response = this.httpClient.get<DashboardResponseModel[]>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

}
