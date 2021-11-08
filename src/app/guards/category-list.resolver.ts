import {Resolve} from '@angular/router';
import {Category} from '../types/category';
import {Observable} from 'rxjs';
import {CategoryService} from '../services/category.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryListResolver implements Resolve<Category[]>{

  constructor(private category: CategoryService) {
  }

  resolve(): Observable<Category[]> {
    return this.category.getCategories();
  }

}
