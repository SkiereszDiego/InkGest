import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalsComponent } from '../professionals/professionals.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';



@NgModule({
  declarations: [
    ProfessionalsComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule
  ]
})
export class ProfessionalsModule { }
