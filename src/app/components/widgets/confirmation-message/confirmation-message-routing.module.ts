import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfirmationMessageComponent} from "./confirmation-message.component";

const routes: Routes = [
  {path: '', component: ConfirmationMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationMessageRoutingModule { }
