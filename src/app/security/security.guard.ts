import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {SecurityService} from './security.service';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SecuredUser} from './securedUser'
import {HmUser, HMUserAttributes} from '../user/models/hmUserAttributes';


@Injectable()
export class SecurityGuard implements CanLoad {

  constructor(private secService: SecurityService) {

  }


  canLoad(): Observable<boolean> {
    return this.secService.getUserInfo()
      .pipe(
        map(response => this.responseChecker(response)),
        catchError(error => of(false))
      );
  }


  /**
   * The response checker makes sure that the user can load the routes
   * @param response
   */
  private responseChecker(response: HMUserAttributes): boolean {
    this.secService.constructUser(response);
    return this.secService.isUserAuthenticated();
  }
}
