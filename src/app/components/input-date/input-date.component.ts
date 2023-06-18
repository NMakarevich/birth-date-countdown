import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements OnInit {
  date!: string;

  minDate!: string;

  isSafari = false;

  @Output('setDate') setDate: EventEmitter<string> = new EventEmitter<string>();

  @Output('toggleDateInput') toggleDateInput: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  selectDate(event: any) {
    if (this.isSafari && new Date(event.value) > new Date(this.minDate)) {
      this.date = event.value;
    } else this.date = (event.target as HTMLInputElement).value;
    localStorage.setItem('date', this.date);
    this.setDate.emit(this.date);
    this.toggleDateInput.emit(false);
  }

  ngOnInit() {
    this.isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

    this.minDate = new Date().toISOString().slice(0, 16);
    this.date = localStorage.getItem('date') || '';
    localStorage.setItem('date', this.date);
    Promise.resolve().then(() => {
      this.setDate.emit(this.date);
    });
  }
}
