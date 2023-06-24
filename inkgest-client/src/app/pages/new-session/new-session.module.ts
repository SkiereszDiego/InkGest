import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CustomButtonModule } from '../../components/custom-button/custom-button.module';
import { NewSessionComponent } from './new-session.component';
import { PageTitleModule } from '../../components/page-title/page-title.module';
import { PageSubtitleModule } from '../../components/page-subtitle/page-subtitle.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    NewSessionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AutoCompleteModule,
    InputTextareaModule,
    CheckboxModule,
    ButtonModule,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    PageTitleModule,
    PageSubtitleModule,
    DialogModule,
    CustomButtonModule
  ],
  exports: [
    NewSessionComponent
  ]
})
export class NewSessionModule { }
