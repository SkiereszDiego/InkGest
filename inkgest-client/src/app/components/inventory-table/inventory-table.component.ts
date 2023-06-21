import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
  providers: [MessageService]
})
export class InventoryTableComponent implements OnInit {
  @Input() editMode = false;
  inventory: InventoryItem[] = [];
  showConfirmDialog = false;

  constructor(
    private inventoryService: InventoryService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchInventoryFromBackend();
  }

  isLowStock(quantity: number): boolean {
    return quantity < 5;
  }

  isNearExpiration(expirationDate: string): boolean {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const daysDifference = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysDifference <= 7;
  }

  private fetchInventoryFromBackend(): void {
    this.inventoryService.getInventory().subscribe((data: any[]) => {
      console.log('Data recebida do backend:', data);
      this.inventory = data.map(item => ({
        ...item,
        purchase_date: new Date(item.purchase_date),
        expiry_date: new Date(item.expiry_date)
      }));
      console.log('Inventory items:', this.inventory);
    });
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date);
    return this.datePipe.transform(formattedDate, 'yyyy-MM-dd') || '';
  }

  incrementQuantity(item: InventoryItem): void {
    item.quantity++;
  }

  decrementQuantity(item: InventoryItem): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  confirmDelete(item: InventoryItem): void {
    this.showConfirmDialog = true;
  }

  deleteItem(item: InventoryItem): void {
    console.log('Deleting item:', item); // Verificar o item antes da exclusão
    console.log('Item ID:', item._id); // Verificar o ID do item
  
    const itemId = item._id; // Armazenar o ID do item em uma variável separada para verificar
  
    this.inventoryService.deleteItem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully.'); // Indicar que o item foi excluído com sucesso
        this.inventory = this.inventory.filter(i => i._id !== itemId);
        this.showToast('Item deletado com sucesso.', 'success');
        this.showConfirmDialog = false;
      },
      (error) => {
        console.error('Error deleting item:', error); // Indicar um erro ao excluir o item
        this.showToast('Erro ao deletar item.', 'error');
      }
    );
  }

  showToast(message: string, severity: string): void {
    const toast: any = {
      severity: severity,
      summary: message,
      life: 3000
    };

    this.messageService.add(toast);
  }
}
