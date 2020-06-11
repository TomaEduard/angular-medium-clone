import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
  ], 
  declarations: [RegisterComponent],
})
export class AuthModule {}
