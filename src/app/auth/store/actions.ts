import { ActionType } from "./actionType";
import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from 'src/app/types/registerRequest.interface';

export const registerAction = createAction(
  ActionType.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);
