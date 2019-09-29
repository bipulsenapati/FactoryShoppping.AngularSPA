import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }

  createAddress(address: any): Observable<any> {
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('https://localhost:5001/api/Address_Checkout', address, headers);
    }
}


