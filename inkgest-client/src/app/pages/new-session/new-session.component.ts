import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { InventoryService } from '../../shared/services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {
  inventory: InventoryItem[] = [];
  formGroup!: FormGroup;
  filteredClients!: any[];
  categories: string[] = [];

  clients: any[] = [
    { 'name': 'Allan', 'information': 'Alergia a stress' },
    { 'name': 'Diego', 'information': 'Alergia a zinco' },
    { 'name': 'Alvaro', 'information': 'Hepatite' },
    { 'name': 'Allana', 'information': 'Diabetes' },
  ];

  constructor(
    private inventoryService: InventoryService,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      information: new FormControl(''),
      continuation: new FormControl(false),
      inventory: new FormArray([])
    });

    this.fetchInventoryFromBackend();
  }

  private fetchInventoryFromBackend(): void {
    this.inventoryService.getInventory().subscribe((data: InventoryItem[]) => {
      console.log('Data received from the backend:', data);
      this.inventory = data;
      console.log('Inventory items:', this.inventory);
      this.categories = Array.from(new Set(this.inventory.map(item => item.category)));
    });
  }

  filterClient(event: any) {
    let query = event.query;
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  // TODO: TEMP CODE
  updateClientInfo() {
    console.log('[this.formGroup]', this.formGroup.value);
  }

  selectClient(event: any) {
    this.getUserInfoEl().forEach((el) => {
      el.classList.remove('toggle-user-complement-info');
    });

    this.formGroup.patchValue({
      'information': event.information
    });
  }

  unselectClient() {
    this.getUserInfoEl().forEach((el) => {
      el.classList.add('toggle-user-complement-info');
    });

    this.formGroup.patchValue({
      'name': '',
      'information': '',
      'continuation': false
    });
  }

  getUserInfoEl() {
    return Array.from(
      document.getElementsByClassName(
        'user-complement-info'
      ) as HTMLCollectionOf<HTMLElement>
    );
  }

  addMaterial(id: string, value2: any, material: string) {
    const inventoryArray = this.formGroup.get('inventory') as FormArray<any>;

    // Find the item in the inventory array
    const itemIndex = inventoryArray.controls.findIndex((control) => {
      return control.value._id === id;
    });

    const maxQuantity = this.getMaxQuantity(id);

    if (itemIndex !== -1) {
      // Update the quantity of the existing item
      const item = inventoryArray.at(itemIndex);
      const currentQuantity = item.value.quantity;
      const updatedQuantity = Math.min(maxQuantity, value2);
      item.patchValue({ quantity: updatedQuantity });
      console.log(`Current quantity of ${material}: ${updatedQuantity}`);
    } else {
      // Add a new item to the inventory array
      const control = new FormGroup({
        _id: new FormControl(id),
        quantity: new FormControl(Math.min(maxQuantity, value2))
      });
      inventoryArray.push(control);
      console.log(`Current quantity of ${material}: ${control.value.quantity}`);
    }
  }

  getMaxQuantity(id: string): number {
    const items = (this.formGroup.get('inventory') as FormArray<any>).controls;
    let totalQuantity = 0;

    for (const item of items) {
      if (item.value._id === id) {
        totalQuantity += item.value.quantity;
      }
    }

    const selectedItem = this.inventory.find((item) => item._id === id);
    return selectedItem ? selectedItem.quantity : totalQuantity;
  }

  startSession() {
    // Get the selected client
    const selectedClient = this.formGroup.value.name;

    // Create a deep copy of the inventory array to pass to the modal
    const inventoryCopy = JSON.parse(JSON.stringify(this.formGroup.value.inventory));

    // Open the modal with the selected client name and inventory copy

    console.log('Selected Client:', selectedClient);
    console.log('Inventory Copy:', inventoryCopy);
  }
}
