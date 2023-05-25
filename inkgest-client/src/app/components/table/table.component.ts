import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  isSpecial = true;
  mostrarClasse = ''

  changeSpecial() {
    this.isSpecial = !this.isSpecial;
  }

}
