import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './core/services/auth.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './core/interceptors/jwt-interceptor.service';
import {ResponseHandlerInterceptorService} from './core/interceptors/response-handler-interceptor.service';
import {GameService} from './core/services/game.service';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {LandingModule} from './components/landing/landing.module';
import {SharedModule} from './components/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthenticationModule,
    LandingModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    GameService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandlerInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
