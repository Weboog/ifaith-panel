import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    object: {[key: string]: any} = {};
    store = new BehaviorSubject<{[key: string]: any}>({});

    set(key: string, value: any) {
        this.object[key] = value;
        this.store.next(this.object);
    }

}