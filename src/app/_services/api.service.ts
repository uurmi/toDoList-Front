import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<any> {
    return this.http.get<any>(this.baseurl + url);
  }

  getOne(url: string, id: string): Observable<any> {
    return this.http.get<any>(this.baseurl + url + '/' + id);
  }

  post(url: string, object: any) {
    return this.http.post(this.baseurl + url, object);
  }

  update(url: string, id: string, object: any) {
    return this.http.patch(this.baseurl + url + '/' + id, object);
  }

  delete(url: string, id: string) {
    return this.http.delete(this.baseurl + url + '/' + id);
  }
}
