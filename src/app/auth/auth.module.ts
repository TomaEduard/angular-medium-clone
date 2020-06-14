import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { LoginComponent } from './components/login/login.component';
import { RegisterEffect } from './store/effects/register.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from '@ngrx/store';
import { reduces } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginEffect } from './store/effects/login.effect';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';

const routes = [
  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reduces),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ], 
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {}
