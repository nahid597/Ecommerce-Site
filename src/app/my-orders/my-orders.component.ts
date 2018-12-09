import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  order;
  constructor(private authService: AuthService, private orderService: OrderService) {

  }

 async ngOnInit() {
    /*const orders$ = await this.authService.user$.pipe(map(u => this.orderService.getOrdersByUser(u.uid)));
    orders$.subscribe(order => this.order = order);*/
  }

}
