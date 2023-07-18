import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

   login:any = {
      correo: "",
      contrasena: ""
   }
  constructor(private router: Router) { }

  ngOnInit() {
       
    if(localStorage.getItem('accessToken')){
      this.router.navigate(['/menu/home'])
    }
  }
}
