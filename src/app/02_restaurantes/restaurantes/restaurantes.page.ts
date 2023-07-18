import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Modulo2Service } from 'src/app/services/02_restaurantes/modulo2.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
  slideOpts = {
    slidesPerView: 2.2,
  };
  slideOpts1 = {
    slidesPerView: 1.3,
  };
  restaurants: any;

  constructor(private modulo2Service : Modulo2Service) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(){
    this.modulo2Service.getRestaurants().subscribe(
      (res) => {
        this.restaurants = res;
      },
      (response) => {
        console.log(response['error']['warning'][0]['value']);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }

}
