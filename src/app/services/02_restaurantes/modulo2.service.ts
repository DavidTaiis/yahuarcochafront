import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Modulo2Service {
  url = environment.apiUrl;
  arrayProdsCar: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    }),
  };
  constructor(private httpClient: HttpClient) { 
    
  }
  getRestaurants(){
    return this.httpClient.get(`${this.url}restaurants/getRestaurants`, this.httpOptions)
    }
  
  getRestaurantById(restaurantId:number){
      return this.httpClient.get(`${this.url}restaurants/getRestaurantsById/${restaurantId}`, this.httpOptions)
    }
  
  getCategories(){
    return this.httpClient.get(`${this.url}categories/getCategories`, this.httpOptions)
    }
  
  getProductsByIds(restaurantId:number, categoryId:number){
    return this.httpClient.get(`${this.url}products/getProducts/${restaurantId}/${categoryId}`, this.httpOptions)

  }
  getProductById(productId:number){
    return this.httpClient.get(`${this.url}products/getProductById/${productId}`, this.httpOptions)

  }
  getAllProducts(){
    return this.httpClient.get(`${this.url}products/getAllProducts`, this.httpOptions)

  }  
}
