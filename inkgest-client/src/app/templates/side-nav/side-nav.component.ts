import { Component } from '@angular/core';
import { Path } from 'src/app/shared/enums/path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  selectedItem: string = 'dashboard';
// Definindo as propriedades para os caminhos das diferentes páginas da aplicação


public dashboardPath: any = Path.DASHBOARD;
public agendaPath: any = Path.AGENDA;
public clientsPath: any = Path.CLIENTS;
public professionalsPath: any = Path.PROFESSIONALS;
public inventoryPath: any = Path.INVENTORY;

  // As propriedades como dashboardPath, agendaPath, clientsPath, etc.,
  // estão sendo usadas para armazenar os caminhos das diferentes páginas
  // da aplicação. Esses caminhos são importados do arquivo path.ts e são
  // usados para navegar para as respectivas páginas.
  
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
