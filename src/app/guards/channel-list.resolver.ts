import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { NetworkService } from "../services/network.service";
import { Channel } from "../types/channel";

@Injectable({
    providedIn: 'root'
})
export class ChannelListResolver implements Resolve<Channel[]> {

    constructor(private network: NetworkService) {}

    resolve(): Observable<Channel[]> {
        return this.network.list();
    }

}