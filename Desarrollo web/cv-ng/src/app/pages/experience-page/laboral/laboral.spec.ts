import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laboral } from './laboral';

describe('Laboral', () => {
  let component: Laboral;
  let fixture: ComponentFixture<Laboral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laboral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Laboral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
