import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompensationPage } from './compensation.page';

const routes: Routes = [
  {
    path: '',
    component: CompensationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompensationPageRoutingModule {}
