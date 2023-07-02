import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';

import { InventoryService } from '../../shared/services/inventory.service';
import { SessionService } from '../../shared/services/session.service';

import { InventoryItem } from '../../models/inventory-item.model';
import { Session } from '../../models/session.model';
interface Client {
  name: string;
  information: string;
}

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit, OnDestroy {
  inventory: InventoryItem[] = [];
  formGroup!: FormGroup;
  filteredClients: Client[] = [];
  categories: string[] = [];

  displayModal = false;
  displayModal2 = false;

  timer = '0:00:00';
  sessionElapsedTime = '0:00:00';
  timerSubscription: Subscription | undefined;
  selectedClient: Client | undefined;

  clients: Client[] = [
    { name: 'Allan Foppa', information: 'Alergia a stress' },
    { name: 'Diego Skieresz', information: 'Alergia a zinco' },
    { name: 'Alvaro Maia', information: 'Hepatite' },
    { name: 'Allana Soares', information: 'Diabetes' },
  ];

  constructor(
    private inventoryService: InventoryService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      information: new FormControl(''),
      continuation: new FormControl(false),
      inventory: new FormArray([]),
      sessionElapsedTime: new FormControl('')
    });

    this.fetchInventoryFromBackend();
  }

  ngOnDestroy(): void {
    this.stopTimer();
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
    const query = event.query;
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  selectClient(event: any) {
    if (event) {
      this.getUserInfoEl().forEach((el) => {
        el.classList.remove('toggle-user-complement-info');
      });
  
      this.formGroup.patchValue({
        'information': event.information
      });
  
      this.selectedClient = event;
    }
  }
  

  unselectClient() {
    this.getUserInfoEl().forEach((el) => {
      el.classList.add('toggle-user-complement-info');
    });

    this.formGroup.patchValue({
      name: '',
      information: '',
      continuation: false
    });
  }

  getUserInfoEl(): HTMLElement[] {
    return Array.from(document.getElementsByClassName('user-complement-info') as HTMLCollectionOf<HTMLElement>);
  }

  addMaterial(id: string, value2: any, material: string) {
    const inventoryArray = this.formGroup.get('inventory') as FormArray<any>;

    const itemIndex = inventoryArray.controls.findIndex((control) => {
      return control.value._id === id;
    });

    const maxQuantity = this.getMaxQuantity(id);

    if (itemIndex !== -1) {
      const item = inventoryArray.at(itemIndex);
      const updatedQuantity = Math.min(maxQuantity, value2);
      item.patchValue({ quantity: updatedQuantity });
      console.log(`Current quantity of ${material}: ${updatedQuantity}`);
    } else {
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
    const selectedClient = this.formGroup.value.name;
    const inventoryCopy = JSON.parse(JSON.stringify(this.formGroup.value.inventory));

    this.startTimer();

    this.openModal(selectedClient, inventoryCopy);
  }

  openModal(selectedClient: Client | undefined, inventoryCopy: any) {
    this.selectedClient = selectedClient;
    this.startTimer();
    this.displayModal = true;
  }

  showModal2() {
    this.stopTimer();
    this.formGroup.patchValue({ sessionElapsedTime: this.timer });
  
    const sessionData: Session = {
      client: this.formGroup.value.name,
      date: new Date().toISOString(),
      duration: this.formGroup.value.sessionElapsedTime,
      totalCost: this.calculateTotalCost().toString(),
      supplyUsed: this.generateSupplyUsed()
    };
  
    // Verificar os dados antes de enviar para o serviço SessionService
    console.log('Dados da sessão:', sessionData);
  
    // Enviar o objeto sessionData para o serviço SessionService
    this.sessionService.createSession(sessionData).subscribe(() => {
      console.log('A sessão foi armazenada com sucesso.');
    });
  
    this.displayModal2 = true;
  }
  

  calculateTotalCost(): number {
    const inventoryItems = this.formGroup.value.inventory;
    let totalCost = 0;
  
    inventoryItems.forEach((item: any) => {
      const selectedItem = this.inventory.find((inventoryItem) => inventoryItem._id === item._id);
      if (selectedItem) {
        totalCost += selectedItem.price * item.quantity;
      }
    });
  
    return totalCost;
  }
  
  generateSupplyUsed(): string {
    const inventoryItems = this.formGroup.value.inventory;
    let supplyUsed = '';
  
    inventoryItems.forEach((item: any) => {
      const selectedItem = this.inventory.find((inventoryItem) => inventoryItem._id === item._id);
      if (selectedItem) {
        const itemCost = selectedItem.price * item.quantity;
        supplyUsed += `${selectedItem.name} - Quantidade: ${item.quantity}, Valor: ${itemCost}\n`;
      }
    });
  
    return supplyUsed;
  }
  
  closeModal2() {
    this.displayModal2 = false;
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(0, 1000).subscribe((d) => {
      this.timer = this.formatTimer(d);
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.sessionElapsedTime = this.timer;
  }

  resetTimer() {
    this.timer = '0:00:00';
  }

  formatTimer(timer: number): string {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    return `${this.formatTwoDigits(hours)}:${this.formatTwoDigits(minutes)}:${this.formatTwoDigits(seconds)}`;
  }

  formatTwoDigits(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
