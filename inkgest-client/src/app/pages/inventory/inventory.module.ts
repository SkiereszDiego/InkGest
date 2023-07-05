import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { SearchModule } from 'src/app/components/search/search.module';
import { InventoryTableModule } from '../../components/inventory-table/inventory-table.module';
import { CalendarModule } from 'primeng/calendar';

import { InventoryComponent } from '../inventory/inventory.component';

@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    CustomButtonModule,
    SearchModule,
    InventoryTableModule,
    CalendarModule,
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
