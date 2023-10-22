import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appMatSimpleTabContent]',
})
export class MatSimpleTabContentDirective extends CdkPortal {
}
