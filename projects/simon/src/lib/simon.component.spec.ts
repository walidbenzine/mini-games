import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonComponent } from './simon.component';

describe('Simon', () => {
  let component: SimonComponent;
  let fixture: ComponentFixture<SimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
