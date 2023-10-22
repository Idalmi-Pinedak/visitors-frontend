import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-icon-button',
  templateUrl: './ag-grid-icon-button.component.html',
  styleUrls: ['./ag-grid-icon-button.component.scss']
})
export class AgGridIconButtonComponent implements ICellRendererAngularComp {

  private params: any;
  cell: any;
  iconName = 'edit';
  buttonTitle = 'Editar';
  showButton = true;

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
    this.iconName = params.iconName;
    this.buttonTitle = params.buttonTitle;
    this.showButton = params.onShowButton ? params.onShowButton(this.params.data) : true;
  }

  refresh(): boolean {
    return false;
  }

  onClick(): void {
    if (this.params) {
      const fn = this.params.onAction;
      if (fn) {
        fn(this.params.data, this.params.node);
      }
    }
  }

}
