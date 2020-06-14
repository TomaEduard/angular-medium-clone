import { AuthStateInterface } from './../types/authState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

// first argument(AppStateInterface) is the global state and 
// second argument(AuthStateInterface) is the part of state that we want to get
// this function take the 'auth' object from state
export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
  authFeatureSelector, (authState: AuthStateInterface) => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector, (authState: AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector, (authState: AuthStateInterface) => authState.currentUser
)