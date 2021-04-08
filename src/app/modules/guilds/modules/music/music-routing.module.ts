import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicSettingsComponent} from "./components/settings/music-settings.component";

const routes: Routes = [
  {
    path: '',
    component: MusicSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
}
