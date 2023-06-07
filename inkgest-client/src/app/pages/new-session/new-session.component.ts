import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {

  clients: any[] = [
    {'name': 'Allan', 'information': '1'},
    {'name': 'Diego', 'information': '12'},
    {'name': 'Alvaro', 'information': '123'},
    {'name': 'Allana', 'information': ''},
  ]

  inventoryList: any[] = [
    {
      "_id": 1,
      "category": "Agulhas",
      "subcategory": "RL",
      "description": "Agulha muito bonita e muita linda e muita errado",
    },
    {
      "_id": 3,
      "category": "Agulhas",
      "subcategory": "RL",
      "description": "Agulha bonita",
    },
    {
      "_id": 4,
      "category": "Tintas",
      "subcategory": "RL",
      "description": "Agulha bonita",
    },
    {
      "_id": 2,
      "category": "Descartáveis",
      "subcategory": "RL",
      "description": "Cartucho de agulhas para traçado",
    }
  ]

  inv: any
  formGroup!: FormGroup;
  filteredClients!: any[];

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      information: new FormControl(''),
      continuation: new FormControl(false),
      inventory: new FormArray([])
    });

    this.inv = this.formGroup.get("inventory") as FormArray
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
    console.log('[this.formGroup]', this.formGroup.value)
  }

  selectClient(event: any) {
    this.getUserInfoEl().forEach((el) => {
      el.classList.remove('toggle-user-complement-info')
    })

    this.formGroup.patchValue({
      'information': event.information
    })
  }

  unselectClient() {
    this.getUserInfoEl().forEach((el) => {
      el.classList.add('toggle-user-complement-info')
    })

    this.formGroup.patchValue({
      'name': '',
      'information': '',
      'continuation': false
    })
  }

  getUserInfoEl() {
    let el = Array.from(
      document.getElementsByClassName(
        'user-complement-info'
      ) as HTMLCollectionOf<HTMLElement>
    )

    return el
  }

  addMaterial(id: number, value2: any, material: string) {
    console.log('[event]', id, value2, material)

    const control = new FormControl({
      '_id': id,
      'value': value2
    })

    // After added one
    this.formGroup.value.inventory.find((el: any) => {
      if (el._id == id) {
        el.value = value2
        console.log('[E IGUAL]', el.value)
      }

      return
    })

    // Add first element at list
    this.inv.push(control)

  }

}
