import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item.component';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    AddItemComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    DropdownModule,
    FormsModule,
    CalendarModule
  ],
  exports: [
    AddItemComponent
  ]
})
export class AddItemModule { }
