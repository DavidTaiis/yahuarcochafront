import { Component, OnInit } from '@angular/core';
import { Modulo1Service } from 'src/app/services/01_seguridad/modulo1.service';
import { AlertController, ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile:any;
  nameUser:any;
  identification_card:any;
  phone:any;
  email:any;
  foto:any;
  file:any;
  newImage = '';
  newFile: any;
  ubicacion:any = null;

  constructor(private router:Router, private modulo01 : Modulo1Service, private alertController: AlertController, private modalController : ModalController) { }

  ngOnInit() {
    this.getUser()
  }
  getUser(){
    this.modulo01.getUser().subscribe( res => {
      if(res != null){
       this.profile = res;       
       this.nameUser = this.profile.name
       this.identification_card = this.profile.idetification_card
       this.phone = this.profile.phone
       this.email = this.profile.email
       this.foto = this.profile['photo'][0] ? this.profile['photo'][0]['url'] : '';
       if(this.profile.latitud !== null && this.profile.longitud !== null)
       this.ubicacion = {
        lat : this.profile.latitud,
        lng : this.profile.longitud
       }

      }
      else{

      }
    })
  }
  async newImageUpload(event: any) {
    
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.foto = image.target ? image.target.result as string : "";
        });
        reader.readAsDataURL(event.target.files[0]);
      }
      this.file = event.target.files[0];
    }

    updateProfile(){
   
    const formdata = new FormData();
     formdata.append('image',this.file ?? "");
     formdata.append('name', this.nameUser);
     formdata.append('phone_number', this.phone);

    
     this.modulo01.updateProfile(formdata).subscribe( async res => {
       const alert = await this.alertController.create({
         cssClass:'app-alert',
         header: '¡Exito!',
         message: 'Perfil actualizado correctamente!',
         buttons: ['OK'],
       });
 
        await alert.present();
                   
      },response => {
       console.log(response['error']['warning'][0]['value'])
   },
   () => {
       console.log("The POST observable is now completed.");
   }); 
 }  
 async addDirection() {

  let positionInput = {  
    lat:   0.3737881344952187 ,
    lng:  -78.11213791243449,
  };
 
   if (this.ubicacion !== null) {
      positionInput = this.ubicacion; 
  }
   
  
  const modalAdd  = await this.modalController.create({
    component: GooglemapsComponent,
    mode: 'ios',
    swipeToClose: true,
    componentProps: {position: positionInput}
  });
  await modalAdd.present();

  const {data} = await modalAdd.onWillDismiss();
  if (data) {
    console.log('data -> ', data);
    this.ubicacion = data.pos;
    const formdata = new FormData();
    formdata.append('latitud',this.ubicacion.latitud ?? "");
    formdata.append('longitud', this.ubicacion.longitud);
    
    this.modulo01.updateLatLng(formdata).subscribe( async res => {
      const alert = await this.alertController.create({
        cssClass:'app-alert',
        header: '¡Exito!',
        message: 'Ubicación actualizado correctamente!',
        buttons: ['OK'],
      });

       await alert.present();
                  
     },response => {
      console.log(response['error']['warning'][0]['value'])
  },
  () => {
      console.log("The POST observable is now completed.");
  }); 
  }
 }
 logout(){
  localStorage.removeItem('accessToken');
  this.router.navigate(['/'])
 }
}
