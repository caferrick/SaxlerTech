import {Injectable} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loading = false;

  private messageSource = new Subject<any>();
  currentMessage = this.messageSource.asObservable();

  constructor(private spinnerService: Ng4LoadingSpinnerService) {
  }

  /************************************************************
   *
   * This method is used to noftify other
   * methods that subscribed to messageSource Observable pattern
   *
   ************************************************************/

  private spinner() {
    this.messageSource.next(this.loading);
  }

  /************************************************
   * @method spinnerOn turns the spinner on
   ************************************************/

  public spinnerOn() {
    this.loading = true; // this was used with ngx-loading module
    // which is not used in this project
    // i kept this in place to demonstrate the
    // obsrevable pattern

    this.spinnerService.show(); // this is used for ng4-loading-spinner
    // which is used in this project
    this.spinner();
  }

  /************************************************
   * @method spinnerOff turns the spinner off
   ************************************************/

  public spinnerOff() {
    this.loading = false; // this was used with ngx-loading module
    // which is not used in this project
    // i kept this in place to demonstrate the
    // obsrevable pattern

    this.spinnerService.hide(); // this is used for ng4-loading-spinner
    // which is used in this project

    this.spinner();
  }
}

