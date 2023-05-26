import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from './templates/header/header.module';
import { ProfileControlComponent } from './pages/profile-control/profile-control.component';
import { TableModule } from './components/table/table.module';
import { RouterModule } from '@angular/router';
import { SideNavModule } from './templates/side-nav/side-nav.module';


@NgModule({
  declarations: [
    AppComponent,
    ProfileControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RippleModule,
    HeaderModule,
    RouterModule,
    TableModule,
    SideNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
