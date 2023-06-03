import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTableComponent } from './inventory-table.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { CustomButtonModule } from "../custom-button/custom-button.module";
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
    declarations: [
        InventoryTableComponent
    ],
    exports: [
        InventoryTableComponent
    ],
    providers: [ProductService],
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        FormsModule,
        InputNumberModule,
        CustomButtonModule
    ]
})
export class InventoryTableModule { }
