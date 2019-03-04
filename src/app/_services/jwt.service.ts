import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(this.data());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get loggedIn(){
    return this.data()['jwt_token'] !==  null;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username:string, password:string){
    return this.httpClient.post(`${environment.apiUrl}/auth`, {username, password}, {observe: 'response'})
      .pipe(tap(res => {
        let token = res.headers.get('x-jwt-token');
        if (token) {
          let username = res.body['username'];
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('username', username);
          this.currentUserSubject.next(this.data(username, token));
        }
      }));
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
  }

  data(username = localStorage.getItem('username'), token = localStorage.getItem('jwt_token')) {
    return {
      username: username,
      jwt_token: token
    }
  }
}
