import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../services/shared.service';
import {CommonDialogService} from '../common-dialog/common-dialog.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class ContactUsService {

  constructor(
      private httpClient: HttpClient,
      private sharedService: SharedService,
      private commonDialogService: CommonDialogService,
      private router: Router
  ) { }



  sendMessage(message): Observable<any> {

    return this.httpClient.post<any>(this.sharedService.getURI('contactUs'), message );

  }




}
