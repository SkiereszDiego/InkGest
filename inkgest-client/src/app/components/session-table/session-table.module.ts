import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SessionTableComponent } from './session-table.component';

import { CustomButtonModule } from '../custom-button/custom-button.module';

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
import { ToastModule } from 'primeng/toast';

import { SessionService } from 'src/app/shared/services/session.service';


@NgModule({
  declarations: [
    SessionTableComponent
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
    ToastModule
    
  ],
  exports: [
    SessionTableComponent
  ],
  providers: [
    SessionService
  ]
})
export class SessionTableModule { }
