import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {

  clients: any[] = [
    { 'name': 'Allan', 'information': 'Alergia a stress' },
    { 'name': 'Diego', 'information': 'Alergia a zinco' },
    { 'name': 'Alvaro', 'information': 'Hepatite' },
    { 'name': 'Allana', 'information': 'Diabetes' },
  ];

  inventoryList: any[] = [
    {
      "_id": 1,
      "category": "Agulhas",
      "subcategory": "RL",
      "description": "Agulha traçado 3RL",
      "quantity": 10
    },
    {
      "_id": 3,
      "category": "Agulhas",
      "subcategory": "RS",
      "description": "Agulha sombra 9RS",
      "quantity": 5
    },
    {
      "_id": 4,
      "category": "Tintas",
      "subcategory": "Preta",
      "description": "Eletric Ink Tribal",
      "quantity": 8
    },
    {
      "_id": 2,
      "category": "Descartáveis",
      "subcategory": "RL",
      "description": "Cartucho de agulhas para traçado",
      "quantity": 3
    }
  ];

  inv: FormArray<any> = new FormArray<any>([]);
  formGroup!: FormGroup;
  filteredClients!: any[];
  categories: string[] = [];

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      information: new FormControl(''),
      continuation: new FormControl(false),
      inventory: this.inv
    });

    this.inv = this.formGroup.get("inventory") as FormArray<any>;

    this.categories = Array.from(new Set(this.inventoryList.map(item => item.category)));
  }

  filterClient(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.clients.length; i++) {
      let client = this.clients[i];
      if (client.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(client);
      }
    }

    this.filteredClients = filtered;
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
    let el = Array.from(
      document.getElementsByClassName(
        'user-complement-info'
      ) as HTMLCollectionOf<HTMLElement>
    );

    return el;
  }

  addMaterial(id: number, value2: any, material: string) {
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

  getMaxQuantity(id: number): number {
    const items = (this.formGroup.get('inventory') as FormArray<any>).controls;
    let totalQuantity = 0;

    for (const item of items) {
      if (item.value._id === id) {
        totalQuantity += item.value.quantity;
      }
    }

    const selectedItem = this.inventoryList.find((item) => item._id === id);
    return selectedItem ? selectedItem.quantity : totalQuantity;
  }

  startSession() {
    // Get the selected client
    const selectedClient = this.formGroup.value.name;

    // Create a deep copy of the inventory array to pass to the modal
    const inventoryCopy = JSON.parse(JSON.stringify(this.formGroup.value.inventory));

    // Open the modal with the selected client name and inventory copy
    // ... (code to open modal)

    console.log('Selected Client:', selectedClient);
    console.log('Inventory Copy:', inventoryCopy);
  }
}
