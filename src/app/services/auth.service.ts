import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;
  TokenSubject = new BehaviorSubject<string>(null);

  constructor(private http:HttpClient) { }

  login(userName: string, password: string): Observable<any> {
      return this.http.post(`${this.url}api/accounts/login`, {userName, password});
  }

  logout(){
    localStorage.clear();
    this.TokenSubject.next(null);
  }
}
