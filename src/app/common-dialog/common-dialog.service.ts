import {Injectable} from '@angular/core';
import {CommonDialogComponent} from './common-dialog.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class CommonDialogService {

  constructor(public dialog: MatDialog) {
  }

  public openCommonDialog(
    title: string,
    message: string,
    ok_only_flag: boolean,
    confirmButtonText: string,
    denyButtonText: string
  ) {

    // configuration for you dialog box
    const config = {
      disableClose: true
      //  height: '400px',
      //  width: '600px'
    };

    //noinspection TypeScriptValidateTypes
    const dialogRef = this.dialog.open(CommonDialogComponent, config);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.okOnlyFlag = ok_only_flag;
    dialogRef.componentInstance.confirmButtonText = confirmButtonText;
    dialogRef.componentInstance.denyButtonText = denyButtonText;

    return dialogRef.afterClosed();
  }
} // end service
