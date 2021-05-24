import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogsSettingsComponent} from "./components/settings/logs-settings.component";

const routes: Routes = [
  {
    path: '',
    component: LogsSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule {
}
