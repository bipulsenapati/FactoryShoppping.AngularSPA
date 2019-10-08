import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/pushnotification.service';
import { Checkout, ShoppingCart } from '../shared/shopping-cart.model';
import { Subscription } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  subscriptions: Subscription;
  public model: Checkout = new Checkout();
  data : any[] = [];
  public subData: any;
  userId: number;
  carts: ShoppingCart[] = [];
  checkout: Checkout = new Checkout();
  itemsInCart = false;
  // tslint:disable-next-line: variable-name
  constructor(private _cartService: ShoppingCartService, private notificationservice: NotificationService,
              private checkoutService: CheckoutService , private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.subscriptions = this.notificationservice.addItemToBasket$.subscribe(
    item => {
      this.model = item;
    });

  }


  saveAddress(nf: NgForm){
    // tslint:disable-next-line: radix
    this.model.UserId = parseInt(localStorage.getItem('userId'));
    this.checkoutService.createAddress(nf.value).subscribe(resp =>{
      console.log(resp);
      this._snackBar.open('Address saved Succesfully', 'Dismiss');
    },
    err => {
      console.log(err);
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
}
