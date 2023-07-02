import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionsData() {
    return this.http.get<any>('assets/session-list.json');
  }

  getSessions() {
      return Promise.resolve(this.getSessionsData());
  }

}
