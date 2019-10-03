import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { Router } from '@angular/router';
import { Product } from './product/product.model';
import { CategoryService } from './product/category.service';
import { AuthService } from 'angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FactoryShoppingfront';
  classApplied = false;
  categoryList: any;

  // tslint:disable-next-line: variable-name
  constructor(private _user: AccountService, private authService: AuthService, private router: Router, public category: CategoryService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // this.filterProducts = this.product;
    this.category.getCategory()
      .subscribe(
        res => {
          this.categoryList = res;
        },
        err => {
          console.log(err);
        }
      );
  }
  toggle() {
    this.classApplied = !this.classApplied;
    if (this.classApplied) {
      document.getElementById('mySidebar').style.width = '250px';
      document.getElementById('main').style.marginLeft = '250px';
    } else {

      document.getElementById('mySidebar').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }
  }
  signout() {
    this._user.logout();
  }
  // signOutWithGoogle(): void {
  //   this.authService.signOut();
  // }
  onSubmit(){
    console.log()
  }

}
