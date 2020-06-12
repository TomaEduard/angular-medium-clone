import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { ActionType } from "../actionType";
import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from 'src/app/types/registerRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const registerAction = createAction(
  ActionType.REGISTER,
  props<{ request: RegisterRequestInterface }>()
)

export const registerSuccessAction = createAction(
  ActionType.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const registerFailureAction = createAction(
  ActionType.REGISTER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)