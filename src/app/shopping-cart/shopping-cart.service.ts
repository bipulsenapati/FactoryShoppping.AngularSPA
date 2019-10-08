import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShoppingCart } from '../shared/shopping-cart.model';

@Injectable()
export class ShoppingCartService {
  constructor(private http: HttpClient) {}
  readonly baseUrl = 'https://localhost:5001/api/Cart/';
  public addItemToCart(cartItem: ShoppingCart): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.baseUrl + 'addtobag/', cartItem, headers);
  }
  public getCartListbyUserId(userId: number): Observable<any> {
    return this.http.get(this.baseUrl  + userId);
  }

  public updateQuantitytoCart(cartid: number, quantity: number): Observable<any>   {
    return this.http.get(this.baseUrl + 'updatequantitytocart/' + cartid + '/' + quantity);
  }
  public deleteFromCartByCartid(cartid: number): Observable<any>   {
    return this.http.delete(this.baseUrl + 'deleteFromCart/' + cartid);
  }

  public clearCart(userid: number): Observable<any>   {
    return this.http.delete(this.baseUrl + 'emptycart/' + userid);
  }
}
