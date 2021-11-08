import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {EMPTY, Observable} from 'rxjs';
import {CategoryService} from '../../../../services/category.service';
import {map} from 'rxjs/internal/operators/map';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-c-form',
  templateUrl: './c-form.component.html',
  styleUrls: ['../../form/form.component.scss']
})
export class CFormComponent implements OnInit {

  executed!: boolean | undefined;
  updated = false;
  message = '';
  submitted = false;
  loading = false;
  mode!: string;
  currentCategory!: string;
  timeOut: any;
  categoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(
      '',
      [Validators.required, Validators.pattern(/[a-z]{3,}/i)],
      [this.nameExists()]
    )
  })

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      map(params => {
        this.mode = <string>params.get('mode');
        // this.mode == 'edit'
        //   ? this.categoryForm.get('id')?.setValidators(Validators.required)
        //   : this.categoryForm.get('id')?.setValidators(null);

        if (this.mode == 'edit') {
          this.categoryForm.get('id')?.setValidators(Validators.required)
        } else {
          this.categoryForm.get('id')?.setValidators(null);
          this.categoryForm.reset();
        }

        return params;
      }),
      switchMap(params =>
        this.mode == 'edit'
        ? this.categoryService.get(<string>params.get('id')).pipe(
            map(cat => {
              this.currentCategory = cat.name;
              this.categoryForm.patchValue({
                id: cat.id,
                name: cat.name
              })
            })
          )
        : EMPTY
      )

    ).subscribe();
  }

  onSubmit(): void {
    if (!this.categoryForm.valid) return;
    this.loading = true;
    if (this.mode == 'new') {
      console.log(this.categoryForm.value.name);
      this.categoryService.add({name: this.categoryForm.value.name}).subscribe(response => {
        this.executed = response.executed;
        this.loading = false;
        this.categoryForm.reset();
        if (response.executed) {
          this.showMessage(response, 'New category was created', 'An error occurred !');
        }
      });
    } else {
      this.categoryService.update(this.categoryForm.value).subscribe(response => {
        this.executed = response.executed;
        this.loading = false;
        if (response.executed) {
          this.updated = true;
          this.showMessage(response, 'Updated category name', 'An error occurred !');
        }
      });
    }
  }

  onCancel(event: Event): void {

  }

  //Async Validator
  private nameExists(): AsyncValidatorFn {
    return (control: AbstractControl) : Observable<ValidationErrors | null> =>
      this.categoryService.checkName(control.value).pipe(
        map(response => {
          console.log(this.mode);
          return this.mode == 'new' ? response.exists ? {exists: true} : null : this.currentCategory.toLowerCase() == control.value.toLowerCase() ? null : response.exists ? {exists: true} : null
        })
      )
  }

  //Message handler
  private showMessage(response: {executed: boolean, saved?: boolean, affectedRows: number}, successfulMessage: string, failureMessage: string) {
    this.executed = response.executed;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (!this.updated) {
        this.executed = undefined;
      }
    }, 3000);
    if (response.executed) {
      if (response.affectedRows > 0 || response.saved) {
        this.message = successfulMessage;
      } else if (response.affectedRows == 0) {
        this.message = 'Nothing changed'
      }
    } else {
      this.message = failureMessage;
    }
  }

}
