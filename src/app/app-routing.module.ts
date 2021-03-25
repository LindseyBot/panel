import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServerSidebarLayoutComponent} from "./layouts/server-sidebar-layout/server-sidebar-layout.component";
import {NavbarLayoutComponent} from "./layouts/navbar-layout/navbar-layout.component";
import {LoggedInGuard} from "./services/guards/logged-in.guard";
import {GuildListComponent} from "./pages/guild-list/guild-list.component";
import {LoggedOutLayoutComponent} from "./layouts/logged-out-layout/logged-out-layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'site'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'panel',
    component: ServerSidebarLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/guilds/guilds.module').then(m => m.GuildsModule)
  },
  {
    path: 'users',
    component: NavbarLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'site',
    component: LoggedOutLayoutComponent,
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'leaderboards',
    component: LoggedOutLayoutComponent,
    loadChildren: () => import('./modules/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
  },
  {
    path: 'playlists',
    component: NavbarLayoutComponent,
    loadChildren: () => import('./modules/playlists/playlists.module').then(m => m.PlaylistsModule)
  },
  {
    path: 'selector',
    component: NavbarLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: GuildListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
