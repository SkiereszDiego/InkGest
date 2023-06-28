import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from './components/table/table.module';
import { SearchModule } from './components/search/search.module';

import { HeaderModule } from './templates/header/header.module';
import { SideNavModule } from './templates/side-nav/side-nav.module';

import { ProductService } from './shared/services/product.service';

import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RippleModule,
    HeaderModule,
    RouterModule,
    TableModule,
    SideNavModule,
    SearchModule ,
    BrowserAnimationsModule
  ],
  providers: [
    ProductService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
