import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Observable } from 'rxjs';
import { Route, RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(
      private db: AngularFireDatabase,
      private orderService: OrderService,
      private router: Router,
      private shoppingCartService: ShoppingCartService,
      private route: ActivatedRoute
    ) {

   }

 async ngOnInit() {

    this.orders$ = await this.orderService.getOrder().valueChanges();
  }

  viewOrders() {
   // this.db.list('/orders').valueChanges().subscribe(user =>
    //  console.log(user));
    console.log('nahid');
    this.router.navigate(['/view-orders/', 123]);
  }

}
