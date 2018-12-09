import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppinCartService: ShoppingCartService,
  ) {

    productService.getAll().subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(parms => {
        this.category = parms.get('category');

        this.filterProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    });
   }

 async ngOnInit() {

  this.subscription = (await this.shoppinCartService.getCart()).pipe()
   .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
