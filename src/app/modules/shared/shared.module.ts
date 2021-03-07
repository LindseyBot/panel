import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsSmallTextComponent} from './components/settings-small-text/settings-small-text.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SettingsBooleanComponent} from './components/settings-boolean/settings-boolean.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {SettingsSliderComponent} from './components/settings-slider/settings-slider.component';
import {NzSliderModule} from "ng-zorro-antd/slider";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzButtonModule} from "ng-zorro-antd/button";
import {SettingsSelectComponent} from './components/settings-select/settings-select.component';
import {SettingsBigTextComponent} from './components/settings-big-text/settings-big-text.component';
import {ModalUserReferenceComponent} from './components/modal-user-reference/modal-user-reference.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDividerModule} from "ng-zorro-antd/divider";


@NgModule({
  declarations: [SettingsSmallTextComponent, SettingsBooleanComponent, SettingsSliderComponent, SettingsSelectComponent, SettingsBigTextComponent, ModalUserReferenceComponent],
  exports: [
    SettingsSmallTextComponent,
    SettingsBooleanComponent,
    SettingsSliderComponent,
    SettingsSelectComponent,
    SettingsBigTextComponent,
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzSliderModule,
    NzAlertModule,
    ReactiveFormsModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzButtonModule,
    FormsModule,
    NzModalModule,
    NzDividerModule
  ]
})
export class SharedModule {
}
