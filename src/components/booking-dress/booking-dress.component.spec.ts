import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDressComponent } from './booking-dress.component';

describe('BookingDressComponent', () => {
  let component: BookingDressComponent;
  let fixture: ComponentFixture<BookingDressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingDressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
