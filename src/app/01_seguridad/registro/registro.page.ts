import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Modulo1Service } from 'src/app/services/01_seguridad/modulo1.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  name:String = '';
  identification_card = '';
  phone_number = '';
  password = '';
  email = '';
  confirmaPassword='';
  submit = false;
  iguales!: boolean;
  mailValido! : boolean;
  
  presiono!:boolean;
  presionoMail!:boolean;

  constructor(private modulo1Service: Modulo1Service,
     private router: Router,
     private alertController: AlertController) { }


  ngOnInit() {
  }

  register(){
    this.submit = true;
   
    if(this.name !== '' && this.identification_card !== '' && this.phone_number !== '' && this.password !== '' && this.confirmaPassword !== '' && this.email !== '' && this.iguales){
      this.modulo1Service.register(this.name, this.identification_card, this.phone_number, this.password, this.email).subscribe(async res => {
        const alert = await this.alertController.create({
          // css personalizado realizar
          cssClass: 'app-alert',
          header: '¡Éxito',
          message: 'Usuario creado correctamente',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/'])
      },
      async (response) => {
  
        const alert = await this.alertController.create({
          // css personalizado realizar
          cssClass: 'app-alert',
          header: '¡Error!',
          message: response['error']['warning'][0]['value'],
          buttons: ['OK'],
        });
  
        await alert.present();
      },
      () => {
        console.log('The POST observable is now completed.');
      }
      )
    }
    
  }
  contraseIguales(){
    this.presiono = true;
    if(this.confirmaPassword !== '' && this.password !== ''){
      if(this.password === this.confirmaPassword){
        this.iguales = true;
      }
    }
  }
  esEmailValido():boolean {
    this.presionoMail = true;
      'use strict';

      var EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

      if (this.email.match(EMAIL_REGEX)){
        this.mailValido = true;
      }
    return this.mailValido;
  }
}
