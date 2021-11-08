import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/internal/operators/map';
import {Category} from '../../../../types/category';
import {CategoryService} from '../../../../services/category.service';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['../../channel/list/list.component.scss']
})
export class CListComponent implements OnInit {

  categories$!: Observable<Category[]>;
  categories!: Category[];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categories$ = this.route.data.pipe(
      map(data => {
        data.categoryList.sort((a: Category, b: Category) => {
          return parseInt(a.id) - parseInt(b.id);
        })
        this.categories = data.categoryList;
        // this.defaultCategory = data.categoryList.find((item: Category) => item.id == '1')
        // data.categoryList.splice(0, 1);
        // console.log(this.defaultCategory);
        // console.log(data.categoryList);
        return data.categoryList
      })
    );

  }

  deleteCategory(id: string): void {
    this.categoryService.delete(id).subscribe((response: {executed: boolean, id: string}) => {
      if (response.executed) {
        let indexToDelete = <number>this.categories?.findIndex(channel => channel.id == response.id);
        if (indexToDelete > -1) {
          this.categories?.splice(indexToDelete, 1);
          this.categories$ = of(this.categories);
        }
      }
    });
  }

}
