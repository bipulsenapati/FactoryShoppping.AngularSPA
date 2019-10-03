import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/pushnotification.service';
import { Checkout } from '../shared/shopping-cart.model';
import { Subscription } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  subscriptions: Subscription;
  public model: Checkout = new Checkout();;
  data : any[] = [];
  public subData : any;
  constructor(private notificationservice: NotificationService,
              private checkoutService: CheckoutService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
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
}
