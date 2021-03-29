import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompensationPageRoutingModule } from './compensation-routing.module';

import { CompensationPage } from './compensation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompensationPageRoutingModule
  ],
  declarations: [CompensationPage]
})
export class CompensationPageModule {}
