import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';

import {NzListModule} from 'ng-zorro-antd/list';
import {NzGridModule} from 'ng-zorro-antd/grid';
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
import {NzImageModule} from 'ng-zorro-antd/image';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzListModule,
    NzGridModule,
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
    NzImageModule
  ]
})
export class UsersModule { }
