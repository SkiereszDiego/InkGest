import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductServiceMock {
  getSuggestions(query: string): Observable<string[]> {
    const suggestions: string[] = ['Agulhas RL', 'Agulhas RS', 'Agulhas MG', 'Tinta', 'Batoque', 'Luvas'];

    return of(suggestions);
  }
}
