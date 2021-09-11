import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }


  canActivate(): Observable<boolean>{
    return this.auth.autoLogin().pipe(
      map((response: {message: string, granted: boolean}) => {
        if (response.granted) {
          this.router.navigate(['/dashboard']);
        }
        return !response.granted;
      })
    );
  }

}
