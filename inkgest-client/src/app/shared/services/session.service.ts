import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:3000/api/session/';

  constructor(private http: HttpClient) { }

  getSessionsData() {
    return this.http.get<any>('assets/session-list.json');
  }

  getSessions() {
      return Promise.resolve(this.getSessionsData());
  }

  createSession(sessionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, sessionData);
  }
}
