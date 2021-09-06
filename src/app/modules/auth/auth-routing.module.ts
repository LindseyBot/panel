import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Oauth2Component} from './pages/oauth2/oauth2.component';
import {LoginComponent} from './pages/login/login.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {LoggedInGuard} from '../../services/guards/logged-in.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'oauth2', component: Oauth2Component},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
