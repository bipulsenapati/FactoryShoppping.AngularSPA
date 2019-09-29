import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ShoppingCart } from "../shared/shopping-cart.model";

@Injectable()
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  public addItemToCart(cartItem: ShoppingCart): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(
      'https://localhost:5001/api/Cart/addtobag/', cartItem, headers);
  }
  public getCartListbyUserId(userId: number): Observable<any> {
    return this.http.get("https://localhost:5001/api/Cart/" + userId);
  }

  public updateQuantitytoCart(cartid: number, quantity: number): Observable<any>   {
    return this.http.get("https://localhost:5001/api/Cart/updatequantitytocart/" + cartid + "/" + quantity);
  }
  public deleteFromCartByCartid(cartid: number): Observable<any>   {
    return this.http.delete("https://localhost:5001/api/Cart/deleteFromCart/" + cartid);
  }

  public clearCart(userid: number): Observable<any>   {
    return this.http.delete("https://localhost:5001/api/Cart/emptycart/" + userid);
  }
}
