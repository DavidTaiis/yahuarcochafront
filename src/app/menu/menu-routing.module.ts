import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../02_restaurantes/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: 'restaurantes',
          children:[  
              {
                path: '',
                loadChildren: () =>
                import('./../02_restaurantes/restaurantes/restaurantes.module').then(
                  (m) => m.RestaurantesPageModule
                ),              },
              {
                path: 'restaurante-perfil/:id',
                loadChildren: () => import('./../02_restaurantes/restaurante-perfil/restaurante-perfil.module').then( m => m.RestaurantePerfilPageModule)
              },
              {
                path: 'detalles-producto/:id',
                loadChildren: () => import('./../02_restaurantes/detalles-producto/detalles-producto.module').then( m => m.DetallesProductoPageModule)
              },          
          ]
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../01_seguridad/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'carrito',
        loadChildren: () => import('./../03_carrito/carrito/carrito/carrito.module').then( m => m.CarritoPageModule)
      },
      {
        path: 'orden',
        loadChildren: () => import('./../04_ordenes/orden/orden/orden.module').then( m => m.OrdenPageModule)
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
