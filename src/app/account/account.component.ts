import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from './account.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public model: Account;
  // tslint:disable-next-line: variable-name
  constructor(private _login: AccountService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.model = new Account();
   }

   
   login(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  loginuser(nf: NgForm)
  {
    this._login.login(nf.value)
    .subscribe(
      resp =>{
        console.log(resp)
        // this.toastr.success('Sign In Successfully');
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role', resp.role);
        localStorage.setItem('userId', resp.userId);
        this.router.navigate(['']);
      },
      err =>{
        // tslint:disable-next-line: triple-equals
        if(err.status == 400)
        {
          console.log('Incorrect Username & Password','Authentication Failed');
        } else {
        console.log(err);
        }
      }

      );

  }
}
