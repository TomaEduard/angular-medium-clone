import { PersistanceService } from './../../../shared/services/persistance.service';
import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';

import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.actions';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {of} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistanceService: PersistanceService,
              private router: Router,
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(

      // get register action with property request: RegisterRequestInterface
      ofType(registerAction),

      switchMap(({request}) => {
        // make the request
        return this.authService.register(request).pipe(

          // success case
          map((currentUser: CurrentUserInterface) => {
            // save jwt to ls
            this.persistanceService.set('accessToken', currentUser.token);
            // call acction success case to save to store
            return registerSuccessAction({currentUser});
          }),

          // failure case
          catchError((errorResponse: HttpErrorResponse) => {
            // 'of' return all the data
            return of(registerFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })

    )
  );

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        console.log('register.effect.ts - redirectAfterSubmit$ - crateEffect');
        this.router.navigateByUrl('/');
      })
    ),
    // tell ngrx to don't dispatch anything
    {dispatch: false}
  );

}
