import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Category} from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly URL = 'https://services.ifaith.tv/category'; //'https://public-api.ifaith.web/category';

  constructor(private http: HttpClient) { }

  add(data: {name: string}): Observable<{executed: boolean, affectedRows: number}> {
    return this.http.post<{executed: boolean, affectedRows: number}>(`${this.URL}`, data);
  }

  get(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }

  update(data: {id: string, name: string}): Observable<{executed: boolean, affectedRows: number}> {
    return this.http.patch<{executed: boolean, affectedRows: number}>(`${this.URL}`, data);
  }

  checkName(name: string): Observable<{exists: boolean, name: string}> {
    return this.http.get<{exists: boolean, name: string}>(`${this.URL}/checkName/${name}`);
  }

  getCategories(): Observable<{id: string, name: string}[]> {
    return this.http.get<{id: string, name: string}[]>(`${this.URL}`);
  }

  delete(id: string): Observable<{executed: boolean, id: string}> {
    return this.http.delete<{executed: boolean, id: string}>(`${this.URL}/${id}`);
  }
}
