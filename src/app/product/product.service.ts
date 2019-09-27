import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get('https://localhost:5001/api/Products');
  }

  getProductsId(id: number): Observable<any> {
    return this.http.get('https://localhost:5001/api/Products/' + id);
  }
  createProducts(product: any): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer '+ localStorage.getItem('token'))
    };
    // let headers ={ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post('https://localhost:5001/api/Products/', product, headers);
  }
  editProducts(product: any): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    };
    return this.http.put('https://localhost:5001/api/Products/', product, headers);
  }
  deleteProducts(id: number): Observable<any> {
    const headers = {
      headers : new HttpHeaders().set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    };
    return this.http.delete('https://localhost:5001/api/Products/' + id , headers);
  }

  public GetProductsByCategoryId(id: number) {
    return this.http.get('https://localhost:5001/api/Products/getproductsbycategoryid/' + id);
  }
}
