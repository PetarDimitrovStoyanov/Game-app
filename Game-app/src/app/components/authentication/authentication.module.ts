import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
    ])
  ],
  declarations: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthenticationModule {
}
