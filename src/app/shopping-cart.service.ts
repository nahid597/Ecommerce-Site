import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { map} from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  store;
  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
    map(x  => new ShoppingCart(x.items)));
  }


  async addToCartId(product: Product) {

    this.updateItemQuantity(product, 1);
  }

  async removeFromCartId(product: Product) {

    this.updateItemQuantity(product, -1);

  }

  async clearAllCart()  {
    const cartId =  await this.getOrCreateCartId();
    console.log('nahid=' + cartId);
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreate: new Date().getTime()
    });
  }

   async getOrCreateCartId (): Promise<string> {

    const cartId = localStorage.getItem('cartId');
   // console.log(cartId);

    if (cartId) {
      return cartId;
    }
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;

  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


 private async updateItemQuantity(product: Product, change: number) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.query.ref.transaction(item => {
      if (item === null) {
        return { product: product, quantity: 1 };
      } else {
          item$.update({ quantity: (item.quantity || 0) + change });

      }
    }).catch(error => {
      console.log(error);
    });

  }

}
