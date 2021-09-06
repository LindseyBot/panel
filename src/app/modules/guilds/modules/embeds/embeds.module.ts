import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmbedsRoutingModule} from './embeds-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {EmbedsSettingsComponent} from './components/settings/embeds-settings.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EmbedsSettingsComponent
  ],
  imports: [
    CommonModule,
    EmbedsRoutingModule,
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
export class EmbedsModule {
}
