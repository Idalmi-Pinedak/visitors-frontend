import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-floating-spinner',
  templateUrl: './floating-spinner.component.html',
  styleUrls: ['./floating-spinner.component.scss']
})
export class FloatingSpinnerComponent implements OnInit {

  @Input()
  strokeWidth = 7;

  @Input()
  diameter = 80;

  @Input()
  spinnerMessage = 'Loading';

  constructor() {
  }

  ngOnInit(): void {
  }

}
