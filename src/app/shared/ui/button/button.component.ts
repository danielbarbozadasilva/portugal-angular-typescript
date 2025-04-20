import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-example-button',
  templateUrl: './example-button.component.html',
  styleUrls: ['./example-button.component.css']
})
export class ExampleButtonComponent {
  @Input() label: string = 'Clique aqui';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
