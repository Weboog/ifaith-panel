import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guide} from "../types/guide";

@Injectable({
  providedIn: 'root'
})
export class GuideService{

  private readonly URL = 'https://services.ifaith.tv/channel'; // 'http://sdfsdfsdfsdfsdf.atwebpages.com/channel'; // ;// 'http://ifaith-services.web/channel'; // ;

  constructor(private http: HttpClient) {}

  getChannels(): Observable<any>{
    return this.http.get(this.URL);
  }

  getGuide(url: string): Observable<Guide> {
    return this.http.get<Guide>(url);
  }

  setGuide(data: FormData): Observable<any> {
    return this.http.post(`${this.URL}/guide`, data);
  }

}
