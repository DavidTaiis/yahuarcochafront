import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  variableMenu:any;
  public totalItem : number = 0;


  constructor(private router: Router, private route: ActivatedRoute, private cartService : CarritoService) { }

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  
  }
  goRestaurantes(){
    this.router.navigate(['menu/restaurantes/1'])
    this.variableMenu = this.route.snapshot.paramMap.get('id');
    console.log(this.variableMenu)
  }
}
