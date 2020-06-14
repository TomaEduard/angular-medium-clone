import { Component, OnInit, Input } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-backendErrorMessages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {

  // example of error message comming from redux
  // validationErrors/username/0:"cant be blank" 1:"is too short"
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface

  errorMessages: string[]

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(', ')
        return `${name} ${messages}`
      }
    )
  }

}
