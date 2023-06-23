import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from './templates/header/header.module';
import { TableModule } from './components/table/table.module';
import { RouterModule } from '@angular/router';
import { SideNavModule } from './templates/side-nav/side-nav.module';
import { SearchModule } from './components/search/search.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './shared/services/product.service';
import { DatePipe } from '@angular/common';


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
