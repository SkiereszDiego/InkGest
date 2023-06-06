import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  formGroup!: FormGroup;
  filteredClients!: any[];

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      information: new FormControl(''),
      continuation: new FormControl(false),
    });
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
}
