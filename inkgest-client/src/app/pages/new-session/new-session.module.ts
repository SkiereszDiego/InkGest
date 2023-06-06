import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSessionComponent } from './new-session.component';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { PageSubtitleModule } from 'src/app/components/page-subtitle/page-subtitle.module';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';



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
    ReactiveFormsModule,
    FormsModule,
    PageTitleModule,
    PageSubtitleModule
  ],
  exports: [
    NewSessionComponent
  ]
})
export class NewSessionModule { }
