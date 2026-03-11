import { Component, EventEmitter, input, Output } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cardElement = input.required<Card>();
  @Output() cardClicked = new EventEmitter<Card>();
}
