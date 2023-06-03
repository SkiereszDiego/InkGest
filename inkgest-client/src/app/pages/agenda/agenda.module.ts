import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';

import { AgendaComponent } from '../agenda/agenda.component';
import { SearchModule } from 'src/app/components/search/search.module';

@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    SearchModule
  ],
  exports: [
    AgendaComponent
  ]
})
export class AgendaModule { }
