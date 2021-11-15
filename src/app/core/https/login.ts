import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(params: User) {
    return this.http.post(`/mars/v1/login`, params);
  }

  logout(params: User) {
    return this.http.post('/mars/v1/logout', params);
  }
}