import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMovCarouselComponent } from './t-mov-carousel.component';

describe('TMovCarouselComponent', () => {
  let component: TMovCarouselComponent;
  let fixture: ComponentFixture<TMovCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMovCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TMovCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
