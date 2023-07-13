import { Component, OnChanges, OnInit } from '@angular/core';
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

export class SessionTableComponent implements OnInit, OnChanges{
  sessionDialog: boolean = false

  sessions: any = [];

  session!: Session;

  submitted: boolean = false;

  sessionForm = this.fb.group({
    client: ['', Validators.required],
    session_date: [null, Validators.required],
    tattoo: [''],
    value: [''],
    tattooArtist: ['', Validators.required],
    duration: ['', Validators.required],
    totalCost: [0, Validators.required],
    supplyUsed: '',
  });

  isCreateOrUpdate = 0;
  updateSessionId = '';

  selectedSession: any = null;

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

  ngOnChanges() {
    if(this.selectedSession) {
      this.sessionForm.patchValue(this.selectedSession);
    } else {
      this.sessionForm.reset();
    }
  }

  openNew() {
    this.isCreateOrUpdate = 1;
    this.session = {};
    this.submitted = false;
    this.sessionDialog = true;
  }

  saveSession() {
    if(this.isCreateOrUpdate == 1) {
      this.insertSession()
    } else {
      this.updateSession();
    }
  }

  deleteSession(idSession: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que quer excluir esta sessão?',
      header: 'Confirme',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.sessionService.deleteItem(idSession).subscribe(
            response => {
              console.log('Resposta do servidor ao criar novo item:', response);
              this.sessionForm.reset();
              this.sessionService.getSessions().subscribe((sessions: Session[]) => {
                this.sessions = sessions;
              });
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Deleted', life: 3000 });
            },
            (error) => {
              console.error('Erro ao criar novo item:', error);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar novo item.' });
            }
          )
        }
    });
  }

  editSession(idSession: any) {
    this.isCreateOrUpdate = 2;
    let target = this.sessions.filter((t: { id: any; }) => idSession == t.id);
    
    this.updateSessionId = idSession
    
    this.sessionForm.patchValue({
      client: target[0].client,
      session_date: target[0].session_date || '',
      tattoo: target[0].tattoo || '',
      value: target[0].value || '',
      duration: target[0].duration  || '',
      totalCost: target[0].totalCost || '',
      supplyUsed:target[0].supplyUsed || '',
    });

    this.sessionDialog = true;
  }

  updateSession() {
    
    let item: Session = {
      id: this.updateSessionId,
      client: this.sessionForm.value.client || '',
      session_date: this.sessionForm.value.session_date || new Date,
      tattoo: this.sessionForm.value.tattoo || '',
      value: this.sessionForm.value.value || '',
      duration: this.sessionForm.value.duration  || '',
      totalCost: this.sessionForm.value.totalCost || 0,
      supplyUsed:this.sessionForm.value.supplyUsed || '',
    }

    this.sessionService.updateSessionById(this.updateSessionId, item).subscribe(
      response => {
        console.log('Resposta do servidor ao editar nova sessao:', response);
        this.sessionForm.reset();
        this.sessionDialog = false;
        this.sessionService.getSessions().subscribe((sessions: Session[]) => {
          this.sessions = sessions;
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sessão editada', life: 3000 });
      },
      (error) => {
        console.error('Erro ao esitar nova sessão:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao editar nova sessão.' });
      }
    )
  }

  hideDialog() {
    this.sessionDialog = false;
    this.submitted = false;
    this.sessionForm.reset();
  }

  insertSession() {

    this.sessionService.saveSession(this.sessionForm.value).subscribe(
      response => {
        console.log('Resposta do servidor ao criar nova sessão:', response);
        this.sessionForm.reset();
        this.sessionDialog = false;
        this.sessionService.getSessions().subscribe((sessions: Session[]) => {
          this.sessions = sessions;
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Created', life: 3000 });
      },
      (error) => {
        console.error('Erro ao criar nova sessão:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar nova sessão.' });
      }
    )
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
