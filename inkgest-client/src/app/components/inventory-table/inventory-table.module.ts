import { InventoryTableComponent } from './inventory-table.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { CustomButtonModule } from '../custom-button/custom-button.module';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        InventoryTableComponent
    ],
    exports: [
        InventoryTableComponent
    ],
    imports: [
        ButtonModule,
        CalendarModule,
        CommonModule,
        ConfirmDialogModule,
        CustomButtonModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DynamicDialogModule,
        FieldsetModule,
        FlexLayoutModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        ListboxModule,
        MessageModule,
        MessagesModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        RadioButtonModule,
        ReactiveFormsModule,
        TableModule,
        TagModule,
        ToastModule
    ],
    providers: [
        InventoryService,
        DatePipe
    ]
})
export class InventoryTableModule { }
