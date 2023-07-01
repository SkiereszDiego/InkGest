import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { SessionsComponent } from './sessions.component';

import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    TableModule,
  ],
  exports: [
    SessionsComponent
  ]
})
export class SessionsModule { }
