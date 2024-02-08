import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFacComponent } from './mostrar-fac.component';

describe('MostrarFacComponent', () => {
  let component: MostrarFacComponent;
  let fixture: ComponentFixture<MostrarFacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarFacComponent]
    });
    fixture = TestBed.createComponent(MostrarFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
