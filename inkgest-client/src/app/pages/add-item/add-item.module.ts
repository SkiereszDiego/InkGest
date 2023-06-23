import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item.component';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { ToastModule } from 'primeng/toast'; 


@NgModule({
  declarations: [
    AddItemComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    CustomButtonModule,
    ToastModule 
  ],
  exports: [
    AddItemComponent
  ]
})
export class AddItemModule { }
