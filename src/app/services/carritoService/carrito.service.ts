import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');
  public isDuplicated: Boolean = false;

  constructor(private alertController: AlertController) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  async addtoCart(product: any) {
    if (this.cartItemList.length > 0) {
      this.isDuplicated = false;

      for (let index = 0; index < this.cartItemList.length; index++) {
        if (this.cartItemList[index].restaurantId != product.restaurantId) {
          const alert = await this.alertController.create({
            cssClass: 'app-alert',
            header: '¡Mensaje!',

            subHeader: 'Solo se puede realizar compras de un restaurante',
            buttons: [
              {
                text: 'Entendido',
                role: 'confirm',
                handler: () => {},
                
              },
            ],
          });

          await alert.present();
          this.isDuplicated = true;
          break;
        } else {
          if (this.cartItemList[index].id === product.id) {
            this.cartItemList[index].quantity =
              this.cartItemList[index].quantity + product.quantity;
            this.cartItemList[index].subtotal =
              Number(this.cartItemList[index].subtotal) +
              Number(product.subtotal);
            this.productList.next(this.cartItemList);
            this.getTotalPrice();
            this.isDuplicated = true;
            break;
          }
        }
      }
      if (!this.isDuplicated) {
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
      }
    } 
    
    else {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal = grandTotal + Number(a.subtotal);
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.item === a.item) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  getData() {
    let data: any[] = [];
    let datos = {};
    this.cartItemList.map((a: any) => {
      let auxData = {
        id: a.id,
        subtotal: a.subtotal,
        quantity: a.quantity,
      };
      data = data.concat(auxData);
      datos = {
        restaurant: a.restaurant,
        phone: a.phone,
        data: data,
      };
    });
    return datos;
  }
}
