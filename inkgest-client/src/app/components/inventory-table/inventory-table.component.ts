import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InventoryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, map, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InventoryTableComponent implements OnInit, OnChanges{
  inventoryDialog: boolean = false

  inventories: any = [];

  inventory!: InventoryItem;

  submitted: boolean = false;

  productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    subcategory: [''],
    description: ['', Validators.required],
    price: [0, Validators.required],
    purchase_date: [new Date(), Validators.required],
    expiry_date: [new Date()],
    quantity: [0, Validators.required],
  });



  selectedProduct: any = null;
  
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  categories = [
      { label: 'Agulhas', value: 'Agulhas' },
      { label: 'Tintas', value: 'Tintas' },
      { label: 'Batoques', value: 'Batoques' },
      { label: 'Transfers', value: 'Transfers' },
      { label: 'Outro', value: 'Outro' }
  ];

  
  

  async ngOnInit() {
    const data = await this.fetchInventoryFromBackend();
    data.subscribe((inventories: InventoryItem[]) => {
      this.inventories = inventories;
    });
  }

  ngOnChanges() {
    if(this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
    }
  }

  openNew() {
    this.inventory = {};
    this.submitted = false;
    this.inventoryDialog = true;
  }


  deleteProduct(inventories: InventoryItem) {
    this.confirmationService.confirm({
        message: 'Tem certeza de que quer excluir esta sessão?' + inventories.category + '?',
        header: 'Confirme',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.inventories = this.inventories.filter((val: { _id: string | undefined; }) => val._id !== inventories._id);
            this.inventory = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
    });
  }

  editProduct(idProduct: any) {
    let target = this.inventories.filter((t: { _id: any; }) => idProduct == t._id);
    console.log('target',  target)

    this.productForm.patchValue({
      name: target[0].name,
      category: target[0].category || '',
      subcategory: target[0].subcategory || '',
      description: target[0].description  || '',
      price: target[0].pric || '',
      purchase_date:target[0].purchase_date || '',
      expiry_date: target[0].expiry_date || '',
      quantity: target[0].quantity || '',
    });


    console.log('AAAAtarget',  target.name, target['name'])

    this.inventoryDialog = true;
  }

  hideDialog() {
    this.inventoryDialog = false;
    this.submitted = false;
    this.productForm.reset();
  }

  saveProduct() {
    console.log(this.productForm.value)
    this.inventoryService.saveProduct(this.productForm.value).subscribe(
      response => {
        console.log('Resposta do servidor ao criar novo item:', response);
        this.productForm.reset();
        this.inventoryDialog = false;
        this.fetchInventoryFromBackend().subscribe((inventories: InventoryItem[]) => {
          this.inventories = inventories;
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      },
      (error) => {
        console.error('Erro ao criar novo item:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar novo item.' });
      }
    )
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
