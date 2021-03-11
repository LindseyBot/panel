import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GuildsRoutingModule} from './guilds-routing.module';
import {NzListModule} from "ng-zorro-antd/list";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {SettingsCoreComponent} from './pages/settings-core/settings-core.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {SharedModule} from "../shared/shared.module";
import {NzMessageServiceModule} from "ng-zorro-antd/message";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {SettingsAutomodComponent} from './pages/settings-automod/settings-automod.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {TabAntiAdvertisingComponent} from './pages/tab-anti-advertising/tab-anti-advertising.component';
import {SettingsLoggingComponent} from './pages/settings-logging/settings-logging.component';
import {TabWelcomeMessageComponent} from './pages/tab-welcome-message/tab-welcome-message.component';
import {SettingsAccessControlComponent} from './pages/settings-access-control/settings-access-control.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {SettingsMusicComponent} from './pages/settings-music/settings-music.component';
import { SettingsStarboardComponent } from './pages/settings-starboard/settings-starboard.component';
import { SettingsEmbedsComponent } from './pages/settings-embeds/settings-embeds.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SettingsCoreComponent,
    SettingsAutomodComponent,
    TabAntiAdvertisingComponent,
    SettingsLoggingComponent,
    TabWelcomeMessageComponent,
    SettingsAccessControlComponent,
    SettingsMusicComponent,
    SettingsStarboardComponent,
    SettingsEmbedsComponent
  ],
  imports: [
    CommonModule,
    GuildsRoutingModule,
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
export class GuildsModule {
}
