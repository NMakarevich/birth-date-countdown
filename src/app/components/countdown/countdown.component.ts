import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class CountdownComponent implements OnInit {
  countdown = '';

  data = this.settingsService.getSettingsFromLS();

  currentTime = new Date(this.data.date).getTime() - Date.now();

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit() {
    setInterval(() => {
      this.countdown = this.stringifyTimeLeft();
    });
  }

  stringifyTimeLeft() {
    function stringifyDaysWord(days: number) {
      return days === 1 || (days % 10 === 1 && days > 20)
        ? 'день'
        : days % 10 === 0 ||
          (days % 10 > 4 && days > 20) ||
          (days > 4 && days < 21) ||
          (days % 100 > 10 && days % 100 < 19)
        ? 'дней'
        : 'дня';
    }
    this.currentTime = new Date(this.data.date).getTime() - Date.now();
    if (this.currentTime <= 0 || !this.data.date) {
      this.currentTime = 0;
    }
    const [days, hours, minutes, seconds] = [
      60 * 60 * 1000 * 24,
      60 * 60 * 1000,
      60 * 1000,
      1000,
    ].map((item, index) => {
      const time = Math.floor(this.currentTime / item);
      this.currentTime = this.currentTime % item;
      if (index === 0) {
        return time;
      }
      return time < 10 ? `0${time}` : time === 60 ? '00' : time;
    });
    return `${days} ${stringifyDaysWord(
      days as number
    )} ${hours}:${minutes}:${seconds}`;
  }
}
