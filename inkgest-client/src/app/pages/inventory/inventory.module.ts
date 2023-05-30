import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from '../inventory/inventory.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { SearchModule } from 'src/app/components/search/search.module';
import { InventoryTableModule } from '../../components/inventory-table/inventory-table.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule,
    SearchModule,
    FormsModule,
    InventoryTableModule
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
