import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogsRoutingModule} from './logs-routing.module';
import {LogsSettingsComponent} from './components/settings/logs-settings.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";


@NgModule({
  declarations: [
    LogsSettingsComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NzGridModule,
    NzFormModule,
    NzSpinModule,
    NzTabsModule,
    NzAlertModule,
    NzButtonModule,
    NzTableModule,
    NzToolTipModule
  ]
})
export class LogsModule {
}
