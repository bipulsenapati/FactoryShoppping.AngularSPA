import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Checkout } from './shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }
  private addItemToBasketSource = new BehaviorSubject<Checkout>(new Checkout());
  addItemToBasket$ = this.addItemToBasketSource.asObservable();


  addItemToBasket(item: Checkout) {
    this.addItemToBasketSource.next(item);
  }

}
