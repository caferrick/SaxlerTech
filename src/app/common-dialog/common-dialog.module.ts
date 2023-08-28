import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from './common-dialog.component';
import { CommonDialogService} from './common-dialog.service'

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    CommonDialogComponent
  ],

  providers: [CommonDialogService
  ]

})
export class CommonDialogModule { }
