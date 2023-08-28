
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserDetailComponent} from './user-detail/user-detail.component';
//import {UserManagerComponent} from './user-manager/user-manager.component';
//import {UserProfileComponent} from './user-profile/user-profile.component';
import { UserIdResolve } from './user.resolve';
import { GroupListComponent } from './group-list/group-list.component';
//import {ExternalGroupResolve} from "./user-profile/group-edit/external-group.resolve";

export const routes: Routes = [
  {path: '', redirectTo: 'user-detail/:userId', pathMatch: 'full'},

  {path: 'user-detail/:userId',
   component: UserDetailComponent,
   runGuardsAndResolvers: 'always',
   resolve: {hmkData: UserIdResolve}
  },

  {path: 'group-list',
    component: GroupListComponent,
    runGuardsAndResolvers: 'always',
  },




  /*{
    path: 'user-profile/:userId',
    component: UserProfileComponent,
    runGuardsAndResolvers: 'always',
    resolve: {hmkData: UserIdResolve},
    children: [
      {
        path: '',
        redirectTo: 'userInfo',
        pathMatch: 'full'
      },
      {
        path: 'userInfo',
        component: UserInfoComponent
      },
      {
        path: 'groupEdit',
        component: GroupEditComponent,
        resolve: {externalGroupNames: ExternalGroupResolve}
      }
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
