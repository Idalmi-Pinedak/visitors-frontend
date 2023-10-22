import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyTemplateDetailModel } from '../../models/visitor';
import { TOKEN_NAME } from '../../constants/constants';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SurveyService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findSurveyTemplate(): Promise<SurveyTemplateDetailModel[]> {
    const token = localStorage.getItem(TOKEN_NAME);
    const theHeaders = {authorization: `Bearer ${token}`};

    const url = `${environment.api}survey-template`;

    const response = this.httpClient.get<SurveyTemplateDetailModel[]>(url, {headers: theHeaders});

    return lastValueFrom(response);
  }

}
