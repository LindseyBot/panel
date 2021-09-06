import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaderboardSummaryComponent} from './pages/leaderboard-summary/leaderboard-summary.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {
}
