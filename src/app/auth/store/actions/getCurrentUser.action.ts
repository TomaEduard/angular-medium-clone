import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { ActionType } from '../actionType';
import { createAction, props } from '@ngrx/store';

export const getCurrentUserAction = createAction(
  ActionType.GET_CURRENT_USER
);

export const getCurrentUserSuccessAction = createAction(
  ActionType.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const getCurrentUserFailureAction = createAction(
  ActionType.GET_CURRENT_USER_FAILURE
);
