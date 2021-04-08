import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MusicRoutingModule} from './music-routing.module';
import {MusicSettingsComponent} from "./components/settings/music-settings.component";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzAlertModule} from "ng-zorro-antd/alert";


@NgModule({
  declarations: [
    MusicSettingsComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NzGridModule,
    NzFormModule,
    NzSpinModule,
    NzTabsModule,
    NzAlertModule,
    NzButtonModule
  ]
})
export class MusicModule {
}
