import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPhotographerComponent } from './booking-photographer.component';

describe('BookingPhotographerComponent', () => {
  let component: BookingPhotographerComponent;
  let fixture: ComponentFixture<BookingPhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPhotographerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
