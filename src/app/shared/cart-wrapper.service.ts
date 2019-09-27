import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ShoppingCart } from "./shopping-cart.model";
import { Product } from '../product/product.model';

@Injectable()
export class CartWrapperService {
   addItemToCartSource = new Subject<ShoppingCart>();
  //addItemToCart$ = this.addItemToCartSource.asObservable();
  constructor() {}

  addItemToCart(product: Product) {
    const cart = new ShoppingCart();
    cart.PId = product.pId;
    cart.price = product.price;
    cart.orderQuantity = 1;
    cart.productName = product.name;
    cart.productImage = product.imagePath;
    cart.UserId = +localStorage.getItem('userId');
    this.addItemToCartSource.next(cart);
  }
}
