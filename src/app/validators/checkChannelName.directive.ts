import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {NetworkService} from '../services/network.service';
import {Directive, OnInit} from '@angular/core';
import {Channel} from '../types/channel';
import {ActivatedRoute} from '@angular/router';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[checkChannelName]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CheckChannelNameDirective, multi:
      true}]
})

export class CheckChannelNameDirective implements AsyncValidator, OnInit {

  mode: string | undefined;
  channel: Channel | undefined;

  ngOnInit() {
    this.route.queryParamMap.pipe(
      mergeMap(params => {
        this.mode = <string>params.get('mode');
        return this.mode == 'edit' ? this.network.getChannel(<string>params.get('id')).pipe(
          tap(response => {
            return this.channel = response
          })
        ) : of()
      })
    ).subscribe()
  }

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return this.network.checkProperty('channel', control.value).pipe(
      map(response => {
        return this.mode == 'new' ? response.exists ? {exists: true} : null : this.channel?.channel == control.value ? null : response.exists ? {exists: true} : null
      })
    );
  }

  constructor(private network: NetworkService, private route: ActivatedRoute) {
  }
}
