import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutomodSettingsComponent} from "./components/settings/automod-settings.component";

const routes: Routes = [
  {
    path: '',
    component: AutomodSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomodRoutingModule {
}
