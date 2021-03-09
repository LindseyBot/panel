import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CookiesLeaderboardComponent} from "./pages/cookies-leaderboard/cookies-leaderboard.component";

const routes: Routes = [
  {
    path: '',
    component: CookiesLeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {
}
