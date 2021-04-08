import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmbedsSettingsComponent} from "./components/settings/embeds-settings.component";

const routes: Routes = [
  {
    path: '',
    component: EmbedsSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbedsRoutingModule {
}
