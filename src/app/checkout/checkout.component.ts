import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/pushnotification.service';
import { Checkout } from '../shared/shopping-cart.model';
import { Subscription } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { NgForm } from '@angular/forms';
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
  constructor(private notificationservice: NotificationService, private checkoutService: CheckoutService) {
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

  saveAddress(nf: NgForm){
    this.checkoutService.createAddress(nf.value).subscribe(resp =>{
      console.log(resp);
    });
  }
}
