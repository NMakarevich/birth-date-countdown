import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss'],
})
export class InputColorComponent implements OnInit {
  color!: string;

  isOpen = false;

  @Output('changeColor') changeColor: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit() {
    this.color = localStorage.getItem('color') || '#7B68EE';
    this.changeColor.emit(this.color);
  }

  setColor(event: Event) {
    this.color = (event.target as HTMLInputElement).value;
    localStorage.setItem('color', this.color);
    this.changeColor.emit(this.color);
  }

  toggleControl() {
    this.isOpen = !this.isOpen;
  }
}
