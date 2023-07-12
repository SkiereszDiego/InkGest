import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SessionService } from '../../shared/services/session.service'
import { Session } from '../../models/session.model'

import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-session-table',
  templateUrl: './session-table.component.html',
  styleUrls: ['./session-table.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class SessionTableComponent implements OnInit{
  sessionDialog: boolean = false

  sessions: Session[] = [];

  session!: Session;

  submitted: boolean = false;

  sessionForm = this.fb.group({
    client: ['', Validators.required],
    session_date: [new Date(), Validators.required],
    tattoo: [''],
    value: [0, Validators.required],
    tattooArtist: ['', Validators.required],
    duration: ['', Validators.required],
    totalCost: 0,
    supplyUsed: '',
  });


  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  
  async ngOnInit() {
    const data = await this.sessionService.getSessions();
    data.subscribe((sessions: Session[]) => {
      this.sessions = sessions;
    });
  }

  openNew() {
    this.session = {};
    this.submitted = false;
    this.sessionDialog = true;
  }


  deleteSession(session: Session) {
    this.confirmationService.confirm({
        message: 'Tem certeza de que quer excluir esta sessão?' + session.client + '?',
        header: 'Confirme',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.sessions = this.sessions.filter((val) => val.id !== session.id);
            this.session = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'session Deleted', life: 3000 });
        }
    });
  }

  editSession(session: Session) {
    this.session = { ...session };
    this.sessionDialog = true;
  }

  hideDialog() {
    this.sessionDialog = false;
    this.submitted = false;
  }

  saveSession() {
    this.submitted = true;

    if (this.session.client?.trim()) {
        if (this.session.id) {
            this.sessions[this.findIndexById(this.session.id)] = this.session;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Updated', life: 3000 });
        } else {
            this.session.id = this.createId();
            this.sessions.push(this.session);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Created', life: 3000 });
        }

        this.sessions = [...this.sessions];
        this.sessionDialog = false;
        this.session = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.sessions.length; i++) {
        if (this.sessions[i].id === id) {
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
