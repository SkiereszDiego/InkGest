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

  //   return this.http.get<InventoryItem[]>(this.apiUrl, { headers });
  // }

  createSession(sessionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, sessionData);
  }
}
