import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  items: any[] = [
    {
      id: 1,
      name: 'Doña Juanita',
      price: 2.50,
      category: 'Doña Rosita',
      img: 'assets/imgs/tilapia.png',
    },
    {
      id: 2,
      name: 'Doña Isabel',
      price: 3,
      category: 'INDIA',
      img: 'assets/imgs/tilapia.png',
    },
    {
      id: 3,
      name: 'Don Pedro',
      price: 3,
      category: 'USA',
      img: 'assets/imgs/tilapia.png',
    },
  ];
  constructor() {}

  getItem(id: number) {
    const item = this.items.find((x) => x.id == id);
    return item;
  }
}
