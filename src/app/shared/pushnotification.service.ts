import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  orderDetails: Subject<any> = new Subject<any>();
  constructor() { }

  notifyOrderSummary(actionName: any) {
     debugger
    this.orderDetails.next(actionName);
}
}
