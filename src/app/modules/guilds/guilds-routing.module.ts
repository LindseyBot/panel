import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoggedInGuard} from '../../services/guards/logged-in.guard';
import {SettingsCoreComponent} from './pages/settings-core/settings-core.component';
import {GuildSelectedGuard} from '../../services/guards/guild-selected.guard';
import {SettingsAccessControlComponent} from './pages/settings-access-control/settings-access-control.component';

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
    loadChildren: () => import('./modules/automod/automod.module').then(m => m.AutomodModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/embeds',
    loadChildren: () => import('./modules/embeds/embeds.module').then(m => m.EmbedsModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: ':guild/logs',
    loadChildren: () => import('./modules/logs/logs.module').then(m => m.LogsModule),
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuildsRoutingModule {
}
