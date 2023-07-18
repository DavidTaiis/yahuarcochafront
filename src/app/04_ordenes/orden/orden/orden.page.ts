import { Component, OnInit } from '@angular/core';
import { Modulo4Service } from 'src/app/services/04_orders/modulo4.service';
@Component({
  selector: 'app-orden',
  templateUrl: './orden.page.html',
  styleUrls: ['./orden.page.scss'],
})
export class OrdenPage implements OnInit {

  constructor( private modulo4 : Modulo4Service) { }

  orders:any;
  orderDetails:any;
  isModalOpen = false;
  ngOnInit() {
    this.getOrders()
  }

  getOrders(){
    this.modulo4.getOrders().subscribe( res => {
      this.orders = res;
    })
  }

  getOrderDetails(id:number, isOpen:boolean){
    this.isModalOpen = isOpen;
    this.modulo4.orderDatils(id).subscribe(res => {
      this.orderDetails = res;
      console.log(this.orderDetails);
      
    })
  }
  setOpen(isOpen:boolean){
    this.isModalOpen = isOpen;
  }
}
