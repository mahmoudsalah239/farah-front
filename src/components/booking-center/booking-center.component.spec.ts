import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCenterComponent } from './booking-center.component';

describe('BookingCenterComponent', () => {
  let component: BookingCenterComponent;
  let fixture: ComponentFixture<BookingCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
