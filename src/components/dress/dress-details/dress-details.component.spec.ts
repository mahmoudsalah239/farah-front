import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressDetailsComponent } from './dress-details.component';

describe('DressDetailsComponent', () => {
  let component: DressDetailsComponent;
  let fixture: ComponentFixture<DressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
