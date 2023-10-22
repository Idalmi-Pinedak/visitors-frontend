import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-icon-check',
  templateUrl: './ag-grid-icon-check.component.html',
  styleUrls: ['./ag-grid-icon-check.component.scss']
})
export class AgGridIconCheckComponent implements ICellRendererAngularComp {

  private params: any;
  public cell: any;
  boolValue = true;

  constructor() {

  }

  agInit(params: any): void {
    this.boolValue = params.value;
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
  }

  refresh(): boolean {
    return false;
  }

}
