import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { ShoppingCart } from "src/app/shared/shopping-cart.model";
import { Subject } from "rxjs";
import { ShoppingCartService } from "src/app/shopping-cart/shopping-cart.service";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  private addItemToCartSource = new Subject<ShoppingCart>();
  addItemToCart$ = this.addItemToCartSource.asObservable();

  // tslint:disable-next-line: variable-name
  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private prod: ProductService,
    // tslint:disable-next-line: variable-name
    private _cartService: ShoppingCartService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  id: any;

  product: Product;
  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    console.log(this.id);
    this.prod.getProductsId(this.id).subscribe(
      response => {
        this.product = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  isUserAvailabe(): boolean {
    if( localStorage.getItem('token') != null) {
      this.addToCart(this.product);
      return true;
    }  else {
      this.router.navigate(['login']);
      return false;
    }
  }


  addToCart(product: Product) {
    const cart = new ShoppingCart();
    cart.PId = product.pId;
    cart.price = product.price;
    cart.orderQuantity = 1;
    cart.productName = product.name;
    cart.productImage = product.imagePath;
    cart.UserId = +localStorage.getItem('userId');
    this._cartService.addItemToCart(cart).subscribe(
      () => {
        this._snackBar.open('Item added to Cart Successfully', 'dismiss');
      },
      error => {
        console.log(error);
      }
    );
  }
}
