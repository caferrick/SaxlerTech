import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsListComponent } from './claims-list/claims-list.component';

export const routes: Routes = [

  {path: '', redirectTo: 'claimsList', pathMatch: 'full'},


  {path: 'claimsList',
    component: ClaimsListComponent,
    runGuardsAndResolvers: 'always',
  },
];


  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClaimsRoutingModule { }

