import { Component, OnInit, Input } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-backendErrorMessages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {

  // example of error message comming from redux
  // validationErrors/username/0:"cant be blank" 1:"is too short"
  // tslint:disable-next-line:no-input-rename
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  errorMessages: string[];

  constructor() { }

  // ex. raw response error message:
  // email: ["can't be blank"] -> email can't be blank
  // password: ["can't be blank"] -> password can't be blank
  // username: ["can't be blank", "is too short (minimum is 1 character)"] -> ...
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        // console.log('name - ngOnInit()', name);
        const messages = this.backendErrorsProps[name].join(', ');
        // console.log('messages - ngOnInit()', messages);
        return `${name} ${messages}`;
      }
    );
  }

}
