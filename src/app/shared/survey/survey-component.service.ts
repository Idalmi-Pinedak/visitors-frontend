import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SurveyComponentService {

  private readonly resetResponsesSubject = new Subject<boolean>();
  readonly onResetResposes = this.resetResponsesSubject.asObservable();

  resetResponses(): void {
    this.resetResponsesSubject.next(true);
  }

}
