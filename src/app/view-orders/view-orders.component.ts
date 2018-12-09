import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  orders$;
  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    this.orders$ = await this.orderService.getOrder().valueChanges();
  }

}
