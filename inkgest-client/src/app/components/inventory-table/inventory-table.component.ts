import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit {
  @Input() editMode = false;
  inventory: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService, private datePipe: DatePipe) {}

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
}
