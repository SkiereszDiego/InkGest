import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTableComponent } from './inventory-table.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../shared/services/product.service';




@NgModule({
  declarations: [
    InventoryTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TagModule
  ],
  exports: [
    InventoryTableComponent
  ],
  providers: [ProductService]
})
export class InventoryTableModule { }
