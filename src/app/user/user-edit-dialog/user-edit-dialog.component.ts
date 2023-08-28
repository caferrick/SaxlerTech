

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../user.service';
import {CommonDialogService} from '../../common-dialog/common-dialog.service';
import {HMUserAttributes} from '../models/hmUserAttributes';
import {DatePipe} from '@angular/common';
import {SecurityService} from '../../security/security.service';



@Component({
  selector: 'userEditDialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {

  myForm: FormGroup;
  hmData: HMUserAttributes;
  hmucciDob: Date;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private commonDialog: CommonDialogService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    public secService: SecurityService
  ) {

    this.hmData = data.HMUserAttributes;


    if (this.hmData.hmuccidob) {
      this.hmucciDob = new Date(this.hmData.hmuccidob);
    } else {
      this.hmucciDob = null;
    }


    this.myForm = fb.group({
      uid: [this.hmData.uid, Validators.required],
      email: [this.hmData.mail, [Validators.required, Validators.email]],
      fName: [this.hmData.givenname, [Validators.required]],
      lName: [this.hmData.sn, [Validators.required]],
      hmuccidob: [this.hmucciDob],
      fullName: [this.hmData.cn, [Validators.required]],
      hmfim: [this.hmData.hmfim],
      providerid: [this.hmData.providerid]
    });

    this.myForm.controls['uid'].disable();
  }


  save(): void {
    let payloadBuilder = new HMUserAttributes();

    // create a copy of the object
    payloadBuilder = JSON.parse(JSON.stringify(this.hmData));

    payloadBuilder.mail = this.myForm.controls['email'].value;
    payloadBuilder.givenname = this.myForm.controls[
      'fName'
      ].value;
    payloadBuilder.sn = this.myForm.controls['lName'].value;
    payloadBuilder.cn = this.myForm.controls['fullName'].value;

    if (this.myForm.controls['hmuccidob'].value) {
      payloadBuilder.hmuccidob = this.datePipe.transform(
        this.myForm.controls['hmuccidob'].value,'MM/dd/yyyy');
    }

    if (this.myForm.controls['hmfim'].value) {
      payloadBuilder.hmfim = this.myForm.controls[
        'hmfim'
        ].value;
    }

    if (this.myForm.controls['providerid'].value) {
      payloadBuilder.providerid = this.myForm.controls[
        'providerid'
        ].value;
    }

    /*this.userService.saveUser(payloadBuilder).subscribe(data => {
      // make sure we have an response
      if (data.status) {
        this.commonDialog.openCommonDialog('Notice', data.message, false, 'Ok', '').subscribe(dialogData => {
          // refresh the route
          this.router.navigate(['user/user-profile', this.hmData.uid], {
            relativeTo: this.route
          });
        });
      }
    });  */

  }
}

