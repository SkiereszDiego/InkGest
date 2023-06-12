import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit {
  @Input() editMode = false;
  inventory: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchInventoryFromBackend();
  }

  // Verifica se a quantidade está baixa
  isLowStock(quantity: number): boolean {
    return quantity < 5;
  }

  // Verifica se está próximo da data de validade
  isNearExpiration(expirationDate: string): boolean {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const daysDifference = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysDifference <= 7;
  }

  // Obtém o inventário do backend
  private fetchInventoryFromBackend(): void {
    this.inventoryService.getInventory().subscribe((data: InventoryItem[]) => {
      console.log('Data recebida do backend:', data);
      this.inventory = data;
      console.log('Inventory items:', this.inventory);
    });
  }

  // Incrementa a quantidade de um item
  incrementQuantity(item: InventoryItem): void {
    item.quantity++;
  }

  // Decrementa a quantidade de um item
  decrementQuantity(item: InventoryItem): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }
}
