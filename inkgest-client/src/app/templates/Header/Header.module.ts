import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { PrimeIcons } from 'primeng/api';
import { CustomButtonModule } from '../../components/custom-button/custom-button.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CustomButtonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    PrimeIcons
  ]
})
export class HeaderModule { }


// IMPORT E PROVIDERS
// O import é como a conexão com a rede elétrica e a rede de abastecimento de água. 
// Você precisa importar esses serviços externos para dentro da sua casa. No Angular,
//  isso é feito importando módulos externos ou bibliotecas que fornecem recursos adicionais ao seu aplicativo. 
//  Por exemplo, ao importar o módulo CommonModule do Angular, você tem acesso a funcionalidades básicas, como
//  diretivas ngFor e ngIf.

// O provider é como a instalação de equipamentos dentro da sua casa para fornecer esses recursos,
// como interruptores de luz, tomadas e encanamentos. No Angular, você usa providers para fornecer
// instâncias de serviços ou objetos que seu aplicativo precisa. Os providers são registrados nos
// módulos ou componentes e são responsáveis por criar e fornecer esses serviços. Por exemplo,
// você pode ter um serviço de autenticação e criar um provider para fornecer uma instância desse
// serviço para os componentes que precisam dele.

// Em resumo, o import é como trazer recursos externos para dentro do seu aplicativo Angular,
// enquanto o provider é como criar e fornecer instâncias desses recursos para serem usados pelos
// componentes e serviços do seu aplicativo.