import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InventoryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InventoryTableComponent implements OnInit {
  inventoryDialog: boolean = false

  inventories: InventoryItem[] = [];

  inventory!: InventoryItem;

  submitted: boolean = false;


  constructor(
    private inventoryService: InventoryService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    const data = await this.fetchInventoryFromBackend();
    data.subscribe((inventories: InventoryItem[]) => {
      this.inventories = inventories;
    });
  }

  openNew() {
    this.inventory = {};
    this.submitted = false;
    this.inventoryDialog = true;
  }


  deleteProduct(inventory: InventoryItem) {
    this.confirmationService.confirm({
        message: 'Tem certeza de que quer excluir esta sessão?' + inventory.category + '?',
        header: 'Confirme',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.inventories = this.inventories.filter((val) => val._id !== inventory._id);
            this.inventory = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
    });
  }

  editProduct(inventory: InventoryItem) {
    this.inventory = { ...inventory };
    this.inventoryDialog = true;
  }

  hideDialog() {
    this.inventoryDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.inventory.category?.trim()) {
        if (this.inventory._id) {
            this.inventories[this.findIndexById(this.inventory._id)] = this.inventory;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            this.inventory._id = this.createId();
            this.inventories.push(this.inventory);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        this.inventories = [...this.inventories];
        this.inventoryDialog = false;
        this.inventory = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.inventories.length; i++) {
        if (this.inventories[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): string {
    let _id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        _id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return _id;
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

  private fetchInventoryFromBackend(): Observable<any[]> {
    return this.inventoryService.getInventory().pipe(
      map((data: any[]) => {
        console.log('Data recebida do backend:', data);
        this.inventories = data.map(item => ({
          ...item,
          purchase_date: new Date(item.purchase_date),
          expiry_date: new Date(item.expiry_date)
        }));
        console.log('Inventory items:', this.inventory);
        return data;
      })
    );
  }
}
