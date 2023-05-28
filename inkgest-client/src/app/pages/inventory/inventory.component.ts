import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  searchText: string = '';

  onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    // Chame aqui a função que atualiza a tabela ou execute a lógica de filtragem de dados
  }
}
