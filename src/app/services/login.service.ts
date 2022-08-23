import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = "http://localhost:8080/api/login";

  constructor(private http:HttpClient) { }

  doLogin(user:User): Observable<object> {
    console.log(user);
    return this.http.post(`${this.baseURL}`, user);
  }
}
