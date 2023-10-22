import {Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss']
})
export class MatSelectSearchComponent implements OnInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<boolean>();

  readonly searchInputFormControl = new FormControl('');

  /** Reference to the search input field */
  @ViewChild('searchSelectInput', {read: ElementRef, static: true}) searchSelectInput: ElementRef;

  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Buscar';

  @Output() searchValueOutput = new EventEmitter<string>();

  constructor() {
  }

  _handleKeydown(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  onClearFilter(): void {
    this.searchInputFormControl.setValue('');
    this.searchSelectInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.searchInputFormControl
      .valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.searchValueOutput.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
