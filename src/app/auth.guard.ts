import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AccountService } from './account/account.service';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  // tslint:disable-next-line: variable-name
  constructor(private _auth: AuthService, private accountService: AccountService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
      const expectedRole = next.data.expectedRole;
      const token = localStorage.getItem('token');
      const tokenPayload = decode(token);

      if (this._auth.onAuthenticate() ||  localStorage.getItem('role') === expectedRole) {
         return true;
      } else if (this.accountService.loggedIn()) {
          return true;
        } else
        {
          this.router.navigate(['/login']);
        }

  }

}
