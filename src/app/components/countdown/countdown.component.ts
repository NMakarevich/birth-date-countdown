import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  title = 'До дня рождения:';

  countdown = '';

  openedDateInput = false;

  editMode = false;

  date!: string;

  @ViewChild('input') input!: ElementRef;

  ngOnInit() {
    this.title = localStorage.getItem('title') || this.title;
    const interval = setInterval(() => {
      this.countdown = this.stringifyTimeLeft();
    });
  }

  stringifyTimeLeft() {
    function stringifyDaysWord(days: number) {
      return days === 1 || (days % 10 === 1 && days > 20)
        ? 'день'
        : days % 10 === 0 ||
          (days % 10 > 4 && days > 20) ||
          (days > 4 && days < 21)
        ? 'дней'
        : 'дня';
    }
    let currentTime = new Date(this.date).getTime() - Date.now();
    if (currentTime <= 0) {
      currentTime = 0;
      localStorage.removeItem('date');
    }
    const [days, hours, minutes, seconds] = [
      60 * 60 * 1000 * 24,
      60 * 60 * 1000,
      60 * 1000,
      1000,
    ].map((item, index) => {
      const time = Math.floor(currentTime / item);
      currentTime = currentTime % item;
      if (index === 0) {
        return time;
      }
      return time < 10 ? `0${time}` : time === 60 ? '00' : time;
    });
    return `${days} ${stringifyDaysWord(
      days as number
    )} ${hours}:${minutes}:${seconds}`;
  }

  setDate(date: string) {
    this.date = date;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleDateInput(value: boolean) {
    this.openedDateInput = value;
  }

  editTitle() {
    this.title = this.input.nativeElement.value;
    localStorage.setItem('title', this.title);
    this.toggleEditMode();
  }

  openDateInput() {
    this.openedDateInput = !this.openedDateInput;
  }
}
