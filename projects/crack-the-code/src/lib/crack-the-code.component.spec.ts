import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrackTheCodeComponent } from './crack-the-code.component';

describe('CrackTheCodeComponent', () => {
  let component: CrackTheCodeComponent;
  let fixture: ComponentFixture<CrackTheCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrackTheCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrackTheCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
