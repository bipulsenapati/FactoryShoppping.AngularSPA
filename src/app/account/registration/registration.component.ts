import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../account.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public model : Account;
  // tslint:disable-next-line: variable-name
  constructor(private _register: AccountService, private router: Router) { }

  registeruser(nf: NgForm)
  {
    this._register.register(nf.value).subscribe( resp => {
        console.log(resp);
       });
    this.router.navigate(['']);
  }

  // signUpSucess(){
  //   this._toastr.success('Registered Successfully', 'Toastr fun');
  // }
  ngOnInit() {
    this.model = new Account();
  }

}
