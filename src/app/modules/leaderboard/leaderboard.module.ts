import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LeaderboardRoutingModule} from './leaderboard-routing.module';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {SharedModule} from '../shared/shared.module';
import {NzMessageServiceModule} from 'ng-zorro-antd/message';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {LeaderboardSummaryComponent} from './pages/leaderboard-summary/leaderboard-summary.component';
import {LeaderboardListComponent} from './components/leaderboard-list/leaderboard-list.component';


@NgModule({
  declarations: [
    LeaderboardSummaryComponent,
    LeaderboardListComponent,
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    NzListModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzSkeletonModule,
    SharedModule,
    NzMessageServiceModule,
    NzButtonModule,
    NzSpaceModule,
    NzTabsModule,
    NzTableModule,
    NzDividerModule,
    NzAlertModule,
    NzModalModule,
    NzNotificationModule,
    NzSpinModule
  ]
})
export class LeaderboardModule {
}
