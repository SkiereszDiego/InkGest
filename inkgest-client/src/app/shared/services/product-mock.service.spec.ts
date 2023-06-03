import { TestBed } from '@angular/core/testing';

import { ProductServiceMock } from './product-mock.service';

describe('ProductMockService', () => {
  let service: ProductServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
