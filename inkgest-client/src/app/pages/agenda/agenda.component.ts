import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  searchText: string = '';

  onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    // Chame aqui a função que atualiza a tabela ou execute a lógica de filtragem de dados
  }
}
