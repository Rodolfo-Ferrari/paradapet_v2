import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginadotarPageRoutingModule } from './loginadotar-routing.module';

import { LoginadotarPage } from './loginadotar.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginadotarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginadotarPage]
})
export class LoginadotarPageModule {}
