import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpMovCarouselComponent } from './cp-mov-carousel.component';

describe('CpMovCarouselComponent', () => {
  let component: CpMovCarouselComponent;
  let fixture: ComponentFixture<CpMovCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpMovCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpMovCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
