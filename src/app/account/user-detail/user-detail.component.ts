import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { NgForm } from '@angular/forms';
import { Account } from '../account.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _route: ActivatedRoute, private _userdetails: AccountService, private _snackBar: MatSnackBar) { }
  id: any;
  userData: Account;
  public model : Account;
  editUserDetails(nf: NgForm) // take value from ui & send to API via service
  {
    console.log(nf.value)
    // tslint:disable-next-line: prefer-const
    let updatedUser = nf.value;
    updatedUser.UserId = this.id;
    this._userdetails.updateProfile(updatedUser).subscribe(response =>
       this._snackBar.open('Your Details Updated Successfully', 'Dismiss'));
      //  (response) => console.log(response.error.message));

  }

  ngOnInit() {
    this.model = new Account();
    this.id = localStorage.getItem('userId');
    this._userdetails.getUserById(this.id).subscribe(
      response => {
        console.log(response);
        this.model = response;
      }
    )
  }

}
