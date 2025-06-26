import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emptystate.component.html',
  styleUrl: './emptystate.component.scss',
})
export class EmptyStateComponent {
  @Input() image = '';
  @Input() alt = '';
  @Input() message = 'No items yet.';
  @Input() link = '/';
  @Input() linkText = 'Back to Home';
}
