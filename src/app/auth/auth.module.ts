import { BackendErrorMessagesModule } from './../types/modules/backendErrorMessages/backendErrorMessages.module';
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

const routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reduces),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule
  ], 
  declarations: [RegisterComponent],
  providers: [AuthService]
})
export class AuthModule {}
