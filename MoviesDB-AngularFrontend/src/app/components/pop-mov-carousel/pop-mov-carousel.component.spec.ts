import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopMovCarouselComponent } from './pop-mov-carousel.component';

describe('PopMovCarouselComponent', () => {
  let component: PopMovCarouselComponent;
  let fixture: ComponentFixture<PopMovCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopMovCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopMovCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
