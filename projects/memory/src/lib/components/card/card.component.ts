import { Component, EventEmitter, input, Output } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgStyle, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cardElement = input.required<Card>();
  width = input<string>('50px');
  @Output() cardClicked = new EventEmitter<Card>();
}
