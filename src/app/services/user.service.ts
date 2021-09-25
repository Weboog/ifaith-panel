import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'https://v2-services.ifaith.tv/user'// 'https://services.ifaith.tv/user' // 'http://ifaith-services.web/user';

  constructor(private http: HttpClient) { }

  list(): Observable<User[]>{
    return this.http.get<User[]>(this.URL);
  }

  block(hash: string, decision: boolean): Observable<{ done: boolean }> {
    return this.http.patch<{ done: boolean }>(`${this.URL}/switchBlock`, {hash, decision});
  }
}
