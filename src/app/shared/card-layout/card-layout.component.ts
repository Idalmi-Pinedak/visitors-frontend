import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent implements OnInit {

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
