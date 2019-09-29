import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }
   token = localStorage.getItem('token')

  public onAuthenticate()
  {
    if (this.IsAdminLoggedIn() === true) {
      return true;
    } else {
      return false;
    }
  }
  IsAdminLoggedIn() : boolean {
  
    // tslint:disable-next-line: triple-equals
    if ( this.token != null && localStorage.getItem('role') == '1') {

      return !this.jwtHelper.isTokenExpired(this.token);
    }
    // } else {
    //   return this.jwtHelper.isTokenExpired(this.token);
    // }
  }


}
