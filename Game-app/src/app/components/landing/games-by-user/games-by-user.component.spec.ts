import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesByUserComponent } from './games-by-user.component';

describe('UserGamesComponent', () => {
  let component: GamesByUserComponent;
  let fixture: ComponentFixture<GamesByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
