import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import toISOStringWithTZ from '../../utils/utils';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    standalone: true
})
export class InputDateComponent implements OnInit {
  date!: string;

  minDate!: string;

  placeholder!: string;

  @Output('setDate') setDate: EventEmitter<string> = new EventEmitter<string>();

  @Output('toggleDateInput') toggleDateInput: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  selectDate(event: Event) {
    this.date = (event.target as HTMLInputElement).value;
    localStorage.setItem('date', this.date);
    this.setDate.emit(this.date);
    this.toggleDateInput.emit(false);
  }

  ngOnInit() {
    this.minDate = toISOStringWithTZ(new Date());
    this.placeholder = `пример: ${this.minDate}`;
    this.date = localStorage.getItem('date') || '';
    localStorage.setItem('date', this.date);
    Promise.resolve().then(() => {
      this.setDate.emit(this.date);
    });
  }
}
