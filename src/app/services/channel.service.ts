import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChannelService{

  private readonly URL =  'https://services.ifaith.tv/channel'; // 'http://sdfsdfsdfsdfsdf.atwebpages.com/channel';// ; //

  constructor(private http: HttpClient) {}

  add(data: FormData): Observable<any>{
    return this.http.post(`${this.URL}/add`, data);
  }

}
