import { LoginRequestInterface } from './../types/loginRequest.interface';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { Observable, pipe } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  // Utils
  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users' 
    return this.http
      .post<AuthResponseInterface>(url, data)
      // .pipe(map((response: AuthResponseInterface) => response.user))
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get(url)
    .pipe(map(this.getUser))
  }
}