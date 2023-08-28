import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class UserIdResolve implements Resolve<any> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
   return this.userService.getUser(route.paramMap.get('userId'));
  }
}
