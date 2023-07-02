import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InventoryItem } from '../../models/inventory-item.model';

import { map } from 'rxjs/operators';


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

  createItem(item: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Configuração para permitir qualquer origem (apenas para desenvolvimento)
    });

    return this.http.post(this.apiUrl, item, { headers });
  }

  confirmDelete(id: string): Observable<any> {
    return new Observable(observer => {
      this.deleteItem(id).subscribe(
        () => {
          observer.next(); // Envie um valor vazio para indicar sucesso
          observer.complete(); // Complete o Observable
        },
        error => {
          observer.error(error); // Envie o erro para o consumidor do Observable
        }
      );
    });
  }

  public deleteItem(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Configuração para permitir qualquer origem (apenas para desenvolvimento)
    });

    const url = `${this.apiUrl}/${id}`; // Adicione a rota de exclusão do item ao URL

    return this.http.delete(url, { headers });
  }


  getSuggestions(query: string): Observable<string[]> {
    const suggestions: string[] = ['Agulhas RL', 'Agulhas RS', 'Agulhas MG', 'Tinta', 'Batoque', 'Luvas'];

    return of(suggestions);
  }

  getProductsMini(): Observable<InventoryItem[]> {
    return this.getInventory().pipe(
      map(items => items.slice(0, 5))
    );
  }
  
  getProductsSmall(): Observable<InventoryItem[]> {
    return this.getInventory().pipe(
      map(items => items.slice(0, 10))
    );
  }
  
  getProducts(): Observable<InventoryItem[]> {
    return this.getInventory();
  }
}
