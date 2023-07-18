import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Modulo4Service {
  url = environment.apiUrl;
  arrayProdsCar: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    }),
  };
  constructor(private httpClient: HttpClient) { }

  createOrder(idSeller:number, total:any, products:any){
    let datos ={
      'restaurants_id' : idSeller,
      'amount' : total,
      'products' : products
    };
    return this.httpClient.post(`${this.url}order/createOrder`,datos, this.httpOptions)

  }

  getOrders(){
    return this.httpClient.get(`${this.url}order/orderByClient`, this.httpOptions)
  }

  orderDatils(id:number){
    return this.httpClient.get(`${this.url}order/getProductsOrder/${id}`, this.httpOptions)
  }

}
