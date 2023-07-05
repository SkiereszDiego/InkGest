import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CustomButtonModule } from '../custom-button/custom-button.module';
import { InventoryService } from 'src/app/shared/services/inventory.service';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    CustomButtonModule
  ],
  exports: [
    SearchComponent
  ],
  providers: [
    InventoryService
  ]
})
export class SearchModule { }
