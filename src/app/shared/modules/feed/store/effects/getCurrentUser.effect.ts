import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { getFeedAction, getFeedSuccessAction, getFeedFailureAction } from './../actions/getFeed.action';
import { FeedService } from './../../services/feed.service';
import {of} from 'rxjs'
import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'

import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class GetFeedEffect {

  constructor(private actions$: Actions,
    private feedService: FeedService, 
  ) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(

      // get login action with property request: loginRequestInterface
      ofType(getFeedAction),

      switchMap(({url}) => {

        // make the request
        return this.feedService.getFeed(url).pipe(

          // success case
          map((feed: GetFeedResponseInterface) => {
            // call acction success case
            return getFeedSuccessAction({feed})
          }),

          // failure case 
          catchError(() => {
            // 'of' return all the data
            return of(getFeedFailureAction())
          })
        )
      })
      
    )
  )

}
