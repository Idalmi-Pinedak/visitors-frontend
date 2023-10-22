import { Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { MatSimpleTabComponent } from './mat-simple-tab/mat-simple-tab.component';

@Component({
  selector: 'app-mat-simple-tabs',
  templateUrl: './mat-simple-tabs.component.html',
  styleUrls: ['./mat-simple-tabs.component.scss']
})
export class MatSimpleTabsComponent implements OnInit {

  @HostBinding('attr.class')
  class = 'app-mat-simple-tabs';

  @ContentChildren(MatSimpleTabComponent, { descendants: true })
  public allTabs: QueryList<MatSimpleTabComponent>;

  @Input()
  public disableAllTabs = false;

  @Input()
  public tabIndex = 0;

  @Output()
  public tabIndexChange = new EventEmitter<number>();

  constructor() {
  }

  public setCurrentTabIndex(tabIndex: number): void {
    this.tabIndex = tabIndex;
    this.tabIndexChange.emit(tabIndex);
  }

  ngOnInit(): void {
  }

}
