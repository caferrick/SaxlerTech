import {Injectable} from '@angular/core';
import {SharedService} from '../services/shared.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {PayLoad, RootObject, SearchFormInterface, SecResponse} from './user';
import { SecResponse } from './models/user';
import {CommonDialogService} from '../common-dialog/common-dialog.service';
import {Router} from '@angular/router';
import {HMUserAttributes} from './models/hmUserAttributes';
import { map } from 'rxjs/operators';
//import {ExternalGroupNames} from "../user-profile/group-edit/group-edit.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userObject;

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService,
    private commonDialogService: CommonDialogService,
    private router: Router
  ) {
  }


  /**
   * Deletes a user
   * @param userDn
   */
  deleteUser(userDn: string): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(this.sharedService.getURI('deleteUser'), null,
      {params: new HttpParams().set('userDN', userDn)}
    );
  }

  /**
   * Force a password change on the user
   * @param userDn
   */
  forcePasswordChange(userDn: string): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(this.sharedService.getURI('forcePasswordChange'), userDn,
      {params: new HttpParams().set('DN', userDn)}
    );
  }

  /**
   * Unlock user account
   * @param userDn
   */
  unlockUser(userDn: string): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(this.sharedService.getURI('unlockUser'), userDn,
      {params: new HttpParams().set('dn', userDn)}
    );
  }

  /**
   * Update a users password
   * @param payload
   */
  updatePassword(payload: HMUserAttributes): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(
      this.sharedService.getURI('updatePassword'),
      {
        HMUserAttributes: payload
      }
    );
  }


  getUserByGroupDN(param: string): Observable<any> {
    return this.httpClient.get<any>(this.sharedService.getURI('findUserByGroupDN'), {params: new HttpParams().set('groupDN', param)});
  }


  /**
   * Saves a user
   * @param payload
   */
  saveUser(payload: HMUserAttributes): Observable<any> {
    return this.httpClient.post<any>(
      this.sharedService.getURI('modifyUser'), {
        HMUserAttributes: payload
      }
    );
  }



  /**
   * activates an existing user
   * @param userId
   */
  activateUser(userId: string): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(this.sharedService.getURI('activateUser'), userId,
      {params: new HttpParams().set('UID', userId)}
    );
  }

  /**
   * suspend a user
   * @param userId
   */
  suspendUser(userId: string): Observable<SecResponse> {
    return this.httpClient.post<SecResponse>(this.sharedService.getURI('suspendUser'), userId,
      {params: new HttpParams().set('UID', userId)}
    );
  }



  public getUser(userId: string): Observable<HMUserAttributes> {
    return this.httpClient.get<HMUserAttributes>(
      this.sharedService.getURI('getUser'), {params: new HttpParams().set('UID', userId)}
    ).pipe(
      map( data =>  {
        console.log(" getUser :"+ JSON.stringify(data));
        return(data);
      })
    );
  }



  public getUsersInGroup(param: string): Observable<any> {
    return this.httpClient.get<any>(
      this.sharedService.getURI('usersByGroup'), {params: new HttpParams().set('groupDN', param)}
    ).pipe(
      map( data =>  {
        console.log(" getUsersInGroup :"+ JSON.stringify(data));
        return(data);
      })
    );
  }




  handleCommonDialog(data: any, uid: string) {
    this.commonDialogService.openCommonDialog('Notice', data.message, false, 'Ok', '').subscribe(dialogData => {
      this.fixButtonRippleEffectBug();
      // refresh the route
      this.router.navigate(['user/user-profile', uid]);
    });


  }




  fixButtonRippleEffectBug() {
    const buttonList = document.getElementsByClassName('buttonRippleFix');
    const buttonArray = [].slice.call(buttonList);
    for (const currentButton of buttonArray) {
      currentButton.classList.remove('cdk-program-focused');
      currentButton.classList.add('cdk-mouse-focused');
    }
  }


  makeGroupArray(currentGroups: string[]): any {

    for (let i = 0; i < currentGroups.length; ++i) {
      for (let j = i + 1; j < currentGroups.length; ++j) {
        if (currentGroups[i] === currentGroups[j]) {
          currentGroups.splice(j--, 1);
        }
      }
    }


    return currentGroups;
  }




  setUserObject(Object  ) {
    this.userObject = Object;
  }


  getUserObject()  {
    return this.userObject;
  }




}
