
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonDialogService} from '../common-dialog/common-dialog.service';
import { DatePipe} from '@angular/common';
import { SharedService } from '../services/shared.service';
import { ContactUsService } from './contact-us.service';




@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})


export class ContactUsComponent implements OnInit {

  myForm: FormGroup;


  constructor(private commonDialogService: CommonDialogService,
              private fb: FormBuilder,
              private contactUsService: ContactUsService,
              private sharedService: SharedService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) {


    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      message: ['']
    });

  } //end constructor

  ngOnInit() {

  }



  sendMessage(): void {

    this.contactUsService.sendMessage(this.myForm.value).subscribe(result => {
      this.commonDialogService.openCommonDialog("Message Sent", "You will here back from us within two business days",true,
          "Ok","");
    });



  }



}
