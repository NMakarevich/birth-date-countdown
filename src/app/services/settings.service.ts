import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LocalStorage {
  event: string;
  afterEvent: string;
  color: string;
  date: string;
  hideTitle: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  color = new BehaviorSubject<string>(this.getSettingsFromLS().color);

  defaultSettings: LocalStorage = {
    event: '',
    afterEvent: '',
    color: '#000000',
    date: '',
    hideTitle: false,
  };

  getSettingsFromLS(): LocalStorage {
    const data = localStorage.getItem('event-countdown');
    if (data) {
      return JSON.parse(data);
    } else {
      const event = localStorage.getItem('title') || '';
      const afterEvent = '';
      const color = localStorage.getItem('color') || '#000000';
      const date = localStorage.getItem('date') || '';
      localStorage.clear();
      this.saveToLS({ event, afterEvent, color, date, hideTitle: false });
      return { event, afterEvent, color, date, hideTitle: false };
    }
  }

  get countdownIsFinished() {
    return new Date(this.getSettingsFromLS().date).getTime() < Date.now();
  }

  saveToLS(data: LocalStorage) {
    localStorage.setItem('event-countdown', JSON.stringify(data));
  }

  resetSettings() {
    localStorage.clear();
    this.color.next(this.defaultSettings.color);
    this.saveToLS(this.defaultSettings);
  }
}
