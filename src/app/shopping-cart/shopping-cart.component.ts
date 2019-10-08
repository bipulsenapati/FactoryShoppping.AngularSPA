import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "./shopping-cart.service";
import { ShoppingCart, Checkout } from "../shared/shopping-cart.model";
import { Router } from "@angular/router";
import { NotificationService } from '../shared/pushnotification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  userId: number;
  checkout: Checkout = new Checkout();
  cartitem: ShoppingCart =new ShoppingCart();
  carts: ShoppingCart[] = [];
  itemsInCart = false;

  constructor(
    // tslint:disable-next-line: variable-name
    private _cartService: ShoppingCartService,
    private route: Router,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.checkout.shipping = 200;
    this.userId = +localStorage.getItem('userId');
    this.populateCart();
  }

  updateQuantity(cartId: number, quantity: number) {
    // console.log('updateQuantity', cartId, quantity);
    if (cartId > 0 && quantity > 0) {
      this._cartService
        .updateQuantitytoCart(cartId, quantity)
        .subscribe(res => {
          this.populateCart();
        });
    }
  }

  onDelete(id: number) {
    this._cartService.deleteFromCartByCartid(id).subscribe(
      response => {
        this.populateCart();
        if (this.carts.length === 0) {
          this.itemsInCart = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onClear() {
    this._cartService.clearCart(this.userId).subscribe(
      res => {
        this.itemsInCart = false;
        this.populateCart();
      },
      err => {}
    );
  }

  populateCart() {
    this._cartService.getCartListbyUserId(this.userId).subscribe(
      response => {
        this.carts = response;
        if (this.carts.length > 0) {
          this.itemsInCart = true;
          this.checkout.subTotal = this.carts
            .map(item => item.amount)
            .reduce((prev, next) => prev + next);
          this.checkout.cartTotal =
            this.checkout.subTotal < 500
              ? this.checkout.subTotal + this.checkout.shipping
              : this.checkout.subTotal;
        } else {
          this.checkout = new Checkout();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  redirectToCheckout() {
    this.notificationservice.addItemToBasket(this.checkout);
    this.route.navigate(['checkout']);
  }
}
