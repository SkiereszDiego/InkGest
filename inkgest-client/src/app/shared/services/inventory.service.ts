import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/api/inventory/';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Configuração para permitir qualquer origem (apenas para desenvolvimento)
    });

    return this.http.get<InventoryItem[]>(this.apiUrl, { headers });
  }
}
