import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from 'src/app/types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}