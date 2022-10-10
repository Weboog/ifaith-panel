import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guide} from "../types/guide";

@Injectable({
  providedIn: 'root'
})
export class GuideService{

  private readonly URL = 'https://services.ifaith.tv/guide'; // 'http://sdfsdfsdfsdfsdf.atwebpages.com/channel'; // ;// 'http://ifaith-services.web/channel'; // ;

  constructor(private http: HttpClient) {}

  read(hash: String): Observable<Guide> {
    return this.http.get<Guide>(`https://services.ifaith.tv/guide/read/${hash}`);
  }

  getGuide(id: string): Observable<Guide> {
    return this.http.get<Guide>(`${this.URL}/${id}`);
  }

  setGuide(data: FormData): Observable<any> {
    return this.http.post(`${this.URL}/create`, data);
  }

}
