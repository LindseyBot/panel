import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NavbarLayoutComponent} from './layouts/navbar-layout/navbar-layout.component';
import {ServerSidebarLayoutComponent} from './layouts/server-sidebar-layout/server-sidebar-layout.component';
import {LoggedOutLayoutComponent} from './layouts/logged-out-layout/logged-out-layout.component';
import {GuildListComponent} from './pages/guild-list/guild-list.component';
import {NzListModule} from "ng-zorro-antd/list";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {AppInitializerProvider} from "./app-initializer.service";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarLayoutComponent,
    ServerSidebarLayoutComponent,
    LoggedOutLayoutComponent,
    GuildListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzSpaceModule,
    NzDividerModule,
    NzListModule,
    NzCardModule,
    NzGridModule,
    NzModalModule,
    NzToolTipModule
  ],
  providers: [AppInitializerProvider, {provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
