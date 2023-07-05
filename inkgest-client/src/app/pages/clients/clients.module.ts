import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from '../clients/clients.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { ClientTableModule } from 'src/app/components/client-table/client-table.module';




@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    ClientTableModule,
  ],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
