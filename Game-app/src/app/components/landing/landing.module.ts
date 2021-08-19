import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateGameComponent} from './create-game/create-game.component';
import {GameAllComponent} from './game-all/game-all.component';
import {GameDetailsComponent} from './game-details/game-details.component';
import {RouterModule} from '@angular/router';
import {GameUserComponent} from './game-user/game-user.component';
import {GameEditComponent} from './game-edit/game-edit.component';
import {AdminAuthGuard} from '../../core/guards/admin-auth.guard';
import { StartComponent } from './start/start.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'create', component: CreateGameComponent},
      {path: 'all', component: GameAllComponent},
      {path: 'details/:id', component: GameDetailsComponent},
      {path: 'user', component: GameUserComponent},
      {path: 'edit/:id', component: GameEditComponent/*, canActivate: [AdminAuthGuard]*/},
    ]),
  ],
  declarations: [
    CreateGameComponent,
    GameAllComponent,
    GameDetailsComponent,
    GameUserComponent,
    GameEditComponent,
    StartComponent
  ]
})
export class LandingModule {
}
