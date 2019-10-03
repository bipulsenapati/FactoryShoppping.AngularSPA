import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../account.service";
import { NgForm } from "@angular/forms";
import { Account, Address } from "../account.model";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(
    private _route: ActivatedRoute,
    private _userdetails: AccountService,
    private _snackBar: MatSnackBar
  ) {}
  id: any;
  userData: Account;
  public model: Account = new Account();
  public amodel: Address = new Address();
  editUserDetails(
    nf: NgForm // take value from ui & send to API via service
  ) {
    console.log(nf.value);
    // tslint:disable-next-line: prefer-const
    let updatedUser = nf.value;
    updatedUser.UserId = this.id;
    this._userdetails
      .updateProfile(updatedUser)
      .subscribe(response =>
        this._snackBar.open("Your Details Updated Successfully", "Dismiss")
      );
    //  (response) => console.log(response.error.message));
  }

  setAddress(
    nf: NgForm // take value from ui & send to API via service
  ) {
    console.log(nf.value);
    // tslint:disable-next-line: prefer-const
    let updatedAddres = nf.value;
    updatedAddres.UserId = this.id;
    updatedAddres.addressId = this.amodel.addressId;
    this._userdetails.manageAddress(updatedAddres).subscribe(response => {
      if (response) {
        this._snackBar.open("Your Address Updated Successfully", "Dismiss");
      }
    });
    //  (response) => console.log(response.error.message));
  }
  ngOnInit() {
    this.id = localStorage.getItem("userId");
    this._userdetails.getUserById(this.id).subscribe(response => {
      this.model = response;
    }),
      this._userdetails.getAddressByUserId(this.id).subscribe(response => {
        console.log(response);
        this.amodel = response;
        console.log(this.amodel);
      });
  }
}
