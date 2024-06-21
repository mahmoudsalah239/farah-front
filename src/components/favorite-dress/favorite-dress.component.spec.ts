import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDressComponent } from './favorite-dress.component';

describe('FavoriteDressComponent', () => {
  let component: FavoriteDressComponent;
  let fixture: ComponentFixture<FavoriteDressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteDressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteDressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
