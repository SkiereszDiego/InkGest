import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/api/session/';

  constructor(private http: HttpClient) {}

  getClientsData() {
    return this.http.get<any>('assets/client-list.json');
  }

  getClients() {
      return Promise.resolve(this.getClientsData());
  }

  createClient(sessionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, sessionData);
  }
}