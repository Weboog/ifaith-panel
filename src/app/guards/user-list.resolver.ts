import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { User } from "../types/user";

@Injectable({
    providedIn: 'root'
})
export class UsersListResolver implements Resolve<User[]>{

    constructor(private user: UserService) {}

    resolve(): Observable<User[]> {
        return this.user.list();
    }

}