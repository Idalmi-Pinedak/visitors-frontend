import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToolbarService {

  private readonly isLoadingSubject = new Subject<boolean>();
  readonly isLoading = this.isLoadingSubject.asObservable();

  showProgressBar(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

}
