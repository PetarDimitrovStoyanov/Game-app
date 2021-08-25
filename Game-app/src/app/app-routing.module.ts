import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/landing/home/home.component';
import {AuthGuard} from './core/guards/auth.guard';
import {StartComponent} from './components/landing/start/start.component';
import {PageNotFoundComponent} from './components/landing/page-not-found/page-not-found.component';

const routes: Routes = [
  /*{path: '', redirectTo: 'home', pathMatch: 'full'},*/
  {path: '', component: StartComponent},
  {path: 'home', component: HomeComponent},
  // @ts-ignore
  {path: 'auth', loadChildren: () => import('./components/authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  // @ts-ignore
  {path: 'game', loadChildren: () => import('./components/landing/landing.module')
      .then(m => m.LandingModule), canActivate: [AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent},
  /*{path: '**', redirectTo: '', pathMatch: 'full'},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
