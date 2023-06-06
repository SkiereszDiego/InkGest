import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubtitleComponent } from './page-subtitle.component';

describe('PageSubtitleComponent', () => {
  let component: PageSubtitleComponent;
  let fixture: ComponentFixture<PageSubtitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSubtitleComponent]
    });
    fixture = TestBed.createComponent(PageSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
