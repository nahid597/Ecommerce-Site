import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input("product") product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;


  constructor( private cartsService: ShoppingCartService) { }


  addToCart() {
    this.cartsService.addToCartId(this.product);
  }



}