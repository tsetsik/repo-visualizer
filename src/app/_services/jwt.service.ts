import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private httpClient: HttpClient) { }

  public get loggedIn(){
    return localStorage.getItem('access_token') !==  null;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email:string, password:string) {
    return this.httpClient.post(`${environment.apiUrl}/auth`, {email, password})
      .pipe(tap(res => {
        console.log(res);
        // localStorage.setItem('access_token', res.access_token);
      }))
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
