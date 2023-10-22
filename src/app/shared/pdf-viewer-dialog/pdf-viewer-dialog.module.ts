import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerDialogComponent } from './pdf-viewer-dialog.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    PdfViewerDialogComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [PdfViewerDialogComponent]
})
export class PdfViewerDialogModule {
}
