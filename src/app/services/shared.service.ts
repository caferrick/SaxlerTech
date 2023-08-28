import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // set to true spinner will show when making a service call
  // set to false spinner will NOT show during the service call
  DISPLAY_SPINNER = true;

  // Default of 1000ms 1 seconds. If a service call takes longer than
  // SPINNER_THRESHOLD value the spinner will be displayed other wise
  // it will not be displayed. Also DISPLAY_SPINNER must be set to TRUE
  // for this value to take effect.
  private _spinner_threshold = 500;
  private _spinner_timeout = 20000;

  private UID_COOKIE_NAME = "HighWireUserUID";

  endPoints = [
    {URI: '/secser/x-services/userUtility/contactUs', KEY: 'contactUs'},
    {URI: '/secinn/rest/userServices/getExternalGroupNames',KEY: 'getExternalGroupNames'}
  ];


  constructor() {
  }



  getUidCookieName(): string {
    return this.UID_COOKIE_NAME
  }

  /**
   * Get the uri based on the key
   * @param findKEY key to fetch uri from
   */
  getURI(findKEY: string): string {
    const val = this.endPoints.find(x => x.KEY === findKEY);
    return val.URI;
  }


  getDisplaySpinner(): boolean {
    return this.DISPLAY_SPINNER;
  }

  public get spinnerThreshold(): number {
    return this._spinner_threshold;
  }

  public get spinnerTimeout(): number {
    return this._spinner_timeout;
  }

}
