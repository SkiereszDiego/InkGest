import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../../models/client.model'
import { ClientService } from 'src/app/shared/services/client.service';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class ClientTableComponent implements OnInit{
  clientDialog: boolean = false

  clients: Client[] = [];

  client!: Client;

  submitted: boolean = false;


  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  
  async ngOnInit() {
    const data = await this.clientService.getClients();
    data.subscribe((clients) => {
      this.clients = clients;
    });
  }

  openNew() {
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }


  deleteClient(client: Client) {
    this.confirmationService.confirm({
        message: 'Tem certeza de que quer excluir esta sessão?' + client.client + '?',
        header: 'Confirme',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.clients = this.clients.filter((val) => val.id !== client.id);
            this.client = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'session Deleted', life: 3000 });
        }
    });
  }

  editClient(client: Client) {
    this.client = { ...client };
    this.clientDialog = true;
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

  saveClient() {
    this.submitted = true;

    if (this.client.client?.trim()) {
        if (this.client.id) {
            this.clients[this.findIndexById(this.client.id)] = this.client;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
        } else {
            this.client.id = this.createId();
            this.clients.push(this.client);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
        }

        this.clients = [...this.clients];
        this.clientDialog = false;
        this.client = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

