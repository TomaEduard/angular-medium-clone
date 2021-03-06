import { FeedComponent } from './shared/modules/feed/components/feed/feed.component';
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { PersistanceService } from './shared/services/persistance.service';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { GlobalFeedModule } from './globalFeed/components/globalFeed/globalFeed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), // NgRx
    StoreDevtoolsModule.instrument({ // DevTools
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,

  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
