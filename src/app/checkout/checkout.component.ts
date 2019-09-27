import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../shared/pushnotification.service';
import { Checkout } from '../Shared/shopping-cart.model';
import { Subscription } from 'rxjs';
import { summaryFileName } from '@angular/compiler/src/aot/util';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  subscriptions: Subscription[];
  public model: Checkout;
  data : any[] = [];
  public subData : any;
  constructor(private notificationservice: NotificationService) {
    this.subscriptions = [];
    // Todo you have to subscribe the subject defined iin cart checkout button
   }

  ngOnInit() {
  this.model = new Checkout();
  this.notificationservice.orderDetails.subscribe((action: Checkout) => {

    this.data.push(action);
    this.model.subTotal = action.subTotal;
    this.model.shipping = action.shipping;
    this.model.cartTotal = action.cartTotal;
    console.log(this.model);
  });
  this.subscriptions.push();

  }



}
