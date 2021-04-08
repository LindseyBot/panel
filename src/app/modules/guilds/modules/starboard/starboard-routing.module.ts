import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StarboardSettingsComponent} from "./components/settings/starboard-settings.component";

const routes: Routes = [
  {
    path: '',
    component: StarboardSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarboardRoutingModule {
}
