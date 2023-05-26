import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';

import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule
  ],
  exports: [
  SideNavComponent
]
})
export class SideNavModule { }
