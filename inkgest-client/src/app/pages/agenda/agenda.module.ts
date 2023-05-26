import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AgendaComponent } from '../agenda/agenda.component';



@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    ButtonModule 
  ],
  exports: [
    AgendaComponent
  ]
})
export class AgendaModule { }
