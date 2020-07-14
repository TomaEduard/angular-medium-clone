import { Router } from '@angular/router';
import { loginAction,
  loginSuccessAction,
  loginFailureAction } from './../actions/login.actions';
import {of} from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance.service';
import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';

import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistanceService: PersistanceService,
              private router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(

      // get login action with property request: loginRequestInterface
      ofType(loginAction),

      switchMap(({request}) => {
        // make the request
        return this.authService.login(request).pipe(

          // success case
          map((currentUser: CurrentUserInterface) => {
            // save jwt to ls
            this.persistanceService.set('accessToken', currentUser.token);
            // call acction success case to save to store
            return loginSuccessAction({currentUser});
          }),

          // failure case
          catchError((errorResponse: HttpErrorResponse) => {
            // 'of' return all the data
            return of(loginFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })

    )
  );

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        console.log('login.effect.ts - redirectAfterSubmit$ - crateEffect');
        this.router.navigateByUrl('/');
      })
    ),
    // tell ngrx to don't dispatch anything
    {dispatch: false}
  );

}
