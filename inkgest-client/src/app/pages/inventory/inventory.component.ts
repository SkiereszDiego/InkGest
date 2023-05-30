import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  searchText: string = '';
  editMode: boolean = false;
  originalEditMode: boolean = false;

  onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    // Chame a função para atualizar a tabela ou executar a lógica de filtragem de dados aqui
  }

  toggleEditMode(): void {
    this.originalEditMode = this.editMode;
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    // Lógica para salvar as alterações

    this.editMode = this.originalEditMode;
  }
}
