import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  question: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

}
