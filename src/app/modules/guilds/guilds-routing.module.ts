import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoggedInGuard} from "../../services/guards/logged-in.guard";
import {SettingsCoreComponent} from "./pages/settings-core/settings-core.component";
import {GuildSelectedGuard} from "../../services/guards/guild-selected.guard";
import {SettingsAutomodComponent} from "./pages/settings-automod/settings-automod.component";
import {SettingsLoggingComponent} from "./pages/settings-logging/settings-logging.component";
import {SettingsAccessControlComponent} from "./pages/settings-access-control/settings-access-control.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/selector'
  },
  {
    path: ':guild/overview',
    component: DashboardComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/access',
    component: SettingsAccessControlComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/settings',
    component: SettingsCoreComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/starboard',
    loadChildren: () => import('./modules/starboard/starboard.module').then(m => m.StarboardModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/automod',
    component: SettingsAutomodComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/embeds',
    loadChildren: () => import('./modules/embeds/embeds.module').then(m => m.EmbedsModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/music',
    loadChildren: () => import('./modules/music/music.module').then(m => m.MusicModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/settings/log',
    component: SettingsLoggingComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuildsRoutingModule {
}
