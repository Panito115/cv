import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvBlock } from './cv-block';

describe('CvBlock', () => {
  let component: CvBlock;
  let fixture: ComponentFixture<CvBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
