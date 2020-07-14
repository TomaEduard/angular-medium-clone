import { Component, OnInit } from '@angular/core';
import { currentUserSelector, isLoggedInSelector, isAnonymousSelector } from 'src/app/auth/store/selector';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Store, select } from '@ngrx/store';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
