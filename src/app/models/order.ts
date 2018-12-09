import { ShoppingCart } from './shopping-cart';


export class Order {

    datePlace: number;
    items: any[];

    constructor(public userId: string, public shipping: any, public shoppingCart: ShoppingCart) {

        this.datePlace = new Date().getTime();

       this.items = shoppingCart.items.map(i => {
            return {
                product: i.product,
                quantity: i.quantity,
                totalPrice: i.totalPrice,
            };
        });
    }
}
