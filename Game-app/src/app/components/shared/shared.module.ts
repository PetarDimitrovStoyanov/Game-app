import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../landing/home/home.component';
import { FooterComponent } from './footer/footer.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {LandingModule} from '../landing/landing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule,
    FormsModule,
    LandingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
