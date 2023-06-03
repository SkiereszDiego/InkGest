import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './custom-button.component';
import { ButtonModule as PrimeNGButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CustomButtonComponent
  ],
  imports: [
    CommonModule,
    PrimeNGButtonModule
  ],
  exports: [
    CustomButtonComponent
  ]
})
export class CustomButtonModule { }
