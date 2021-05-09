import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutomodRoutingModule} from './automod-routing.module';
import {AutomodSettingsComponent} from './components/settings/automod-settings.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {TabAntiadComponent} from './components/tab-antiad/tab-antiad.component';
import {SharedModule} from "../../../shared/shared.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ReactiveFormsModule} from "@angular/forms";
import { TabAutomodComponent } from './components/tab-automod/tab-automod.component';


@NgModule({
  declarations: [
    AutomodSettingsComponent,
    TabAntiadComponent,
    TabAutomodComponent
  ],
  imports: [
    CommonModule,
    AutomodRoutingModule,
    SharedModule,
    NzFormModule,
    NzGridModule,
    NzTabsModule,
    NzSpinModule,
    NzAlertModule,
    NzButtonModule,
    ReactiveFormsModule,
  ]
})
export class AutomodModule {
}
