import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory()
  {
   return this.http.get('https://localhost:5001/api/Categories/');
  }
}
