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
    redirectTo: 'overview'
  },
  {
    path: 'overview',
    component: DashboardComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: 'settings/access',
    component: SettingsAccessControlComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: 'settings/core',
    component: SettingsCoreComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: 'settings/automod',
    component: SettingsAutomodComponent,
    canActivate: [LoggedInGuard, GuildSelectedGuard]
  },
  {
    path: 'settings/log',
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
