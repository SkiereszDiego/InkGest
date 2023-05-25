import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from './templates/Header/Header.module';
import { ProfileControlComponent } from './pages/profile-control/profile-control.component';
import { TableModule } from './components/table/table.module';


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
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
