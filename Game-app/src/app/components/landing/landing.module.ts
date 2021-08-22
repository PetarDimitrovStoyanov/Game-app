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
import {StartComponent} from './start/start.component';
import {AllUsersComponent} from './all-users/all-users.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2OrderModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'create', component: CreateGameComponent},
            {path: 'all', component: GameAllComponent},
            {path: 'details/:id', component: GameDetailsComponent},
            {path: 'user', component: GameUserComponent},
            {path: 'edit/:id', component: GameEditComponent/*, canActivate: [AdminAuthGuard]*/},
            {path: 'all-users', component: AllUsersComponent, canActivate: [AdminAuthGuard]},
        ]),
        NgbTooltipModule,
    ],
  declarations: [
    CreateGameComponent,
    GameAllComponent,
    GameDetailsComponent,
    GameUserComponent,
    GameEditComponent,
    StartComponent,
    AllUsersComponent
  ]
})

export class LandingModule {
}
