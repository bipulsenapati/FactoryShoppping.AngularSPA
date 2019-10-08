import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./product/product.component";
import { ProductService } from "./product/product.service";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailsComponent } from "./product/product-details/product-details.component";
import { ProductCreateComponent } from "./product/product-create/product-create.component";
import { FormsModule } from "@angular/forms";
import { AccountComponent } from "./account/account.component";
import { RegistrationComponent } from "./account/registration/registration.component";
import { ProductEditComponent } from "./product/product-edit/product-edit.component";
import { CategoryService } from "./product/category.service";
import { CategoryComponent } from "./product/category/category.component";
import { AppMaterialModule } from "./app.material.module";
import { AccountService } from "./account/account.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./auth.service";
import { ProductDeleteComponent } from "./product/product-delete/product-delete.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ShoppingCartService } from "./shopping-cart/shopping-cart.service";
import { UserDetailComponent } from "./account/user-detail/user-detail.component";
import { OrderComponent } from "./order/order.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { NotificationService } from "./shared/pushnotification.service";
import { MatButtonModule, MatSnackBarModule } from "@angular/material";
import { CheckoutService } from './checkout/checkout.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('850264423912-fobhg7ao1i9pq96ooaq488qh9sm0l1q6.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductCreateComponent,
    AccountComponent,
    RegistrationComponent,
    ProductEditComponent,
    CategoryComponent,
    ProductDeleteComponent,
    ShoppingCartComponent,
    UserDetailComponent,
    OrderComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    ProductService,
    CategoryService,
    AccountService,
    AuthService,
    ShoppingCartService,

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    NotificationService,
    CheckoutService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
