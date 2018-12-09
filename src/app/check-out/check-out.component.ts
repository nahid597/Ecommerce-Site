import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }

  shipping = {};
  cart: ShoppingCart;
  userId: string;
  orderSubscription: Subscription;
  userSubscription: Subscription;

 async placeOrder(shipping) {

   const order = new Order(this.userId, shipping, this.cart );

    const result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.orderSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
