import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from '../clients/clients.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { TableModule } from '../../components/table/table.module';



@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    TableModule,
  ],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
