import { AuthStateInterface } from "./../types/authState.interface";
import { createReducer, State, on, Action } from "@ngrx/store";
import { registerAction, registerSuccessAction, registerFailureAction } from './actions/register.actions';
import { loginAction, loginSuccessAction, loginFailureAction } from './actions/login.actions';

const initialState: AuthStateInterface = {

  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null

};

const authReducer = createReducer(
  initialState,
  
  // Register
  on(registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),

  on(registerSuccessAction, 
    (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser
    })
  ),

  on(registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting:false,
      validationErrors: action.errors
    })
  ),

  // Login
  on(loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),

  on(loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),

  on(loginFailureAction,
    (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
    })
  ),

);

export function reduces(state: AuthStateInterface, action: Action) {
  // state is the state of reducer and action is what we change in our state
  return authReducer(state, action)
}
