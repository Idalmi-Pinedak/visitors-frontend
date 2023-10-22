import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyDashboardModel } from '../../models/visitor';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SurveyDashboardService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getDataByQuestion(questionId: number): Promise<SurveyDashboardModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}survey-dashboard/${questionId}`;
    const response = this.httpClient.get<SurveyDashboardModel[]>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

}
