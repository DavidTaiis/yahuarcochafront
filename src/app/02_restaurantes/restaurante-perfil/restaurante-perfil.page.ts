import { Component, OnInit } from '@angular/core';
import { Modulo2Service } from 'src/app/services/02_restaurantes/modulo2.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-restaurante-perfil',
  templateUrl: './restaurante-perfil.page.html',
  styleUrls: ['./restaurante-perfil.page.scss'],
})
export class RestaurantePerfilPage implements OnInit {

  constructor(private route: ActivatedRoute, private modulo2Service : Modulo2Service) { 

  }
  restaurante:any;
  restauranteId :any;
  name:any;
  categories:any;
  valueSelected = 0;
  products:any;
  firstCategory:any;
  mostrar:boolean = false;
  
  
  ngOnInit() {
    this.restauranteId = Number(this.route.snapshot.paramMap.get("id"))
    this.getRestaurante();
    this.getCategories();
    setTimeout(() => {
    this.getFirstProducts();
      
    }, 1000);
  }

  getRestaurante(){
    this.modulo2Service.getRestaurantById(this.restauranteId).subscribe((res) => {
        this.restaurante = res;
        this.restaurante = this.restaurante[0];
        this.name = this.restaurante.name;
         
      },
      (response) => {
        console.log(response['error']['warning'][0]['value']);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }

  getCategories(){
    this.modulo2Service.getCategories().subscribe( (res) => {
      this.categories = res;
      this.mostrar = true;
      this.valueSelected = this.categories[0].id
    },
    (response) => {
      console.log(response['error']['warning'][0]['value']);
    },
    () => {
      console.log('The POST observable is now completed.');
    }
    )
  }
  
  getFirstProducts(){
    this.modulo2Service.getProductsByIds(this.restauranteId, this.valueSelected).subscribe( (res) => {
      this.products = res;
    },
    (response) => {
      console.log(response['error']['warning'][0]['value']);
    },
    () => {
      console.log('The POST observable is now completed.');
    })
  
  }
  
  segmentChange(event:any){
    this.valueSelected = event.detail.value;
    this.modulo2Service.getProductsByIds(this.restauranteId, this.valueSelected).subscribe( (res) => {
      this.products = res;
      
    },
    (response) => {
      console.log(response['error']['warning'][0]['value']);
    },
    () => {
      console.log('The POST observable is now completed.');
    })
  }
}
