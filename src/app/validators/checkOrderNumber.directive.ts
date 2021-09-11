import {Observable, of} from 'rxjs';
import {Directive, Input, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {NetworkService} from '../services/network.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Channel} from '../types/channel';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[checkOrderNumber]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CheckOrderNumberDirective, multi:
      true}]
})
export class CheckOrderNumberDirective implements AsyncValidator, OnInit {
    count = 0;
  mode: string | undefined;
  channel: Channel | undefined;
  ngOnInit() {
    this.route.queryParamMap.pipe(
      mergeMap(params => {
        this.mode = <string>params.get('mode');
        return this.mode == 'edit' ? this.network.getChannel(<string>params.get('id')).pipe(
          tap(response => {
            if(this.count == 0) {
              this.store.set('channel', response);
              this.count = 1;
            }
            return this.channel = response
          })
        ) : of()
      })
    ).subscribe()
  }

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return this.network.checkProperty('ord', control.value).pipe(
      map(response => {
        return this.mode == 'new' ? response.exists ? {exists: true} : null : this.channel?.ord == control.value ? null : response.exists ? {exists: true} : null
      })
    );
  }

  constructor(private network: NetworkService, private store: StoreService, private route: ActivatedRoute) {
  }
}
