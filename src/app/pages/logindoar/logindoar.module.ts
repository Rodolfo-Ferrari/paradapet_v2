import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogindoarPageRoutingModule } from './logindoar-routing.module';

import { LogindoarPage } from './logindoar.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogindoarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LogindoarPage]
})
export class LogindoarPageModule {}
