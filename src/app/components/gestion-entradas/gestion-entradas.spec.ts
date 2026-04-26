import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEntradas } from './gestion-entradas';

describe('GestionEntradas', () => {
  let component: GestionEntradas;
  let fixture: ComponentFixture<GestionEntradas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEntradas],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionEntradas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
