import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'common-dialog',
  templateUrl: './common-dialog.component.html'
})
export class CommonDialogComponent {

  @Input() title;
  @Input() message;
  @Input() okOnlyFlag;
  @Input() confirmButtonText;
  @Input() denyButtonText;

  constructor(public dialogRef: MatDialogRef<CommonDialogComponent>) {
  }

  public closeDialog(status) {
    this.dialogRef.close(status);
  }

  public displayCancel() {
    return this.okOnlyFlag;
  }
}
