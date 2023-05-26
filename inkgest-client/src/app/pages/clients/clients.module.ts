import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from '../clients/clients.component';



@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
