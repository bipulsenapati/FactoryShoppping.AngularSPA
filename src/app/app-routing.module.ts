import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserDetailComponent } from './account/user-detail/user-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';



const routes: Routes = [
  {path: 'product/:id', component: ProductComponent},
  { path : 'productDetail/:id', component: ProductDetailsComponent},
  { path : 'productCreate/product', component: ProductCreateComponent , canActivate: [AuthGuard]},
  { path : 'addproduct', component: ProductCreateComponent , canActivate: [AuthGuard],  data:{expectedRole:['1']}},
  { path : 'editproduct/:id', component: ProductEditComponent, canActivate: [AuthGuard], data:{expectedRole:['1']}},
  { path : 'deleteproduct/:id', component: ProductDeleteComponent, canActivate: [AuthGuard], data:{expectedRole:['1']}},
  { path : 'addtocart', component: ShoppingCartComponent},
  { path : 'login', component: AccountComponent},
  { path : 'register', component: RegistrationComponent},
  { path : 'userdetails', component: UserDetailComponent},
  { path : 'checkout', component: CheckoutComponent},
  { path : 'order', component: OrderComponent },
  { path : '**', component: ProductComponent},
  { path : ' ', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
