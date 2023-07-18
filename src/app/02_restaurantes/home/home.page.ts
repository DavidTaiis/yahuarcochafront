import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Modulo2Service } from 'src/app/services/02_restaurantes/modulo2.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    slidesPerView: 2.2,
  };
  slideOpts1 = {
    slidesPerView: 1.3,
  };
  popularItems: any;
  featuredItems: any;

  constructor(private apiService : ApiService, private modulo2: Modulo2Service) { }

  ngOnInit() {
    this.getProducts();
    this.getRestaurants()
 
  }
  
  getRestaurants(){
    this.modulo2.getRestaurants().subscribe( res => {
      this.featuredItems = res;
      console.log(this.featuredItems);
      
    })
  }
  getProducts(){
    this.modulo2.getAllProducts().subscribe( res => {
      this.popularItems = res;      
    })
  }
}
