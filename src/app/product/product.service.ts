import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  readonly baseURL = 'https://localhost:5001/api/Products/';
  getProducts() {
    return this.http.get(this.baseURL );
  }

  getProductsId(id: number): Observable<any> {
    return this.http.get(this.baseURL + id);
  }
  createProducts(product: any): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer '+ localStorage.getItem('token'))
    };
    // let headers ={ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(this.baseURL , product, headers);
  }
  editProducts(product: any): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    };
    return this.http.put(this.baseURL, product, headers);
  }
  deleteProducts(id: number): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    };
    return this.http.delete(this.baseURL + id , headers);
  }

  public GetProductsByCategoryId(id: number) {
    return this.http.get(this.baseURL + 'getproductsbycategoryid/' + id);
  }
}
