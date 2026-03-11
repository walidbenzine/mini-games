import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CardComponent } from './card.component';
import { Card } from '../../interfaces/card.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCard: Card = {
    index: 0,
    value: 3,
    flipped: false,
    matched: false,
    disabled: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cardElement', mockCard);

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display card value', () => {
    const span = fixture.nativeElement.querySelector('span');

    expect(span.textContent).toContain('3');
  });

  it('should emit event when card clicked', () => {
    const spy = vi.spyOn(component.cardClicked, 'emit');

    const card = fixture.nativeElement.querySelector('.card-container');

    card.click();

    expect(spy).toHaveBeenCalledWith(mockCard);
  });

  it('should apply flipped class', () => {
    fixture.componentRef.setInput('cardElement', {
      ...mockCard,
      flipped: true,
    });

    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.card-container');

    expect(card.classList.contains('flipped')).toBe(true);
  });

  it('should apply matched class', () => {
    fixture.componentRef.setInput('cardElement', {
      ...mockCard,
      matched: true,
    });

    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.card-container');

    expect(card.classList.contains('matched')).toBe(true);
  });

  it('should apply disabled class', () => {
    fixture.componentRef.setInput('cardElement', {
      ...mockCard,
      disabled: true,
    });

    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.card-container');

    expect(card.classList.contains('disabled')).toBe(true);
  });
});
