import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @ViewChild(CdkPortal, { static: true })
  templatePortal: TemplatePortal;

  @ViewChild(CdkPortalOutlet, { static: true })
  host: CdkPortalOutlet;

  constructor() {
  }

  ngOnInit(): void {
    this.host.attachTemplatePortal(this.templatePortal);
  }

}
