import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  on!: Subject<boolean>;

  setOn(): void {
    this.on?.next(true);
  }

  setOff(): void {
    this.on?.next(false);
  }
}
