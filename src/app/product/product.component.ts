import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // private _dlt: ProductDeleteComponent;
  constructor(private _prod: ProductService, private route: Router,
    private _auth: AuthService, public routeer: ActivatedRoute, ) {

    // this._dlt = new ProductDeleteComponent();
  }
  id: any;
  products: any;
  myproduct: any;
  editProductDetail: any;
  categoryId: any;
  ngOnInit() {
      this._prod.getProducts()
    .subscribe(
      res => {
        console.log('Successfully displayed Product by id' + res);
        this.products = res;
      },
      err => {
        console.log(err);
      }
    );

    this.routeer.params.subscribe(params => {
        this.categoryId = params.id;
        console.log('got category');
        this.getProductsByCategoryId(this.categoryId); // reset and set based on new parameter this time

      });

  }
  getProductsByCategoryId(categoryId: number) {
    this.categoryId = +this.routeer.snapshot.paramMap.get('id');
    console.log(this.categoryId);
    this.categoryId = categoryId;
    this._prod.GetProductsByCategoryId(this.categoryId).subscribe(
      (res: any) => {
        console.log(res),
          this.products = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onAdminAccess() {
    //if (this._auth.IsAdminLoggedIn() === true) {
      if (localStorage.getItem('role') === '1') {
      return true;
    } else {
      return false;
    }
  }


  onGetDetail(id: any) {
    console.log(id);
    this.route.navigate(['/productDetail', id]);

  }

  oneditProduct(prod) {
    this.editProductDetail = prod;
    console.log(this.editProductDetail);
    this.route.navigate(['/editproduct', prod.pId]);
  }

  redirectToProduct(){
    this.route.navigate(['/addproduct']);
  }

}
