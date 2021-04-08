import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StarboardRoutingModule} from './starboard-routing.module';
import {StarboardSettingsComponent} from "./components/settings/starboard-settings.component";
import {SharedModule} from "../../../shared/shared.module";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";


@NgModule({
  declarations: [
    StarboardSettingsComponent
  ],
  imports: [
    CommonModule,
    StarboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NzGridModule,
    NzTabsModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule
  ]
})
export class StarboardModule {
}
