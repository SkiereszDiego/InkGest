import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionComponent } from './new-session.component';

describe('NewSessionComponent', () => {
  let component: NewSessionComponent;
  let fixture: ComponentFixture<NewSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSessionComponent]
    });
    fixture = TestBed.createComponent(NewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
