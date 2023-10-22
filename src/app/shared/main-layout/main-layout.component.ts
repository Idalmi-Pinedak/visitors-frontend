import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(CdkPortal, {static: true})
  templatePortal: TemplatePortal;

  @ViewChild(CdkPortalOutlet, {static: true})
  host: CdkPortalOutlet;

  constructor() {
  }

  ngOnInit(): void {
    this.host.attachTemplatePortal(this.templatePortal);
  }

}
