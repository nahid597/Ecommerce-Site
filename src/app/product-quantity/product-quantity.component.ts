import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input("product") product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartsService: ShoppingCartService) { }


  addToCart() {
    this.cartsService.addToCartId(this.product);
  }

  removeFromCart() {
    this.cartsService.removeFromCartId(this.product);
  }


}
