import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:3000/api/session/';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Configuração para permitir qualquer origem (apenas para desenvolvimento)
    });
    return this.http.get<Session[]>(this.apiUrl, { headers });
  }

  saveSession(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Configuração para permitir qualquer origem (apenas para desenvolvimento)
    });

    return this.http.post(this.apiUrl, postData, { headers });
  }

  updateSessionById(itemId: string, item: Session): Observable<Session> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.put<Session>(url, item);
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
}
