import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  public model: Account;

  // tslint:disable-next-line: variable-name
  constructor(
    private _login: AccountService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.model = new Account();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(userData => {
      this.user = userData;
      console.log(userData);
      this.loggedIn = userData != null;
      const obj = {
        email: userData.email
      };

      console.log(obj);

      this._login.loginByGoogle(obj).subscribe(
        (res: any) => {
          console.log(res);

          this.router.navigate(['']);
          localStorage.setItem('email', obj.email);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', res.userId);
          if (res.role === 1) {
            this._snackBar.open(
              'Welcome Admin.. Enjoy  Accessibility!!! 😊',
              'Dismiss'
            );
          } else {
            const x = res.name;
            this._snackBar.open(
              'Enjoy Shopping with vela_engineer\'s Factory',
              'Dismiss'
            );
          }
        },
        err => {
          if (err.status === 400) {
            this._snackBar.open(
              'Kindly Register your Gmail Account with vela Engineers ',
              'Dismiss'
            );
          } else {
          console.log(err);
          }
        }
      );
    });
  }

  // login(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 500,
  //     verticalPosition: 'top',
  //     horizontalPosition: 'center'
  //   });
  // }

  loginuser(nf: NgForm) {
    this._login.login(nf.value).subscribe(
      resp => {
        console.log(resp);
        // this.toastr.success('Sign In Successfully');
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role', resp.role);
        localStorage.setItem('userId', resp.userId);

        if (resp.role === 1) {
          this._snackBar.open(
            'Welcome Admin.. Enjoy  Accessibility!!! 😊',
            'Dismiss'
          );
        } else {
          const x = resp.name;
          this._snackBar.open(
            'Enjoy Shopping with vela_engineer\'s Factory',
            'Dismiss'
          );
        }
        this.router.navigate(['']);
      },
      err => {
        // tslint:disable-next-line: triple-equals
        if (err.status == 400) {
          this._snackBar.open(
            'Kindly Check your email ID & Password',
            'Dismiss'
          );
        } else {
          console.log(err);
        }
      }
    );
  }
}
