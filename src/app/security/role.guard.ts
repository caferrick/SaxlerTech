import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
  CanActivateChild
} from '@angular/router';

import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild  {

  constructor(
    private securityService: SecurityService,
    private router : Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.securityService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      this.router.navigate(['forbidden']);
    }

    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.securityService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['forbidden']);
    }

    return isAuthorized;
  }



}
