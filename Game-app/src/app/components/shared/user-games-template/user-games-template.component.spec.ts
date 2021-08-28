import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGamesTemplateComponent } from './user-games-template.component';

describe('UserGamesTemplateComponent', () => {
  let component: UserGamesTemplateComponent;
  let fixture: ComponentFixture<UserGamesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGamesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGamesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
