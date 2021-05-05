import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopTvCarouselComponent } from './pop-tv-carousel.component';

describe('PopTvCarouselComponent', () => {
  let component: PopTvCarouselComponent;
  let fixture: ComponentFixture<PopTvCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopTvCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopTvCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
