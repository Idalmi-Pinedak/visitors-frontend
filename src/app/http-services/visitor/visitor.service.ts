import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomeStatementModel, VisitorGroupModel, VisitorModel } from '../../models/visitor';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { QueryPageModel, ReportFiltersModel } from '../../models/common';

@Injectable()
export class VisitorService {

  constructor(private readonly httpClient: HttpClient) {
  }

  create(data: VisitorGroupModel): Promise<number> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}visitors`;

    const response = this.httpClient.post<number>(url, data, {headers: theHeaders});

    return lastValueFrom(response);
  }

  findVisitorGroup(visitorGroupId: number): Promise<VisitorGroupModel> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}visitor-group/${visitorGroupId}`;

    const response = this.httpClient.get<VisitorGroupModel>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

  visitorsCheckout(visitorGroupId: number): Promise<void> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}visitor-group/${visitorGroupId}/check-out`;

    const response = this.httpClient.put<void>(url, {}, {headers: theHeaders});

    return lastValueFrom(response);
  }

  findVisitorsByFilters(filters: ReportFiltersModel): Promise<QueryPageModel<VisitorModel>> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}visitors/find`;

    const response = this.httpClient.post<QueryPageModel<VisitorModel>>(url, filters, {headers: theHeaders});

    return lastValueFrom(response);
  }

  findIncomeStatement(filters: ReportFiltersModel): Promise<IncomeStatementModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}visitors/income-statement`;

    const response = this.httpClient.post<IncomeStatementModel[]>(url, filters, {headers: theHeaders});

    return lastValueFrom(response);
  }

}
