import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaylistsDiscoverComponent} from "./pages/playlists-discover/playlists-discover.component";
import {LoggedInGuard} from "../../services/guards/logged-in.guard";
import {PlaylistsSelfComponent} from "./pages/playlists-self/playlists-self.component";
import {PlaylistsDetailComponent} from "./pages/playlists-detail/playlists-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PlaylistsDiscoverComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '@me',
    component: PlaylistsSelfComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: ':id',
    component: PlaylistsDetailComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule {
}
