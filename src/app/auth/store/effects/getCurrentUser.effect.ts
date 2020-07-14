import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from './../actions/getCurrentUser.action';
import {of} from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance.service';
import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap} from 'rxjs/operators';

import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GetCurrentUserEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistanceService: PersistanceService,
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(

      // get login action with property request: loginRequestInterface
      ofType(getCurrentUserAction),

      switchMap(() => {
        // verify if token exist in ls
        const token = this.persistanceService.get('accessToken');

        // if token dosn't exist return getCurrentUserFailureAction
        if (!token) {
          return of(getCurrentUserFailureAction());
        }

        // make the request
        return this.authService.getCurrentUser().pipe(

          // success case
          map((currentUser: CurrentUserInterface) => {
            // call acction success case
            return getCurrentUserSuccessAction({currentUser});
          }),

          // failure case
          catchError((errorResponse: HttpErrorResponse) => {
            // 'of' return all the data
            return of(getCurrentUserFailureAction());
          })
        );
      })

    )
  );

}
