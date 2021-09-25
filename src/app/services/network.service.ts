import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Channel} from "../types/channel";
import {Info} from '../types/info';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private readonly URL = 'https://services.ifaith.tv/network';// 'http://ifaith-services.web/network';// 'https://services.ifaith.tv/network';
  constructor(private http: HttpClient) { }

  getChannel(hash: string): Observable<Channel>{
    return this.http.get<Channel>(`${this.URL}/channel/${hash}`);
  }

  generateHashWithMaxOrder(): Observable<{hash: string, maxOrder: number}>{
    return this.http.get<{hash: string, maxOrder: number}>(`${this.URL}/hash`);
  }

  list(): Observable<Channel[]>{
    return this.http.get<Channel[]>(`${this.URL}`);
  }

  add(fd: FormData): Observable<any>{
    return this.http.post(
      `${this.URL}/add`,
      fd
    );
  }

  active(hash: string, decision: boolean): Observable<any> {
    return this.http.get(
      `${this.URL}/deactivate/${hash}/${decision}`,
    );
  }

  addInfos(fd: FormData): Observable<any>{
    return this.http.post(
      `${this.URL}/info`,
      fd
    )
  }

  getInfo(hash: string): Observable<{channelInfo: Info|false}> {
    return this.http.get<{channelInfo: Info|false}>(`${this.URL}/info/${hash}`);
  }

  updateInfos(fd: FormData): Observable<any> {
    return this.http.post(
      `${this.URL}/updateInfo`,
      fd
    );
  }

  delete(hash: string): Observable<any>{
    return this.http.delete(`${this.URL}/channel/${hash}`);
  }

  update(fd: FormData): Observable<any>{
    return this.http.post(`${this.URL}/channel`, fd);
  }

  upload(fd: FormData): Observable<any>{
    return this.http.post(`${this.URL}/files`, fd);
  }

  checkProperty(prop: string, value: any): Observable<{exists: boolean}>{
    if (value.length == 0) return of({exists: true});
    return this.http.get<{exists: boolean}>(
      `${this.URL}/checkProperty/${prop}/${value}`
    )
  }

  getMaxOrder(): Observable<number> {
    return this.http.get<number>(`${this.URL}/orderHeight`);
  }
}
