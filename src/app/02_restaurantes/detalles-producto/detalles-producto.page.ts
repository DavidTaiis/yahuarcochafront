import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Modulo2Service } from 'src/app/services/02_restaurantes/modulo2.service';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.page.html',
  styleUrls: ['./detalles-producto.page.scss'],
})
export class DetallesProductoPage implements OnInit {

  constructor(private toastController: ToastController,private route: ActivatedRoute, private modulo2Service : Modulo2Service, private cartService : CarritoService, private nvctrl : NavController) { }
  productoId:any;
  producto:any;
  id:any;
  productName:any;
  productDescription:any;
  productPrice:any;
  cantidad:number = 1;
  total:any;
  products:any;
  item:any= 0;
  productCar:any;
  restaurantName:any;
  restaurantId:any;
  restaurantPhone:any;


  ngOnInit() {
    this.productoId = Number(this.route.snapshot.paramMap.get("id"))
    this.getProduct()
    this.cartService.getProducts()

    .subscribe(res=>{
      this.products = res;
    })
  }

  getProduct(){
    this.modulo2Service.getProductById(this.productoId).subscribe(res => {
      this.producto = res;
      this.productName = this.producto[0].name;
      this.productDescription = this.producto[0].description;
      this.productPrice = this.producto[0].price
      this.id = this.producto[0].id;
      this.total = this.productPrice;
      this.restaurantName = this.producto[0].restaurant ? this.producto[0].restaurant.name : "";      
      this.restaurantId = this.producto[0].restaurant ? this.producto[0].restaurant.id : "";      
      this.restaurantPhone = this.producto[0].restaurant ? this.producto[0].restaurant.phone_number : "";    
      
    })
  }

  addCantidad(){
    this.cantidad += 1;
    this.total = (this.cantidad * this.productPrice).toFixed(2);
  }
  lessCantidad(){
    if(this.cantidad > 1){
      this.cantidad -= 1;
    this.total = (this.cantidad * this.productPrice).toFixed(2);

    }
  }

  async  addCar(){
  
        const toast = await this.toastController.create({
          message: 'Producto añadido al carrito de compras',
          duration: 2500,
          position: "bottom",
        });
    
        await toast.present();
      

      if(this.products.length > 0){
        this.item = this.products[this.products.length -1].item +1;

      }
      this.productCar ={
        "item": this.item,
        "id": this.id,
        "quantity": this.cantidad,
        "productName": this.productName,
        "descriotion" : this.productDescription,
        "price": this.productPrice,
        "subtotal" : this.total,
        "restaurant": this.restaurantName,
        "phone": this.restaurantPhone,
        "restaurantId": this.restaurantId,
        /* "fotoProduct" : this.fotoProduct */
      }
      this.cartService.addtoCart(this.productCar);
      this.nvctrl.back();
      
    }
  
}
