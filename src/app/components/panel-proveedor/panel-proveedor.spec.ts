import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProveedor } from './panel-proveedor';

describe('PanelProveedor', () => {
  let component: PanelProveedor;
  let fixture: ComponentFixture<PanelProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelProveedor],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelProveedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
