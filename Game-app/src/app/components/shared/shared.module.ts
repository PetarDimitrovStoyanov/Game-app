import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from './header/header';
import {RouterModule} from '@angular/router';
import {CollapseDirective} from './header/collapse.directive';
import {DropdownDirective} from './header/dropdown.directive';
import {HomeComponent} from '../landing/home/home.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Header,
    FooterComponent,
  ],
  declarations: [
    Header,
    CollapseDirective,
    DropdownDirective,
    HomeComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
