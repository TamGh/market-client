import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../models/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.apiUrl}api/products`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  add(product: IProduct): Observable<any> {
    return this.http.post(`${this.url}`, product);
  }

  update(product: IProduct): Observable<any> {
    return this.http.put(`${this.url}`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
