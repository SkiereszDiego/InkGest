import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { SessionsComponent } from './sessions.component';
import { SessionTableModule } from 'src/app/components/session-table/session-table.module';


@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    SessionTableModule
  ],
  exports: [
    SessionsComponent
  ]
})
export class SessionsModule { }
