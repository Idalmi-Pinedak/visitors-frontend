import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchInput = '';

  @Input()
  clearValueOnSearch = false;

  @Input()
  showSearchButton = false;

  @Input()
  placeholder = 'Buscar';

  @Output()
  searchOutput = new EventEmitter<string>();

  constructor() {
  }

  search(): void {
    this.searchOutput.next(this.searchInput);

    if (this.clearValueOnSearch) {
      this.searchInput = '';
    }
  }

  ngOnInit(): void {
  }

}
