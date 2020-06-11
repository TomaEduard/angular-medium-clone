import { AuthStateInterface } from "./../types/authState.interface";
import { createReducer, State, on, Action } from "@ngrx/store";
import { registerAction } from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
);

export function reduces(state: AuthStateInterface, action: Action) {
  // state is the state of reducer and action is what we change in our state
  return authReducer(state, action)
}
