import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  send(fd: any): Observable<any> {
    return this.http.post(
      'http://ifaith-services.web/network/testPayload',
      fd
    )
  }
}
