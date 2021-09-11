import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AsyncSubject, Observable, of, Subject} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.autoLogin().pipe(
      map((response: {message: string, granted: boolean}) => {
        if (!response.granted){
          this.router.navigate(['/login']);
        }
        return response.granted;
      })
    );
  }

}
