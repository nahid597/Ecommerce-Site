import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireObject } from '@angular/fire/database';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  constructor( public auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }



  logout() {
    this.auth.logout();
  }

}
