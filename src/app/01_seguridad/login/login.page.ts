import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Modulo1Service } from 'src/app/services/01_seguridad/modulo1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String = '';
  password: String = '';
  public accesToken = '';
  respuesta: any;
  constructor(private modulo1Service: Modulo1Service,
     private router: Router,
     private alertController: AlertController) {}
  ngOnInit() {

  }

  login() {
    this.modulo1Service.login(this.email, this.password).subscribe((res) => {
      this.respuesta = res;
      this.accesToken = this.respuesta['accessToken'];
      localStorage.setItem('accessToken', this.accesToken);
      this.router.navigate(['/menu/home'])
    }, async (response) => {

      const alert = await this.alertController.create({
        // css personalizado realizar
        cssClass: 'app-alert',
        header: response['error']['warning'][0]['value'],
        message: 'Verifica tus datos y vuelve a ingresar',
        buttons: ['OK'],
      });

      await alert.present();
      
    }
    );
  }
}
