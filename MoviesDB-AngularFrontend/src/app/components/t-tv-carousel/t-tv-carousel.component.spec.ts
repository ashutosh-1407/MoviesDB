import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTvCarouselComponent } from './t-tv-carousel.component';

describe('TTvCarouselComponent', () => {
  let component: TTvCarouselComponent;
  let fixture: ComponentFixture<TTvCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TTvCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TTvCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
