import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPanel } from './cv-panel';

describe('CvPanel', () => {
  let component: CvPanel;
  let fixture: ComponentFixture<CvPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
