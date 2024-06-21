import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCenterComponent } from './favorite-center.component';

describe('FavoriteCenterComponent', () => {
  let component: FavoriteCenterComponent;
  let fixture: ComponentFixture<FavoriteCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
