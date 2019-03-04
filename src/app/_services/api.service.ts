import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private jwtService: JwtService,
    private httpClient: HttpClient
  ) {}

  repos(): Observable<Object[]> {
    return this.request(`${environment.apiUrl}/repos`).pipe(map(data => data.map(item => item)));
  }

  generalinfo(name): Observable<Object> {
    return this.request(`${environment.apiUrl}/generalinfo/${name}`);
  }

  private request(url: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.jwtService.currentUserValue.jwt_token}`
      })
    };

    return this.httpClient.get(url, httpOptions);
  }
}
