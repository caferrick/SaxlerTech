import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { AppMaterialModule } from '../material.module';
import { UserIdResolve } from './user.resolve';
import { UserRoutingModule } from './user-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserService } from './user.service';
import { CommonModule, DatePipe, SlicePipe} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material';
import { ResponsiveGridModule } from '../directives/responsive-grid.module';


@NgModule({

  declarations: [
    GroupListComponent,
    UserDetailComponent,
    UserEditDialogComponent
  ],


  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ResponsiveGridModule
  ],

  providers: [
    UserService,
    UserIdResolve,
    DatePipe,
    SlicePipe
  ],


  entryComponents: [
    UserEditDialogComponent
  ]

})

export class UserModule { }
