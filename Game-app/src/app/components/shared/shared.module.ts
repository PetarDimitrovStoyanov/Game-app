import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {UserGamesTemplateComponent} from './user-games-template/user-games-template.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserGamesTemplateComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserGamesTemplateComponent
  ]
})
export class SharedModule {

}
