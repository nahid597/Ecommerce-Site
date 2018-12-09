import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './models/shopping-cart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
   }

  getOrder() {
    return this.db.list('/orders');
  }

  storeOrder(order) {
     const result = this.db.list('/orders').push(order);
     return result;
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref =>
    ref.orderByChild('userId').equalTo('userId'));
  }


}
