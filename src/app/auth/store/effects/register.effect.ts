import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'

import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.actions'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {of} from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(

      // get register action with property request: RegisterRequestInterface
      ofType(registerAction),

      switchMap(({request}) => {
        // make the request
        return this.authService.register(request).pipe(

          // success case
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({currentUser})
          }),

          // failure case 
          catchError((errorResponse: HttpErrorResponse) => {
            // 'of' return all the data
            return of(registerFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
      
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
