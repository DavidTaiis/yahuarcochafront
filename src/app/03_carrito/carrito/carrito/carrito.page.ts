import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { Modulo4Service } from 'src/app/services/04_orders/modulo4.service';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private toastController: ToastController,private modulo4 : Modulo4Service, private cartService : CarritoService, public modalController: ModalController,  private alertController: AlertController) { }
  products: any;
  restaurantName: any;
  restaurantPhone:any;
  totalItem:any;
  data:any;
  grandTotal:any;
  resstaurant:any;
  productos:any;
  restaurantId: any;
  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.totalItem = res.length;
      console.log(this.products);
      if(this.totalItem > 0 ){
        this.restaurantName = this.products[0].restaurant
        this.restaurantPhone = this.products[0].phone
        this.grandTotal = this.cartService.getTotalPrice();
        this.data = this.cartService.getData();
        if(this.data !== ''){
          this.resstaurant = this.data.restaurant
          this.productos = this.data.data
          this.restaurantId = this.data.restaurantId

        }
       
      }
      
    })
    
  }
  deleteProduct(product:any){
    this.cartService.removeCartItem(product);
  }
  generarOrden(){
  
     if (this.grandTotal !== 0.0) {
      let idSeller = this.products[0]['restaurantId'];
      this.modalController.dismiss();
      this.modulo4.createOrder(
          idSeller,
          this.grandTotal,
          this.productos
        ).subscribe( async res => {

          const toast = await this.toastController.create({
            message: 'Orden generada exitosamente',
            duration: 2500,
            position: "bottom",
          });
      
          await toast.present();
          setTimeout(() => {
          location.href = '/menu/orden'
          }, 2500);
        })
    } 

  }
  async confirmarOrden(){
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: '¿Generar orden?',

      subHeader:
        'Para generar la orden debes presionar sobre el botón confirmar',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: async () => {
          this.generarOrden();
          },
        },
      ],
    });

    await alert.present();
  }
}
