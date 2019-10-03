import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router) {}

  login(ldata): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post("https://localhost:5001/api/Login", ldata, headers);
  }

  loginByGoogle(gldata): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(
      "https://localhost:5001/api/Login/guestByGoogle",
      gldata,
      headers
    );
  }

  register(inputData: Account): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    // tslint:disable-next-line: no-debugger

    return this.http.post(
      "https://localhost:5001/api/User/saveUser",
      inputData,
      headers
    );
  }

  isAuthenticated() {
    // user for validation to show either login  register or signout
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // remove token
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }
  loggedIn(): boolean {
    if (localStorage.getItem("token") && localStorage.getItem("role") === "2") {
      return true;
    }
    return false;
  }
  getUserById(id: number): Observable<any> {
    return this.http.get("https://localhost:5001/api/User/" + id);
  }

  updateProfile(userid): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put("https://localhost:5001/api/User", userid);
  }

  getAddressByUserId(id: number): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.get(
      "https://localhost:5001/api/Address_Checkout/" + id,
      headers
    );
  }

  manageAddress(address): Observable<any> {
    const headers = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put(
      "https://localhost:5001/api/Address_Checkout/",
      address
    );
  }
}
