import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
edititem : any;
public model : Product;
category: any;
  // tslint:disable-next-line: max-line-length
  constructor(private _route : ActivatedRoute, private _prod: ProductService,private _category: CategoryService, private router: Router ) { }
  id;
  // public category: Category;
  editoldproduct(nf: NgForm) // take value from ui & send to API via service
  {
    console.log(nf.value)
    // tslint:disable-next-line: prefer-const
    let updatedProduct = nf.value;
    updatedProduct.pId = this.id
    this._prod.editProducts(updatedProduct).subscribe(response =>
      console.log(response),
       (response) => console.log(response.error.message));
    this.router.navigate(['']);
        // this.edititem = this.product
  }

  showCategoryforedit()
 {
   this._category.getCategory()
   .subscribe(
     (respose: any) => {
       this.category = respose;
     }
   )
 }

  ngOnInit() {
    this.model = new Product(); //instance

    this.id = this._route.snapshot.params.id; //catch id
    this.showCategoryforedit();

    this._prod.getProductsId(this.id) // i got id
      .subscribe(
        response => {
           this.model = response;
        },
        error =>{
          console.log('Error Caught while fetching Id');
        }
      )
  }

}
