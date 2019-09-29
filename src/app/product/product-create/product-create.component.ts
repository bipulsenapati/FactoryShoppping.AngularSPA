import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
 public category: Category;
  public model: Product;
  // slForm : NgForm;
  constructor(private _prod: ProductService, private _category: CategoryService, private router: Router) { }

  createNewProduct(nf: NgForm) {
    this._prod.createProducts(nf.value)
    .subscribe(response =>
       console.log(response),
       (response) => console.log(response.error.message));
    this.router.navigate(['']);
  }
 showCategory()
 {
   this._category.getCategory()
   .subscribe(
     (respose: any) => {
       this.category = respose;
     }
   )
 }
  ngOnInit() {
    this.model = new Product();
  }

  returnCategory(  ) {
    return this.category;
  }

}
