import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Modulo1Service {
  url = environment.apiUrl;
  arrayProdsCar: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    }),
  };

  constructor(private httpClient: HttpClient) {}

  login(email:String, password:String) {
    let datos = {
      'email': email,
      'password': password,
      'role': 'Cliente'
    }
    return this.httpClient.post(`${this.url}auth/login`, datos, this.httpOptions);
  }

  register(name:String, identification_card:String, phone_number:String, password:String, email:string){
    let datos = {
      'name': name,
      'email': email,
      'password': password,
      'phone_number': phone_number,
      'identification_card': identification_card,
      'role': 'Cliente'
    }
    
    return this.httpClient.post(`${this.url}user/register`, datos, this.httpOptions);

  }
  getUser(){
    return this.httpClient.get(`${this.url}user/getUser`, this.httpOptions)

  }
  updateProfile(formdata: FormData){
    const httpOptions = {
       headers: new HttpHeaders({ 'Accept': '*/*' ,'Authorization': 'Bearer '+localStorage.getItem('accessToken')})
     };
     return this.httpClient.post(`${this.url}user/updateProfileUser`,formdata, httpOptions);
   }

   updateLatLng(formdata: FormData){
    const httpOptions = {
       headers: new HttpHeaders({ 'Accept': '*/*' ,'Authorization': 'Bearer '+localStorage.getItem('accessToken')})
     };
     return this.httpClient.post(`${this.url}user/updateLatLng`,formdata, httpOptions);
   }
}
