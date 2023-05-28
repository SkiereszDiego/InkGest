import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomButtonModule } from 'src/app/components/custom-button/custom-button.module';
import { ProfileControlComponent } from './profile-control.component';



@NgModule({
  declarations: [
    ProfileControlComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule,
    FlexLayoutModule
  ],
  exports: [
    ProfileControlComponent
  ]
})
export class ProfileControlModule { }
