import { Component, Output, EventEmitter } from '@angular/core';
import { ProductServiceMock } from '../../shared/services/product-mock.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';
  filteredItems: string[] = [];

  constructor(private productServiceMock: ProductServiceMock) {}

  search(event: any): void {
    this.productServiceMock.getSuggestions(event.query).subscribe((suggestions: string[]) => {
      this.filteredItems = suggestions;
    });
  }

  onSearch(): void {
    this.searchTextChanged.emit(this.searchText);
  }
}
