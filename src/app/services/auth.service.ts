import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseLogin} from "../types/response_login";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly RemoteURL = 'https://services.ifaith.tv'; // 'http://sdfsdfsdfsdfsdf.atwebpages.com'; // // 'http://ifaith-services.web'//  // 'http://abell-joe.atwebpages.com';
  // private readonly URL = 'http://ifaith-services.web';

  private readonly KEY = 'JWT';
  constructor(private http: HttpClient) { }

  login(data: {email: string, password: string}): Observable<any>{
    return this.http.post<ResponseLogin>(
      `${this.RemoteURL}/user/login`,
      data
    );
  }

  autoLogin(): Observable<any> {
    let token;
    token = this.getStoredToken() == '' ? 'empty' : this.getStoredToken();
    return this.http.get(`${this.RemoteURL}/user/check/${token}`);
  }

  storeToken(token: string): void{
    localStorage.setItem(this.KEY, token);
  }

  getStoredToken(): string {
    return <string>localStorage.getItem(this.KEY);
  }

  clearToken(): void{
    localStorage.setItem(this.KEY, '');
  }
}
