import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { PersistanceService } from './persistance.service'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private persistanceService: PersistanceService) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // take token from ls
    const token = this.persistanceService.get('accessToken')

    // coppy the hole request and set Authorization on header
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : ''
      }
    })

    return next.handle(request)
  }
  
}