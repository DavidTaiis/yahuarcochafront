import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantePerfilPageRoutingModule } from './restaurante-perfil-routing.module';

import { RestaurantePerfilPage } from './restaurante-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantePerfilPageRoutingModule
  ],
  declarations: [RestaurantePerfilPage]
})
export class RestaurantePerfilPageModule {}
