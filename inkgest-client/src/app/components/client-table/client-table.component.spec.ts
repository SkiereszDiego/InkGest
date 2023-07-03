import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTableComponent } from './client-table.component';

describe('ClientTableComponent', () => {
  let component: ClientTableComponent;
  let fixture: ComponentFixture<ClientTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTableComponent]
    });
    fixture = TestBed.createComponent(ClientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
