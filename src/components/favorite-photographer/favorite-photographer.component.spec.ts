import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePhotographerComponent } from './favorite-photographer.component';

describe('FavoritePhotographerComponent', () => {
  let component: FavoritePhotographerComponent;
  let fixture: ComponentFixture<FavoritePhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePhotographerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritePhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
