import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PdfPayload {
  pdfUrl: string;
  fileName: string;
}

@Component({
  selector: 'app-pdf-viewer-dialog',
  template: `
    <ngx-extended-pdf-viewer
      *ngIf="url"
      [src]="url"
      [filenameForDownload]="fileName"
      useBrowserLocale="true"
      height="90vh"
      [showOpenFileButton]="false"
      [showBookmarkButton]="false">
    </ngx-extended-pdf-viewer>
  `,
  styles: []
})
export class PdfViewerDialogComponent implements OnInit {

  url: string | ArrayBuffer;
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<PdfPayload>,
    @Inject(MAT_DIALOG_DATA) public pdfMetadata: PdfPayload
  ) {
    dialogRef.addPanelClass('pdf-viewer-dialog-container');
    this.url = this.pdfMetadata.pdfUrl;
    this.fileName = this.pdfMetadata.fileName;
  }

  ngOnInit(): void {
  }

}
