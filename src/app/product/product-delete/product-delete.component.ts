import { Component, OnInit , Input} from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
 @Input() productdata: Product[];
  // tslint:disable-next-line: variable-name
  constructor(private _prod: ProductService, private route: Router) { }



  onDelete(id: number)
  {
    console.log(id)
    this._prod.deleteProducts(id)
      .subscribe(
        response =>
        {

        },
        error =>
        {
          console.log('Error Occured at the time of deletion');
        }
      )
    this.route.navigate(['']);
  }
  ngOnInit() {
  }
}
