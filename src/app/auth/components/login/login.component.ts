import { LoginRequestInterface } from "./../../types/loginRequest.interface";
import { validationErrorsSelector } from "../../store/selector";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { isSubmittingSelector } from "../../store/selector";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { loginAction } from "../../store/actions/login.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm(): void {
    console.log("initializeForm");
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    console.log("submit login", this.form.value, this.form.valid);
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request }));
  }
}
