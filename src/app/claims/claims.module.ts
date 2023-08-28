import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { AppMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsListComponent } from './claims-list/claims-list.component';

@NgModule({
  declarations: [ClaimsListComponent],


  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    CommonModule,
    ClaimsRoutingModule
  ],

  providers: [
    DatePipe,
    SlicePipe
  ],

  entryComponents: [
  ]

})


export class ClaimsModule { }
