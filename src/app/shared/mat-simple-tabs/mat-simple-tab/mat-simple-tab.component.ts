import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { MatSimpleTabContentDirective } from './mat-simple-tab-content.directive';

@Component({
  selector: 'app-mat-simple-tab',
  templateUrl: './mat-simple-tab.component.html'
})
export class MatSimpleTabComponent implements OnInit {

  @Input()
  public tabTitle = '';

  @Input()
  public showTab = true;

  @ContentChild(MatSimpleTabContentDirective, { static: true })
  public templateContent: MatSimpleTabContentDirective;

  constructor() {
  }

  ngOnInit(): void {
  }
}
