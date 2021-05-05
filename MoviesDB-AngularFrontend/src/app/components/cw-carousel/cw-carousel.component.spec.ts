import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCarouselComponent } from './cw-carousel.component';

describe('CwCarouselComponent', () => {
  let component: CwCarouselComponent;
  let fixture: ComponentFixture<CwCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
